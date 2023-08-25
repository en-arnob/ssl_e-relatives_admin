import React, { useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const ManagePackage = () => {
  const navigate = useNavigate();
  const [allPackage, setAllPackage] = useState([]);
  let [loading, setLoading] = useState(true);
  async function getAllPackage() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/package-management`
      );
      // console.log(res.data.data);
      if (res) {
        setAllPackage(res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deleteHandler = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/package-management/${id}`)
      .then((response) => toast.success("Package Deleted Successfully"))
      .catch((error) => toast.error("Some error occured!"));
    getAllPackage();
  };

  useEffect(() => {
    getAllPackage();
  }, []);

  const columns = [
    {
      key: "id",
      text: "Id",
      className: "id",
      align: "left",
      sortable: true,
      cell: (record) => {
        return <>{record?.id}</>;
      },
    },
    {
      key: "name",
      text: "Package Name",
      className: "name",
      sortable: true,
      cell: (record) => {
        return <>{record?.name}</>;
      },
    },
    {
      key: "package_features",
      text: "Features",
      className: "features",
      sortable: true,
      cell: (record) => {
        return (
          <>
            {record?.package_features?.map((feature) => {
              return (
                <p key={feature.id}>
                  ✅ {feature.name} : {""}
                  {feature.value}
                </p>
              );
            })}
          </>
        );
      },
    },
    {
      key: "price",
      text: "Price",
      className: "group",
      sortable: true,
      cell: (record) => {
        return (
          <>
            <span className="text-danger">৳ </span>
            {record?.price}
          </>
        );
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
        // console.log(filterRoles);
        return (
          <>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                // console.log(record);
                navigate("/dashboard/package/edit-package", {
                  state: { record: record },
                });
              }}
              style={{ marginRight: "5px" }}
            >
              <i className="fa fa-edit"></i>
            </button>

            <button
              type="button"
              // onClick={() => setDeleteModalData(record)}
              className="btn btn-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target={`#deleteServiceModal-${record.id}`}
              style={{ marginRight: "5px" }}
            >
              <i className="fa fa-trash"></i>
            </button>

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
                    <h5 className="modal-title">Delete Package</h5>
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
                      onClick={() => deleteHandler(record.id)}
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
      {/* ServiceList Container */}
      <>
        <div className="card">
          <div className="card-body">
            <div className="border p-3 rounded">
              <div className="card-box bg-primary p-2 text-white rounded">
                <h6 className="mb-0 text-uppercase">Package Management</h6>
              </div>

              <hr />
              <FadeLoader
                color="#36d7b7"
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <ReactDatatable
                config={config}
                records={allPackage}
                columns={columns}
                extraButtons={extraButtons}
              />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ManagePackage;
