import React, { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import axios from "axios";
import toast from "react-hot-toast";

const TextTypeComponent = ({ investigation }) => {
  const [checked, setChecked] = useState(true);
  const [data, setData] = useState({
    order_no: 1,
  });

  const [dataArray, setDataArray] = useState([
    {
      name: "",
      info: "",
      order_no: 1,
    },
  ]);

  // change text editor data
  function changeTextEditorValue(editor, id) {
    const currentEditor = dataArray.find((item) => item.id == id)

    currentEditor.info = editor.getData()
  }

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  
  const handleTableReportChanges = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...dataArray];
    onchangeVal[i][name] = value;
    setDataArray(onchangeVal);
    console.log(dataArray);
  };
  const plusTR = () => {
    setDataArray([
      ...dataArray,
      {
        name: "",
        info: "",
        order_no: 1,
      },
    ]);
  };
  const delTR = (i) => {
    if (i < 0 || i >= dataArray.length) {
      console.log("not delete");
    } else {
      const deleteVal = [...dataArray];
      // console.log(i);
      deleteVal.splice(i, 1);
      setDataArray(deleteVal);
    }
  };
  const handleCheck = (e, i) => {
    const { name, value } = e.target;
    setChecked(!checked);
    const onchangeVal = [...dataArray];
    onchangeVal[i][name] = e.target.checked;
    setDataArray(onchangeVal);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name === "") {
      toast.error("Name can not be empty!");
    } else {
      // let dataArr = [];
      // dataArr.push(data);
      let data = {
        investigationId: investigation.id,
        testData: dataArray,
      };
      const url = `${process.env.REACT_APP_API_BASE_URL}/test/`;
      axios
        .post(url, data)
        .then((response) => {
          // setDataArray(sendData);
          // fetchTextReportData();
        })
        .catch((err) => console.log(err));
      // console.log(data);
      toast.success("Saved successfully!");
    }

    // window.location.reload(false);
  };

  const fetchTextReportData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/test/${investigation.id}`)
      .then((response) => {
        const { status, data } = response.data;

        if (status === "OK") {
          if (data.length === 0) {
            setDataArray([
              {
                name: "",
                info: "",
                order_no: 1,
              },
            ]);
          } else {
            setDataArray(data);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTextReportData();
  }, [investigation]);

  return (
    <div>
      <div className="row">
        <hr />
        {dataArray.map((val, i) => {
          // console.log(val);
          return (
            <div className="col-sm-9" key={i}>
              <div className="mb-3 row ">
                <label
                  htmlFor="inputName"
                  className="col-sm-3 col-form-label d-flex justify-content-start"
                >
                  Name <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    // onChange={handleChange}
                    onChange={(e) => handleTableReportChanges(e, i)}
                    name="name"
                    type="text"
                    // value={data?.name}
                    value={val.name}
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
                <div className="col-sm-9">
                  <RichTextEditor
                    data={val}
                    setData={setDataArray}
                    changeTextEditorValue={changeTextEditorValue}
                    index={i}
                  />
                </div>
              </div>
              <div className="mb-3 row ">
                <label
                  htmlFor="inputStatus"
                  className="col-sm-3 col-form-label d-flex justify-content-start"
                >
                  Status
                </label>
                <div className="col-sm-9">
                  <div className="form-check d-flex align-items-center">
                    <input
                      onChange={(e) => handleCheck(e, i)}
                      defaultChecked={val?.status}
                      name="status"
                      className="form-check-input mt-0 me-2"
                      type="checkbox"
                      id={`"flexCheckChecked-${i}"`}
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
              <div>
                <div>
                  {i === dataArray.length - 1 ? (
                    <div>
                      <button className="btn btn-primary px-2" onClick={plusTR}>
                        + Add
                      </button>
                      {i > 0 ? (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <button
                          className="btn btn-danger px-2 mx-2"
                          onClick={() => delTR(i)}
                        >
                          Delete
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className="col-sm-3"></div>
      </div>
      <div className="row my-2">
        <div className="col col sm-12">
          <div className="col-3 ml-3">
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
  );
};

export default TextTypeComponent;
