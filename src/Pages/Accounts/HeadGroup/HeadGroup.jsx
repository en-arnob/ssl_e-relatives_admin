import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../Context/UserContextAPI";

const HeadGroup = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);
  const [headGroups, setHeadGroups] = useState([]);
  const [headIdentifers, setHeadIdentifiers] = useState([]);
  const [headClassifications, setHeadClassifications] = useState([]);

  const [editModalData, setEditModalData] = useState({});
  const [deleteModalData, setDeleteModalData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  // console.log(isChecked);
  console.log(editModalData);

  const handlerOnEditFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const identifier_id = parseInt(form.identifier_id.value);
    const classification_id = parseInt(form.classification_id.value);
    const name = form.name.value;
    const info = form.info.value;

    const status = form.status.value;
    const headGroupStatus = status === "true" ? 1 : 0;

    const headGroupData = {
      identifier_id: identifier_id,
      classification_id: classification_id,
      name: name,
      info: info,
      status: headGroupStatus,
    };
    console.log(headGroupData);

    methodUpdateHeadGroup(headGroupData);
  };

  const methodUpdateHeadGroup = async (headGroupData) => {
    const res = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/head-group/${editModalData?.id}`,
      headGroupData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(res);
    if (res.status === 200 && res?.data?.status === "success") {
      toast.success("Head Group Updated successfully!!");
      setRefresh(!refresh);
    } else {
      console.log(res);
      toast.error(res?.response?.data?.message);
      setRefresh(!refresh);
    }
  };

  const handlerOnDelete = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/head-group/${deleteModalData.id}`
    );
    // console.log(res);
    if (res.status === 200) {
      toast.success("Head Group Deleted successfully!!");
      setRefresh(!refresh);
    }
  };

  const handlerOnCreateFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const identifier_id = parseInt(form.identifier_id.value);
    const classification_id = parseInt(form.classification_id.value);
    const name = form.name.value;
    const info = form.info.value;

    const status = form.status.value;
    const drugStatus = status === "true" ? 1 : 0;

    const headGroupData = {
      identifier_id: identifier_id,
      classification_id: classification_id,
      name: name,
      info: info,
      status: drugStatus,
    };
    console.log(headGroupData);

    methodCreateHeadGroup(headGroupData, form);
  };

  const methodCreateHeadGroup = async (headGroupData, form) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/head-group/create`,
      headGroupData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);

    if (res.status === 201) {
      toast.success("Head Group Created successfully!!");
      setRefresh(!refresh);
      form.reset();
    }
  };

  useEffect(() => {
    const fetchHeadIdentifierAPI = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/head-identifier/all`
      );
      const data = response.data.data;
      // console.log(data);
      setHeadIdentifiers(data);
      setRefresh(refresh);
    };
    fetchHeadIdentifierAPI();

    const fetchDrugsGroupAPI = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/head-group/all`
      );
      const data = response.data.data;
      // console.log(data);
      setHeadGroups(data);
      setRefresh(refresh);
    };
    fetchDrugsGroupAPI();
  }, [refresh]);

  const fetchHeadClassificationAPI = async (e) => {
    const identifier_id = e.target.value;
    // console.log(identifier_id);

    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/head-classification/${identifier_id}`
    );
    const data = response.data.data;
    // console.log(data);
    setHeadClassifications(data);
    setRefresh(!refresh);
  };
  // console.log(headGroups);
  // console.log(headIdentifers);
  console.log(headClassifications);

  const columns = [
    {
      key: "identifier_id",
      text: "Identifier",
      className: "Identifier",
      sortable: true,
      cell: (record) => {
        return <>{record?.head_identifier?.name}</>;
      },
    },
    {
      key: "classification_id",
      text: "Classification",
      className: "Classification",
      sortable: true,
      cell: (record) => {
        return <>{record?.head_classification?.name}</>;
      },
    },
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
        const filterHeadIdentifiers = headIdentifers.filter(
          (filterHeadIdentifier) => {
            return filterHeadIdentifier.id !== record?.identifier_id;
          }
        );
        // const filterHeadClassifications = headClassifications.filter(
        //   (filterHeadClassification) => {
        //     return filterHeadClassification.id !== record?.classification_id;
        //   }
        // );

        // console.log(filterRoles);
        return (
          <>
            {/* Edit Head-Group Trigger Button */}
            {accessPerm(29, 2) && (
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
                data-bs-target={`#editHeadGroupModal-${record?.id}`}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
            )}

            {/* Delete Head-Group Trigger Button */}
            {accessPerm(29, 3) && (
              <button
                type="button"
                onClick={() => setDeleteModalData(record)}
                className="btn btn-danger btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#deleteHeadGroupModal-${record.id}`}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-trash"></i>
              </button>
            )}

            {/* Edit Modal Body */}

            <div
              className="modal fade"
              id={`editHeadGroupModal-${record?.id}`}
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-dialog-scrollable">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit Head Group
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
                        <label className="col-sm-3 col-form-label">
                          Identifier <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            name="identifier_id"
                            onChangeCapture={(e) =>
                              fetchHeadClassificationAPI(e)
                            }
                            aria-label="Default select example"
                            // required
                          >
                            <option disabled>Choose one..</option>
                            <option value={record?.identifier_id} selected>
                              {record?.head_identifier?.name}
                            </option>

                            {filterHeadIdentifiers?.map((identifier) => (
                              <option
                                key={identifier.id}
                                value={parseInt(identifier?.id)}
                              >
                                {identifier?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label className="col-sm-3 col-form-label">
                          Classification <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            name="classification_id"
                            aria-label="Default select example"
                            // required
                          >
                            <option disabled>Choose one..</option>
                            <option value={record?.classification_id} selected>
                              {record?.head_classification?.name}
                            </option>

                            {headClassifications?.map((classification) => (
                              <option
                                key={classification.id}
                                value={parseInt(classification?.id)}
                              >
                                {classification?.name}
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
              id={`deleteHeadGroupModal-${record.id}`}
              tabIndex={-1}
              style={{ display: "none" }}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Delete Head Group</h5>
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
      {/* Head-Group Container */}

      <div className="card">
        <div className="card-body">
          <div className="border p-3 rounded">
            <div className="card-box">
              <h6 className="mb-0 text-uppercase">Head Group List</h6>
              <div className="col">
                {/* Create Head-Group trigger modal Button */}
                {accessPerm(29, 1) && (
                  <button
                    type="button"
                    onClick={() => setIsChecked(true)}
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
              records={headGroups}
              columns={columns}
              extraButtons={extraButtons}
            />
          </div>
        </div>
      </div>

      {/* Create Head-Group Modal Body */}
      <div
        className="modal fade"
        id={`createUserModal`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content  modal-dialog-scrollable ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Head Group
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
                    Identifier <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="identifier_id"
                      onChangeCapture={(e) => fetchHeadClassificationAPI(e)}
                      aria-label="Default select example"
                      required
                    >
                      <option value="" disabled selected>
                        Choose one..
                      </option>
                      {headIdentifers?.map((identifier) => (
                        <option
                          key={identifier.id}
                          value={parseInt(identifier?.id)}
                        >
                          {identifier?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">
                    Classification <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="classification_id"
                      aria-label="Default select example"
                      required
                    >
                      <option value="" disabled selected>
                        Choose one..
                      </option>
                      {headClassifications?.map((classification) => (
                        <option
                          key={classification?.id}
                          value={parseInt(classification?.id)}
                        >
                          {classification?.name}
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
                <button type="submit" className="btn btn-primary">
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

export default HeadGroup;
