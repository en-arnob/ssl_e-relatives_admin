import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { FaRegFilePdf } from 'react-icons/fa';
import { Toaster } from "react-hot-toast";
import "./ModuleListPage.scss";

const activityURL = `${process.env.REACT_APP_API_BASE_URL}/activity`;
const moduleURL = `${process.env.REACT_APP_API_BASE_URL}/module`;

const ModuleListPage = () => {
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
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="col">
              {/* Button trigger modal */}
              <button
                type="button"
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#editModule-${data?.id}`}
                style={{ marginRight: "5px" }}
                onClick={() => handlerEdit(data)}
              >
                <i className="fa fa-edit"></i>
              </button>
              {/* Modal */}
              <div
                className="modal fade"
                id={`editModule-${data?.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Module</h5>
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
                          Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            name="name"
                            defaultValue={data?.name}
                            onChange={(e) => onchange(e)}
                            type="text"
                            className="form-control"
                            id="inputName"
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
                              value={data?.status}
                              onChange={(e) => handleCheck(isChecked)}
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
                      <div className="mb-3 row">
                        <div className="row-sm-6 d-flex flex-col align-items-stretch">
                          <p className="col-sm-6 fw-bold text-start">
                            Activity List
                          </p>
                        </div>
                        <div className="col-sm-6">
                          {activity?.map((item, index) => {
                            const checkStatus = data.activities.some(
                              (activityId) => activityId.id === item.id
                            );

                            return (
                              <div
                                className="form-check d-flex justify-content-start align-items-stretch"
                                key={index}
                              >
                                <input
                                  onClick={(e) =>
                                    handleActivityCheck(
                                      data?.id,
                                      item.id,
                                      e.target.checked
                                    )
                                  }
                                  key={`input-${item.name}`}
                                  className="form-check-input mt-0 me-2"
                                  type="checkbox"
                                  id={`${data?.id}-edit-activity-${item?.id}`}
                                  defaultChecked={checkStatus}
                                  value={item?.id}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`${data?.id}-edit-activity-${item?.id}`}
                                >
                                  {item?.name}
                                </label>
                              </div>
                            );
                          })}
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
              <button
                type="button"
                className="btn btn-danger btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#deleteModule-${data?.id}`}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-trash"></i>
              </button>
              {/* Modal */}
              <div
                className="modal fade"
                id={`deleteModule-${data?.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete Module</h5>
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
                          <p>Are you sure you want to delete this module?</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteData(data?.id)}
                        data-bs-dismiss="modal"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target={`#deleteModule-${data?.id}`}
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
  const [activity, setActivity] = useState([]);
  const [module, setModule] = useState([]);

  const [isChecked, setIsChecked] = useState(true);
  const [isActivityChecked, setIsActivityChecked] = useState({});
  let activityIds = [];

  const [form, setForm] = useState({
    name: "",
    info: "",
    status: isChecked === true ? "0" : "1", //change
    activities: [],
  });

  //set status to active or inactive
  // if(data)
  // {
  //     data.map((item) => {
  //         if(item.status === 1)
  //         {
  //             item.status = "active";
  //         }
  //         else
  //         {
  //             item.status = "inactive";
  //         }
  //     });
  // }

  const createData = (e) => {
    e.preventDefault();
    axios
      .post(moduleURL, form)
      .then((response) => {
        setModule(response.data.data);
        fetchModule();
        fetchActivity();
      })
      .catch((err) => console.log(err));
  };

  const updateData = (id) => {
    const updatedForm = {
      ...form,
      name: form.name || data?.name,
      info: form.info || data?.info,
      status: isChecked ? "1" : "0",
      activities: [...form.activities],
    };

    console.log("updated form:" + updatedForm);

    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/module/${id}`, updatedForm)
      .then((response) => {
        console.log(response.data);
        fetchModule();
        fetchActivity();
      })
      .catch((error) => console.log(error));
  };

  const handlerEdit = (data) => {
    setForm({
      ...form,
      activities: [
        ...data.activities.map((i) => i.module_to_activity.activity_id),
      ],
    });

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/module/${data?.id}`)
      .then((response) => {
        console.log(response.data.data);
        fetchModule();
        fetchActivity();
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
      .delete(`${process.env.REACT_APP_API_BASE_URL}/module/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchModule();
        fetchActivity();
      })
      .catch((error) => console.log(error));

    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/module-to-activity/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    fetchModule();
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
      status: isChecked === true ? "0" : "1",
    });
  };

  const handleActivityCheck = (moduleId, activityId, checked) => {
    /* if (checked) {
      setForm({
        ...form,
        activities: [...form.activities, id],
      });

      setIsActivityChecked((prevAct) => ({
        ...prevAct,
        activityIds,
      }));

      console.log(form.activities);
    } else {
      var index = form.activities.indexOf(id);

      if (index > -1) {
        form.activities.splice(index, 1);
      }
    } */

    if (checked) {
      setForm({ ...form, activities: [...form.activities, activityId] });
    } else {
      const index = form.activities.indexOf(activityId);
      // console.log(index);
      if (index !== -1) {
        form.activities.splice(index, 1);
        setForm({ ...form, activities: [...form.activities] });
      }
    }
  };

  console.log(form);

  const fetchModule = () => {
    axios
      .get(moduleURL)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchActivity = () => {
    axios
      .get(activityURL)
      .then((response) => setActivity(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchModule();
    fetchActivity();
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
    <div className="card">
      <div className="card-body">
        <div className="border p-3 rounded">
          <div className="card-box">
            <h6 className="mb-0 text-uppercase">Module List</h6>
            <div className="col">
              {/* Button trigger modal */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleVerticallycenteredModal"
              >
                <i className="fa-solid fa-plus"></i> Add New
              </button>
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
                        <h5 className="modal-title">Add New Module</h5>
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
                              value={data?.name}
                              onChange={(e) => onchange(e)}
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
                              value={data?.info}
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
                          <div className="col-sm-12">
                            <div className="form-check d-flex justify-content-end align-items-center">
                              <input
                                value={data?.status}
                                onChange={(e) => handleCheck(isChecked)}
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
                        <div className="mb-3 row">
                          <div className="row-sm-6 d-flex flex-col align-items-stretch">
                            <p className="col-sm-6 fw-bold text-start">
                              Activity List
                            </p>
                          </div>
                          <div className="col-sm-6">
                            {activity?.map((item, index) => (
                              <div
                                className="form-check d-flex justify-content-start align-items-stretch"
                                key={index}
                              >
                                <input
                                  onClick={(e) =>
                                    handleActivityCheck(
                                      item.id,
                                      e.target.checked
                                    )
                                  }
                                  key={`input-${item.name}`}
                                  className="form-check-input mt-0 me-2"
                                  type="checkbox"
                                  id={`activity-${item?.id}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`activity-${item?.id}`}
                                >
                                  {item?.name}
                                </label>
                              </div>
                            ))}
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
  );
};

export default ModuleListPage;
