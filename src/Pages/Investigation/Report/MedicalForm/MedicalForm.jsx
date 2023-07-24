import axios from "axios";
import JsBarcode from "jsbarcode";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MedicalForm.scss";
import PatientPic from "./abc.jpg";

const MedicalForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const patientData = state?.record;
  // console.log(patientData);
  const [systemData, setSystemData] = useState({});
  const userId = state?.record?.user?.id;

  const [pathologyResults, setPathologyResults] = useState([]);
  const [physicalResults, setPhysicalResults] = useState([]);

  function divideArray(array) {
    const length = array.length;
    const chunkSize = Math.ceil(length / 2);

    const result = [[], []];

    for (let i = 0; i < length; i++) {
      const chunkIndex = Math.floor(i / chunkSize);
      result[chunkIndex].push(array[i]);
    }
    return result;
  }

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
        const dividedIntoTwo = divideArray(data);
        // console.log(dividedIntoTwo);
        setPathologyResults(dividedIntoTwo);
      })
      .catch((err) => console.log(err));
  };
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
        const dividedIntoTwo = divideArray(data);
        // console.log(dividedIntoFour)
        setPhysicalResults(dividedIntoTwo);
      })
      .catch((err) => console.log(err));
  };

  const [phyComment, setPhyComment] = useState("");
  const [pathoComment, setPathoComment] = useState("");
  const [radComment, setRadComment] = useState("");

  const [finalComment, setFinalComment] = useState("");

  function getFinalComment() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/reports/get-user-results/${userId}}`
      )
      .then((response) => {
        // console.log(response.data)
        // setPhysicalData(response?.data)
        const data = response?.data;
        const finComment = data.final_comments;
        setFinalComment(finComment);
      })
      .catch((err) => console.log(err));
  }

  const getPhyComment = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/reports/get-comments/${userId}/3}`
      )
      .then((response) => {
        // console.log(response.data)
        // setPhysicalData(response?.data)
        const data = response?.data;
        const phyC = data.comments;
        setPhyComment(phyC);
      })
      .catch((err) => console.log(err));
  };
  const getPathoComment = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/reports/get-comments/${userId}/2}`
      )
      .then((response) => {
        // console.log(response.data)
        // setPhysicalData(response?.data)
        const data = response?.data;
        const phyC = data.comments;
        setPathoComment(phyC);
      })
      .catch((err) => console.log(err));
  };
  const getRadComment = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/reports/get-comments/${userId}/1}`
      )
      .then((response) => {
        // console.log(response.data)
        // setPhysicalData(response?.data)
        const data = response?.data;
        const phyC = data.comments;
        setRadComment(phyC);
      })
      .catch((err) => console.log(err));
  };

  const getSystemData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/settings`)
      .then((response) => {
        const allData = response.data.data[0];
        setSystemData(allData);
        // console.log(allData)
        // formData.append('name', data.name)
        // console.log(formData)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSystemData();
    getPhysicalData();
    getPathologyData();
    getPhyComment();
    getPathoComment();
    getRadComment();
    getFinalComment();
    setTimeout(() => {
      window.print();
    }, 1500);
  }, []);

  const patientIdBarcode = document.createElement("canvas");
  JsBarcode(patientIdBarcode, String(patientData?.user?.registration_no));
  const patientIdDataUrl = patientIdBarcode.toDataURL();

  // const trackingIdBarcode = document.createElement("canvas");
  // JsBarcode(trackingIdBarcode, String(56987977));
  // const trackingIdDataUrl = trackingIdBarcode.toDataURL();
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="p-2 medical-form">
      <div className="text-center">
        <table className="" width="100%" border="0">
          <tr>
            <th width="15%">
              {patientData?.user?.image ? (
                <img
                  src={`${process.env.REACT_APP_UPLOAD_URL}/users/${patientData?.user?.image}`}
                  className=" img-thumbnail img-fluid rounded float-left"
                  alt="..."
                  style={{ height: "200px" }}
                />
              ) : (
                <img
                  src={PatientPic}
                  className=" img-thumbnail img-fluid rounded float-left"
                  style={{ height: "200px" }}
                  alt="No_patient_Image"
                />
              )}
            </th>
            {/* <th width="10%">
              {patientData?.user?.finger_print ? (
                <img
                  width={120}
                  src={`${process.env.REACT_APP_UPLOAD_URL}/users/fingerPrints/${patientData?.user?.finger_print}`}
                  className=" img-thumbnail img-fluid rounded float-left"
                  alt="..."
                />
              ) : (
                <img src="./no-fingerprint.jpg" width={120} alt="patient" />
              )}
            </th> */}
            <th width="50%" className="text-center">
              <h4 className="tetx-uppercase ">{systemData.website_name}</h4>
              <p className="text-bold">
                {systemData.address} <br /> Contact: {systemData.mobile}
              </p>
              <h2 className="text-uppercase text-bold">Medical Form</h2>
              <p className="text-bold text-16">
                Medical Date:{" "}
                {patientData?.user?.user_payment?.createdAt
                  ? formatDate(patientData?.user?.user_payment?.createdAt)
                  : ""}
              </p>
            </th>
            <th width="15%">
              {patientData?.user?.finger_print ? (
                <img
                  width={120}
                  src={`${process.env.REACT_APP_UPLOAD_URL}/users/fingerPrints/${patientData?.user?.finger_print}`}
                  className=" img-thumbnail img-fluid rounded float-left"
                  alt="..."
                />
              ) : (
                <img src="./no-fingerprint.jpg" width={120} alt="patient" />
              )}
              <br />
              <img
                style={{
                  width: "120px",
                  height: "55px",
                  fontFace: "Arial",
                  padding: "5px",
                }}
                src={patientIdDataUrl}
                alt=""
              />
              <br />
              Registration Number
            </th>
          </tr>
        </table>
      </div>

      <div className="col-lg-12" style={{ minHeight: "950px" }}>
        <table width="100%" border="0" style={{ fontSize: "13pt" }}>
          <tr className="">
            <th width="19%" className="text-left">
              Tracking Number
            </th>
            <th width="1%" className="text-center">
              :
            </th>
            <th width="40%" className="text-left">
              {patientData?.user?.registration_no}
            </th>

            <th width="18%" className="text-left">
              Date of Birth
            </th>
            <th width="1%" className="text-center">
              :
            </th>
            <th width="30%" className="text-left">
              {patientData?.user?.date_of_birth}
            </th>
          </tr>
          <tr className="">
            <th width="15%" className="text-left">
              Contact Number
            </th>
            <th width="1%" className="text-center">
              :
            </th>
            <th width="30%" className="text-left">
              {patientData?.user?.mobile}
            </th>

            <th width="15%" className="text-left">
              Passport Number
            </th>
            <th width="1%" className="text-center">
              :
            </th>
            <th width="38%" className="text-left">
              {patientData?.user?.passport_no}
            </th>
          </tr>
          <tr className="">
            <th width="20%" className="text-left">
              Name
            </th>
            <th width="1%" className="text-center">
              :
            </th>
            <th width="30%" className="text-left">
              {patientData?.user?.f_name} {patientData?.user?.l_name}
            </th>

            <th width="18%" className="text-left">
              Gender
            </th>
            <th width="1%" className="text-center">
              :
            </th>
            <th width="30%" className="text-left">
              {patientData?.gender?.name}
            </th>
          </tr>
          <tr className="">
            <th width="20%" className="tx-left">
              Merital Status
            </th>
            <th width="1%" className="tx-center">
              :
            </th>
            <th width="30%" className="tx-left">
              {patientData?.marital_status?.name}
            </th>
            <th width="18%" className="tx-left">
              Ref. By
            </th>
            <th width="1%" className="tx-center">
              :
            </th>
            <th width="30%" className="tx-left">
              {patientData?.introducer_user?.f_name}{" "}
              {patientData?.introducer_user?.l_name}
            </th>
          </tr>
          <tr className="">
            <th width="20%" className="tx-left">
              Reg. Number
            </th>
            <th width="1%" className="tx-center">
              :
            </th>
            <th width="30%" className="tx-left">
              {patientData?.user?.registration_no}
            </th>
            <th width="18%" className="tx-left">
              Country
            </th>
            <th width="1%" className="tx-center">
              :
            </th>
            <th width="30%" className="tx-left">
              {patientData?.country?.name}
            </th>
          </tr>
        </table>

        <div className="d-flex gap-3 mt-2">
          <table className="table table-bordered">
            <thead>
              <tr class="text-uppercase table-active">
                <th colSpan={2} class="text-center">
                  Type of Examination{" "}
                </th>
                <th class="text-center">Results</th>
              </tr>
            </thead>
            <tbody>
              {physicalResults[0]?.map((result, key) => {
                return (
                  <tr key={key}>
                    <td class="text-left">
                      {
                        result?.investigation_test?.investigation
                          ?.investigation_category.name
                      }
                    </td>
                    <td class="text-left">
                      {result?.investigation_test?.name}
                    </td>
                    <td class="text-left">{result?.result}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className="table table-bordered">
            <thead>
              <tr class="text-uppercase table-active">
                <th colSpan={2} class="text-center">
                  Type of Examination
                </th>
                <th class="text-center" colSpan={2}>
                  Results
                </th>
              </tr>
            </thead>
            <tbody>
              {physicalResults[1]?.map((result, key) => {
                return (
                  <tr key={key}>
                    <td class="text-left">
                      {
                        result?.investigation_test?.investigation
                          ?.investigation_category.name
                      }
                    </td>
                    <td class="text-left">
                      {result?.investigation_test?.name}
                    </td>
                    <td class="text-left">{result?.result}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <table width="100%" className="table table-bordered">
          <tbody>
            <tr className="">
              <th class="text-left" width="80%" valign="top">
                Comments
                <p className="">{phyComment ? phyComment : ""}</p>
              </th>
              <th class=" text-center" width="20%" valign="bottom">
                <br />
                <br />
                <br />
                <span class="">Physician</span>
              </th>
            </tr>
          </tbody>
        </table>
        <br />
        <h6 class="text-center text-uppercase text-bold">Laboratory Report</h6>
        <br />
        <div className="d-flex gap-3">
          <table className="table table-bordered">
            <thead>
              <tr class="text-uppercase table-active">
                <th colSpan={2} class="text-center">
                  Type of Examination{" "}
                </th>
                <th class="text-center">Results</th>
              </tr>
            </thead>
            <tbody>
              {pathologyResults[0]?.map((result, key) => {
                return (
                  <tr key={key}>
                    <td class="text-left">
                      {
                        result?.investigation_test?.investigation
                          ?.investigation_category.name
                      }
                    </td>
                    <td class="text-left">
                      {result?.investigation_test?.name}
                    </td>
                    <td class="text-left">{result?.result}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className="table table-bordered">
            <thead>
              <tr class="text-uppercase table-active">
                <th colSpan={2} class="text-center">
                  Type of Examination
                </th>
                <th class="text-center" colSpan={2}>
                  Results
                </th>
              </tr>
            </thead>
            <tbody>
              {pathologyResults[1]?.map((result, key) => {
                return (
                  <tr key={key}>
                    <td class="text-left">
                      {
                        result?.investigation_test?.investigation
                          ?.investigation_category.name
                      }
                    </td>
                    <td class="text-left">
                      {result?.investigation_test?.name}
                    </td>
                    <td class="text-left">{result?.result}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <table width="100%" className="table table-bordered">
          <tbody>
            <tr className="">
              <th class="text-left" width="80%" valign="top">
                Comments
                <p className="">{pathoComment ? pathoComment : ""}</p>
              </th>
              <th class=" text-center" width="20%" valign="bottom">
                <br />
                <br />
                <br />
                <span class="">Pathologist</span>
              </th>
            </tr>
          </tbody>
        </table>
        <table width="100%" className="table table-bordered">
          <tbody>
            <tr className="">
              <th class="text-center" width="80%" valign="top">
                X-RAY FINDINGS
                <p>
                  <p className="">{radComment ? radComment : ""}</p>
                </p>
              </th>
              <th class=" text-center" width="20%" valign="bottom">
                <br />
                <br />
                <br />
                <span class="">Radiologist</span>
              </th>
            </tr>
          </tbody>
        </table>
        <table width="100%" className="table table-bordered">
          <tbody>
            <tr className="">
              <th class="text-center" width="80%" valign="top">
                FINAL COMMENTS
                <p className="">{finalComment ? finalComment : ""}</p>
              </th>
              <th class=" text-center" width="20%" valign="bottom">
                <br />
                <br />
                <br />
                <span class="">Authorised Medical Officer</span>
              </th>
            </tr>
          </tbody>
        </table>
        <div></div>
      </div>
    </div>
  );
};

export default MedicalForm;
