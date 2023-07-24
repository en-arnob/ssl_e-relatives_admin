import React, { useEffect, useState } from "react";

import axios from "axios";
import TextTypeComponent from "./TextTypeComponent";
import TableTypeComponent from "./TableTypeComponent";

const TestManagement = () => {
  const [investigationsData, setInvestigationData] = useState();
  const [selectedInvestigation, setSelectedInvestigation] = useState({});

  function selectInvestigationHandler(e) {
    setSelectedInvestigation(
      investigationsData.find((investigation) => {
        return investigation.id == e.target.value;
      })
    );
  }

  const fetchInvestigationsList = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/test/investigations`)
      .then((response) => setInvestigationData(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchInvestigationsList();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="border p-3 rounded">
            <div className="card-box">
              <h6 className="mb-0 text-uppercase">Test Management </h6>
              <div className="col"></div>
            </div>
            <hr />
            <div className="mb-3 row  ">
              <div className="col col-sm-6">
                <div className="text-start h6">Select Investigation</div>
              </div>
              <div className="input-group col col-sm-6">
                <select
                  className="form-select"
                  onChange={selectInvestigationHandler}
                >
                  <option value="0">Select an investigation</option>
                  {investigationsData?.map((investigation) => (
                    <option key={investigation?.id} value={investigation.id}>
                      {investigation.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {selectedInvestigation?.report_type ? (
              <div>
                {selectedInvestigation?.report_type == 2 ? (
                  <TableTypeComponent investigation={selectedInvestigation} />
                ) : (
                  <TextTypeComponent investigation={selectedInvestigation} />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestManagement;
