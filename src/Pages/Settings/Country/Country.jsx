import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../../Context/UserContextAPI";

const countryUrl = `${process.env.REACT_APP_API_BASE_URL}/country`;

const Country = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [checked, setChecked] = useState();
  const [form, setForm] = useState({
    name: "",
    nationality: "",
    shortname: "",
    phonecode: "",
    status: checked ? "1" : "0",
  });
  const columns = [
    {
      key: "name",
      text: "Name",
      align: "left",
      sortable: true,
    },
    {
      key: "nationality",
      text: "Nationality",
      align: "left",
      sortable: true,
    },
    {
      key: "shortname",
      text: "Short Name",
      className: "info",
      align: "left",
      sortable: true,
    },
    {
      key: "phonecode",
      text: "Phone Code",
      align: "left",
      sortable: true,
    },
    {
      key: "status",
      text: "Status",
      className: "status",
      sortable: true,
    },
    {
      key: "action",
      text: "Action",
      className: "action",
      width: 100,
      align: "left",
      sortable: false,
      cell: (data) => {
        return (
          <>
            <div className="col">
              {/* Button trigger modal */}
              {accessPerm(18, 2) && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#editCountry-${data.id}`}
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    editHandler(data.id);
                  }}
                >
                  <i className="fa fa-edit"></i>
                </button>
              )}

              {/* Modal */}
              <div
                className="modal fade"
                id={`editCountry-${data.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Country</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body pb-0">
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputName"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            name="name"
                            defaultValue={data?.name}
                            onChange={(e) => onchange(e)}
                            type="text"
                            className="form-control"
                            id="inputName"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3 row">
                        <label
                          htmlFor="inputNationality"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Nationality
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            name="nationality"
                            defaultValue={data?.nationality}
                            onChange={(e) => onchange(e)}
                            type="textarea"
                            className="form-control"
                            id="inputNationality"
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputShortName"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Short Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            name="name"
                            defaultValue={data?.shortname}
                            onChange={(e) => onchange(e)}
                            type="text"
                            className="form-control"
                            id="inputShortName"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputPhoneCode"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Phone Code
                        </label>
                        <div className="col-sm-9">
                          <input
                            name="name"
                            defaultValue={data?.phonecode}
                            onChange={(e) => onchange(e)}
                            type="text"
                            className="form-control"
                            id="inputPhoneCode"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <div className="col-sm-12">
                          <div className="form-check d-flex justify-content-end align-items-center">
                            <input
                              onChange={() => handleCheck()}
                              className="form-check-input mt-0 me-2"
                              type="checkbox"
                              defaultChecked={checked}
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
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={() => updateData(data.id)}
                      >
                        Update changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              {/* Button trigger modal */}
              {accessPerm(18, 3) && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteCountry-${data.id}`}
                  style={{ marginRight: "5px" }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              )}

              {/* Activity */}
              <div
                className="modal fade"
                id={`deleteCountry-${data.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete Country</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body pb-0">
                      <div className="mb-3 row ">
                        <div className="col-sm-10">
                          <p>Are you sure you want to delete this Country?</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteData(data.id)}
                        data-bs-dismiss="modal"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target={`#deleteCountry-${data.id}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
    },
  ];
  const config = {
    page_size: 10,
    show_filter: true,
    show_length_menu: true,
    show_pagination: true,
    pagination: "advance",
    length_menu: [10, 50, 100],
    button: {
      excel: true,
      print: true,
      extra: true,
    },
  };

  const createData = () => {
    if (!form.name) {
      toast.error("Name can not be empty!");
    } else {
      axios
        .post(countryUrl, form)
        .then((response) => {
          fetchData();
          // console.log(response.data);
        })
        .catch((err) => console.log(err));
      console.log(form);
    }
  };

  const editHandler = (id) => {
    // filter data by id from data list
    // then form state update using setForm
    let obj = {};
    for (let country of data) {
      if (country.id == id) {
        obj = {
          name: country.name,
          nationality: country.nationality,
          shortname: country.shortname,
          phonecode: country.phonecode,
          status: country.status,
        };
        setForm(obj);
        if (country.status === "active" || country.status === "1") {
          setChecked(true);
          // console.log(checked);
        } else {
          setChecked(false);
          // console.log(checked);
        }
      }
    }

    // window.location.reload(false);
  };

  const updateData = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/country/${id}`, form)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => console.log(error));

    // window.location.reload(false);
  };

  const deleteData = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/country/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    fetchData();
    // window.location.reload(false);
  };

  const onchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = () => {
    setChecked(!checked);
    setForm({
      ...form,
      status: checked ? "0" : "1",
    });
  };

  const fetchData = () => {
    axios
      .get(countryUrl)
      .then((response) => {
        const updatedData = response.data.data.map((item) => {
          return {
            ...item,
            status: item.status === 1 ? "active" : "inactive",
          };
        });
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [form]);

  const extraButtons = [
    // {
    //     className:"btn btn-primary buttons-pdf",
    //     title:"Export TEst",
    //     children:[
    //         <span>
    //         <FaRegFilePdf/>
    //         </span>
    //     ],
    //     onClick:(event)=>{
    //         console.log(event);
    //     },
    // },
    // {
    //     className:"btn btn-primary buttons-pdf",
    //     title:"Export TEst",
    //     children:[
    //         <span>
    //         <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
    //         </span>
    //     ],
    //     onClick:(event)=>{
    //         console.log(event);
    //     },
    //     onDoubleClick:(event)=>{
    //         console.log("doubleClick")
    //     }
    // }
  ];
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="border p-3 rounded">
            <div className="card-box">
              <h6 className="mb-0 text-uppercase">Country List</h6>
              <div className="col">
                {/* Button trigger modal */}
                {accessPerm(18, 1) && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleVerticallycenteredActivity"
                  >
                    <i className="fa-solid fa-plus"></i> Add New
                  </button>
                )}

                {/* Modal */}
                <div
                  className="modal fade"
                  id="exampleVerticallycenteredActivity"
                  tabIndex={-1}
                  style={{ display: "none" }}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Add New Country</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body pb-0">
                        <div className="mb-3 row ">
                          <label
                            htmlFor="inputName"
                            className="col-sm-3 col-form-label d-flex justify-content-start"
                          >
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="col-sm-9">
                            <input
                              onChange={onchange}
                              name="name"
                              type="text"
                              className="form-control"
                              id="inputName"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-3 row ">
                          <label
                            htmlFor="inputNationality"
                            className="col-sm-3 col-form-label d-flex justify-content-start"
                          >
                            Nationality
                          </label>
                          <div className="col-sm-9">
                            <textarea
                              onChange={onchange}
                              name="nationality"
                              type="textarea"
                              className="form-control"
                              id="inputNationality"
                              rows={2}
                            />
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor="inputShortName"
                            className="col-sm-3 col-form-label d-flex justify-content-start"
                          >
                            Short Name
                          </label>
                          <div className="col-sm-9">
                            <input
                              onChange={onchange}
                              name="shortname"
                              type="text"
                              className="form-control"
                              id="inputShortName"
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor="inputPhoneCode"
                            className="col-sm-3 col-form-label d-flex justify-content-start"
                          >
                            Phone Code
                          </label>
                          <div className="col-sm-9">
                            <input
                              onChange={onchange}
                              name="phonecode"
                              type="text"
                              className="form-control"
                              id="inputPhoneCode"
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <div className="col-sm-12">
                            <div className="form-check d-flex justify-content-end align-items-center">
                              <input
                                onChange={() => handleCheck()}
                                className="form-check-input mt-0 me-2"
                                type="checkbox"
                                checked={checked}
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
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={createData}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <ReactDatatable
              config={config}
              records={data}
              columns={columns}
              extraButtons={extraButtons}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
