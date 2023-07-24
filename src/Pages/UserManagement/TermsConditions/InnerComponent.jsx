import React, { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import axios from "axios";
import toast from "react-hot-toast";

const InnerComponent = ({ role }) => {
  const [checked, setChecked] = useState(true);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");

  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Name can not be empty!");
    } else {
      const sendData = {
        role_id: role?.id,
        name: name,
        info: info,
        status: checked ? 1 : 0,
      };
      const url = `${process.env.REACT_APP_API_BASE_URL}/terms-conditions/`;
      axios
        .post(url, sendData)
        .then((response) => {
          fetchData();
          // console.log(sendData);
          // setData({
          //   ...data,
          //   name: data.name,
          // });
          // console.log(response.data);
        })
        .catch((err) => console.log(err));
      // console.log(data);
      toast.success("Saved successfully!");
    }

    // window.location.reload(false);
  };

  const fetchData = () => {
    console.log(role?.id);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/terms-conditions/${role?.id}`)
      .then((response) => {
        if (response.data) {
          setName(response.data.name);
          setInfo(response.data.info);
          setChecked(parseInt(response.data.status) === 1 ? true : false);
        } else {
          setName("");
          setInfo("");
          setChecked(true);
        }
        // if (response.data.data.status === 1) {
        //   setChecked(true);
        // } else {
        //   setChecked(false);
        // }
        // setChecked(response.data.data[0].status);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, [role]);

  return (
    <div>
      <div className="row">
        <hr />
        <div className="col-sm-12">
          <div className="mb-3 row ">
            <label
              htmlFor="inputName"
              className="col-sm-3 col-form-label d-flex justify-content-start"
            >
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <div className="col-sm-12">
              <input
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                value={name}
                defaultValue={name}
                className="form-control"
                id="inputName"
                required
              />
            </div>
          </div>
          <div className="mb-3 row ">
            <label
              htmlFor="inputInfo"
              className="col-sm-3 col-form-label d-flex justify-content-start"
            >
              Info
            </label>
            <div className="col-sm-12">
              <RichTextEditor data={info} setData={setInfo} editorData={info} />
            </div>
          </div>
          <div className="mb-3 row ">
            <label
              htmlFor="inputStatus"
              className="col-sm-3 col-form-label d-flex justify-content-start"
            >
              Status
            </label>
            <div className="col-sm-12">
              <div className="form-check d-flex align-items-center">
                <input
                  onChange={handleCheck}
                  checked={checked}
                  className="form-check-input mt-0 me-2"
                  type="checkbox"
                  id="flexCheckChecked"
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  Active
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col col-sm-12">
          <button
            type="submit"
            className="btn btn-success px-5"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InnerComponent;
