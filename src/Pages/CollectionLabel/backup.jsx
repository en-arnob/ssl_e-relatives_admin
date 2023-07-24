import React, { useCallback, useState, useEffect } from "react";
import avatar from "./dummy.jpg";
import axios from "axios";
import JsBarcode from "jsbarcode";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CollectionLabel = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const patientData = state?.record;
  console.log(patientData);
  const [patientUserData, setPatientUserData] = useState({});
  const patientId = patientData?.user.registration_no;
  const Gender = parseInt(patientData?.gender_id) === 1 ? "Male" : "Female";
  const DOB = patientData?.user.date_of_birth;
  const investigationIds = patientData?.package?.investigation_id;
  const invArray = investigationIds?.split(",");

  const introducerId = patientData?.introducer_id;
  const getIntroducerDetails = () => {
    const fetchUrl = `${process.env.REACT_APP_API_BASE_URL}/users/user/${introducerId}`;
    axios.get(fetchUrl).then((response) => {
      const pUserData = response?.data.data.userQuery;
      // console.log(pUserData);
      setPatientUserData(pUserData);
      // console.log(patientUserData);
    });
  };

  const [collectionDateTime, setCollectionDateTime] = useState("---");

  const [invData, setInvData] = useState([]);
  const investigationURL = `${process.env.REACT_APP_API_BASE_URL}/investigation`;
  const fetchInvData = () => {
    axios
      .get(investigationURL)
      .then((response) => {
        const updatedData = response?.data.data?.map((item) => {
          return {
            ...item,
            status: item.status === 1 ? "active" : "inactive",
            report_type: item.report_type === 1 ? "Text" : "Table",
          };
        });
        // console.log(updatedData);
        setInvData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  const resultArray = invArray?.map((id) => {
    const matchingObject = invData.find(
      (obj) => parseInt(obj.id) === parseInt(id)
    );
    return matchingObject ? matchingObject.investigation_category.name : null;
  });

  const specimenCats = [...new Set(resultArray)];
  // console.log(resultArray);

  // const [isOpen, setOpenState] = useState(false);
  const [selectedSpecimens, setSelectedSpecimens] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);

  // const open = useCallback(() => setOpenState(true), []);
  // const close = useCallback(() => setOpenState(false), []);

  const handleSpecimenChange = useCallback((event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setSelectedSpecimens((prevSelectedSpecimens) => {
      if (isChecked) {
        // Add the selected specimen
        return [...prevSelectedSpecimens, value];
      } else {
        // Remove the deselected specimen
        return prevSelectedSpecimens.filter((specimen) => specimen !== value);
      }
    });
  }, []);

  const handlePrint = () => {
    const currentDateTime = new Date().toLocaleString();
    setCollectionDateTime(currentDateTime);
    const newWindow = window.open(
      "about:blank",
      "newWin",
      `width=900,height=600,left=${window.screen.availWidth / 2 - 450},top=${
        window.screen.availHeight / 2 - 300
      }`
    );

    newWindow.document.open();
    newWindow.document.write(
      `<html><head><title>Print</title></head><body>${selectedSpecimens
        .map((specimen) => {
          const patientIdBarcode = document.createElement("canvas");
          JsBarcode(patientIdBarcode, String(patientId), {
            height: 20,
            margin: 0,
            displayValue: false,
          });

          const patientIdDataUrl = patientIdBarcode.toDataURL();

          return `<div class="container" style="text-align: left; font-size: 10px;">
          <div class="specimen" style="display: inline-block; text-align: center;">
            <p style="margin: 4px 0;">${currentDateTime}</p>
            <p class="gender-dob" style="margin:0;">
              <span>Gender: ${Gender}</span>
              <span>|</span>
              <span>DOB: ${DOB}</span>
            </p>
            <p style="margin: 4px 0;">${patientId}</p>
            <img src="${patientIdDataUrl}" class="barcode-img" style="display: block; margin: 0 auto; padding: 0; max-width: 100%; height: auto; max-height: 100px;" />
            <h3 style="margin: 4px 0;">${specimen}</h3>
          </div>
        </div>`;
        })
        .join("")}</body></html>`
    );
    newWindow.document.close();

    setTimeout(() => {
      newWindow.print();
    }, 1000);
  };
  const handlePrintAll = () => {
    const currentDateTime = new Date().toLocaleString();
    const newWindow = window.open(
      "about:blank",
      "newWin",
      `width=900,height=600,left=${window.screen.availWidth / 2 - 450},top=${
        window.screen.availHeight / 2 - 300
      }`
    );

    newWindow.document.open();
    newWindow.document.write(
      `<html><head><title>Print</title></head><body>${specimenCats
        .map((specimen) => {
          const patientIdBarcode = document.createElement("canvas");
          JsBarcode(patientIdBarcode, String(patientId), {
            height: 20,
            margin: 0,
            displayValue: false,
          });

          const patientIdDataUrl = patientIdBarcode.toDataURL();

          return `<div class="container" style="text-align: left; font-size: 10px;">
          <div class="specimen" style="display: inline-block; text-align: center;">
            <p style="margin: 4px 0;">${currentDateTime}</p>
            <p class="gender-dob" style="margin:0;">
              <span>Gender: ${Gender}</span>
              <span>|</span>
              <span>DOB: ${DOB}</span>
            </p>
            <p style="margin: 4px 0;">${patientId}</p>
            <img src="${patientIdDataUrl}" class="barcode-img" style="display: block; margin: 0 auto; padding: 0; max-width: 100%; height: auto; max-height: 100px;" />
            <h3 style="margin: 4px 0;">${specimen}</h3>
          </div>
        </div>`;
        })
        .join("")}</body></html>`
    );
    newWindow.document.close();

    setTimeout(() => {
      newWindow.print();
    }, 1000);
  };
  useEffect(() => {
    fetchInvData();
    getIntroducerDetails();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="border p-3 rounded">
            <div className="card-box">
              <h6 className="mb-0 text-uppercase">Collection Label </h6>
            </div>
            <hr />
            <div className="mb-3 row  ">
              <div className="col-sm-3 px-3 h-10">
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
              </div>
              <div className="col-sm-9 ">
                <div className="mb-1 row  ">
                  <h4 className="col-sm-3 col-form-label px-3  justify-content-end text-right">
                    Patient Name:
                  </h4>
                  <h4
                    className="col-sm-9  col-form-label  justify-content-start  rounded px-3"
                    style={{ backgroundColor: "#EAECEF" }}
                  >
                    {patientData?.user.f_name} {patientData?.user.l_name}
                  </h4>
                </div>
                <div className=" row mb-1  ">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className=" row  ">
                        <h4 className="col-sm-6  col-form-label px-3  justify-content-end text-right">
                          Gender :
                        </h4>
                        <h4
                          className="col-sm-6 col-form-label  justify-content-start text-left  rounded px-3"
                          style={{ backgroundColor: "#EAECEF" }}
                        >
                          {Gender}
                        </h4>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className=" row  ">
                        <h4 className="col-sm-3 col-form-label px-3  justify-content-end text-right">
                          DOB:
                        </h4>
                        <h4
                          className="col-sm-9 col-form-label  justify-content-start  rounded px-3"
                          style={{ backgroundColor: "#EAECEF" }}
                        >
                          {DOB}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-1 row  ">
                  <h4 className="col-sm-3 col-form-label px-3  justify-content-end text-right">
                    Contact No:
                  </h4>
                  <h4
                    className="col-sm-9  col-form-label  justify-content-start  rounded px-3"
                    style={{ backgroundColor: "#EAECEF" }}
                  >
                    {patientData?.user.mobile}
                  </h4>
                </div>
                <div className="mb-1 row  ">
                  <h4 className="col-sm-3 col-form-label px-3  justify-content-end text-right">
                    Introducer:
                  </h4>
                  <h4
                    className="col-sm-9  col-form-label  justify-content-start  rounded px-3"
                    style={{ backgroundColor: "#EAECEF" }}
                  >
                    {patientUserData?.f_name} {patientUserData?.l_name}
                  </h4>
                </div>
                <div className="mb-1 row  ">
                  <h4 className="col-sm-3 col-form-label px-3  justify-content-end text-right">
                    Description:
                  </h4>
                  <h4
                    className="col-sm-9  col-form-label  justify-content-start  rounded px-3"
                    style={{ backgroundColor: "#EAECEF" }}
                  >
                    {patientData?.user?.remarks}
                  </h4>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <table className="table table-striped">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th scope="col">Specimen</th>
                    <th scope="col">Collection Date and Time</th>
                  </tr>
                </thead>
                <tbody>
                  {specimenCats?.map((specimen, i) => (
                    <tr>
                      <th scope="row">
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input mt-0 me-2"
                            type="checkbox"
                            id={i}
                            value={specimen}
                            onChange={handleSpecimenChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="physicalExam"
                          >
                            {specimen}
                          </label>
                        </div>
                      </th>
                      <td>{collectionDateTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-sm-12">
              <div className="btn-group btn-group-justified">
                <button
                  onClick={handlePrint}
                  className="btn btn-primary px-5 m-2 rounded"
                  disabled={selectedSpecimens.length === 0}
                >
                  Print
                </button>
                <button
                  onClick={handlePrintAll}
                  className="btn btn-primary px-5 m-2 rounded"
                  disabled={selectedSpecimens.length !== 0}
                >
                  Print All
                </button>
                {/* <button className='btn btn-warning px-5 text-white m-2 rounded'>
                  Save
                </button> */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/patient-info");
                  }}
                  className="btn btn-secondary px-5 m-2 rounded"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionLabel;
// pull from main
