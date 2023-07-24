import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import PaperStack from "../../../../components/DrawingCanvas/PaperStack";
import "./MedicalXray.scss";
import Canvas from "../../../../components/Canvas";

const scannedImages = [`${process.env.REACT_APP_UPLOAD_URL}/xray.jpg`];

const MedicalXray = () => {
  const canvasRef = useRef();
  const sketchRef = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const patientData = state?.record;
  const userId = patientData?.user?.id;
  const invCsv = patientData?.package?.investigation_id;
  const invIds = invCsv?.split(",");
  // console.log(patientData);

  useEffect(() => {
    console.log(canvasRef.current.clientWidth);
  }, []);

  const groupId = 1;
  const [activeInvTests, setActiveInvTests] = useState([]);
  const [normalValShow, setNormalValShow] = useState(false);
  const [canvass, setCanvass] = useState(null);
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

  const handleChangeT = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...activeInvTests];
    onchangeVal[i].info = value;
    setActiveInvTests(onchangeVal);
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
        const data1 = data?.actInvTestP1;
        const data2 = data?.actInvTestP2;
        const activeInvTestsD = data1.concat(data2);
        setActiveInvTests(activeInvTestsD);

        // console.log(activeInvTestsD);
      })
      .catch((err) => console.log(err));
  };
  const [xrayImage, setXrayImage] = useState();
  const getRadiologyData = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/reports/get-healthcard-results/${userId}/${1}`
      )
      .then((response) => {
        // console.log(response.data)
        setXrayImage(response?.data[0]?.user_file);
      })
      .catch((err) => console.log(err));
  };
  const saveData = () => {
    // e.preventDefault()
    const dataToSend = {
      userTests: activeInvTests,
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
        `${process.env.REACT_APP_API_BASE_URL}/reports/get-comments/${patientData?.user_id}/1}`
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

  function saveImage() {
    var canvas1 = document.getElementById("canvasSignature");
    if (canvas1.getContext) {
      var ctx = canvas1.getContext("2d");
      var myImage = canvas1.toDataURL("image/png");
    }
    var imageElement = document.getElementById("MyPix");
    imageElement.src = myImage;
  }

  useEffect(() => {
    // document.querySelectorAll(
    //   '.lc-drawing canvas'
    // )[0].style.visibility = `hidden`;
    // document.querySelectorAll(
    //   '.lc-drawing canvas'
    // )[1].style.backgroundImage = `url('${process.env.REACT_APP_UPLOAD_URL}/xray.jpg')`;
    // document.querySelectorAll(
    //   '.lc-drawing canvas'
    // )[1].style.backgroundRepeat = `no-repeat`;
    getRadiologyData();
    getComment();
    getActiveInvTests();
  }, []);

  return (
    <>
      <div className="card p-3 medical-report">
        <div className="row mb-4">
          <h6>
            Medical Xray Report for {patientData?.user.f_name}{" "}
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
        <div className="d-flex  gap-2 mt-4">
          <div className="col-6">
            <div className="row mt-3">
              <div className="d-flex flex-column gap-2">
                {activeInvTests?.map((invTest, i) => {
                  return (
                    <div className="d-flex justify-content-start" key={i}>
                      <p className="col-sm-4 text-start">{invTest.name}</p>
                      <input
                        type="text"
                        // onChange={handleChange}
                        onChange={(e) => handleChangeT(e, i)}
                        defaultValue={
                          normalValShow
                            ? invTest?.info.replace(/(<([^>]+)>)/gi, "")
                            : ""
                        }
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
                    // value={data?.address}
                    name="comments"
                    id="comments"
                    rows={3}
                    placeholder={commentData?.comments}
                    defaultValue={""}
                  />
                </div>
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
          <div ref={canvasRef} className="col-6" style={{ paddingTop: "2rem" }}>
            <Canvas xrayImage={xrayImage} />
          </div>
        </div>
        {/* <ImageEditor/> */}
      </div>
    </>
  );
};

export default MedicalXray;
