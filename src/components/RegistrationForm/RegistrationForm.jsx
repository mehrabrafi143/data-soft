import React from "react";
import Joi from "joi-browser";
import Form from "../form/form";
import Spiner from "./../spiner/spiner";
import { registration } from "../../service/authService/authService";
import { GetEmployee } from "../../service/employeeServices/employeeServices";

class RegistrationForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      confirmPassword: "",
      employeeId: ""
    },
    errors: {
      email: "",
      password: "",
      confirmPassword: "",
      employeeId: ""
    },
    loader: false
  };

  schema = {
    email: Joi.string()
      .required()
      .min(5)
      .max(50)
      .label("Email"),
    password: Joi.string()
      .required()
      .min(6)
      .label("password"),
    confirmPassword: Joi.string()
      .required()
      .min(6)
      .label("password"),
    employeeId: Joi.number().required()
  };

  validLanding = async () => {
    const employeeId = this.props.match.params.id;

    if (employeeId === undefined) {
      this.props.history.push("/admin/employee");
    }
    try {
      const { data: employee } = await GetEmployee(employeeId);
      const { data } = this.state;
      data.employeeId = employeeId;
      this.setState({ data });
    } catch (error) {
      this.props.history.push("/admin/employee");
    }
  };

  componentWillMount() {
    this.validLanding();
  }

  dosubmit = async () => {
    this.setState({ loader: true });
    try {
      const { data } = await registration(this.state.data);
      this.props.history.push("/admin/employees");
    } catch (error) {
      this.ShowServerErrors(error);
      this.setState({ loader: false });
    }
  };

  render() {
    const { data, errors, loader } = this.state;

    return (
      <React.Fragment>
        <Spiner loader={loader} />
        <h2 className="section-top-title">
          <i class="fa fa-user-plus" aria-hidden="true"></i> Registration Form{" "}
        </h2>
        <p className="form-text text-danger">{this.state.genericErrors}</p>
        <div className="row">
          <form className="form col-6" onSubmit={this.handelSubmit}>
            {this.renderInput(
              "email",
              data.email,
              "Enter email",
              errors.email,
              "email"
            )}
            {this.renderInput(
              "password",
              data.password,
              "Enter password",
              errors.password,
              "password"
            )}
            {this.renderInput(
              "confirmPassword",
              data.confirmPassword,
              "Confirm password",
              errors.confirmPassword,
              "password"
            )}
            {this.renderButton("Register")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RegistrationForm;
