import React, { useState, useEffect } from "react";
import ActivityRow from "./ActivityRow";
import axios from "axios";

const RoleSetupCard = ({ roleId, roles }) => {
  const [activities, SetActivities] = useState([]);
  const [modules, setModules] = useState([]);

  const getAllActivities = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/activity`)
      .then((response) => {
        const allData = response.data.data;

        SetActivities(allData);
        // console.log(allData)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllModules = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/module`)
      .then((response) => {
        const allMData = response.data.data;

        setModules(allMData);
        // console.log(allMData)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllActivities();
    getAllModules();
  }, []);
  return (
    <div>
      {roleId == 0 ? (
        ""
      ) : (
        <div className="card">
          <div className="card-body">
            <h3 className="text-justify text-center">
              {roles[roleId - 1]?.name} Permissions Setup{" "}
            </h3>
            <br />
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th className="text-center" scope="col">
                    Module Name
                  </th>
                  {activities.map((activity) => (
                    <th className="text-center" scope="col">
                      {activity.name}
                    </th>
                  ))}
                  {/* <th scope="col">Activity Name</th>
                    <th scope="col"></th>
                    
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th> */}
                </tr>
              </thead>
              <tbody>
                <ActivityRow
                  modulesData={modules}
                  activityData={activities}
                  roleId={roleId}
                />
                {/* <tr>
                    <th scope="row">Role Management</th>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          View
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Create
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Update
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Delete
                        </label>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Role Access Control</th>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          View
                        </label>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                  </tr>
                  <tr>
                    <th scope="row">User Management</th>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          View
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Create
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Update
                        </label>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Change Password
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Password Reset
                        </label>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Module Management</th>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          View
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Create
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Update
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Delete
                        </label>
                      </div>
                    </td>
                    
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Activity Management</th>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          View
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Create
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Update
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Delete
                        </label>
                      </div>
                    </td>
                    
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">User Access Control</th>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          View
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Create
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Update
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Delete
                        </label>
                      </div>
                    </td>
                    
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr> */}
              </tbody>
            </table>
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSetupCard;
