import React, { useState, useEffect } from "react";
import "./MedicalPhysical.scss";
import avatar from "./dummy.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MedicalPhysical = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const patientData = state?.record;
  const invCsv = patientData?.package?.investigation_id
  const invIds = invCsv?.split(",");
  // console.log(patientData)

  const groupId = 3;
  const [activeInvTests1, setActiveInvTests1] = useState([]);
  const [activeInvTests2, setActiveInvTests2] = useState([]);
  const [normalValShow, setNormalValShow] = useState(false);

  const [commentData, setCommentData] = useState({
    user_id: patientData?.user_id,
    comments: "",
    investigation_group_id: groupId,
    status: 2,
  });

  const selectStatusHandler = (e) => {
    // setStausId(parseInt(e.target.value));
    // console.log(e.target.value);
    setCommentData((prev) => {
      return {
        ...prev,
        status: parseInt(e.target.value),
      };
    });
    // console.log(commentData)
  };
  const handleCommentChange = ({ currentTarget: input }) => {
    setCommentData({ ...commentData, [input.name]: input.value });
    // console.log(commentData)
  };

  const handleChangeT1 = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...activeInvTests1];
    onchangeVal[i].info = value;
    setActiveInvTests1(onchangeVal);
    // console.log(activeInvTests1)
  };
  const handleChangeT2 = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...activeInvTests2];
    onchangeVal[i].info = value;
    setActiveInvTests2(onchangeVal);
    // console.log(activeInvTests1)
  };

  const getActiveInvTests = () => {
    const dataToSend = {
      invIds: invIds,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/reports/get-data/${groupId}`,
        dataToSend
      )
      .then((response) => {
        const data = response?.data;
        // console.log(data.actInvTestP1);
        const fInvTest1Data = data?.actInvTestP1;
        const fInvTest2Data = data?.actInvTestP2;
        fInvTest1Data.forEach((obj) => {
          obj.info = obj.info.replace(/<[^>]*>/g, "");
        });
        fInvTest2Data.forEach((obj) => {
          obj.info = obj.info.replace(/<[^>]*>/g, "");
        });

        setActiveInvTests1(fInvTest1Data);
        setActiveInvTests2(fInvTest2Data);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const saveData = () => {
    // e.preventDefault()
    const data = activeInvTests1.concat(activeInvTests2);

    const dataToSend = {
      userTests: data,
    };
    // console.log(dataToSend)
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/reports/save-user-tests/${patientData?.user_id}`,
        dataToSend
      )
      .then((response) => {
        // console.log(data.actInvTestP1);
        // console.log(data);
      })
      .catch((err) => console.log(err));

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/reports/save-comments`,
        commentData
      )
      .then((response) => {
        // console.log(data.actInvTestP1);
        // console.log(data);
      })
      .catch((err) => console.log(err));
    toast.success("Saved Successfully!");
  };
  const getComment = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/reports/get-comments/${patientData?.user_id}/3}`
      )
      .then((response) => {
        // console.log(response.data)
        // setPhysicalData(response?.data)
        const data = response?.data;
        const phyC = data.comments;
        setCommentData((prev) => {
          return {
            ...prev,
            comments: phyC,
          };
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getActiveInvTests();
    getComment();
  }, []);

  return (
    <>
      <div className="card p-3 medical-report">
        <div className="row mb-4">
          <h6>
            Medical Physical Report for {patientData?.user.f_name}{" "}
            {patientData?.user.l_name} [{patientData?.user.registration_no}]
          </h6>
        </div>
        <div className="row">
          <div className="img d-flex gap-2 col">
            {patientData?.user?.image ? (
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL}/users/${patientData?.user?.image}`}
                className=" img-thumbnail img-fluid rounded float-left"
                alt="..."
                style={{ height: "200px" }}
              />
            ) : (
              <img
                src={avatar}
                className=" img-thumbnail img-fluid rounded float-left"
                alt="..."
                style={{ height: "200px" }}
              />
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
        <div className="row mt-3 d-flex gap-4">
          <div className="col d-flex flex-column gap-2">
            {activeInvTests1?.map((invTest, i) => {
              return (
                <div className="d-flex justify-content-start" key={i}>
                  <p className="col-sm-4 text-start">{invTest.name}</p>
                  <input
                    type="text"
                    // onChange={handleChange}
                    onChange={(e) => handleChangeT1(e, i)}
                    defaultValue={normalValShow ? invTest?.info : ""}
                    className="form-control"
                    id="inputEnterYourName"
                    name="info"
                    // placeholder={invTest?.info}
                    required
                  />
                </div>
              );
            })}
          </div>
          <div className="col d-flex flex-column gap-2">
            {activeInvTests2?.map((invTest, i) => {
              return (
                <div className="d-flex justify-content-start" key={i}>
                  <p className="col-sm-4 text-start">{invTest.name}</p>
                  <input
                    type="text"
                    onChange={(e) => handleChangeT2(e, i)}
                    defaultValue={normalValShow ? invTest?.info : ""}
                    className="form-control"
                    id="inputEnterYourName"
                    name="info"
                    // placeholder={invTest?.info}
                    required
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="row mt-3 d-flex gap-4">
          <div className="col d-flex flex-column gap-2">
            <div className="d-flex justify-content-start">
              <p className="col-sm-4 text-start">Comments</p>
              <textarea
                className="form-control"
                onChange={handleCommentChange}
                name="comments"
                id="comments"
                rows={3}
                placeholder={commentData?.comments}
                defaultValue={""}
              />
            </div>
          </div>
          <div className="col d-flex flex-column gap-2">
            <div className="d-flex justify-content-start">
              <p className="col-sm-4 text-start">Status</p>
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
          </div>
        </div>
        <div className="row mt-3">
          <div className="btn-group">
            <div className="col d-flex justify-content-start gap-4">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setNormalValShow(true);
                }}
              >
                Set Normal
              </button>
            </div>
            <div className="col d-flex justify-content-end gap-2">
              <button className="btn btn-success px-2" onClick={saveData}>
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
      </div>
    </>
  );
};

export default MedicalPhysical;
