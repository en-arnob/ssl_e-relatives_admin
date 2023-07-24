import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ActivityRow = ({ modulesData, activityData, roleId }) => {
  const [m2AData, setM2AData] = useState([]);
  const [respData, setRespData] = useState();

  const [selectedActivites, setSelectedActivities] = useState([{ roleId }]);
  const handleCheckboxChange = (moduleId, activityId, checked) => {
    if (checked) {
      setSelectedActivities((prevSelectedActivities) => [
        ...prevSelectedActivities,
        { roleId, moduleId, activityId },
      ]);
    } else {
      setSelectedActivities((prevSelectedActivities) =>
        prevSelectedActivities.filter(
          (item) =>
            !(item.moduleId === moduleId && item.activityId === activityId)
        )
      );
    }
    // console.log(selectedActivites)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let url = `${process.env.REACT_APP_API_BASE_URL}/role-permission/post`;
    axios
      .post(url, { selectedActivites })
      .then((response) => {
        // console.log("data sent", response.data);
        setRespData(respData);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(selectedActivites);
    toast.success("Successfully updated!");
    // window.location.reload(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/role-permission`
      );
      const data = await response.json();
      // console.log(data.data);
      const dataWow = data.data;
      const transformedData = dataWow.map((item) => ({
        roleId: item.role_id.toString(),
        moduleId: item.module_id,
        activityId: item.activity_id,
      }));
      setSelectedActivities(transformedData);

      // setSelectedActivities(data.data);
    } catch (error) {
      console.log("error");
    }
  };

  const getModuleToActivityData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/module-to-activity`)
      .then((response) => {
        const fetchedData = response.data.data;

        setM2AData(fetchedData);
        // console.log(fetchedData)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    getModuleToActivityData();
  }, []);

  return (
    <>
      {modulesData &&
        modulesData.map((module) => (
          <tr key={module.id}>
            <th scope="row">{module.name}</th>
            {activityData.map((activity) => {
              const moduleActivity = m2AData.find(
                (item) =>
                  item.module_id === module.id &&
                  item.activity_id === activity.id
              );
              const isChecked = selectedActivites.some(
                (item) =>
                  item.moduleId === module.id &&
                  item.activityId === activity.id &&
                  item.roleId === roleId
              );
              if (moduleActivity) {
                //
                return (
                  <td key={activity.id}>
                    <div className="form-check">
                      <input
                        className="form-check-input text-center"
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          handleCheckboxChange(
                            module.id,
                            activity.id,
                            e.target.checked
                          )
                        }
                      />
                      <label
                        className="form-check-label text-center"
                        htmlFor="flexCheckDefault"
                      >
                        {activity.name}
                      </label>
                    </div>
                  </td>
                );
              } else {
                return <td key={activity.id}></td>;
              }
            })}
          </tr>
        ))}
      <br />
      <button
        class="btn btn-primary btn-lg float-right"
        onClick={handleSubmit}
        type="submit"
      >
        {" "}
        Save{" "}
      </button>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </>
  );
};

export default ActivityRow;
