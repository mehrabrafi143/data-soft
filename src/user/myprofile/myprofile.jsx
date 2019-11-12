import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GetEmployee } from "../../service/employeeServices/employeeServices";
import Spiner from "./../../components/spiner/spiner";
import { GetEmployeeWithCartificates } from "./../../service/employeeServices/employeeServices";
import CertificateTableUser from "./../../components/employeeDetails/certificateTableUser";

class MyProfile extends Component {
  state = {
    employee: {
      userAccount: {
        userName: ""
      }
    },
    loader: false,
    certificates: []
  };

  async componentDidMount() {
    try {
      this.setState({ loader: true });
      const id = localStorage.getItem("employeeId");
      const { data: certificates } = await GetEmployeeWithCartificates(id);
      const { data: employee } = await GetEmployee(id);
      if (employee) this.setState({ employee, loader: false, certificates });
    } catch (error) {
      this.setState({ loader: false });
    }
  }

  render() {
    let { employee, loader, certificates } = this.state;

    return (
      <React.Fragment>
        <Spiner loader={loader} />
        <div className="row">
          <div className="col-2 text-center-img  mt-md">
            <div className="div roundedImg">
              <i className="fa fa-user profile" aria-hidden="true"></i>
            </div>
          </div>
          <div className="col-4 mt-md">
            <Link to="/user/changePassword" className="changePasswrod mr-5">
              Change Passwrod
              <i className="fa fa-key ml-3" aria-hidden="true"></i>
            </Link>
            <span className="badge badge-pill badge-info text-sm">Active</span>
            <ul className="info animated bounceInRight">
              <li className="text-info">
                <h1>Name:</h1> <span>{employee.name}</span>
              </li>
              <li className="text-info">
                <h1>Gender:</h1> <span>{employee.gender}</span>
              </li>
              <li className="text-info">
                <h1>Phone Number:</h1> <span>{employee.mobileNumber}</span>
              </li>
              <li className="text-info">
                <h1>Email:</h1> <span>{employee.userAccount.userName}</span>
              </li>
              <li className="text-info">
                <h1>Position:</h1> <span>{employee.position}</span>
              </li>
              <li className="text-info">
                <h1>Per Hour Rate:</h1> <span>{employee.perHourRate}</span>
              </li>
              <li className="text-info">
                <h1>Working Hours:</h1> <span>{employee.workingHours}</span>
              </li>
              <li className="text-info">
                <h1>Salary:</h1> <span>{employee.totalSalary}</span>
              </li>
              <li className="text-info">
                <h1>Address:</h1>
                <span> {employee.address}</span>
              </li>
            </ul>
          </div>
          <div className="col-4 text-center">
            <CertificateTableUser certificates={certificates} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyProfile;
