import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContextAPI";

const investigationURL = `${process.env.REACT_APP_API_BASE_URL}/investigation`;

const InvestigationManagement = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const columns = [
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
      key: "detailed_name",
      text: "Detailed Name",
      //   className: "text-sm-left",
      sortable: true,
    },
    {
      key: "report_title",
      text: "Report Title",
      align: "left",
      sortable: true,
    },
    {
      key: "report_sub_title",
      text: "Report Sub Title",
      sortable: true,
      align: "left",
    },
    {
      key: "price",
      text: "Price",
      sortable: true,
      align: "left",
    },
    {
      key: "discounted_price",
      text: "Discounted Price",
      sortable: true,
      align: "left",
    },
    {
      key: "vat_rate",
      text: "VAT %",
      sortable: true,
      align: "left",
    },
    {
      key: "commission_rate",
      text: "Commission Rate %",
      sortable: true,
      align: "left",
    },
    {
      key: "preparation_duration",
      text: "Preparation Duration (hr)",
      sortable: true,
      align: "left",
    },
    {
      key: "delivery_time",
      text: "Delivery Time",
      sortable: true,
      align: "left",
    },
    {
      key: "room_id",
      text: "Room",
      sortable: true,
      align: "left",
      cell: (data) => {
        return <>{data.room?.name}</>;
      },
    },
    {
      key: "investigation_group_id",
      text: "Group",
      sortable: true,
      align: "left",
      cell: (data) => {
        return <>{data.investigation_group?.name}</>;
      },
    },
    {
      key: "investigation_category_id",
      text: "Category",
      sortable: true,
      align: "left",
      cell: (data) => {
        return <>{data.investigation_category?.name}</>;
      },
    },
    {
      key: "report_type",
      text: "Report Type",
      sortable: true,
      align: "left",
    },
    // {
    //   key: "instrument",
    //   text: "Instrument",
    //   sortable: true,
    //   align: "left",
    // },
    {
      key: "info",
      text: "Info",
      sortable: true,
      align: "left",
    },
    {
      key: "status",
      text: "Status",
      sortable: true,
      align: "left",
    },
    {
      key: "action",
      text: "Action",
      className: "action",
      width: 100,
      align: "left",
      sortable: false,
      cell: (record) => {
        return (
          <>
            {accessPerm(23, 2) && (
              <button
                className="btn btn-primary btn-sm"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/dashboard/investigation/update", {
                    state: {
                      id: record.id,
                    },
                  });
                }}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
            )}

            {/* <button
              className="btn btn-danger btn-sm"
              onClick={() => console.log(record.id)}
            >
              <i className="fa fa-trash"></i>
            </button> */}
            <div className="col">
              {/* Button trigger modal */}
              {accessPerm(23, 3) && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteInv-${record.id}`}
                  style={{ marginRight: "5px" }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              )}

              {/* Activity */}
              <div
                className="modal fade"
                id={`deleteInv-${record.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete Investigation</h5>
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
                            Are you sure you want to delete this Investigation?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteData(record.id)}
                        data-bs-dismiss="modal"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target={`#deleteInv-${data.id}`}
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
  const editRecords = () => {
    console.log("Edit Record");
  };
  const deleteRecords = () => {
    console.log("Delete Record");
  };
  const fetchData = () => {
    axios
      .get(investigationURL)
      .then((response) => {
        const updatedData = response.data.data.map((item) => {
          return {
            ...item,
            status: item.status === 1 ? "active" : "inactive",
            report_type: item.report_type === 1 ? "Text" : "Table",
          };
        });
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };
  const deleteData = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/investigation/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    fetchData();
    // window.location.reload(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="border p-3 rounded">
            <div className="card-box">
              <h6 className="mb-0 text-uppercase">Investigation Management</h6>
              <div className="col">
                {accessPerm(23, 1) && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/dashboard/investigation/add-new");
                    }}
                    type="button"
                    className="btn btn-primary"
                  >
                    <i className="fa-solid fa-plus"></i> Add New
                  </button>
                )}
              </div>
            </div>

            <hr />

            <ReactDatatable
              config={config}
              records={data}
              columns={columns}
              extraButtons={extraButtons}
              tHeadClassName="font-weight-light text-justify text-center"

              //   customStyles={tableCustomStyles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestigationManagement;
