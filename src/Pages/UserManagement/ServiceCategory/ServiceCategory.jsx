import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../Context/UserContextAPI";

const ServiceCategory = () => {
  const { accessPerm } = useContext(UserContext);

  const [services, setServices] = useState([]);
  const [serviceGroups, setServiceGroups] = useState([]);
  const [editModalData, setEditModalData] = useState({});
  const [deleteModalData, setDeleteModalData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  // constt  navigate = useNavigate();
  const handlerOnEditFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const roleID = parseInt(form.roleID.value);
    const name = form.name.value;
    const info = form.info.value;

    const status = form.status.value;
    const serviceStatus = status === "true" ? 1 : 0;

    const serviceData = {
      roleID: roleID,
      name: name,
      info: info,
      status: serviceStatus,
    };
    console.log(serviceData);

    methodUpdateService(serviceData);
  };

  const methodUpdateService = async (serviceData) => {
    const res = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/service-category/${editModalData.id}`,
      serviceData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);
    if (res.status === 200 && res?.data?.status === "success") {
      toast.success("Updated successfully!!");
      setRefresh(!refresh);
    } else {
      toast.error(res?.data?.message);
      setRefresh(!refresh);
    }
  };

  const handlerOnDelete = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/service-category/${deleteModalData.id}`
    );
    // console.log(res);
    if (res.status === 200) {
      toast.success("Deleted successfully!!");
      setRefresh(!refresh);
    }
  };

  const handlerOnCreateFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const roleID = parseInt(form.roleID.value);
    const name = form.name.value;
    const info = form.info.value;

    const status = form.status.value;
    const serviceStatus = status === "true" ? 1 : 0;

    const serviceData = {
      roleID: roleID,
      name: name,
      info: info,
      status: serviceStatus,
    };

    methodCreateService(serviceData, form);
  };

  const methodCreateService = async (usersData, form) => {
    console.log(usersData);
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/service-category`,
      usersData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);

    if (res.status === 201) {
      toast.success("Service Created successfully!!");
      setRefresh(!refresh);
      form.reset();
    }
  };

  useEffect(() => {
    //start get methode to show in table
    const fetchServicesAPI = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/service-category`
      );
      const data = response.data.data;
      console.log(data);
      setServices(data);
      setRefresh(refresh);
    };
    fetchServicesAPI();
    // end get methode
    // start get methode to show roll name in dropdown
    const fetchServicesGroupAPI = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/roles`
      );
      const data = response.data.data;
      // console.log(data);
      setServiceGroups(data);
      setRefresh(refresh);
    };
    fetchServicesGroupAPI();
    // end get methode to show roll name in dropdown
  }, [refresh]);

  const columns = [
    {
      key: "name",
      text: "Name",
      className: "name",
      align: "left",
      sortable: true,
      cell: (record) => {
        return <>{record?.name}</>;
      },
    },
    {
      key: "role_id",
      text: "Role Name",
      className: "group",
      sortable: true,
      cell: (record) => {
        return <>{record?.role?.name}</>;
      },
    },
    {
      key: "info",
      text: "Info",
      className: "info",
      sortable: true,
    },
    {
      key: "status",
      text: "Status",
      className: "status",
      sortable: true,
      cell: (record) => {
        return <>{record.status === 1 ? "Active" : "Inactive"}</>;
      },
    },
    {
      key: "action",
      text: "Action",
      className: "action",
      width: 100,
      align: "left",
      sortable: false,
      cell: (record) => {
        const filterServiceGroups = serviceGroups.filter(
          (filterServicesGroup) => {
            return filterServicesGroup.id !== record?.role_id;
          }
        );

        // console.log(filterRoles);
        return (
          <>
            {/* Edit Service Trigger Button */}
            {accessPerm(12, 2) && (
              <button
                type="button"
                onClick={() => {
                  setEditModalData(record);
                  if (record.status === 1) {
                    setIsChecked(true);
                  } else {
                    setIsChecked(false);
                  }
                }}
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#editServiceModal-${record.id}`}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
            )}

            {/* Delete Service Trigger Button */}
            {accessPerm(12, 3) && (
              <button
                type="button"
                onClick={() => setDeleteModalData(record)}
                className="btn btn-danger btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#deleteServiceModal-${record.id}`}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-trash"></i>
              </button>
            )}

            {/* Edit Modal Body */}

            <div
              className="modal fade"
              id={`editServiceModal-${record.id}`}
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-dialog-scrollable">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit Services
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form onSubmit={(e) => handlerOnEditFormSubmit(e)}>
                    <div className="modal-body ">
                      <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" required>
                          Role <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            name="roleID"
                            aria-label="Default select example"
                            // required
                          >
                            <option value={record?.role_id} selected>
                              {record?.role?.name}
                            </option>

                            {filterServiceGroups?.map((singleServiceGroup) => (
                              <option
                                key={singleServiceGroup.id}
                                value={parseInt(singleServiceGroup?.id)}
                              >
                                {singleServiceGroup?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="row mb-3 d-flex align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Name <span className="text-danger"> *</span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="name"
                            defaultValue={record?.name}
                            className="form-control"
                            // required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-3 col-form-label">Info</label>
                        <div className="col-sm-9">
                          <textarea
                            name="info"
                            defaultValue={record?.info}
                            className="form-control w-100"
                            rows="3"
                            maxLength="200"
                          ></textarea>
                        </div>
                      </div>
                      <div className="row mb-3 d-flex align-items-center justify-content-end">
                        <div className="col-sm-9">
                          <div className="col-sm-12">
                            <div
                              className="  d-flex align-items-center  justify-content-end"
                              defaultChecked={
                                record.status === 1 ? true : false
                              }
                            >
                              <input
                                className="form-check-input mt-0 me-2"
                                type="checkbox"
                                defaultChecked={
                                  record.status === 1 ? true : false
                                }
                                name="status"
                                value={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                                id={`flexCheckChecked-${record.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`flexCheckChecked-${record.id}`}
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
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Update changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Delete Modal Body */}

            <div
              className="modal fade"
              id={`deleteServiceModal-${record.id}`}
              tabIndex={-1}
              style={{ display: "none" }}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Delete Service</h5>
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
                        <p>Are you sure you want to delete?</p>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handlerOnDelete(deleteModalData)}
                      data-bs-dismiss="modal"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      No
                    </button>
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
    length_menu: [10, 20, 50, 100],
    button: {
      excel: true,
      print: true,
      extra: true,
    },
  };

  const extraButtons = [];

  return (
    <>
      {/* ServiceCategory Container */}
      <>
        <div className="card">
          <div className="card-body">
            <div className="border p-3 rounded">
              <div className="card-box">
                <h6 className="mb-0 text-uppercase">Service Category</h6>
                <div className="col">
                  {/* Create Service trigger modal Button */}
                  {accessPerm(12, 1) && (
                    <button
                      type="button"
                      onClick={() =>
                        setIsChecked((prevIsChecked) => !prevIsChecked)
                      }
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#createUserModal"
                    >
                      <i className="fa-solid fa-plus"></i> Add New
                    </button>
                  )}
                </div>
              </div>

              <hr />

              <ReactDatatable
                config={config}
                records={services}
                columns={columns}
                extraButtons={extraButtons}
              />
            </div>
          </div>
        </div>
      </>

      {/* Create Service Modal Body */}
      <div
        className="modal fade"
        id={`createUserModal`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content  modal-dialog-scrollable ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Service
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={(e) => handlerOnCreateFormSubmit(e)}>
              <div className="modal-body ">
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">
                    Role <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="roleID"
                      aria-label="Default select example"
                      required
                    >
                      {serviceGroups?.map((roleID) => (
                        <option key={roleID.id} value={parseInt(roleID?.id)}>
                          {roleID?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3 d-flex align-items-center">
                  <label className="col-sm-3 col-form-label">
                    Name <span className="text-danger"> *</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Info</label>
                  <div className="col-sm-9">
                    <textarea
                      name="info"
                      className="form-control w-100"
                      rows="3"
                      maxLength="200"
                    ></textarea>
                  </div>
                </div>
                <div className="row mb-3 d-flex align-items-center justify-content-end">
                  <div className="col-sm-9">
                    <div className="col-sm-12">
                      <div className=" d-flex align-items-center  justify-content-end">
                        <input
                          className="form-check-input mt-0 me-2"
                          type="checkbox"
                          checked={isChecked}
                          name="status"
                          value={isChecked}
                          onChange={() => setIsChecked(!isChecked)}
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCategory;
