import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../../Context/UserContextAPI";

const instrumentsURL = `${process.env.REACT_APP_API_BASE_URL}/instruments`;

const InstrumentsPage = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [checked, setChecked] = useState();
  const [form, setForm] = useState({
    name: "",
    unit_id: "",
    cat_id: "",
    info: "",
    status: checked ? "1" : "0",
  });
  const [unitList, setUnitList] = useState([]);
  const [unitId, setUnitId] = useState(0);
  const [catList, setCatList] = useState([]);
  const [catId, setCatId] = useState(0);

  const columns = [
    {
      key: "name",
      text: "Name",
      align: "left",
      sortable: true,
    },
    {
      key: "uom",
      text: "Unit",
      align: "left",
      sortable: true,
      cell: (data) => {
        return <>{data.uom?.name}</>;
      },
    },
    {
      key: "cat",
      text: "Category",
      align: "left",
      sortable: true,
      cell: (data) => {
        return <>{data.instrument_category?.name}</>;
      },
    },
    {
      key: "info",
      text: "Info",
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
              {accessPerm(10, 2) && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#editInst-${data.id}`}
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
                id={`editInst-${data.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Instrument</h5>
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
                            value={form.name}
                            type="text"
                            className="form-control"
                            id="inputName"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputUOM"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Unit <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            value={unitId}
                            onChange={selectUnitHandler}
                            className="single-select form-select"
                          >
                            <option value={0}>Select a unit</option>
                            {unitList.map((unit) => (
                              <option value={unit.id}>{unit.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputCat"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Category <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            value={catId}
                            onChange={selectCatHandler}
                            className="single-select form-select"
                          >
                            <option value={0}>Select a category</option>
                            {catList.map((cat) => (
                              <option value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
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
              {accessPerm(10, 3) && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteInst-${data.id}`}
                  style={{ marginRight: "5px" }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              )}

              {/* Activity */}
              <div
                className="modal fade"
                id={`deleteInst-${data.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete Instrument</h5>
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
                            Are you sure you want to delete this Instrument?
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
                        data-bs-target={`#deleteInst-${data.id}`}
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
    if (!form.name && !form.unit_id && !form.cat_id) {
      toast.error("Field can not be empty!");
    } else {
      axios
        .post(instrumentsURL, form)
        .then((response) => {
          // console.log(response.data);
          fetchData();
        })
        .catch((err) => console.log(err));
      console.log(form);
    }

    // window.location.reload(false);
  };

  const editHandler = (id) => {
    // filter data by id from data list
    // then form state update using setForm
    let obj = {};
    for (let inst of data) {
      if (inst.id == id) {
        obj = {
          name: inst.name,
          unit_id: inst.uom.id,
          cat_id: inst.instrument_category?.id,
          info: inst.info,
          status: inst.status,
        };
        setForm(obj);
        setUnitId(inst.uom.id);
        setCatId(inst.instrument_category?.id);
        if (inst.status === "active" || inst.status === "1") {
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

  const selectUnitHandler = (e) => {
    setUnitId(e.target.value);
    // console.log(e.target.value);
    setForm((prev) => {
      return {
        ...prev,
        unit_id: e.target.value,
      };
    });
  };
  const selectCatHandler = (e) => {
    setCatId(e.target.value);
    // console.log(e.target.value);
    setForm((prev) => {
      return {
        ...prev,
        cat_id: e.target.value,
      };
    });
  };

  const updateData = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/instruments/${id}`, form)
      .then((response) => {
        // console.log(response.data);
        fetchData();
      })
      .catch((error) => console.log(error));

    // window.location.reload(false);
  };

  const deleteData = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/instruments/${id}`)
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

    // console.log(form);
  };

  const handleCheck = () => {
    // console.log(form);
    setChecked(!checked);
    setForm({
      ...form,
      status: checked ? "0" : "1",
    });
    console.log(form);
  };

  const fetchData = () => {
    axios
      .get(instrumentsURL)
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
  const fetchUnitList = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/instruments/unit/data`)
      .then((response) => setUnitList(response.data.data))
      .catch((err) => console.log(err));
  };
  const fetchCatList = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/instruments/category/data`)
      .then((response) => setCatList(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    fetchUnitList();
    fetchCatList();
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
              <h6 className="mb-0 text-uppercase">Instruments List</h6>
              <div className="col">
                {/* Button trigger modal */}
                {accessPerm(10, 1) && (
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
                        <h5 className="modal-title">Add New Instrument</h5>
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
                            htmlFor="inputUnit"
                            className="col-sm-3 col-form-label d-flex justify-content-start"
                          >
                            Unit <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="col-sm-9">
                            <select
                              value={unitId}
                              onChange={selectUnitHandler}
                              className="single-select form-select"
                            >
                              <option value={0}>Select a unit</option>
                              {unitList.map((unit) => (
                                <option value={unit.id}>{unit.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor="inputCat"
                            className="col-sm-3 col-form-label d-flex justify-content-start"
                          >
                            Category <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="col-sm-9">
                            <select
                              value={catId}
                              onChange={selectCatHandler}
                              className="single-select form-select"
                            >
                              <option value={0}>Select a category</option>
                              {catList.map((cat) => (
                                <option value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="mb-3 row">
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

export default InstrumentsPage;
