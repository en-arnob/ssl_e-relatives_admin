import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "./StaticContentPage.scss";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContextAPI";

const staticURL = `${process.env.REACT_APP_API_BASE_URL}/static-contents`;
const staticGroupURL = `${process.env.REACT_APP_API_BASE_URL}/static-content-groups`;

const StaticContentPage = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  const columns = [
    {
      key: "name",
      text: "Name",
      align: "left",
      sortable: true,
    },
    {
      key: "group",
      text: "Group",
      align: "left",
      sortable: true,
      cell: (data) => {
        return <p>{data?.static_content_group?.groupName}</p>;
      },
    },
    {
      key: "info",
      text: "Info",
      className: "info",
      align: "left",
      sortable: true,
    },
    {
      key: "status",
      text: "Status",
      className: "status",
      sortable: true,
      cell: (data) => {
        return <>{data?.status === 1 ? "active" : "inactive"}</>;
      },
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
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="col">
              {/* Button trigger modal */}
              {accessPerm(8, 2) && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#editStatic-${data.id}`}
                  style={{ marginRight: "5px" }}
                  onClick={() => handlerEdit(data)}
                >
                  <i className="fa fa-edit"></i>
                </button>
              )}

              {/* Modal */}
              <div
                className="modal fade"
                id={`editStatic-${data.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Content</h5>
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
                          Group List <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            value={isGroupSelected}
                            onChange={(e) => handleGroupCheck(e)}
                            className="single-select form-select"
                            required
                          >
                            <option value={0}>Select a group</option>
                            {groupContent?.map((item) => (
                              <option value={item?.id} key={item?.id}>
                                {item?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputInfo"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Info
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            name="info"
                            defaultValue={data?.info}
                            onChange={(e) => onchange(e)}
                            type="textarea"
                            className="form-control"
                            id="inputInfo"
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <div className="col-sm-12">
                          <div className="form-check d-flex justify-content-end align-items-center">
                            <input
                              onChange={() => handleCheck(isChecked)}
                              checked={isChecked}
                              className="form-check-input mt-0 me-2"
                              type="checkbox"
                              value=""
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
                        onClick={() => updateData(data?.id)}
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
              {accessPerm(8, 3) && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteStatic-${data.id}`}
                  style={{ marginRight: "5px" }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              )}

              {/* Modal */}
              <div
                className="modal fade"
                id={`deleteStatic-${data.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete Content</h5>
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
                          <p>Are you sure you want to delete this content?</p>
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
                        data-bs-target={`#deleteStatic-${data.id}`}
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

  const [data, setData] = useState([]);
  const [content, setContent] = useState([]);
  const [groupContent, setGroupContent] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [isGroupSelected, setIsGroupSelected] = useState(0);

  const [form, setForm] = useState({
    name: "",
    info: "",
    status: isChecked ? "1" : "0",
  });

  const createData = (e) => {
    e.preventDefault();
    axios
      .post(staticURL, form)
      .then((response) => {
        setContent(response.data.data);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const updateData = (id) => {
    const updatedForm = {
      ...form,
      name: form.name || data?.name,
      info: form.info || data?.info,
      status: isChecked ? "1" : "0",
    };

    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/static-contents/${id}`,
        updatedForm
      )
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  const handlerEdit = (data) => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/static-contents/${data?.id}`)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => console.log(error));
    if (data?.status === 1) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const deleteData = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/static-contents/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  const onchange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
    setForm({
      ...form,
      status: isChecked === true ? "1" : "0", // there was a change here from 0 : 1 to 1 : 0
    });
  };

  // const handleGroupCheck = (id) => {

  //     console.log(id);
  //     setForm((prev) => {
  //         return {
  //           ...prev,
  //           groupId: id
  //         };
  //     })

  // }

  const handleGroupCheck = (e) => {
    setIsGroupSelected(e.target.value);
    setForm((prev) => {
      return {
        ...prev,
        groupId: e.target.value,
      };
    });
  };

  const fetchData = () => {
    axios
      .get(staticURL)
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchGroupContent = () => {
    axios
      .get(staticGroupURL)
      .then((response) => setGroupContent(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    fetchGroupContent();
  }, [form]);

  console.log(form);

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
              <h6 className="mb-0 text-uppercase">Static Contents</h6>
              <div className="col">
                {/* Button trigger modal */}
                {accessPerm(8, 1) && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleVerticallycenteredModal"
                  >
                    <i className="fa-solid fa-plus"></i> Add New
                  </button>
                )}

                {/* Modal */}
                <div
                  className="modal fade"
                  id="exampleVerticallycenteredModal"
                  tabIndex={-1}
                  style={{ display: "none" }}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <form
                      className="modal-content"
                      onSubmit={(e) => createData(e)}
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Add New Content</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body pb-0">
                          <div className="mb-3 row">
                            <div className="d-flex"></div>
                            <label
                              htmlFor="inputName"
                              className="col-sm-3 col-form-label d-flex justify-content-start"
                            >
                              Name <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="col-sm-9">
                              <input
                                onChange={(e) => onchange(e)}
                                name="name"
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
                              Group List <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="col-sm-9">
                              <select
                                value={isGroupSelected}
                                onChange={(e) => handleGroupCheck(e)}
                                className="single-select form-select"
                                required="required"
                              >
                                <option value="">Select a group</option>
                                {groupContent.map((item) => (
                                  <option value={item?.id} key={item?.id}>
                                    {item?.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mb-3 row mt-3">
                            <label
                              htmlFor="inputInfo"
                              className="col-sm-3 col-form-label d-flex justify-content-start"
                            >
                              Info
                            </label>
                            <div className="col-sm-9">
                              <textarea
                                onChange={(e) => onchange(e)}
                                name="info"
                                type="textarea"
                                className="form-control"
                                id="inputInfo"
                                rows={2}
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <div className="row-sm-6 d-flex align-items-stretch">
                              <div className="col-sm-12">
                                <div className="form-check d-flex justify-content-end align-items-center">
                                  <input
                                    onChange={() => handleCheck(isChecked)}
                                    checked={isChecked}
                                    className="form-check-input mt-0 me-2"
                                    type="checkbox"
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
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </div>
                    </form>
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

export default StaticContentPage;
