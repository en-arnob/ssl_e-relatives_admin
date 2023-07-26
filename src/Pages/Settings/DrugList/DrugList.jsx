import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../Context/UserContextAPI";

const DrugList = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  const [drugs, setDrugs] = useState([]);
  const [drugGroups, setDrugGroups] = useState([]);
  const [editModalData, setEditModalData] = useState({});
  const [deleteModalData, setDeleteModalData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  // const navigate = useNavigate();
  const handlerOnEditFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const drugGroup = parseInt(form.drugGroup.value);
    const name = form.name.value;
    const info = form.info.value;

    const status = form.status.value;
    const drugStatus = status === "true" ? 1 : 0;

    const drugsData = {
      drugGroup: drugGroup,
      name: name,
      info: info,
      status: drugStatus,
    };
    console.log(drugsData);

    methodUpdateDrug(drugsData);
  };

  const methodUpdateDrug = async (drugsData) => {
    const res = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/drugs/drug/${editModalData.id}`,
      drugsData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);
    if (res.status === 200 && res?.data?.status === "success") {
      toast.success("Drug Updated successfully!!");
      setRefresh(!refresh);
    } else {
      toast.error(res?.data?.message);
      setRefresh(!refresh);
    }
  };

  const handlerOnDelete = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/drugs/drug/${deleteModalData.id}`
    );
    // console.log(res);
    if (res.status === 200) {
      toast.success("Drug Deleted successfully!!");
      setRefresh(!refresh);
    }
  };

  const handlerOnCreateFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const drugGroup = parseInt(form.drugGroup.value);
    const name = form.name.value;
    const info = form.info.value;

    const status = form.status.value;
    const drugStatus = status === "true" ? 1 : 0;

    const drugsData = {
      drugGroup: drugGroup,
      name: name,
      info: info,
      status: drugStatus,
    };
    console.log(drugsData);

    methodCreateDrug(drugsData, form);
  };

  const methodCreateDrug = async (usersData, form) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/drugs/create-drug`,
      usersData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);

    if (res.status === 201) {
      toast.success("Drug Created successfully!!");
      setRefresh(!refresh);
      form.reset();
    }
  };

  useEffect(() => {
    const fetchDrugsAPI = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/drugs/all-drugs`
      );
      const data = response.data.data;
      // console.log(data);
      setDrugs(data);
      setRefresh(refresh);
    };
    fetchDrugsAPI();

    const fetchDrugsGroupAPI = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/drug-groups/all-groups`
      );
      const data = response.data.data;
      // console.log(data);
      setDrugGroups(data);
      setRefresh(refresh);
    };
    fetchDrugsGroupAPI();
  }, [refresh]);

  console.log(drugs);
  console.log(drugGroups);

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
      key: "drug_group_id",
      text: "Group",
      className: "group",
      sortable: true,
      cell: (record) => {
        return <>{record?.drug_group?.name}</>;
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
        const filterDrugGroups = drugGroups.filter((filterDrugGroup) => {
          return filterDrugGroup.id !== record?.drug_group_id;
        });

        // console.log(filterRoles);
        return (
          <>
            {/* Edit Drug Trigger Button */}
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
                data-bs-target={`#editDrugModal-${record.id}`}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
            )}

            {/* Delete Drug Trigger Button */}
            {accessPerm(12, 3) && (
              <button
                type="button"
                onClick={() => setDeleteModalData(record)}
                className="btn btn-danger btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#deleteDrugModal-${record.id}`}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-trash"></i>
              </button>
            )}

            {/* Edit Modal Body */}

            <div
              className="modal fade"
              id={`editDrugModal-${record.id}`}
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-dialog-scrollable">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit Drug
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
                          Group <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            name="drugGroup"
                            aria-label="Default select example"
                            // required
                          >
                            <option value={record?.drug_group_id} selected>
                              {record?.drug_group?.name}
                            </option>

                            {filterDrugGroups?.map((singleDrugGroup) => (
                              <option
                                key={singleDrugGroup.id}
                                value={parseInt(singleDrugGroup?.id)}
                              >
                                {singleDrugGroup?.name}
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
                            maxlength="200"
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
              id={`deleteDrugModal-${record.id}`}
              tabIndex={-1}
              style={{ display: "none" }}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Delete Drug</h5>
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
      {/* DrugList Container */}
      <>
        <div className="card">
          <div className="card-body">
            <div className="border p-3 rounded">
              <div className="card-box">
                <h6 className="mb-0 text-uppercase">Drugs List</h6>
                <div className="col">
                  {/* Create Drug trigger modal Button */}
                  {accessPerm(12, 1) && (
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
                records={drugs}
                columns={columns}
                extraButtons={extraButtons}
              />
            </div>
          </div>
        </div>
      </>

      {/* Create Drug Modal Body */}
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
                Create Drug
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
                    Group <span className="text-danger">*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="drugGroup"
                      aria-label="Default select example"
                      required
                    >
                      {drugGroups?.map((drugGroup) => (
                        <option
                          key={drugGroup.id}
                          value={parseInt(drugGroup?.id)}
                        >
                          {drugGroup?.name}
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
                      maxlength="200"
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

export default DrugList;
