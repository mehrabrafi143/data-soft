import React, { Component } from "react";
import { GetEmployeeCaculation } from "../../service/employeeCalculation/employeeCalculation";
import Spiner from "./../spiner/spiner";

class DashBoard extends Component {
  state = {
    employeeCalculation: [],
    loader: false
  };

  async componentWillMount() {
    try {
      const { data: employeeCalculation } = await GetEmployeeCaculation();
      if (employeeCalculation)
        this.setState({ Loader: false, employeeCalculation });
    } catch (error) {}
  }

  render() {
    const { employeeCalculation, loader } = this.state;

    return (
      <React.Fragment>
        <Spiner loader={loader} />
        <div className="section-top-title">
          <i className="fa fa-home"></i> Dashboard
        </div>
        <div className=" row">
          <div className="col-4">
            <div className="generic-card">
              <div className="generic-card__title">
                <i class="fa fa-user" aria-hidden="true"></i> Total Employees
              </div>
              <div className="generic-card__body">
                {employeeCalculation[0]}
                <p>Employees</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="generic-card">
              <div className="generic-card__title">
                <i class="fa fa-check-circle" aria-hidden="true"></i> Active
                Employees
              </div>
              <div className="generic-card__body">
                {employeeCalculation[1]}
                <p>Active Employees</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="generic-card">
              <div className="generic-card__title">
                <i class="fa fa-user-times" aria-hidden="true"></i> Ex Employees
              </div>
              <div className="generic-card__body">
                {employeeCalculation[2]}
                <p>Ex Employees</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 row">
          <div className="col-4">
            <div className="generic-card">
              <div className="generic-card__title">
                <i class="fa fa-male" aria-hidden="true"></i>
                Male Employees
              </div>
              <div className="generic-card__body">
                {employeeCalculation[3]}
                <p>Male Employee</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="generic-card">
              <div className="generic-card__title">
                <i class="fa fa-female" aria-hidden="true"></i> Female Employees
              </div>
              <div className="generic-card__body">
                {employeeCalculation[4]}
                <p>Female Employees</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="generic-card">
              <div className="generic-card__title">
                {" "}
                <i class="fa fa-users" aria-hidden="true"></i> Others
              </div>
              <div className="generic-card__body">
                234
                <p>Female Seats</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashBoard;
