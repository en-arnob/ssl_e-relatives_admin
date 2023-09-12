import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreatePackage = () => {
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState(true);
  const [features, setFeatures] = useState([
    {
      id: uuidv4(),
      name: "",
      value: "",
    },
  ]);

  function incrementTableRow() {
    setFeatures((prevFeatures) => {
      return [
        ...prevFeatures,
        {
          id: uuidv4(),
          name: "",
          value: "",
        },
      ];
    });
  }

  function decrementTableRow(index) {
    setFeatures((prevFeatures) => {
      return prevFeatures.filter((_, i) => i !== index);
    });
  }

  function handleOnChange(e, index) {
    const tgName = e.target.name;
    const tgValue = e.target.value;

    setFeatures((prevFeatures) => {
      prevFeatures[index][tgName] = tgValue;
      return [...prevFeatures];
    });
  }

  async function submitHandler() {
    if (packageName !== "") {
      const obj = {
        packageName,
        price,
        duration,
        status: status ? 1 : 0,
      };
      obj.features = features[0].name !== "" ? features : [];
      // console.log(obj);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/package-management`,
          obj,
        );
        // console.log(res);
        if (res.status === 200) {
          toast.success("Package Created Successfully");
          setPackageName("");
          setPrice("");
          setDuration("");
          setFeatures([
            {
              id: uuidv4(),
              name: "",
              value: "",
            },
          ]);
        }
      } catch (error) {
        toast.success("Error Occurred");
        console.log(error);
      }
    } else {
      toast.error("Package Name is a required field!");
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="border p-3 rounded">
            <div className="card-box">
              <h6 className="mb-0 text-uppercase ">Create New Package</h6>
            </div>
            <hr />
            <div className="mb-3 row">
              <div className="row col-md-8 mb-2">
                <div className="col-md-6 col-sm-5 mb-2 fs-6 fw-semibold ">
                  Package Name <span className="text-danger ">*</span>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      placeholder="Enter package name"
                    />
                  </div>
                </div>
              </div>
              <div className="row col-md-8 mb-2">
                <div className="col-md-6 col-sm-5 fs-6 fw-semibold ">
                  Features
                </div>
                <div className="col-md-6 col-sm-5 fs-6 fw-semibold ">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="fw-light text-white">Feature Name</th>
                        <th className="fw-light text-white">Value</th>
                        <th className="fw-light text-white">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {features.map((feature, index) => (
                        <tr key={feature.id}>
                          <td>
                            <input
                              type="text"
                              name="name"
                              onChange={(e) => handleOnChange(e, index)}
                              className="form-control form-control-input"
                              placeholder="Enter feature name"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="value"
                              onChange={(e) => handleOnChange(e, index)}
                              className="form-control form-control-input"
                              placeholder="Enter feature value"
                            />
                          </td>
                          <td className="">
                            <div className="d-flex gap-3">
                              {features.length === 1 ||
                              index === features.length - 1 ? (
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={incrementTableRow}
                                >
                                  <i className="bi bi-plus-circle mx-auto"></i>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => decrementTableRow(index)}
                                >
                                  <i className="bi bi-dash-circle mx-auto"></i>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row col-md-8 mb-2">
                <div className="col-md-6 col-sm-5 mb-2 fs-6 fw-semibold">
                  Price
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      value={price}
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </div>
              <div className="row col-md-8 mb-2">
                <div className="col-md-6 col-sm-5 mb-2 fs-6 fw-semibold ">
                  Duration
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <select
                      className="form-control"
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="1 Day">1 Day</option>
                      <option value="1 Month">1 Month</option>
                      <option value="1 Year">1 Year</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row col-md-8 mb-2 mt-1">
                <div className="col-md-6 col-sm-5 mb-2 fs-6 fw-semibold ">
                  Status
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <input
                      onChange={() => setStatus(!status)}
                      className="form-check-input mt-0 me-2"
                      type="checkbox"
                      defaultChecked={status}
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Active
                    </label>
                  </div>
                </div>
              </div>

              <div className="row col-md-8 mb-2 mt-4">
                <div className="d-flex">
                  <button
                    onClick={submitHandler}
                    type="submit"
                    className="ms-auto btn btn-primary"
                    style={{
                      width: "6.25rem",
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePackage;
