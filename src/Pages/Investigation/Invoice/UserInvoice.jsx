import React, { useContext, useEffect, useState } from "react";
import "./Invoice.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContextAPI";
import JsBarcode from "jsbarcode";
import axios from "axios";

const UserInvoice = () => {
  const settingURL = `${process.env.REACT_APP_API_BASE_URL}/settings`;

  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [data, setData] = useState({});
  const [checked, setChecked] = useState(false);
  const paidAmount = state?.record?.user?.user_payment?.paid_amount;

  const patientRegisterBarcode = document.createElement("canvas");
  JsBarcode(
    patientRegisterBarcode,
    String(state?.record?.user?.registration_no)
  );

  const patientIdDataUrl = patientRegisterBarcode.toDataURL();

  function convertToAMPM(time) {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  function calculateInTotal() {
    const serviceElement = document.querySelector(".service");
    let sum = 0;

    if (serviceElement) {
      const serviceValue = parseFloat(serviceElement.textContent);
      if (!isNaN(serviceValue)) {
        sum = serviceValue + paidAmount;
      }
    }

    return sum;
  }

  function calculateOutTotal() {
    const serviceElement = document.querySelector(".paid");
    let sum = 0;

    if (serviceElement) {
      const serviceValue = parseFloat(serviceElement.textContent);
      if (!isNaN(serviceValue)) {
        sum = serviceValue + paidAmount;
      }
    }

    return sum;
  }

  const InTotal = calculateInTotal();
  const OutTotal = calculateOutTotal();

  const formatReceiveTime = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formatDeliveryTime = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const addDaysToDate = (dateString, days) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString(); // Or you can use formatDate() function to format the date
  };

  const receivingDate = state?.record?.user?.user_payment?.createdAt;
  const preparationDuration = state?.record?.package?.preparation_duration;
  const deliveryTime = state?.record?.package?.delivery_time;
  const newDate = addDaysToDate(receivingDate, preparationDuration);

  const getData = () => {
    axios
      .get(settingURL)
      .then((response) => {
        const allData = response.data.data[0];
        setData(allData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="printable-invoice">
      <div className="card invoice">
        <div className="card-body p-0">
          <div className="row1">
            <div className="invoice-img">
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL}/users/${state?.record?.user?.image}`}
                alt="patient-img"
                className="border"
              />
              <img
                src="/fingerprint.jpg"
                className="border"
                alt="patient finger print"
              />
            </div>
            <div className="invoice-desc">
              <h4>{data?.website_name}</h4>
              <p className="invoice-address">{data?.address}</p>
              <p className="invoice-contact">{data?.mobile}</p>
              <h5 className="invoice-title">Money Receipt</h5>
              <p className="invoice-person">
                Printed by:{" "}
                {!currentUser?.f_name && !currentUser?.l_name
                  ? " Loading..."
                  : currentUser?.f_name + " " + currentUser?.l_name}
              </p>
            </div>
            <div className="invoice-bar">
              <div className="barcode-1">
                <img src={patientIdDataUrl} alt="barcode1" />
              </div>
            </div>
          </div>
          <div className="row2 d-flex w-100 mt-2">
            <table className="w-100 invoice-table">
              <tbody>
                <tr>
                  <th>Tracking Number</th>
                  <td>: {state?.record?.user?.registration_no}</td>
                  <th>Date of Birth</th>
                  <td>: {state?.record?.user?.date_of_birth}</td>
                </tr>
                <tr>
                  <th>Account Number</th>
                  <td>: {state?.record?.user?.registration_no}</td>
                  <th>Contact</th>
                  <td>: {state?.record?.user?.mobile}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    :{" "}
                    {state?.record?.user?.f_name +
                      " " +
                      state?.record?.user?.l_name}
                  </td>
                  <th>Referred By</th>
                  <td>
                    :{" "}
                    {!state?.record?.introducer_user?.f_name &&
                    !state?.record?.introducer_user?.l_name
                      ? " Loading..."
                      : state?.record?.introducer_user?.f_name +
                        " " +
                        state?.record?.introducer_user?.l_name}
                  </td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>: {state?.record?.gender?.name}</td>
                  <th>Country</th>
                  <td>: {state?.record?.country?.name}</td>
                </tr>
                <tr>
                  <th>Passport Number</th>
                  <td>: {state?.record?.user?.passport_no}</td>
                  <th>Company</th>
                  <td>
                    :{" "}
                    {!state?.record?.introducer_user?.f_name &&
                    !state?.record?.introducer_user?.l_name
                      ? " Loading..."
                      : state?.record?.introducer_user?.f_name +
                        " " +
                        state?.record?.introducer_user?.l_name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row3">
            {!checked ? (
              <table>
                <thead>
                  <tr>
                    <th colSpan="3" className="text-center colspan-heading">
                      Accounts Transaction Details
                    </th>
                  </tr>
                  <tr>
                    <th className="col-sm-8">Description</th>
                    <th className="text-center">In</th>
                    <th className="text-center">Out</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paid Amount</td>
                    <td className="text-end">
                      {state?.record?.user?.user_payment?.paid_amount}
                    </td>
                    <td className="text-end paid">100</td>
                  </tr>
                  <tr>
                    <td>Service Charge</td>
                    <td className="text-end service">120</td>
                    <td className="text-end">
                      {" "}
                      {state?.record?.user?.user_payment?.paid_amount}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="text-end">{InTotal}</td>
                    <td className="text-end">{OutTotal}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th className="text-center colspan-heading">
                      Accounts Transaction Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="invoice-paid">
                    <td className="text-center">
                      <h4>Paid</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <div className="row4 mt-3 d-flex">
            <p className="col-sm-6 fw-bold">
              Receiving Date:{" "}
              {formatReceiveTime(state?.record?.user?.user_payment?.createdAt)}
            </p>
            <p className="col-sm-6 fw-bold">
              Delivery Date: {formatDeliveryTime(newDate)}{" "}
              {deliveryTime === "" ? "" : `at ${convertToAMPM(deliveryTime)}`}
            </p>
          </div>
          <div className="row5">
            <div className="invoiceComments">
              <textarea
                name="invoiceComments"
                id="invoiceComments"
                rows="7"
                cols="83"
                placeholder="Comments&#13;...&#13;"
                readOnly
                style={{ resize: "none" }}
              />
            </div>
          </div>
          <div className="row6">
            <p className="col-sm-6">
              Online Verification: www.eurekamedicalbd.com
            </p>
            <div className="col-sm-4 text-center">
              {" "}
              <hr />
              Official Seal & Signature
            </div>
          </div>
          <div className="invoice-footer">
            <div className="invoice-checkbox">
              <input
                type="checkbox"
                name="checkbox-invoice"
                id="checkbox-invoice"
                defaultChecked={checked}
                onClick={() => setChecked(!checked)}
              />
              <label htmlFor="checkbox-invoice">Print Without Amount</label>
            </div>
            <div className="invoice-btn">
              <button className="btn btn-primary" onClick={() => handlePrint()}>
                Print
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard/patient-info")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInvoice;
