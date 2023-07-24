import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Package.scss";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContextAPI";

const Package = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  const packageURL = `${process.env.REACT_APP_API_BASE_URL}/package`;
  const investigationURL = `${process.env.REACT_APP_API_BASE_URL}/investigation`;
  console.log(packageURL);

  const columns = [
    {
      key: "code",
      text: "Code",
      align: "left",
      sortable: true,
    },
    {
      key: "price",
      text: "Price",
      className: "price",
      align: "left",
      sortable: true,
    },
    {
      key: "discountedPrice",
      text: "Discounted Price",
      className: "discountedPrice",
      sortable: true,
      align: "left",
      cell: (data) => {
        return <>{data?.discounted_price}</>;
      },
    },
    {
      key: "vat",
      text: "VAT (%)",
      className: "vat",
      align: "left",
      sortable: true,
      cell: (data) => {
        return <>{data?.vat_rate}</>;
      },
    },
    {
      key: "incentives",
      text: "Incentives (%)",
      className: "incentives",
      align: "left",
      sortable: true,
      cell: (data) => {
        return <>{data?.commission_rate}</>;
      },
    },
    {
      key: "preparationDuration",
      text: "Preparation Duration (hr)",
      className: "preparationDuration",
      align: "left",
      sortable: true,
      cell: (data) => {
        return <>{data?.preparation_duration}</>;
      },
    },
    {
      key: "deliveryTime",
      text: "Delivery Time",
      className: "deliveryTime",
      align: "left",
      sortable: true,
      cell: (data) => {
        return <>{data?.delivery_time}</>;
      },
    },
    {
      key: "investigations",
      text: "Investigations",
      className: "investigations",
      align: "left",
      sortable: true,
      cell: (data) => {
        return <>{data?.investigationNames}</>;
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
      align: "left",
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
              {accessPerm(25, 2) && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#editPackage-${data?.id}`}
                  style={{ marginRight: "5px" }}
                  onClick={() => handlerEdit(data)}
                >
                  <i className="fa fa-edit"></i>
                </button>
              )}

              {/* Modal */}
              <div
                className="modal fade"
                id={`editPackage-${data?.id}`}
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <form
                    className="modal-content"
                    onSubmit={(e) => updateData(e, data?.id)}
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Edit Package</h5>
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
                            htmlFor={`inputCode-${data?.id}`}
                            className="col-sm-4 col-form-label d-flex justify-content-start"
                          >
                            Code <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="col-sm-8">
                            <input
                              onChange={(e) => onchange(e)}
                              name="code"
                              type="text"
                              className="form-control"
                              id={`inputCode-${data?.id}`}
                              defaultValue={data?.code}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor={`inputName-${data?.id}`}
                            className="col-sm-4 col-form-label d-flex justify-content-start"
                          >
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="col-sm-8">
                            <input
                              onChange={(e) => onchange(e)}
                              name="name"
                              type="text"
                              className="form-control"
                              id={`inputName-${data?.id}`}
                              defaultValue={data?.name}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor={`inputPrice-${data?.id}`}
                            className="col-sm-4 col-form-label d-flex justify-content-start"
                          >
                            Price <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="col-sm-8">
                            <input
                              onChange={(e) => onchange(e)}
                              name="price"
                              type="number"
                              className="form-control"
                              id={`inputPrice-${data?.id}`}
                              defaultValue={data?.price}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor={`inputDiscountPrice-${data?.id}`}
                            className="col-sm-4 col-form-label d-flex justify-content-start"
                          >
                            Discounted Price
                          </label>
                          <div className="col-sm-8">
                            <input
                              onChange={(e) => onchange(e)}
                              defaultValue={data?.discounted_price}
                              name="discountPrice"
                              type="number"
                              className="form-control"
                              id={`inputDiscountPrice-${data?.id}`}
                            />
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor={`vat-${data?.id}`}
                            className="col-sm-4 col-form-label d-flex justify-content-start"
                          >
                            VAT (%)
                          </label>
                          <div className="col-sm-8">
                            <input
                              onChange={(e) => onchange(e)}
                              defaultValue={data?.vat_rate}
                              name="vat"
                              type="number"
                              className="form-control"
                              id={`vat-${data?.id}`}
                            />
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor={`incentive-${data?.id}`}
                            className="col-sm-4 col-form-label d-flex justify-content-start"
                          >
                            Incentives (%)
                          </label>
                          <div className="col-sm-8">
                            <input
                              defaultValue={data?.commission_rate}
                              onChange={(e) => onchange(e)}
                              name="incentive"
                              type="number"
                              className="form-control"
                              id={`incentive-${data?.id}`}
                            />
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor={`inputPreparationDuration-${data?.id}`}
                            className="col-sm-4 col-form-label d-flex justify-content-start"
                          >
                            Preparation Duration (hr)
                          </label>
                          <div className="col-sm-8">
                            <input
                              onChange={(e) => onchange(e)}
                              defaultValue={data?.preparation_duration}
                              name="preparationDuration"
                              type="number"
                              className="form-control"
                              id={`inputPreparationDuration-${data?.id}`}
                            />
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor={`inputDeliveryTime-${data?.id}`}
                            className="col-sm-4 col-form-label d-flex justify-content-start"
                          >
                            Delivery Time
                          </label>
                          <div className="col-sm-8">
                            <input
                              onChange={(e) => onchange(e)}
                              defaultValue={data?.delivery_time}
                              name="deliveryTime"
                              type="time"
                              className="form-control"
                              id={`inputDeliveryTime-${data?.id}`}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="mb-3 d-flex">
                            <label className="col-sm-4 col-form-label d-flex justify-content-start">
                              Investigations{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="col-sm-8">
                              <Select
                                options={transformedInvestigationOptions}
                                placeholder="Select Investigations"
                                defaultValue={transformedInvestigationOptions.filter(
                                  (option) =>
                                    data?.investigation_id.includes(option.id)
                                )}
                                onChange={(e) => handleSelect(e)}
                                isSearchable={true}
                                isMulti
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-3 row ">
                          <label
                            htmlFor={`inputInfo-${data?.id}`}
                            className="col-sm-4 col-form-label d-flex justify-content-start"
                          >
                            Info
                          </label>
                          <div className="col-sm-8">
                            <textarea
                              onChange={(e) => onchange(e)}
                              defaultValue={data?.info}
                              name="info"
                              type="textarea"
                              className="form-control"
                              id={`inputInfo-${data?.id}`}
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
                                id={`flexCheckChecked-${data?.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`flexCheckChecked-${data?.id}`}
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
                          data-bs-dismiss="modal"
                        >
                          Update changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col">
              {/* Button trigger modal */}
              {accessPerm(25, 3) && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target={`#deletePackage-${data?.id}`}
                  style={{ marginRight: "5px" }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              )}

              {/* Package */}
              <div
                className="modal fade"
                id={`deletePackage-${data?.id}`}
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
                          <p>Are you sure you want to delete this package?</p>
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
                        data-bs-target={`#deletePackage-${data?.id}`}
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
  const [investigation, setInvestigation] = useState([]);
  const [investigationSelected, setInvestigationSelected] = useState([]);

  const [form, setForm] = useState({
    code: "",
    name: "",
    price: "",
    discountedPrice: "",
    vat: "",
    incentive: "",
    preparationDuration: "",
    deliveryTime: "",
    investigations: [],
    info: "",
    status: isChecked === true ? "0" : "1",
  });

  const createData = (e) => {
    e.preventDefault();
    console.log(form);
    axios
      .post(packageURL, form)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const updateData = (e, id) => {
    e.preventDefault();
    const updatedForm = {
      ...form,
      code: form.code || data?.code,
      name: form.name || data?.name,
      price: form.price || data?.price,
      discountedPrice: form.discountedPrice || data?.discounted_price,
      vat: form.vat || data?.vat_rate,
      incentive: form.incentive || data?.commission_rate,
      preparationDuration:
        form.preparationDuration || data?.preparation_duration,
      deliveryTime: form.deliveryTime || data?.delivery_time,
      investigations: form.investigations || data?.investigation_id,
      info: form.info || data?.info,
      status: isChecked ? "1" : "0",
    };

    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/package/${id}`, updatedForm)
      .then((response) => {
        console.log(response.data);
        console.log(updatedForm);
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  const handlerEdit = (data) => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/package/${data?.id}`)
      .then((response) => console.log(response.data.data))
      .catch((error) => console.log(error));
    if (data?.status === 1) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    // console.log("this" + data?.investigation_id);
    // handleSelect(data?.investigation_id);
  };

  const deleteData = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/package/${id}`)
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
    setForm((prevForm) => ({
      ...prevForm,
      status: isChecked === true ? "0" : "1",
    }));
  };

  const fetchData = () => {
    axios
      .get(packageURL)
      .then((response) => setData(response.data.data))
      .catch((err) => console.log(err));
  };

  // const handleSelect = (selectedOptions) => {
  //   console.log(selectedOptions);
  //   const selectedInvestigationIds = selectedOptions.map(
  //     (option) => option.id
  //   );
  //   const selectedInvestigations = investigation.filter((item) =>
  //           selectedInvestigationIds.includes(item.id)
  //   );

  //   const investigationIds = selectedInvestigations.map((x) => x.id);
  //   console.log(investigationIds);
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     investigations: investigationIds,
  //   }));

  // };

  const handleSelect = (selectedOptions) => {
    const selectedInvestigationIds = selectedOptions.map((option) => option.id);
    const selectedInvestigations = investigation.filter((item) =>
      selectedInvestigationIds.includes(item.id)
    );

    const investigationIds = selectedInvestigations.map((x) => x.id);
    setForm((prevForm) => ({
      ...prevForm,
      investigations: investigationIds,
    }));

    setInvestigationSelected(selectedOptions);
  };

  //react select package settings
  const transformedInvestigationOptions = investigation.map((item) => ({
    value: item.id,
    id: item.id,
    label: item.name,
  }));

  const fetchInvestigation = () => {
    axios
      .get(investigationURL)
      .then((response) => setInvestigation(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    fetchInvestigation();
    console.log(form);
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
              <h6 className="mb-0 text-uppercase">Package List</h6>
              <div className="col">
                {/* Button trigger modal */}
                {accessPerm(25, 1) && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleVerticallycenteredPackage"
                  >
                    <i className="fa-solid fa-plus"></i> Add New
                  </button>
                )}

                {/* Modal */}
                <div
                  className="modal fade"
                  id="exampleVerticallycenteredPackage"
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
                          <h5 className="modal-title">Add New Package</h5>
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
                              // htmlFor="inputCode"
                              className="col-sm-4 col-form-label d-flex justify-content-start"
                            >
                              Code <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="col-sm-8">
                              <input
                                onChange={onchange}
                                name="code"
                                type="text"
                                className="form-control"
                                // id="inputCode"
                                required
                              />
                            </div>
                          </div>
                          <div className="mb-3 row ">
                            <label
                              htmlFor="inputName"
                              className="col-sm-4 col-form-label d-flex justify-content-start"
                            >
                              Name <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="col-sm-8">
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
                              htmlFor="inputPrice"
                              className="col-sm-4 col-form-label d-flex justify-content-start"
                            >
                              Price <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="col-sm-8">
                              <input
                                onChange={onchange}
                                name="price"
                                type="number"
                                className="form-control"
                                id="inputPrice"
                                required
                              />
                            </div>
                          </div>
                          <div className="mb-3 row ">
                            <label
                              htmlFor="inputDiscountPrice"
                              className="col-sm-4 col-form-label d-flex justify-content-start"
                            >
                              Discounted Price
                            </label>
                            <div className="col-sm-8">
                              <input
                                onChange={onchange}
                                name="discountedPrice"
                                type="number"
                                className="form-control"
                                id="inputDiscountPrice"
                              />
                            </div>
                          </div>
                          <div className="mb-3 row ">
                            <label
                              htmlFor="inputVat"
                              className="col-sm-4 col-form-label d-flex justify-content-start"
                            >
                              VAT (%)
                            </label>
                            <div className="col-sm-8">
                              <input
                                onChange={onchange}
                                name="vat"
                                type="number"
                                className="form-control"
                                id="inputVat"
                              />
                            </div>
                          </div>
                          <div className="mb-3 row ">
                            <label
                              htmlFor="inputIncentive"
                              className="col-sm-4 col-form-label d-flex justify-content-start"
                            >
                              Incentives (%)
                            </label>
                            <div className="col-sm-8">
                              <input
                                onChange={onchange}
                                name="incentive"
                                type="number"
                                className="form-control"
                                id="inputIncentive"
                              />
                            </div>
                          </div>
                          <div className="mb-3 row ">
                            <label
                              htmlFor="inputPreparationDuration"
                              className="col-sm-4 col-form-label d-flex justify-content-start"
                            >
                              Preparation Duration (hr)
                            </label>
                            <div className="col-sm-8">
                              <input
                                onChange={onchange}
                                name="preparationDuration"
                                type="number"
                                className="form-control"
                                id="inputPreparationDuration"
                              />
                            </div>
                          </div>
                          <div className="mb-3 row ">
                            <label
                              htmlFor="inputDeliveryTime"
                              className="col-sm-4 col-form-label d-flex justify-content-start"
                            >
                              Delivery Time
                            </label>
                            <div className="col-sm-8">
                              <input
                                onChange={onchange}
                                name="deliveryTime"
                                type="time"
                                className="form-control"
                                id="inputDeliveryTime"
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <div className="d-flex">
                              <label
                                htmlFor="inputInvestigation"
                                className="col-sm-4 col-form-label d-flex justify-content-start"
                              >
                                Investigations{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <div className="col-sm-8">
                                <Select
                                  options={transformedInvestigationOptions}
                                  placeholder="Select Investigations"
                                  defaultValue={investigationSelected}
                                  onChange={(e) => handleSelect(e)}
                                  isSearchable={true}
                                  isMulti
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3 row ">
                            <label
                              htmlFor="inputInfo"
                              className="col-sm-4 col-form-label d-flex justify-content-start"
                            >
                              Info
                            </label>
                            <div className="col-sm-8">
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
    </>
  );
};

export default Package;
