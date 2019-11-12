import React from "react";
import logo from "../../assets/data-soft.png";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="data-soft" />
      </div>
      <ul className="sidebar__nav">
        <li>
          <NavLink to="/admin/dashboard">
            <i className="fa fa-dashboard"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/employees">
            <i class="fa fa-briefcase" aria-hidden="true"></i> Employees
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/addemployee">
            <i class="fa fa-user-plus" aria-hidden="true"></i> Add Employee
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/exEmployees">
            <i class="fa fa-user-times" aria-hidden="true"></i> Ex-Employees
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/notice">
            <i class="fa fa-sticky-note" aria-hidden="true"></i> Notices
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout">
            <i class="fa fa-sign-out" aria-hidden="true"></i> Log out
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
