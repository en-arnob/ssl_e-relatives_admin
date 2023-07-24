import React, { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import axios from "axios";
import toast from "react-hot-toast";

const TextTypeComponent = (props) => {
  const investigation = props.investigation;
  const [checked, setChecked] = useState();
  const [data, setData] = useState({
    order_no: 1,
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleCheck = () => {
    setChecked(!checked);
    setData({
      ...data,
      status: !checked,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name === "") {
      toast.error("Name can not be empty!");
    } else {
      let dataArr = [];
      dataArr.push(data);
      let sendData = {
        investigationId: investigation.id,
        testData: dataArr,
      };
      const url = `${process.env.REACT_APP_API_BASE_URL}/test/`;
      axios
        .post(url, sendData)
        .then((response) => {
          fetchTextReportData();
          setData({
            ...data,
            name: data.name,
          });
          // console.log(response.data);
        })
        .catch((err) => console.log(err));
      // console.log(data);
      toast.success("Saved successfully!");
    }

    // window.location.reload(false);
  };

  const fetchTextReportData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/test/${investigation.id}`)
      .then((response) => {
        // console.log(insData);
        setData(response.data.data[0]);
        // if (response.data.data[0].status === 1) {
        //   setChecked(true);
        // } else {
        //   setChecked(false);
        // }
        setChecked(response.data.data[0].status);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchTextReportData();
  }, []);

  return (
    <div>
      <div className='row'>
        <hr />
        <div className='col-sm-9'>
          <div className='mb-3 row '>
            <label
              htmlFor='inputName'
              className='col-sm-3 col-form-label d-flex justify-content-start'
            >
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <div className='col-sm-9'>
              <input
                onChange={handleChange}
                name='name'
                type='text'
                value={data?.name}
                className='form-control'
                id='inputName'
                required
              />
            </div>
          </div>
          <div className='mb-3 row '>
            <label
              htmlFor='inputInfo'
              className='col-sm-3 col-form-label d-flex justify-content-start'
            >
              Info
            </label>
            <div className='col-sm-9'>
              <RichTextEditor
                data={data}
                setData={setData}
                editorData={data?.info}
              />
            </div>
          </div>
          <div className='mb-3 row '>
            <label
              htmlFor='inputStatus'
              className='col-sm-3 col-form-label d-flex justify-content-start'
            >
              Status
            </label>
            <div className='col-sm-9'>
              <div className='form-check d-flex align-items-center'>
                <input
                  onChange={handleCheck}
                  checked={checked}
                  className='form-check-input mt-0 me-2'
                  type='checkbox'
                  id='flexCheckChecked'
                />
                <label className='form-check-label' htmlFor='flexCheckChecked'>
                  Active
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col col sm-12'>
          <div className='col-3 ml-3'>
            <button
              type='submit'
              className='btn btn-success px-5'
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextTypeComponent;
