import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../../Context/UserContextAPI";
// import * as fs from 'fs'

const notify = () => toast.error("Field can not be empty!");

const SettingsPage = () => {
  const { currentUser, accessPerm, modulePerm, loading } =
    useContext(UserContext);
  // console.log(currentUser);
  // console.log(modulePerm(4));

  // data fetched from api will be stored in this state
  const [data, setData] = useState({});
  const [vatId, setVatId] = useState(0);

  // const [previewFile, setPreviewFile] = useState(undefined);
  let fileArr = [];
  // const favData = new FormData();

  // data from user input for server put
  // const [upData, setUpData] = useState({
  //   website_name: "",
  //   tag_line: "",
  //   address: "",
  //   mobile: "",
  //   copyright: "",
  // })
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const selectVATHandler = (e) => {
    setVatId(e.target.value);
    // console.log(e.target.value);
    setData((prev) => {
      return {
        ...prev,
        vat_type: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    fileArr.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });

    if (
      data.website_name !== "" &&
      data.tag_line !== "" &&
      data.address !== "" &&
      data.mobile !== "" &&
      data.copyright !== "" &&
      data.vat_type !== ""
    ) {
      try {
        const url = `${process.env.REACT_APP_API_BASE_URL}/settings`;
        const { data: res } = await axios.put(url, data);
        setData(data);

        toast.success("Successfully updated!");
      } catch (error) {
        console.log(error);
      }
    } else {
      notify();
    }
    let uploadUrl = `${process.env.REACT_APP_API_BASE_URL}/settings/image-upload`;

    axios
      .post(uploadUrl, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    window.location.reload(false);
  };

  useEffect(() => {
    getData();
    // setUpData({...upData, [data.key] : data.value})
  }, []);

  // logo handling
  const getLogo = (e) => {
    // setLogoFile(e.target.files[0])
    // formData.append("files", e.target.files[0] );
    fileArr.push(e.target.files[0]);
    // formData.append("logoName", e.target.files[0].name );
    // setPreviewFile(URL.createObjectURL(e.target.files[0]));
  };

  // favicon handling
  // const [favFile, setFavFile] = useState('')

  const getFav = (e) => {
    // setFavFile(e.target.files[0])
    fileArr.push(e.target.files[0]);
    // formData.append("favName", e.target.files[0].name );
    // console.log(e.target.files[0])
  };

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/settings`)
      .then((response) => {
        const allData = response.data.data[0];
        setData(allData);
        setVatId(allData.vat_type);
        // formData.append('name', data.name)
        // console.log(formData)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 mx-auto">
          <div className="card">
            <div className="card-body">
              <form className="needs-validation">
                <div className="border p-4 rounded">
                  <div className="card-title d-flex align-items-center">
                    <h5 className="mb-0">System Settings</h5>
                  </div>
                  <hr />

                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">
                      Website Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={data?.website_name}
                        className="form-control"
                        id="inputEnterYourName"
                        name="website_name"
                        placeholder={data?.website_name}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPhoneNo2"
                      className="col-sm-3 col-form-label"
                    >
                      Tag Line
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={data?.tag_line}
                        name="tag_line"
                        className="form-control"
                        id="inputPhoneNo2"
                        placeholder={data?.tag_line}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputAddress4"
                      className="col-sm-3 col-form-label"
                    >
                      Address
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        className="form-control"
                        onChange={handleChange}
                        value={data?.address}
                        name="address"
                        id="inputAddress4"
                        rows={3}
                        placeholder={data?.address}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputAddress4"
                      className="col-sm-3 col-form-label"
                    >
                      Contact Numbers
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        onChange={handleChange}
                        value={data?.mobile}
                        name="mobile"
                        className="form-control"
                        id="inputAddress4"
                        rows={2}
                        placeholder={data?.mobile}
                        defaultValue={""}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputPhoneNo2"
                      className="col-sm-3 col-form-label"
                    >
                      Logo
                    </label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        type="file"
                        onChange={getLogo}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputPhoneNo2"
                      className="col-sm-3 col-form-label"
                    >
                      Logo Preview
                    </label>
                    <div className="col-sm-9">
                      <img
                        className="mt-3"
                        src={`${process.env.REACT_APP_UPLOAD_URL}/${data?.logo_image}`}
                        alt="preview"
                        style={{ height: "100px" }}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputPhoneNo2"
                      className="col-sm-3 col-form-label"
                    >
                      Favicon
                    </label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        type="file"
                        onChange={getFav}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPhoneNo2"
                      className="col-sm-3 col-form-label"
                    >
                      Favicon Preview
                    </label>
                    <div className="col-sm-9">
                      <img
                        className="mt-3"
                        src={`${process.env.REACT_APP_UPLOAD_URL}/${data?.fav_image}`}
                        alt="preview"
                        style={{ height: "100px" }}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row ">
                    <label
                      htmlFor="inputNationality"
                      className="col-sm-3 col-form-label d-flex justify-content-start"
                    >
                      VAT Type
                    </label>
                    <div className="col-sm-9">
                      <select
                        value={vatId}
                        onChange={selectVATHandler}
                        className="single-select form-select"
                      >
                        <option value={1}>Included</option>
                        <option value={2}>Excluded</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-sm-3 col-form-label">Copyright</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={data?.copyright}
                        name="copyright"
                        id="inputEnterYourName"
                        placeholder={data?.copyright}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <label className="col-sm-3 col-form-label" />
                    <div className="col-sm-9">
                      {accessPerm(1, 2) && (
                        <button
                          type="submit"
                          className="btn btn-primary px-5"
                          onClick={handleSubmit}
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
