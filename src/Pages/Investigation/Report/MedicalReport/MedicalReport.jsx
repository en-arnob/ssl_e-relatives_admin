import React, { useState, useEffect } from "react";
import "./MedicalReport.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MedicalReport = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.record?.user?.id;
  const patientData = state?.record;

  function divideArray(array) {
    const length = array.length;
    const chunkSize = Math.ceil(length / 4);

    const result = [[], [], [], []];

    for (let i = 0; i < length; i++) {
      const chunkIndex = Math.floor(i / chunkSize);
      result[chunkIndex].push(array[i]);
    }
    return result;
  }
  const [userResultsData, setUserResultsData] = useState({
    user_id: patientData?.user_id,
    final_comments: "",
    advice: "",
    risk_factor: "",
    is_auto: 1,
    status: 2,
  });
  const [checked, setChecked] = useState(true);

  const selectStatusHandler = (e) => {
    // setStausId(parseInt(e.target.value));
    // console.log(e.target.value);
    setUserResultsData((prev) => {
      return {
        ...prev,
        status: parseInt(e.target.value),
      };
    });
    // console.log(commentData)
  };

  const checkboxHandler = (e) => {
    setChecked(e.target.checked);
    console.log(e.target.checked);
    if (e.target.checked) {
      setUserResultsData((prev) => {
        return {
          ...prev,
          is_auto: 1,
        };
      });
    } else {
      setUserResultsData((prev) => {
        return {
          ...prev,
          is_auto: 0,
        };
      });
    }
  };

  const handleResultChange = ({ currentTarget: input }) => {
    setUserResultsData({ ...userResultsData, [input.name]: input.value });
    // console.log(userResultsData);
  };

  const saveResults = () => {
    // console.log(userResultsData);
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/reports/save-user-results`,
        userResultsData
      )
      .then((response) => {
        // console.log(data.actInvTestP1);
        // console.log(data);
      })
      .catch((err) => console.log(err));
    toast.success("Saved Successfully!");
  };

  const [physicalResults, setPhysicalResults] = useState([]);
  const [pathologyResults, setPathologyResults] = useState([]);
  const [radiologyResults, setRadiologyResults] = useState([]);

  const getPhysicalData = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/reports/get-healthcard-results/${userId}/${3}`
      )
      .then((response) => {
        // console.log(response.data)
        // setPhysicalData(response?.data)
        const data = response?.data;
        const dividedIntoFour = divideArray(data);
        // console.log(dividedIntoFour)
        setPhysicalResults(dividedIntoFour);
      })
      .catch((err) => console.log(err));
  };
  const getRadiologyData = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/reports/get-healthcard-results/${userId}/${1}`
      )
      .then((response) => {
        // console.log(response.data)
        // setPhysicalData(response?.data)
        const data = response?.data;
        const dividedIntoFour = divideArray(data);
        // console.log(dividedIntoFour)
        setRadiologyResults(dividedIntoFour);
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
        // setPhysicalData(response?.data)
        const data = response?.data;
        const dividedIntoFour = divideArray(data);
        // console.log(dividedIntoFour)
        setPathologyResults(dividedIntoFour);
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
    // window.print();
    getPhysicalData();
    getRadiologyData();
    getPathologyData();
    getUserResults();
  }, []);

  return (
    <>
      <div className="card p-3 medical-report">
        <div className="row mb-4">
          <h6>
            Medical Report for {patientData?.user.registration_no}-
            {patientData?.user.f_name} {patientData?.user.l_name} [246677]
          </h6>
        </div>
        <div className="row">
          <div className="img d-flex gap-2 col-sm-3">
            {patientData?.user?.image ? (
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL}/users/${patientData?.user?.image}`}
                className=" img-thumbnail img-fluid rounded float-left"
                alt="..."
                style={{ height: "200px" }}
              />
            ) : (
              <img src="./dummy.jpg" alt="patient" />
            )}
            {patientData?.user?.finger_print ? (
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL}/users/fingerPrints/${patientData?.user?.finger_print}`}
                className=" img-thumbnail img-fluid rounded float-left"
                alt="..."
                style={{ height: "200px" }}
              />
            ) : (
              <img src="./no-fingerprint.jpg" alt="patient" />
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
        <div className="row mt-4">
          <h6 className="mb-4">Physical Report</h6>
        </div>
        <div className="row">
          <div className="medical-second-row container d-flex col-sm-12">
            <div className="col">
              {physicalResults[0]?.map((physical, key) => {
                return (
                  <div className="row" key={key}>
                    <p className="col-sm-8">
                      {physical?.investigation_test?.name}
                    </p>
                    <span className="col-sm-4">{physical?.result}</span>
                  </div>
                );
              })}
            </div>
            <div className="col">
              {physicalResults[1]?.map((physical, key) => {
                return (
                  <div className="row" key={key}>
                    <p className="col-sm-8">
                      {physical?.investigation_test?.name}
                    </p>
                    <span className="col-sm-4">{physical?.result}</span>
                  </div>
                );
              })}
            </div>
            <div className="col">
              {physicalResults[2]?.map((physical, key) => {
                return (
                  <div className="row" key={key}>
                    <p className="col-sm-8">
                      {physical?.investigation_test?.name}
                    </p>
                    <span className="col-sm-4">{physical?.result}</span>
                  </div>
                );
              })}
            </div>
            <div className="line"></div>
            <div className="col">
              {physicalResults[3]?.map((physical, key) => {
                return (
                  <div className="row" key={key}>
                    <p className="col-sm-8">
                      {physical?.investigation_test?.name}
                    </p>
                    <span className="col-sm-4">{physical?.result}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <h6 className="mb-4">Pathology Report Report</h6>
        </div>
        <div className="row">
          <div className="medical-third-row container d-flex col-sm-12">
            <div className="col">
              {pathologyResults[0]?.map((physical, key) => {
                return (
                  <div className="row" key={key}>
                    <p className="col-sm-8">
                      {physical?.investigation_test?.name}
                    </p>
                    <span className="col-sm-4">{physical?.result}</span>
                  </div>
                );
              })}
            </div>
            <div className="col">
              {pathologyResults[1]?.map((physical, key) => {
                return (
                  <div className="row" key={key}>
                    <p className="col-sm-8">
                      {physical?.investigation_test?.name}
                    </p>
                    <span className="col-sm-4">{physical?.result}</span>
                  </div>
                );
              })}
            </div>
            <div className="col">
              {pathologyResults[2]?.map((physical, key) => {
                return (
                  <div className="row" key={key}>
                    <p className="col-sm-8">
                      {physical?.investigation_test?.name}
                    </p>
                    <span className="col-sm-4">{physical?.result}</span>
                  </div>
                );
              })}
            </div>
            <div className="col">
              {pathologyResults[3]?.map((physical, key) => {
                return (
                  <div className="row" key={key}>
                    <p className="col-sm-8">
                      {physical?.investigation_test?.name}
                    </p>
                    <span className="col-sm-4">{physical?.result}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <h6 className="mb-4">Radiology Report</h6>
        </div>
        <div className="row">
          <div className="row">
            <div className="medical-fourth-row container d-flex col-sm-12">
              <div className="col">
                {radiologyResults[0]?.map((physical, key) => {
                  return (
                    <div className="row" key={key}>
                      <p className="col-sm-8">
                        {physical?.investigation_test?.name}
                      </p>
                      <span className="col-sm-4">{physical?.result}</span>
                    </div>
                  );
                })}
              </div>
              <div className="col">
                {radiologyResults[1]?.map((physical, key) => {
                  return (
                    <div className="row" key={key}>
                      <p className="col-sm-8">
                        {physical?.investigation_test?.name}
                      </p>
                      <span className="col-sm-4">{physical?.result}</span>
                    </div>
                  );
                })}
              </div>
              <div className="col">
                {radiologyResults[2]?.map((physical, key) => {
                  return (
                    <div className="row" key={key}>
                      <p className="col-sm-8">
                        {physical?.investigation_test?.name}
                      </p>
                      <span className="col-sm-4">{physical?.result}</span>
                    </div>
                  );
                })}
              </div>
              <div className="col">
                {radiologyResults[3]?.map((physical, key) => {
                  return (
                    <div className="row" key={key}>
                      <p className="col-sm-8">
                        {physical?.investigation_test?.name}
                      </p>
                      <span className="col-sm-4">{physical?.result}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5 inputs">
          <div className="col">
            <h6>Final Comments</h6>
            <textarea
              name="final_comments"
              onChange={handleResultChange}
              id="final_comments"
              cols="50"
              rows="5"
              defaultValue={""}
              placeholder={userResultsData?.final_comments}
            />
          </div>
          <div className="col">
            <h6>Advice</h6>
            <textarea
              name="advice"
              onChange={handleResultChange}
              id="advice"
              cols="50"
              rows="5"
              defaultValue={""}
              placeholder={userResultsData?.advice}
            />
          </div>
          <div className="col">
            <h6>Risk Factor</h6>
            <textarea
              name="risk_factor"
              onChange={handleResultChange}
              id="risk_factor"
              cols="50"
              rows="5"
              defaultValue={""}
              placeholder={userResultsData?.risk_factor}
            />
          </div>
        </div>
        <div className="row mt-4 d-flex align-items-center gap-4">
          <div className="drop-down-select col-sm-4">
            <h6>Status</h6>
            <select
              // value={statusId}
              onChange={selectStatusHandler}
              className="single-select form-select"
            >
              <option value={2}>FIT</option>
              <option value={3}>UNFIT</option>
              <option value={4}>HELD UP</option>
            </select>
          </div>
          <div className="autoResult col-sm-4 mt-4">
            <input
              type="checkbox"
              id="ignoreAutoResult"
              checked={checked}
              onChange={checkboxHandler}
            />
            <label className="p-2" htmlFor="ignoreAutoResult">
              Ignore Auto Result
            </label>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col d-flex justify-content-end gap-2">
            <button className="btn btn-success px-2" onClick={saveResults}>
              Save Results
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalReport;
