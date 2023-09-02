import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const notify = () => toast.error("Required fields can not be empty!");

const EditInvestigation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const investigationId = state.id;

  const [data, setData] = useState({});
  const [reportTypeId, setReportTypeId] = useState(0);
  const [roomList, setRoomList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [instrumentList, setInstrumentList] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState();
  const [checked, setChecked] = useState();

  //instruments table data
  const [insData, setInsData] = useState([
    {
      investigation_id: "",
      instrument_id: "",
      qty: "",
    },
  ]);

  const plusInstrument = () => {
    setInsData([
      ...insData,
      {
        instrument_id: "",
        qty: "",
      },
    ]);
  };

  const delInstrument = (i) => {
    if (i < 0 || i >= insData.length) {
      console.log("not delete");
    } else {
      const deleteVal = [...insData];
      // console.log(i);
      deleteVal.splice(i, 1);
      setInsData(deleteVal);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleCheck = () => {
    setChecked(!checked);
    setData({
      ...data,
      status: checked ? "0" : "1",
    });
  };
  const selectReportTypeHandler = (e) => {
    setReportTypeId(e.target.value);
    // console.log(e.target.value);
    setData((prev) => {
      return {
        ...prev,
        report_type: e.target.value,
      };
    });
  };
  const selectRoomHandler = (e) => {
    setData((prev) => {
      return {
        ...prev,
        room_id: e.target.value,
      };
    });
  };
  const selectGroupHandler = (e) => {
    setData((prev) => {
      return {
        ...prev,
        investigation_group_id: e.target.value,
      };
    });
    const fetchCategoryList = () => {
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/investigation/category/data/${e.target.value}`,
        )
        .then((response) => setCategoryList(response.data.data))
        .catch((err) => console.log(err));
    };
    fetchCategoryList();
  };
  const selectCategoryHandler = (e) => {
    setData((prev) => {
      return {
        ...prev,
        investigation_category_id: e.target.value,
      };
    });
  };
  const selectInstrumentHandler = (e) => {
    let id = e.target.value;

    const obj = instrumentList.find((instrument) => instrument.id == id);
    if (obj) {
      const newObj = { ...obj };
      setSelectedInstrument(newObj);
    }

    // setInsData((prev) => {
    //   return {
    //     ...prev,
    //     instrument_id: id
    //   };
    // });
  };
  const handleInstrumentChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...insData];
    onchangeVal[i][name] = value;
    setInsData(onchangeVal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sendData = {
      investigationTable: data,
      instrumentTable: insData,
    };
    console.log(sendData);
    if (data.code !== "") {
      try {
        const url = `${process.env.REACT_APP_API_BASE_URL}/investigation/${investigationId}`;
        axios
          .put(url, sendData)
          .then((response) => {
            // fetchData();
            // console.log(response.data);
          })
          .catch((err) => console.log(err));
        setData(data);
        console.log(data);
        console.log(insData);
        // console.log(selectedInstrument);

        toast.success("Added Successfully!");
      } catch (error) {
        console.log(error);
      }
    } else {
      notify();
    }
  };

  const fetchRoomList = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/investigation/room/data`)
      .then((response) => setRoomList(response.data.data))
      .catch((err) => console.log(err));
  };
  const fetchGroupList = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/investigation/group/data`)
      .then((response) => setGroupList(response.data.data))
      .catch((err) => console.log(err));
  };
  // const fetchCategoryList = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_BASE_URL}/investigation/category/data`)
  //     .then((response) => setCategoryList(response.data.data))
  //     .catch((err) => console.log(err));
  // };
  const fetchInstrumentList = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/investigation/instrument/data`,
      )
      .then((response) => setInstrumentList(response.data.data))
      .catch((err) => console.log(err));
  };
  const fetchData = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/investigation/${investigationId}`,
      )
      .then((response) => {
        setData(response.data.data);
        if (response.data.data.status === 1) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const fetchInvInst = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/investigation/investigation-instruments/${investigationId}`,
      )
      .then((response) => {
        console.log(insData);
        setInsData(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    fetchInvInst();
    fetchRoomList();
    fetchGroupList();
    // fetchCategoryList();
    fetchInstrumentList();
  }, []);

  // const getData = () => {
  //   axios
  //     .get("process.env.REACT_APP_API_BASE_URL/settings")
  //     .then((response) => {
  //       const allData = response.data.data[0];
  //       setData(allData);
  //       setVatId(allData.vat_type);
  //       // formData.append('name', data.name)
  //       // console.log(formData)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 mx-auto">
          <div className="card">
            <div className="card-body">
              <form className="needs-validation">
                <div className="border p-4 rounded">
                  <div className="card-title d-flex align-items-center">
                    <h5 className="mb-0">Update Investigation</h5>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-6">
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputCode"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Code <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            value={data.code}
                            name="code"
                            type="text"
                            className="form-control"
                            id="inputCode"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputName"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            value={data.name}
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
                          htmlFor="inputDName"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Detailed Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            name="detailed_name"
                            value={data.detailed_name}
                            type="text"
                            className="form-control"
                            id="inputDName"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputRT"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Report Title
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            value={data.report_title}
                            name="report_title"
                            type="text"
                            className="form-control"
                            id="inputRT"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputRST"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Report Sub Title
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            value={data.report_sub_title}
                            name="report_sub_title"
                            type="text"
                            className="form-control"
                            id="inputRST"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputPrice"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Price <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            value={data.price}
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
                          htmlFor="discounted_price"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Discounted Price
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            value={data.discounted_price}
                            name="discounted_price"
                            type="number"
                            className="form-control"
                            id="discounted_price"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="vat"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          VAT %
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            value={data.vat_rate}
                            name="vat_rate"
                            type="number"
                            className="form-control"
                            id="vat"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div className="mb-3 row ">
                        <label
                          htmlFor="commission_rate"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Commission Rate %
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            value={data.commission_rate}
                            name="commission_rate"
                            type="number"
                            className="form-control"
                            id="commission_rate"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="preparation_duration"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Preparation Duration (day)
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            value={data.preparation_duration}
                            name="preparation_duration"
                            type="number"
                            className="form-control"
                            id="inputName"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="delivery_time"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Delivery Time
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            value={data.delivery_time}
                            name="delivery_time"
                            type="time"
                            className="form-control"
                            id="delivery_time"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="room"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Room
                        </label>
                        <div className="col-sm-9">
                          <select
                            value={data.room_id}
                            onChange={selectRoomHandler}
                            className="single-select form-select"
                          >
                            <option value={0}>Select Room</option>
                            {roomList.map((room) => (
                              <option value={room.id}>{room.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="group"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Group <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            value={data.investigation_group_id}
                            onChange={selectGroupHandler}
                            className="single-select form-select"
                          >
                            <option value={0}>Select Group</option>
                            {groupList.map((group) => (
                              <option value={group.id}>{group.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="category"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Category <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-9">
                          <select
                            value={data.investigation_category_id}
                            onChange={selectCategoryHandler}
                            className="single-select form-select"
                          >
                            <option value={0}>Select Category</option>
                            {categoryList.map((category) => (
                              <option value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <label
                          htmlFor="report_type"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Report Type
                        </label>
                        <div className="col-sm-9">
                          <select
                            value={data.report_type}
                            onChange={selectReportTypeHandler}
                            className="single-select form-select"
                          >
                            <option value={0}>Select Report Type</option>
                            <option value={1}>Text</option>
                            <option value={2}>Table</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-12">
                      {/* Instrument Table */}
                      <div className="table-responsive mt-3">
                        <table className="table align-middle">
                          <thead className="table-success">
                            <tr>
                              <th>Instrument (Unit)</th>
                              <th>Quantity</th>
                              {/* <th className="text-justify text-center">Unit</th> */}
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {insData.map((val, i) => (
                              <tr key={i}>
                                <td>
                                  <div className="col">
                                    <select
                                      value={val.instrument_id}
                                      onChange={(e) => {
                                        handleInstrumentChange(e, i);
                                      }}
                                      name="instrument_id"
                                      className="single-select form-select"
                                    >
                                      <option value={0}>
                                        Select Instrument
                                      </option>
                                      {instrumentList.map((instrument) => (
                                        <option value={instrument.id}>
                                          {instrument.name} - (
                                          {instrument.uom?.symbol})
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </td>
                                <td>
                                  <div className="col">
                                    <input
                                      onChange={(e) =>
                                        handleInstrumentChange(e, i)
                                      }
                                      name="qty"
                                      type="number"
                                      value={val.qty}
                                      className="form-control"
                                      id="qty"
                                      required
                                    />
                                  </div>
                                </td>
                                {/* <td className="text-justify text-center">
                                  {selectedInstrument?.uom.name}
                                </td> */}

                                <td>
                                  <div className="table-actions d-flex align-items-center gap-3 fs-6">
                                    {i === insData.length - 1 ? (
                                      <div className="d-flex align-items-center gap-3 fs-6">
                                        <a
                                          href="javascript:;"
                                          className="text-primary"
                                          title="Views"
                                          onClick={plusInstrument}
                                        >
                                          <i className="bi bi-plus-circle-fill" />
                                        </a>
                                        {i > 0 ? (
                                          <a
                                            href="javascript:;"
                                            className="text-danger"
                                            title="Delete"
                                            onClick={() => delInstrument(i)}
                                          >
                                            <i className="bi bi-trash-fill" />
                                          </a>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputInfo"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Info
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            onChange={handleChange}
                            value={data.info}
                            name="info"
                            type="textarea"
                            className="form-control"
                            id="inputInfo"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="mb-3 row ">
                        <label
                          htmlFor="inputInfo"
                          className="col-sm-3 col-form-label d-flex justify-content-start"
                        >
                          Status
                        </label>
                        <div className="col-sm-9">
                          <div className="form-check d-flex align-items-center">
                            <input
                              onChange={() => handleCheck()}
                              checked={checked}
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
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-3">
                      <button
                        type="submit"
                        className="btn btn-outline-secondary px-2 mb-3"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(-1);
                        }}
                      >
                        Go Back{" "}
                        <span>
                          <i className="bi bi-arrow-left" />
                        </span>
                      </button>
                    </div>
                    <div className="col-3">
                      <button
                        type="submit"
                        className="btn btn-success px-5"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInvestigation;
