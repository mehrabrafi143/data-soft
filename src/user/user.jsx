import React, { Component } from "react";
import UserNavbar from "./userNavbar/userNavbar";
import { Switch, Redirect } from "react-router-dom";
import MyProfile from "./myprofile/myprofile";
import UserNotice from "./userNotice/userNotice";
import NoticeDetails from "./userNotice/userNoticeDetails";
import { getUserName } from "../service/authService/authService";
import { GetEmployeeByUserName } from "../service/employeeServices/employeeServices";
import UserRoute from "./../components/protectedRoute/userRoute";
import ChangePassword from "./../components/common/changePassword/changePassword";
class User extends Component {
  state = {
    employee: {},
    username: ""
  };

  async componentDidMount() {
    const username = getUserName();
    const { data: employee } = await GetEmployeeByUserName(username);
    this.setState({ employee, username });
    localStorage.setItem("employeeId", employee.id);
  }

  render() {
    const { username } = this.state;

    return (
      <React.Fragment>
        <UserNavbar username={username} />
        <div className="userMainBody">
          <Switch>
            <UserRoute path="/user/notice/:id" component={NoticeDetails} />
            <UserRoute path="/user/notice" component={UserNotice} />
            <UserRoute path="/user/myprofile" component={MyProfile} />
            <UserRoute path="/user/changepassword" component={ChangePassword} />
            <Redirect from="/user" to="/user/myprofile" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default User;
