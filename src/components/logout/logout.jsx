import React, { Component } from "react";
import { logout } from "./../../service/authService/authService";
class LogOut extends Component {
  componentDidMount() {
    logout();
    window.location = "/login";
  }
  render() {
    return null;
  }
}

export default LogOut;
