import React, { useState, useEffect } from "react";
import axios from "axios";

const TableTypeComponent = ({ investigation }) => {
  const [checked, setChecked] = useState(true);
  const [unitList, setUnitList] = useState([]);
  const [tableReportData, setTableReportData] = useState([
    {
      investigation_id: "",
      name: "",
      uom_id: "",
      reference: "",
      info: "",
      order_no: "",
      status: "true",
    },
  ]);

  const handleTableReportChanges = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...tableReportData];
    onchangeVal[i][name] = value;
    setTableReportData(onchangeVal);
  };
  const plusTR = () => {
    setTableReportData([
      ...tableReportData,
      {
        investigation_id: "",
        name: "",
        uom_id: "",
        reference: "",
        info: "",
        order_no: "",
        status: "",
      },
    ]);
  };

  const delTR = (i) => {
    if (i < 0 || i >= tableReportData.length) {
      console.log("not delete");
    } else {
      const deleteVal = [...tableReportData];
      // console.log(i);
      deleteVal.splice(i, 1);
      setTableReportData(deleteVal);
    }
    
  };
  const handleCheck = (e, i) => {
    const { name, value } = e.target;
    setChecked(!checked);
    const onchangeVal = [...tableReportData];
    onchangeVal[i][name] = e.target.checked;
    setTableReportData(onchangeVal);
  };
  const handleUnitChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...tableReportData];
    onchangeVal[i][name] = value;
    setTableReportData(onchangeVal);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      investigationId: investigation.id,
      testData: tableReportData,
    };
    const url = `${process.env.REACT_APP_API_BASE_URL}/test/`;
    axios
      .post(url, data)
      .then((response) => {
        // fetchData();
        // console.log(response.data);
      })
      .catch((err) => console.log(err));

    console.log(data);
  };
  const fetchUnitList = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/test/uom-data`)
      .then((response) => setUnitList(response.data.data))
      .catch((err) => console.log(err));
  };

  const fetchTablereportData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/test/${investigation.id}`)
      .then((response) => {
        const { status, data } = response.data;

        if (status === "OK") {
          if (data.length === 0) {
            setTableReportData([
              {
                investigation_id: "",
                name: "",
                uom_id: "",
                reference: "",
                info: "",
                order_no: "",
                status: "true",
              },
            ]);
          } else {
            setTableReportData(data);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUnitList();
    fetchTablereportData();
  }, [investigation]);

  return (
    <div>
      <div className="row">
        <hr />
        {/* <h6 className="text-danger">Report Type: Table</h6> */}
        <div className="col-sm-12">
          {/* Instrument Table */}
          <div className="table-responsive mt-3">
            <table className="table align-middle">
              <thead className="table-success">
                <tr>
                  <th>
                    Name <span style={{ color: "red" }}>*</span>
                  </th>
                  <th>
                    Unit <span style={{ color: "red" }}>*</span>
                  </th>
                  <th>
                    Refference <span style={{ color: "red" }}>*</span>
                  </th>
                  <th>
                    Normal Value <span style={{ color: "red" }}>*</span>
                  </th>
                  <th>Order No.</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableReportData.map((val, i) => (
                  <tr key={i}>
                    <td>
                      <div className="mb-3 row ">
                        <div className="col-sm-9">
                          <input
                            name="name"
                            type="text"
                            onChange={(e) => handleTableReportChanges(e, i)}
                            value={val.name}
                            className="form-control"
                            id="inputName"
                            required
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="mb-3 row ">
                        <div className="col-sm-9">
                          <select
                            value={val.uom_id}
                            onChange={(e) => {
                              handleUnitChange(e, i);
                            }}
                            name="uom_id"
                            className="single-select form-select"
                          >
                            <option value={0}>Select Unit</option>
                            {unitList.map((unit, index) => (
                              <option key={index} value={unit.id}>
                                {unit.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="mb-3 row ">
                        <div className="col-sm-9">
                          <input
                            name="reference"
                            type="text"
                            onChange={(e) => handleTableReportChanges(e, i)}
                            value={val.reference}
                            className="form-control"
                            id="inputReference"
                            required
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="mb-3 row ">
                        <div className="col-sm-9">
                          <input
                            name="info"
                            type="text"
                            onChange={(e) => handleTableReportChanges(e, i)}
                            value={val.info}
                            className="form-control"
                            id="info"
                            required
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="mb-3 row ">
                        <div className="col-sm-9">
                          <input
                            name="order_no"
                            type="number"
                            onChange={(e) => handleTableReportChanges(e, i)}
                            value={val.order_no}
                            className="form-control"
                            id="info"
                            required
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="mb-3 row ">
                        <div className="col-sm-9">
                          <input
                            onChange={(e) => handleCheck(e, i)}
                            defaultChecked={val?.status}
                            name="status"
                            className="form-check-input mt-0 me-2"
                            type="checkbox"
                            id={`"flexCheckChecked-${i}"`}
                          />
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="table-actions d-flex align-items-center gap-3 fs-6">
                        {i === tableReportData.length - 1 ? (
                          <div className="d-flex align-items-center gap-3 fs-6">
                            <a
                              href="#javascript"
                              className="text-primary"
                              title="Views"
                              onClick={plusTR}
                            >
                              <i className="bi bi-plus-circle-fill" />
                            </a>
                            {i > 0 ? (
                              // eslint-disable-next-line jsx-a11y/anchor-is-valid
                              <a
                                href="#javascript"
                                className="text-danger"
                                title="Delete"
                                onClick={() => delTR(i)}
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
          <div className="row">
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
      </div>
    </div>
  );
};

export default TableTypeComponent;
