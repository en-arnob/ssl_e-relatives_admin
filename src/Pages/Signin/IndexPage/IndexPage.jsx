import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./IndexPage.scss";
import axios from "axios";

const IndexPage = () => {
  const settingURL = `${process.env.REACT_APP_API_BASE_URL}/settings`;

  const [data, setData] = useState({});
  const [vatId, setVatId] = useState(0);

  const getData = () => {
    axios
      .get(settingURL)
      .then((response) => {
        const allData = response.data.data[0];
        console.log(allData);
        setData(allData);
        setVatId(allData.vat_type);
        // formData.append('name', data.name)
        // console.log(formData)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    // setUpData({...upData, [data.key] : data.value})
  }, []);

  return (
    <div>
      <div className="wrapper">
        {/* <!--start content--> */}
        <main className="authentication-content">
          <div className="container-fluid">
            <div className="card index-card py-5">
              <div className="row g-0">
                <div className="col col-xl-5 card-container">
                  <div className="card-body p-6">
                    <div className="p-2">
                      {data?.logo_image && (
                        <div className="w-full">
                          <img
                            src={`${process.env.REACT_APP_UPLOAD_URL}/${data?.logo_image}`}
                            alt=""
                          />
                        </div>
                      )}

                      <h2 className="mt-2">{data?.website_name}</h2>
                      <p className="mt-2">{data?.address}</p>
                      <p className="contact">{data?.mobile}</p>
                    </div>
                    <div className="mt-5 d-flex">
                      {" "}
                      <Link
                        to="/signin"
                        className="text-white text-underline-none"
                      >
                        <button
                          className="btn btn-primary btn-lg px-md-5 radius-30"
                          style={{ width: "15rem" }}
                        >
                          Admin Login
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7">
                  <img
                    src="./specimen.jpg"
                    className="img-fluid p-4 h-100"
                    alt=""
                  />
                </div>
              </div>
              {/*end row*/}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IndexPage;
