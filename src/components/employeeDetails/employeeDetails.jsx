import React, { Component } from "react";
import {
  CancleEmployee,
  GetEmployee,
  GetEmployeeWithCartificates
} from "./../../service/employeeServices/employeeServices";
import bootbox from "bootbox";
import Spiner from "./../spiner/spiner";
import { Link } from "react-router-dom";
import CertificateTable from "./certificateTable";

class EmployeeDetails extends Component {
  state = {
    employee: {
      userAccount: {
        userName: ""
      }
    },
    certificates: [],
    loader: false
  };

  async componentWillMount() {
    const id = this.props.match.params.id;
    this.setState({ loader: true });
    try {
      const { data: employee } = await GetEmployee(id);
      const { data: certificates } = await GetEmployeeWithCartificates(id);
      if (employee && certificates) {
        this.setState({
          employee,
          certificates,
          loader: false
        });
      }
    } catch (error) {
      this.setState({ loader: false });
    }
  }

  handelDelete = id => {
    const originalState = this.state.data;
    bootbox.confirm("Are You Sure?", async res => {
      if (res) {
        try {
          await CancleEmployee(id);
          this.history.push("/admin/employee");
        } catch (error) {
          this.setState({ data: originalState, loader: false });
          console.log(error);
        }
      }
    });
  };

  render() {
    let { employee, loader, certificates } = this.state;

    return (
      <React.Fragment>
        <Spiner loader={loader} />
        <div className="row">
          <div className="col-3 animated bounceInDown">
            <div className="div roundedImg">
              <i className="fa fa-user profile" aria-hidden="true"></i>
            </div>
            {employee.userAccountId ? null : (
              <Link
                to={"/admin/reg/" + employee.id}
                className="mt-sm ml-4 text"
              >
                Assign User Access
              </Link>
            )}
          </div>
          <div className="col-6">
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
              {employee.userAccount ? (
                <li className="text-info">
                  <h1>Email:</h1> <span>{employee.userAccount.userName}</span>
                </li>
              ) : null}
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
          <div className="col-3">
            <div
              className="update-btn mr-3"
              onClick={() =>
                this.props.history.push("/admin/addemployee/" + employee.id)
              }
            >
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </div>
            <div
              className="delete-btn ml-3"
              onClick={() => this.handelDelete(employee.id)}
            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </div>
            <button
              disabled={!employee.totalSalary}
              onClick={() =>
                this.props.history.push(
                  "/admin/employees/employeePay/" + employee.id
                )
              }
              className=" btn btn-primary ml-5 pay  animated shake"
            >
              Pay
            </button>
          </div>
        </div>
        <CertificateTable certificates={certificates} />
      </React.Fragment>
    );
  }
}

export default EmployeeDetails;
