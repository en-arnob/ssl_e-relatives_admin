import React, { useEffect, useState } from "react";
import axios from "axios";

const TermsConditions = () => {
  const [roles, setRoles] = useState([]);
  const getRolesData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/roles`)
      .then((response) => {
        const allData = response.data.data;

        setRoles(allData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getRolesData();
  }, []);

  const [roleValue, setRoleValue] = useState(0);
  const selectRoleHandler = (e) => {
    setRoleValue(e.target.value);
    // console.log(e.target.value)
  };

  return (
    <>
      <h6 className="text-uppercase">Terms & Conditions</h6>
      <hr />
      <div className="row">
        <div className="col-xl-12 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="border row p-3 rounded">
                <div className="mb-3 row  ">
                  <div classname="col-sm-6">
                    <label className="form-label h6 text-right">Role</label>
                  </div>
                  <div className="input-group col-sm-6">
                    <select
                      value={roleValue}
                      onChange={selectRoleHandler}
                      className="single-select form-select"
                    >
                      <option value={0}>Select a role</option>
                      {roles.map((role) => (
                        <option value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <div classname="col-sm-6">
                    <label className="form-label h6 text-right">Details</label>
                  </div>
                  <div className="input-group col-sm-6">
                    <div className="col-sm-12">
                      <textarea
                        name="details"
                        // defaultValue={data?.info}
                        // onChange={(e) => onchange(e)}
                        type="textarea"
                        className="form-control"
                        id="inputInfo"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group col-sm-6">
                    <div className="form-check d-flex justify-content-end align-items-center">
                      <input
                        // onChange={() => handleCheck(isChecked)}
                        className="form-check-input mt-0 me-2"
                        type="checkbox"
                        // defaultChecked={data?.status === 1 ? true : false}
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
                <div className="mb-3">
                  <button type="button" className="btn btn-primary px-5">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
