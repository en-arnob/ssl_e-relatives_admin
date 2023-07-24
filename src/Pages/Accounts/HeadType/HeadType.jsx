import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import { useEffect, useState } from "react";
import "./HeadType.scss";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContextAPI";

const HeadType = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  const headTypeURL = `${process.env.REACT_APP_API_BASE_URL}/head-type`;

  const columns = [
    {
      key: "name",
      text: "Name",
      align: "left",
      sortable: true,
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
            <div className="col">
              {/* Button trigger modal */}
              {accessPerm(30, 2) && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#editHeadType-${data.id}`}
                  style={{ marginRight: "5px" }}
                  onClick={() => handlerEdit(data)}
                >
                  <i className="fa fa-edit"></i>
                </button>
              )}

              {/* Modal */}
              <div
                className="modal fade"
                id={`editHeadType-${data.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Head Type</h5>
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
                        <div className="col-sm-12">
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
                          htmlFor="inputInfo"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Info
                        </label>
                        <div className="col-sm-12">
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
                      <div className="mb-3 row">
                        <div className="col-sm-12">
                          <div className="form-check d-flex justify-content-end align-items-center">
                            <input
                              onChange={() => handleCheck(isChecked)}
                              className="form-check-input mt-0 me-2"
                              type="checkbox"
                              defaultChecked={data?.status === 1 ? true : false}
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
              {accessPerm(30, 3) && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteHeadType-${data.id}`}
                  style={{ marginRight: "5px" }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              )}

              {/* Activity */}
              <div
                className="modal fade"
                id={`deleteHeadType-${data.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete Head Type</h5>
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
                          <p>Are you sure you want to delete this Head Type?</p>
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
                        data-bs-target={`#deleteHeadType-${data.id}`}
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
  const [isChecked, setIsChecked] = useState(true);
  const [form, setForm] = useState({
    name: "",
    info: "",
    status: isChecked ? "1" : "0",
  });

  const createData = (e) => {
    e.preventDefault();
    axios
      .post(headTypeURL, form)
      .then((response) => {
        console.log(response.data);
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
      .put(`${process.env.REACT_APP_API_BASE_URL}/head-type/${id}`, updatedForm)
      .then((response) => {
        console.log(response.data);
        setForm({
          name: "",
          info: "",
          status: isChecked ? "1" : "0",
        });
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  const handlerEdit = (data) => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/head-type/${data?.id}`)
      .then((response) => console.log(response.data.data))
      .catch((error) => console.log(error));
    if (data?.status === 1) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const deleteData = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/head-type/${id}`)
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
      status: isChecked === true ? "1" : "0",
    });
  };

  const fetchData = () => {
    axios
      .get(headTypeURL)
      .then((response) => setData(response.data.data))
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
              <h6 className="mb-0 text-uppercase">Head Type List</h6>
              <div className="col">
                {/* Button trigger modal */}
                {accessPerm(30, 1) && (
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
                    <form
                      className="modal-content"
                      onSubmit={(e) => createData(e)}
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Add New Head Type</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body pb-0">
                          <div className="mb-3 row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-3 col-form-label d-flex justify-content-start"
                            >
                              Name <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="col-sm-12">
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
                              htmlFor="inputInfo"
                              className="col-sm-3 col-form-label d-flex justify-content-start"
                            >
                              Info
                            </label>
                            <div className="col-sm-12">
                              <textarea
                                onChange={onchange}
                                name="info"
                                type="textarea"
                                className="form-control"
                                id="inputInfo"
                                rows={2}
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
                                  checked={isChecked}
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
                            type="submit"
                            className="btn btn-primary"
                            onClick={(e) => createData(e)}
                          >
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

export default HeadType;
