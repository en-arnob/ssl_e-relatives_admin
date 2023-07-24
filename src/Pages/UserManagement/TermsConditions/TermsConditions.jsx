import React, { useEffect, useState } from "react";
import axios from "axios";
import InnerComponent from "./InnerComponent";

const TermsConditions = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});

  function selectRoleHandler(e) {
    setSelectedRole(
      roles.find((role) => {
        return role.id == e.target.value;
      })
    );
  }

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

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="border p-3 rounded">
            <div className="card-box">
              <h6 className="mb-0 text-uppercase">Terms & Conditions</h6>
              <div className="col"></div>
            </div>
            <hr />
            <div className="mb-3 row  ">
              <div className="col col-sm-6">
                <div className="text-start h6">Select Role</div>
              </div>
              <div className="input-group col col-sm-6">
                <select className="form-select" onChange={selectRoleHandler}>
                  <option value={0}>Select a role</option>
                  {roles?.map((role) => (
                    <option key={role?.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {selectedRole?.id ? (
              <InnerComponent role={selectedRole} />
            ) : (
              "No Role Selected"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
