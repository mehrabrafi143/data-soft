import React, { Component } from "react";
import SideBar from "../components/sidebar-nav/sidebar-nav";
import Mainbar from "../components/mainbar/mainbar";
import { Switch, Route, Redirect } from "react-router-dom";
import DashBoard from "../components/dashboard/dashboard";
import AddEmployeeForm from "./../components/addEmployeeForm/addEmployeeForm";
import AddEmployeeCertificate from "./../components/addEmpolyeeCertificates/addEmployeeCertificate";
import RegistrationForm from "./../components/RegistrationForm/RegistrationForm";
import NotFound from "./../components/not-found/notFound";
import EmployeeTable from "./../components/employeeTable/employeeTable";
import EmployeeDetails from "./../components/employeeDetails/employeeDetails";
import Notice from "./../components/notice/notice";
import EmployeePayForm from "./../components/EmployeePayForm/employeePayform";
import ChangePasswordAdmin from "./../components/common/changePassword/changePasswordAdmin";
import ExEmployeeTable from "./../components/exEmployeeTable/exEmployeeTable";

class Admin extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <SideBar />
        <Mainbar />
        <div className="midBody">
          <Switch>
            <Route
              path="/admin/dashboard/changepassword"
              component={ChangePasswordAdmin}
            />
            <Route path="/admin/dashboard" component={DashBoard} />
            <Route
              path="/admin/employees/employeeDetails/:id"
              component={EmployeeDetails}
            />
            <Route
              path="/admin/employees/employeePay/:id"
              component={EmployeePayForm}
            />
            <Route path="/admin/employees" component={EmployeeTable} />
            <Route path="/admin/exemployees" component={ExEmployeeTable} />
            <Route
              path="/admin/addemployee/reg/:id"
              component={RegistrationForm}
            />
            <Route
              path="/admin/addemployee/addemployeeCertificate/:id"
              component={AddEmployeeCertificate}
            />
            <Route path="/admin/addemployee/:id" component={AddEmployeeForm} />
            <Route path="/admin/addemployee/" component={AddEmployeeForm} />
            <Route path="/admin/notice" component={Notice} />
            <Redirect from="/admin" to="/admin/dashboard" exact />
            <Route path="/admin/not-found" component={NotFound} />
            <Redirect to="/admin/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;
