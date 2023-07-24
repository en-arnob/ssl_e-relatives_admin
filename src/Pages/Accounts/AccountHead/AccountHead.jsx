import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import { useEffect, useState } from "react";
import "./AccountHead.scss";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContextAPI";

const AccountHead = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  const AccountHeadURL = `${process.env.REACT_APP_API_BASE_URL}/account-head`;
  const headTypeURL = `${process.env.REACT_APP_API_BASE_URL}/head-type`;

  const columns = [
    {
      key: "head type",
      text: "Head Type",
      align: "left",
      sortable: true,
      cell: (data) => {
        return <>{data?.head_type?.headName}</>;
      },
    },
    {
      key: "code",
      text: "Code",
      align: "left",
      sortable: true,
    },
    {
      key: "name",
      text: "Name",
      align: "left",
      sortable: true,
    },
    {
      key: "initialBalance",
      text: "Initial Balance",
      align: "left",
      sortable: true,
      cell: (data) => {
        return <>{data?.initial_balance}</>;
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
            <div className="col">
              {/* Button trigger modal */}
              {accessPerm(31, 2) && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#editAccountHead-${data.id}`}
                  style={{ marginRight: "5px" }}
                  onClick={() => handlerEdit(data)}
                >
                  <i className="fa fa-edit"></i>
                </button>
              )}

              {/* Modal */}
              <div
                className="modal fade"
                id={`editAccountHead-${data.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Account Head</h5>
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
                          htmlFor="inputNationality"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Head Type <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            value={isHeadSelected}
                            onChange={(e) => handleHeadCheck(e)}
                            className="single-select form-select"
                            required
                          >
                            <option value={0}>Choose a head type</option>
                            {headType.map((item) => (
                              <option value={item?.id}>{item?.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputName"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Code <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={(e) => onchange(e)}
                            defaultValue={data?.code}
                            name="code"
                            type="text"
                            className="form-control"
                            id="inputName"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputName"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={(e) => onchange(e)}
                            defaultValue={data?.name}
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
                          htmlFor="inputName"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Initial Balance{" "}
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={(e) => onchange(e)}
                            defaultValue={data?.initial_balance}
                            name="initialBalance"
                            type="number"
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
                        <div className="col-sm-9">
                          <textarea
                            onChange={(e) => onchange(e)}
                            defaultValue={data?.info}
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
                              onChange={() => handleCheck(isChecked)}
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
              {accessPerm(31, 3) && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteAccountHead-${data.id}`}
                  style={{ marginRight: "5px" }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              )}

              {/* Activity */}
              <div
                className="modal fade"
                id={`deleteAccountHead-${data.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete Account Head</h5>
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
                          <p>
                            Are you sure you want to delete this Account Head?
                          </p>
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
                        data-bs-target={`#deleteAccountHead-${data.id}`}
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
  const [headType, setHeadType] = useState([]);

  const [isChecked, setIsChecked] = useState(true);
  const [isHeadSelected, setIsHeadSelected] = useState(0);

  const [form, setForm] = useState({
    code: "",
    name: "",
    initialBalance: "",
    info: "",
    status: isChecked ? "1" : "0",
  });

  const createData = (e) => {
    e.preventDefault();
    axios
      .post(AccountHeadURL, form)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const updateData = (id) => {
    const updatedForm = {
      ...form,
      code: form.code || data?.code,
      name: form.name || data?.name,
      initialBalance: form.initialBalance || data?.initial_balance,
      info: form.info || data?.info,
      status: isChecked ? "1" : "0",
    };

    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/account-head/${id}`,
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
      .get(`${process.env.REACT_APP_API_BASE_URL}/account-head/${data?.id}`)
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
      .delete(`${process.env.REACT_APP_API_BASE_URL}/account-head/${id}`)
      .then((response) => {
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

  const handleHeadCheck = (e) => {
    setIsHeadSelected(e.target.value);
    setForm((prev) => {
      return {
        ...prev,
        headTypeId: e.target.value,
      };
    });
  };

  const fetchData = () => {
    axios
      .get(AccountHeadURL)
      .then((response) => setData(response.data.data))
      .catch((err) => console.log(err));
  };

  const fetchHeadType = () => {
    axios
      .get(headTypeURL)
      .then((response) => setHeadType(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    fetchHeadType();
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
    <div>
      <div className="card">
        <div className="card-body">
          <div className="border p-3 rounded">
            <div className="card-box">
              <h6 className="mb-0 text-uppercase">Account Head List</h6>
              <div className="col">
                {/* Button trigger modal */}
                {accessPerm(31, 1) && (
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
                          <h5 className="modal-title">Add New Account Head</h5>
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
                              htmlFor="inputNationality"
                              className="col-sm-3 col-form-label d-flex justify-content-start"
                            >
                              Head Type <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="col-sm-9">
                              <select
                                value={isHeadSelected}
                                onChange={(e) => handleHeadCheck(e)}
                                className="single-select form-select"
                                required="required"
                              >
                                <option value="">Choose a head type</option>
                                {headType.map((item) => (
                                  <option value={item?.id}>{item?.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mb-3 row mt-3">
                            <label
                              htmlFor="inputName"
                              className="col-sm-3 col-form-label d-flex justify-content-start"
                            >
                              Code <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="col-sm-9">
                              <input
                                onChange={onchange}
                                name="code"
                                type="text"
                                className="form-control"
                                id="inputName"
                                required
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
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
                          <div className="mb-3 row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-3 col-form-label d-flex align-items-center justify-content-start"
                            >
                              Initial Balance{" "}
                            </label>
                            <div className="col-sm-9">
                              <input
                                onChange={onchange}
                                min={0}
                                name="initialBalance"
                                type="number"
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
                            <div className="col-sm-9">
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
    </div>
  );
};

export default AccountHead;
