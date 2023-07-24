import React, { useState, useEffect } from "react";
import "./HeldUp.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HeldUp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.record?.user?.id;
  const patientData = state?.record;

  const [radiologyData, setRadiologyData] = useState([]);
  const [pathologyData, setPathologyData] = useState([]);
  const [userResultsData, setUserResultsData] = useState({
    user_id: patientData?.user_id,
    final_comments: "",
    advice: "",
    risk_factor: "",
    is_auto: 1,
    status: 2,
  });
  const getRadiologyData = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/reports/get-healthcard-results/${userId}/${1}`
      )
      .then((response) => {
        // console.log(response.data)
        setRadiologyData(response?.data);
      })
      .catch((err) => console.log(err));
  };
  const getPathologyData = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/reports/get-healthcard-results/${userId}/${2}`
      )
      .then((response) => {
        // console.log(response.data)
        setPathologyData(response?.data);
      })
      .catch((err) => console.log(err));
  };
  function getUserResults() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/reports/get-user-results/${userId}`
      )
      .then((response) => {
        // console.log(response.data)
        // setPhysicalData(response?.data)
        const data = response?.data;
        setUserResultsData((prev) => {
          return {
            ...prev,
            final_comments: data?.final_comments,
            advice: data?.advice,
            risk_factor: data?.risk_factor,
          };
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getRadiologyData();
    getPathologyData();
    getUserResults();
    setTimeout(() => {
      window.print();
    }, 1500);
  }, []);

  return (
    <>
      <div className="card p-3 medical-report">
        <div className="row mb-4">
          <h6>
            HELD-UP CERTIFICATE for {""}
            {patientData?.user.f_name} {patientData?.user.l_name} [
            {patientData?.user.registration_no}]
          </h6>
        </div>
        <div className="row">
          <div className="img d-flex gap-2 col-sm-3">
            {patientData?.user?.image ? (
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL}/users/${patientData?.user?.image}`}
                className=" img-thumbnail img-fluid rounded float-left"
                alt="..."
                style={{ height: "100px" }}
              />
            ) : (
              <img
                src="./dummy.jpg"
                style={{ height: "100px" }}
                alt="patient"
              />
            )}
            {patientData?.user?.finger_print ? (
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL}/users/fingerPrints/${patientData?.user?.finger_print}`}
                className=" img-thumbnail img-fluid rounded float-left"
                alt="..."
                style={{ height: "100px" }}
              />
            ) : (
              <img
                src="./no-fingerprint.jpg"
                alt="patient"
                style={{ height: "100px" }}
              />
            )}
          </div>

          <div className="medical container d-flex col-sm-9">
            <div className="col">
              <div className="row">
                <p className="col-sm-6">Father's Name</p>
                <span className="col-sm-6">{patientData?.father_name}</span>
              </div>
              <div className="row">
                <p className="col-sm-6">Mother's Name</p>
                <span className="col-sm-6">{patientData?.mother_name}</span>
              </div>
              <div className="row">
                <p className="col-sm-6">Gender</p>
                <span className="col-sm-6">{patientData?.gender?.name}</span>
              </div>
              <div className="row">
                <p className="col-sm-6">Date of Birth</p>
                <span className="col-sm-6">
                  {patientData?.user?.date_of_birth}
                </span>
              </div>
              <div className="row">
                <p className="col-sm-6">Marital Status</p>
                <span className="col-sm-6">
                  {patientData?.marital_status?.name}
                </span>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <p className="col-sm-6">Country</p>
                <span className="col-sm-6">{patientData?.country?.name}</span>
              </div>
              <div className="row">
                <p className="col-sm-6">Company</p>
                <span className="col-sm-6">
                  {patientData?.company_user?.f_name}{" "}
                  {patientData?.company_user?.l_name}
                </span>
              </div>
              <div className="row">
                <p className="col-sm-6">Delegate</p>
                <span className="col-sm-6">
                  {patientData?.delegates_user?.f_name}{" "}
                  {patientData?.delegates_user?.l_name}
                </span>
              </div>
              <div className="row">
                <p className="col-sm-6">Introducer</p>
                <span className="col-sm-6">
                  {patientData?.introducer_user?.f_name}{" "}
                  {patientData?.introducer_user?.l_name}
                </span>
              </div>
              <div className="row">
                <p className="col-sm-6">Representative</p>
                <span className="col-sm-6"></span>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <p className="col-sm-6">Contact Number</p>
                <span className="col-sm-6">{patientData?.user?.mobile}</span>
              </div>
              <div className="row">
                <p className="col-sm-6">Passport Number</p>
                <span className="col-sm-6">
                  {patientData?.user?.passport_no}
                </span>
              </div>
              <div className="row">
                <p className="col-sm-6">Profession</p>
                <span className="col-sm-6">
                  {patientData?.profession?.name}
                </span>
              </div>
              <div className="row">
                <p className="col-sm-6">Nationality</p>
                <span className="col-sm-6">
                  {patientData?.country?.nationality}
                </span>
              </div>
              <div className="row">
                <p className="col-sm-6">Package</p>
                <span className="col-sm-6">{patientData?.package?.name}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <table className="table table-sm table-bordered">
            <tbody>
              <tr
                style={{ backgroundColor: "#B2BEB5	", color: "#fff" }}
                className="text-center"
              >
                <th colSpan={2}>TEST</th>
                <th>RESULT</th>
              </tr>
              {/* Render pathology results */}
              {pathologyData?.map((patho, i) => {
                return (
                  <tr key={i}>
                    <td className="text-left">
                      {
                        patho?.investigation_test.investigation
                          .investigation_category.name
                      }
                    </td>
                    <td className="text-left">
                      {patho?.investigation_test.name}
                    </td>
                    <td className="text-left">{patho?.result}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <div className="row mt-3">
              <th
                className="text-center"
                style={{ backgroundColor: "#B2BEB5	", color: "#fff" }}
              >
                X-Ray Chest P/A View
              </th>
              <div className="d-flex">
                <div className="col-sm-7">
                  <div className="row mt-3">
                    <div className="col d-flex flex-column gap-2">
                      <ul className="text-align-left">
                        {radiologyData?.map((invTest, i) => {
                          return (
                            <div
                              className="d-flex justify-content-start"
                              key={i}
                            >
                              <p className="col-sm-4 text-start">
                                &#9642; {invTest?.investigation_test.name}
                              </p>
                              <p>:</p>
                              <p className="col-sm-4 text-start">
                                {invTest?.result}
                              </p>
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="xray-img">
                    <img src="/xray.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <th
                className="text-center"
                style={{ backgroundColor: "#B2BEB5	", color: "#fff" }}
              >
                Comment and Risk Factors
              </th>
              <div className="d-flex">
                <div className="col-sm-7">
                  <div className="row mt-3">
                    <p>{userResultsData.final_comments}</p>
                    <p>{userResultsData.risk_factor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeldUp;
