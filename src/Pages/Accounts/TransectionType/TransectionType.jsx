import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { FaRegFilePdf } from 'react-icons/fa';
import { toast } from "react-hot-toast";
import { UserContext } from "../../../Context/UserContextAPI";

const TransectionType = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  const [transectionTypes, setTransectionTypes] = useState([]);
  const [editModalData, setEditModalData] = useState({});
  const [deleteModalData, setDeleteModalData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  // console.log(isRequired);
  console.log(isChecked);

  const handlerOnEditFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const info = form.info.value;
    const status = form.status.value;
    const transectionTypeStatus = status === "true" ? 1 : 0;

    console.log(status);
    console.log(transectionTypeStatus);

    const transectionTypeData = {
      name: name,
      info: info,
      status: transectionTypeStatus,
    };
    console.log(transectionTypeData);

    methodUpdateTransectionType(transectionTypeData);
  };

  const methodUpdateTransectionType = async (transectionTypeData) => {
    const res = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/transection-type/${editModalData.id}`,
      transectionTypeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);
    if (res.status === 200 && res?.data?.status === "success") {
      toast.success("Transection Type Updated successfully!!");
      setRefresh(!refresh);
    } else {
      toast.error(res?.data?.message);
      setRefresh(!refresh);
    }
  };

  const handlerOnDelete = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/transection-type/${deleteModalData.id}`
    );
    // console.log(res);
    if (res.status === 200) {
      toast.success("Transection Type Deleted successfully!!");
      setRefresh(!refresh);
    }
  };

  const handlerOnCreateFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const info = form.info.value;
    const status = form.status.value;
    const transectionTypeStatus = status === "true" ? 1 : 0;

    console.log(status);
    console.log(transectionTypeStatus);

    const transectionTypeData = {
      name: name,
      info: info,
      status: transectionTypeStatus,
    };
    console.log(transectionTypeData);

    methodCreateTransectionType(transectionTypeData, form);
  };

  const methodCreateTransectionType = async (transectionTypeData, form) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/transection-type/create`,
      transectionTypeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);
    if (res.status === 201) {
      toast.success("Transection Type Created successfully!!");
      form.reset();
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transection-type/all`
      );
      const data = response.data.data;
      setTransectionTypes(data);
      setRefresh(refresh);
    };
    fetchAPI();
  }, [refresh]);

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
        // console.log(record);
        return (
          <>
            {/* Edit Modal Trigger Button */}
            {accessPerm(26, 2) && (
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
                data-bs-target={`#editTransectionTypeModal-${record.id}`}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
            )}

            {/* Delete Modal Trigger Button */}
            {accessPerm(26, 3) && (
              <button
                type="button"
                onClick={() => setDeleteModalData(record)}
                className="btn btn-danger btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#deleteTransectionTypeModal-${record.id}`}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-trash"></i>
              </button>
            )}

            {/* Edit Modal Body */}

            <div
              className="modal fade"
              id={`editTransectionTypeModal-${record.id}`}
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit Transection Type
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form onSubmit={(e) => handlerOnEditFormSubmit(e)}>
                    <div className="modal-body">
                      <div className="row mb-3 d-flex align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="name"
                            defaultValue={record.name}
                            className="form-control"
                            // required
                          />
                        </div>
                      </div>
                      <div className="row mb-3 ">
                        <label className="col-sm-3 col-form-label">Info</label>
                        <div className="col-sm-9">
                          <textarea
                            name="info"
                            defaultValue={record.info}
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
              id={`deleteTransectionTypeModal-${record.id}`}
              tabIndex={-1}
              style={{ display: "none" }}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Delete Transection Type</h5>
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
    length_menu: [10, 50, 100],
    button: {
      excel: true,
      print: true,
      extra: true,
    },
  };

  const extraButtons = [
    // {
    //   className: 'btn btn-primary buttons-pdf',
    //   title: 'Export TEst',
    //   children: [
    //     <span>
    //       {/* <FaRegFilePdf /> */}
    //     </span>,
    //   ],
    //   onClick: (event) => {
    //     console.log(event);
    //   },
    // },
    // {
    //   className: 'btn btn-primary buttons-pdf',
    //   title: 'Export TEst',
    //   children: [
    //     <span>
    //       <i
    //         className='glyphicon glyphicon-print fa fa-print'
    //         aria-hidden='true'
    //       ></i>
    //     </span>,
    //   ],
    //   onClick: (event) => {
    //     console.log(event);
    //   },
    //   onDoubleClick: (event) => {
    //     console.log('doubleClick');
    //   },
    // },
  ];

  return (
    <>
      <>
        <div className="card">
          <div className="card-body">
            <div className="border p-3 rounded">
              <div className="card-box">
                <h6 className="mb-0 text-uppercase">Transection Type List</h6>
                <div className="col">
                  {/* Create Role trigger modal Button */}

                  {accessPerm(26, 1) && (
                    <button
                      type="button"
                      onClick={() => setIsChecked(true)}
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#createTransectionTypeModal"
                    >
                      <i className="fa-solid fa-plus"></i> Add New
                    </button>
                  )}
                </div>
              </div>

              <hr />

              <ReactDatatable
                config={config}
                records={transectionTypes}
                columns={columns}
                extraButtons={extraButtons}
              />
            </div>
          </div>
        </div>
      </>

      {/* Create Modal Body */}
      <div
        className="modal fade"
        id="createTransectionTypeModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Transection Type
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={(e) => handlerOnCreateFormSubmit(e)}>
              <div className="modal-body">
                <div className="row mb-3 d-flex align-items-center">
                  <label className="col-sm-3 col-form-label">
                    Name <span className="text-danger">*</span>
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
                  // data-bs-dismiss={` ${isRequired === false && 'modal'} `}
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

export default TransectionType;
