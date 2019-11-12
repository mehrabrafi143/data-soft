import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "./modal/modal";
import { GetNotifications } from "../../service/notificationServices/notificationServices";
import logo from "../../assets/data-soft.png";
import moment from "moment";
import Spiner from "../../components/spiner/spiner";
import { AddWorkingHours } from "../../service/employeeServices/employeeServices";

class UserNavbar extends Component {
  state = {
    notifications: [],
    count: 0,
    classes: "off",
    startTime: "",
    loader: false
  };

  handelClasses = () => {
    if (this.state.classes === "off") {
      this.setState({ classes: "on" });
      this.start();
    } else {
      this.setState({ classes: "off" });
      this.end();
    }
  };

  start = () => {
    this.setState({ startTime: moment() });
  };

  end = async () => {
    let endTime = moment();
    const data = {
      workingHours: moment
        .duration(endTime.diff(this.state.startTime))
        .asHours(),
      employeeId: localStorage.getItem("employeeId")
    };
    try {
      await AddWorkingHours(data);
    } catch (error) {}
  };

  componentDidMount = async () => {
    try {
      const id = localStorage.getItem("employeeId");
      const { data: notifications } = await GetNotifications(id);
      const count = notifications.length;
      this.setState({ notifications, count });
    } catch (error) {}
  };

  setCount = () => {
    this.setState({ count: 0 });
  };

  render() {
    const { notifications, count, classes, loader } = this.state;
    return (
      <nav className="navbar navbar-expand-lg usernavbar">
        <Spiner loader={loader} />

        <div className="sidebar__logo text-left">
          <img src={logo} alt="data-soft" />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav right-align">
            {notifications ? (
              <Modal
                notifications={notifications}
                count={count}
                setCount={this.setCount}
              />
            ) : null}

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to=""
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.props.username}
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="/user/myprofile">
                  My Profile
                </Link>
                <Link className="dropdown-item" to="/user/notice">
                  Notice Board
                </Link>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </div>
            </li>
            <li onClick={this.handelClasses}>
              <i
                class={"text-red fa fa-toggle-" + classes}
                aria-hidden="true"
              ></i>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default UserNavbar;
