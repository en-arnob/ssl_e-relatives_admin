import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContextAPI";
import Navbar from "../Navbar/Navbar";
import "./DashboardLayout.scss";
import axios from "axios";

const MenuItem = ({ iconClass, title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <li>
      <Link
        to="#"
        className={`has-arrow ${expanded ? "expanded" : ""}`}
        onClick={handleToggle}
      >
        <div className="parent-icon">
          <i className={iconClass} />
        </div>
        <div className="menu-title">{title}</div>
      </Link>
      {expanded && <ul className="submenu-expanded">{children}</ul>}
    </li>
  );
};
const DashboardLayout = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [data, setData] = useState({});
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/settings`)
      .then((response) => {
        const allData = response.data.data[0];
        setData(allData);
        // formData.append('name', data.name)
        // console.log(formData)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    // setUpData({...upData, [data.key] : data.value})
  }, []);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="dashboard-layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className={`wrapper ${sidebarCollapsed ? "toggled" : ""}`}>
        <aside
          className={`sidebar-wrapper ${sidebarCollapsed ? "toggled" : ""} ${
            sidebarHovered ? "sidebar-hovered" : ""
          }`}
          data-simplebar="true"
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
        >
          <Link to="/dashboard">
            <div onClick={handleToggleSidebar} className="sidebar-header">
              <div>
                {data?.logo_image ? (
                  <img
                    src={`${process.env.REACT_APP_UPLOAD_URL}/${data?.logo_image}`}
                    className="logo-icon"
                    alt="logo icon"
                  />
                ) : (
                  `${data?.website_name}`
                )}
              </div>
              <div className="toggle-icon ms-auto">
                <i className="bi bi-chevron-double-left" />
              </div>
            </div>
          </Link>

          <ul className="metismenu" id="menu">
            {(accessPerm(21, 4) ||
              accessPerm(22, 4) ||
              accessPerm(23, 4) ||
              accessPerm(24, 2) ||
              accessPerm(25, 4)) && (
              <MenuItem iconClass="bi bi-search" title="Investigation">
                {accessPerm(21, 4) && (
                  <li>
                    <Link to="/dashboard/investigation/investigation-groups">
                      <i className="bi bi-arrow-right-short" />
                      Groups
                    </Link>
                  </li>
                )}

                {accessPerm(22, 4) && (
                  <li>
                    <Link to="/dashboard/investigation/investigation-categories">
                      <i className="bi bi-arrow-right-short" />
                      Category
                    </Link>
                  </li>
                )}
                {accessPerm(23, 4) && (
                  <li>
                    <Link to="/dashboard/investigation/investigation-management">
                      <i className="bi bi-arrow-right-short" />
                      Investigation
                    </Link>
                  </li>
                )}

                {accessPerm(24, 2) && (
                  <li>
                    <Link to="/dashboard/investigation/test-management">
                      <i className="bi bi-arrow-right-short" />
                      Test
                    </Link>
                  </li>
                )}
              </MenuItem>
            )}
            {(accessPerm(26, 4) ||
              accessPerm(27, 4) ||
              accessPerm(28, 4) ||
              accessPerm(29, 4) ||
              accessPerm(30, 4) ||
              accessPerm(31, 4)) && (
              <MenuItem iconClass="bi bi-file-earmark-person" title="Accounts">
                {accessPerm(26, 4) && (
                  <li>
                    <Link to="/dashboard/transection-type">
                      <i className="bi bi-arrow-right-short" />
                      Transaction Type
                    </Link>
                  </li>
                )}
                {accessPerm(27, 4) && (
                  <li>
                    <Link to="/dashboard/head-identifier">
                      <i className="bi bi-arrow-right-short" />
                      Head Identifier
                    </Link>
                  </li>
                )}
                {accessPerm(28, 4) && (
                  <li>
                    <Link to="/dashboard/head-classification">
                      <i className="bi bi-arrow-right-short" />
                      Head Classification
                    </Link>
                  </li>
                )}
                {accessPerm(29, 4) && (
                  <li>
                    <Link to="/dashboard/head-group">
                      <i className="bi bi-arrow-right-short" />
                      Head Group
                    </Link>
                  </li>
                )}

                {accessPerm(30, 4) && (
                  <li>
                    <Link to="/dashboard/head-type">
                      <i className="bi bi-arrow-right-short" />
                      Head Type
                    </Link>
                  </li>
                )}
                {accessPerm(31, 4) && (
                  <li>
                    <Link to="/dashboard/account-head">
                      <i className="bi bi-arrow-right-short" />
                      Account Head
                    </Link>
                  </li>
                )}
              </MenuItem>
            )}

            <MenuItem iconClass="bi bi-filter-square" title="Reports">
              <li>
                <Link to="/dashboard/settings/system-settings">
                  <i className="bi bi-arrow-right-short" />
                  Birthday Report
                </Link>
              </li>
            </MenuItem>
            {(accessPerm(5, 4) ||
              accessPerm(4, 4) ||
              accessPerm(2, 4) ||
              accessPerm(3, 4) ||
              accessPerm(3, 4)) && (
              <MenuItem iconClass="bi bi-people" title="User Management">
                {accessPerm(5, 4) && (
                  <li>
                    <Link to="/dashboard/users">
                      <i className="bi bi-arrow-right-short" />
                      Users
                    </Link>
                  </li>
                )}
                {accessPerm(4, 4) && (
                  <li>
                    <Link to="/dashboard/roles">
                      <i className="bi bi-arrow-right-short" />
                      Roles
                    </Link>
                  </li>
                )}
                {accessPerm(2, 4) && (
                  <li>
                    <Link to="/dashboard/activity">
                      <i className="bi bi-arrow-right-short" />
                      Activities
                    </Link>
                  </li>
                )}
                {accessPerm(3, 4) && (
                  <li>
                    <Link to="/dashboard/module">
                      <i className="bi bi-arrow-right-short" />
                      Modules
                    </Link>
                  </li>
                )}

                {accessPerm(6, 2) && (
                  <li>
                    <Link to="/dashboard/user-management/role-permissions">
                      <i className="bi bi-arrow-right-short" />
                      Role Permissions
                    </Link>
                  </li>
                )}
                {accessPerm(6, 2) && (
                  <li>
                    <Link to="/dashboard/user-management/terms-conditions">
                      <i className="bi bi-arrow-right-short" />
                      Terms & Conditions
                    </Link>
                  </li>
                )}
                {accessPerm(6, 2) && (
                  <li>
                    <Link to="/dashboard/user-management/service-category">
                      <i className="bi bi-arrow-right-short" />
                      Service Category
                    </Link>
                  </li>
                )}
              </MenuItem>
            )}

            {(accessPerm(7, 4) ||
              accessPerm(8, 4) ||
              accessPerm(9, 4) ||
              accessPerm(10, 4) ||
              accessPerm(11, 4) ||
              accessPerm(12, 4) ||
              accessPerm(13, 4) ||
              accessPerm(14, 4) ||
              accessPerm(15, 4) ||
              accessPerm(16, 4) ||
              accessPerm(17, 4) ||
              accessPerm(18, 4) ||
              accessPerm(19, 4) ||
              accessPerm(20, 4) ||
              accessPerm(1, 2)) && (
              <MenuItem iconClass="bi bi-gear" title="Settings">
                {accessPerm(7, 4) && (
                  <li>
                    <Link to="/dashboard/static-content-groups">
                      <i className="bi bi-arrow-right-short" />
                      Static Content Groups
                    </Link>
                  </li>
                )}
                {accessPerm(8, 4) && (
                  <li>
                    <Link to="/dashboard/static-content">
                      <i className="bi bi-arrow-right-short" />
                      Static Contents
                    </Link>
                  </li>
                )}

                {accessPerm(9, 4) && (
                  <li>
                    <Link to="/dashboard/settings/instruments-category">
                      <i className="bi bi-arrow-right-short" />
                      Instruments Category
                    </Link>
                  </li>
                )}
                {accessPerm(10, 4) && (
                  <li>
                    <Link to="/dashboard/settings/instruments">
                      <i className="bi bi-arrow-right-short" />
                      Instruments
                    </Link>
                  </li>
                )}
                {accessPerm(11, 4) && (
                  <li>
                    <Link to="/dashboard/setting/drug-groups">
                      <i className="bi bi-arrow-right-short" />
                      Drugs Group
                    </Link>
                  </li>
                )}

                {accessPerm(12, 4) && (
                  <li>
                    <Link to="/dashboard/setting/drugs">
                      <i className="bi bi-arrow-right-short" />
                      Drugs
                    </Link>
                  </li>
                )}
                {accessPerm(13, 4) && (
                  <li>
                    <Link to="/dashboard/settings/room-management">
                      <i className="bi bi-arrow-right-short" />
                      Room Management
                    </Link>
                  </li>
                )}
                {accessPerm(14, 4) && (
                  <li>
                    <Link to="/dashboard/settings/gender">
                      <i className="bi bi-arrow-right-short" />
                      Gender
                    </Link>
                  </li>
                )}
                {accessPerm(15, 4) && (
                  <li>
                    <Link to="/dashboard/settings/uom">
                      <i className="bi bi-arrow-right-short" />
                      Unit of Measurements
                    </Link>
                  </li>
                )}

                {accessPerm(16, 4) && (
                  <li>
                    <Link to="/dashboard/settings/professions">
                      <i className="bi bi-arrow-right-short" />
                      Professions
                    </Link>
                  </li>
                )}
                {accessPerm(17, 4) && (
                  <li>
                    <Link to="/dashboard/settings/merital-status">
                      <i className="bi bi-arrow-right-short" />
                      Marital Status
                    </Link>
                  </li>
                )}
                {accessPerm(18, 4) && (
                  <li>
                    <Link to="/dashboard/settings/country">
                      <i className="bi bi-arrow-right-short" />
                      Country
                    </Link>
                  </li>
                )}
                {accessPerm(19, 4) && (
                  <li>
                    <Link to="/dashboard/settings/state">
                      <i className="bi bi-arrow-right-short" />
                      State
                    </Link>
                  </li>
                )}
                {accessPerm(20, 4) && (
                  <li>
                    <Link to="/dashboard/settings/city">
                      <i className="bi bi-arrow-right-short" />
                      City
                    </Link>
                  </li>
                )}

                {accessPerm(1, 2) && (
                  <li>
                    <Link to="/dashboard/settings/system-settings">
                      <i className="bi bi-arrow-right-short" />
                      System Settings
                    </Link>
                  </li>
                )}
              </MenuItem>
            )}
          </ul>
        </aside>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
