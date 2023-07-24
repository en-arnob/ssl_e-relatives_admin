import React, { useEffect, useState } from "react";
import axios from "axios";

const ActivityRow = ({ modulesData, activityData }) => {
  const [m2AData, setM2AData] = useState([]);

  const [selectedActivites, setSelectedActivities] = useState([]);
  const handleCheckboxChange = (moduleId, activityId, checked) => {
    if (checked) {
      setSelectedActivities((prevSelectedActivities) => [
        ...prevSelectedActivities,
        { moduleId, activityId },
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

    console.log(selectedActivites);
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

  let activityArray = [];

  const checkActivityForModule = (module) => {
    m2AData.forEach((obj) => {
      if (obj.module_id === module.id) {
        activityArray.push(obj.activity_id);
      }
    });
  };

  useEffect(() => {
    getModuleToActivityData();
  }, []);

  return (
    <>
      {modulesData &&
        modulesData.map((module) => (
          <tr key={module.id}>
            <th scope="row">{module.name}</th>
            {m2AData
              .filter((item) => item.module_id === module.id)
              .map((item) => {
                const activity = activityData.find(
                  (a) => a.id === item.activity_id
                );
                // const isChecked = selectedActivites.some((selectedItem) => selectedItem.module_id === module.id && selectedItem.activity_id === activity.id)
                if (item.activity_id)
                  return (
                    <td key={item.activity_id}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(
                              module.id,
                              item.activity_id,
                              e.target.checked
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          {activity.name}
                        </label>
                      </div>
                    </td>
                  );
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
    </>
  );
};

export default ActivityRow;
