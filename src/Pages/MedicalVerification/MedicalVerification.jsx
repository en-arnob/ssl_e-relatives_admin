import React, { useState } from "react";
import "./MedicalVerification.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const MedicalVerification = () => {
  const medicalURL = `${process.env.REACT_APP_API_BASE_URL}/`;

  const [form, setForm] = useState({
    passport: "",
    telephone: "",
  });

  const createData = (e) => {
    e.preventDefault();
    axios
      .post(medicalURL, form)
      .then((response) => {})
      .catch((err) => console.log(err));
  };

  // const updateData = (id) => {

  //     const updatedForm = {

  //         ...form,
  //         passport: form.passport || data?.passport,
  //         telephone: form.telephone || data?.telephone,

  //     };

  //     axios.put(`process.env.REACT_APP_API_BASE_URL/module/${id}`, updatedForm)
  //    .then((response) => {
  //         console.log((response.data));
  //     })
  //    .catch((error) => console.log(error));

  // }

  const deleteData = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const onchange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <main className="authentication-content">
        <div className="container-fluid">
          <div className="card index-card py-5">
            <div className="col col-sm-12 card-container">
              <div className="p-4">
                <h5>Add New User</h5>
              </div>
              <div className="card-body p-4">
                <div className="mt-4">
                  <form onSubmit={(e) => createData(e)}>
                    <div className="mb-3 row ">
                      <label
                        htmlFor="passport"
                        className="col-sm-3 col-form-label d-flex justify-content-start"
                      >
                        Passport
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          onChange={(e) => onchange(e)}
                          name="passport"
                          type="text"
                          className="form-control"
                          id="passport"
                          required
                        />
                      </div>
                    </div>
                    <p className="col-sm-12 text-center">Or,</p>
                    <div className="mb-3 row ">
                      <label
                        htmlFor="telephone"
                        className="col-sm-3 col-form-label d-flex justify-content-start"
                      >
                        Telephone <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          onChange={(e) => onchange(e)}
                          name="telephone"
                          type="tel"
                          className="form-control"
                          id="telephone"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 row mt-5">
                      <button
                        className="btn-primary p-2 col-sm-4 radius-30 text-center mx-auto"
                        type="submit"
                      >
                        Search
                      </button>
                      <Link
                        className="text-center text-underline-none text-white"
                        to="/"
                      >
                        <button className="btn btn-secondary btn-lg px-md-4 radius-30 text-white mt-3">
                          Back to Home
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicalVerification;
