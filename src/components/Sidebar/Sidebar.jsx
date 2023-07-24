import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContextAPI";
import "./Sidebar.scss";

const MenuItem = ({ link, iconClass, title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    // <li>
    //   <Link
    //     to={link}
    //     className={`has-arrow ${expanded ? "expanded" : ""}`}
    //     onClick={handleToggle}
    //   >
    //     <div className='parent-icon'>
    //       <i className={iconClass} />
    //     </div>
    //     <div className='menu-title'>{title}</div>
    //   </Link>
    //   {expanded === true && <ul className='submenu-expanded'>{children}</ul>}
    // </li>
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

const Sidebar = () => {
  const { currentUser, accessPerm, loading } = useContext(UserContext);

  // console.log(currentUser)

  return (
    <>
      <aside className="sidebar-wrapper">
        <Link to="/dashboard">
          <div className="sidebar-header">
            <div>
              <img
                src="assets/images/edmc-logo.jpeg"
                className="logo-icon"
                alt="logo icon"
              />
            </div>
            <div>
              <h4 className="logo-text">EDMC</h4>
            </div>
            <div className="toggle-icon ms-auto">
              <i className="bi bi-chevron-double-left" />
            </div>
          </div>
        </Link>

        {/*navigation*/}
        <ul className="metismenu" id="menu">
          <MenuItem iconclassName="bi bi-grid" title="Investigation">
            <li>
              <Link to="/investigation/investigation-groups">
                <i className="bi bi-arrow-right-short" />
                Groups
              </Link>
            </li>
            <li>
              <Link to="/investigation/investigation-categories">
                <i className="bi bi-arrow-right-short" />
                Category
              </Link>
            </li>
            <li>
              <Link to="/investigation/investigation-management">
                <i className="bi bi-arrow-right-short" />
                Investigation
              </Link>
            </li>
            <li>
              <Link to="/investigation/test-management">
                <i className="bi bi-arrow-right-short" />
                Test
              </Link>
            </li>
          </MenuItem>

          <MenuItem iconclassName="bi bi-grid" title="Accounts">
            <li>
              <Link to="/transection-type">
                <i className="bi bi-arrow-right-short" />
                Transaction Type
              </Link>
            </li>
            <li>
              <Link to="/head-identifier">
                <i className="bi bi-arrow-right-short" />
                Head Identifier
              </Link>
            </li>
            <li>
              <Link to="/head-classification">
                <i className="bi bi-arrow-right-short" />
                Head Classification
              </Link>
            </li>
            <li>
              <Link to="/head-group">
                <i className="bi bi-arrow-right-short" />
                Head Group
              </Link>
            </li>
            <li>
              <Link to="/head-type">
                <i className="bi bi-arrow-right-short" />
                Head Type
              </Link>
            </li>
            <li>
              <Link to="/account-head">
                <i className="bi bi-arrow-right-short" />
                Account Head
              </Link>
            </li>
          </MenuItem>

          <MenuItem iconclassName="bi bi-grid" title="Reports">
            <li>
              <Link to="/settings/system-settings">
                <i className="bi bi-arrow-right-short" />
                Birthday Report
              </Link>
            </li>
          </MenuItem>

          <MenuItem iconclassName="bi bi-house-door" title="User Management">
            {accessPerm(5, 4) && (
              <li>
                <Link to="/users">
                  <i className="bi bi-arrow-right-short" />
                  Users
                </Link>
              </li>
            )}
            <li>
              <Link to="/roles">
                <i className="bi bi-arrow-right-short" />
                Roles
              </Link>
            </li>
            <li>
              <Link to="/activity">
                <i className="bi bi-arrow-right-short" />
                Activities
              </Link>
            </li>
            <li>
              <Link to="/module">
                <i className="bi bi-arrow-right-short" />
                Modules
              </Link>
            </li>
            <li>
              <Link to="/user-management/role-permissions">
                <i className="bi bi-arrow-right-short" />
                Role Permissions
              </Link>
            </li>
          </MenuItem>

          <MenuItem iconclassName="bi bi-grid" title="Settings">
            <li>
              <Link to="/static-content-groups">
                <i className="bi bi-arrow-right-short" />
                Static Content Groups
              </Link>
            </li>
            <li>
              <Link to="/static-content">
                <i className="bi bi-arrow-right-short" />
                Static Contents
              </Link>
            </li>
            <li>
              <Link to="/settings/instruments-category">
                <i className="bi bi-arrow-right-short" />
                Instruments Category
              </Link>
            </li>
            <li>
              <Link to="/settings/instruments">
                <i className="bi bi-arrow-right-short" />
                Instruments
              </Link>
            </li>
            <li>
              <Link to="/setting/drug-groups">
                <i className="bi bi-arrow-right-short" />
                Drugs Group
              </Link>
            </li>
            <li>
              <Link to="/setting/drugs">
                <i className="bi bi-arrow-right-short" />
                Drugs
              </Link>
            </li>
            <li>
              <Link to="/settings/room-management">
                <i className="bi bi-arrow-right-short" />
                Room Management
              </Link>
            </li>
            <li>
              <Link to="/settings/gender">
                <i className="bi bi-arrow-right-short" />
                Gender
              </Link>
            </li>
            <li>
              <Link to="/settings/uom">
                <i className="bi bi-arrow-right-short" />
                Unit of Measurements
              </Link>
            </li>
            <li>
              <Link to="/settings/professions">
                <i className="bi bi-arrow-right-short" />
                Professions
              </Link>
            </li>

            <li>
              <Link to="/settings/merital-status">
                <i className="bi bi-arrow-right-short" />
                Marital Status
              </Link>
            </li>
            <li>
              <Link to="/settings/country">
                <i className="bi bi-arrow-right-short" />
                Country
              </Link>
            </li>
            <li>
              <Link to="/settings/state">
                <i className="bi bi-arrow-right-short" />
                State
              </Link>
            </li>
            <li>
              <Link to="/settings/city">
                <i className="bi bi-arrow-right-short" />
                City
              </Link>
            </li>
            <li>
              <Link to="/settings/system-settings">
                <i className="bi bi-arrow-right-short" />
                System Settings
              </Link>
            </li>
          </MenuItem>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
