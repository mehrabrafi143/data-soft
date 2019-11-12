import React from "react";
import Form from "./../form/form";
import Joi from "joi-browser";
import Spiner from "../spiner/spiner";
import { GetEmployee } from "./../../service/employeeServices/employeeServices";
import Select from "react-dropdown-select";
import { Link } from "react-router-dom";
import {
  GetCertificates,
  AddEmployeeCertificateFun
} from "./../../service/certificateServices/certificateServices";

class AddEmployeeCertificate extends Form {
  state = {
    data: {
      certificateId: "",
      grade: "",
      employeeId: ""
    },
    errors: {
      certificateId: "",
      grade: "",
      employeeId: ""
    },
    certificates: [],
    loader: false,
    userId: ""
  };

  divStyle = {
    borderRadius: "2rem",
    padding: "2rem",
    boder: "none",
    outline: "none",
    boxShadow: "2px 2px 2px rgba($color: #000000, $alpha: 0.1)",
    fontSize: "1.6rem"
  };

  schema = {
    certificateId: Joi.number().required(),
    grade: Joi.number()
      .required()
      .min(1)
      .max(5),
    employeeId: Joi.number().required()
  };

  validLanding = async () => {
    const employeeId = this.props.match.params.id;
    if (!employeeId) {
      this.props.history.push("/admin/employee");
    }

    try {
      const { data: employee } = await GetEmployee(employeeId);
      const { data } = this.state;
      data.employeeId = employeeId;
      this.setState({ data, userAccountId: employee.userAccountId });
    } catch (error) {
      this.props.history.push("/admin/employee");
    }
  };

  loadingCertificates = async () => {
    try {
      this.setState({ loader: true });
      const { data: certificates } = await GetCertificates();
      if (certificates) this.setState({ certificates, loader: false });
    } catch (error) {
      this.setState({ loader: false });
    }
  };

  async componentWillMount() {
    this.validLanding();
    this.loadingCertificates();
  }

  setValue = v => {
    const { data } = this.state;
    if (v) {
      data.certificateId = v[0].id;
      this.setState({ data });
    }
  };

  dosubmit = async () => {
    this.setState({ loader: true });
    try {
      const { data: res } = await AddEmployeeCertificateFun(this.state.data);
      if (res) {
        const { data } = this.state;
        data.grade = "";
        this.setState({
          data,
          loader: false
        });
      }
    } catch (error) {
      this.setState({ loader: false });
    }
  };

  render() {
    const { data, errors, certificates, loader } = this.state;

    return (
      <React.Fragment>
        <Spiner loader={loader} />
        <div className="section-top-title">
          <i class="fa fa-graduation-cap" aria-hidden="true"></i> Certificates
          &amp; grade point
        </div>
        <div className="row">
          <form className="col-6 form" onSubmit={this.handelSubmit}>
            <div className="form__element">
              <Select
                create
                placeholder="Certificate Name"
                options={certificates}
                onChange={v => this.setValue(v)}
                labelField="name"
                valueField="id"
                style={this.divStyle}
              />
            </div>
            {this.renderInput(
              "grade",
              data.grade,
              "CGPA",
              errors.grade,
              "text"
            )}
            {this.renderButton("save")}
          </form>
        </div>
        {this.state.userAccountId ? (
          <div className="tex-link text-primary mt-md">
            {" "}
            <i class="fa fa-check" aria-hidden="true"></i> Have User Access
          </div>
        ) : (
          <Link
            className="text-link mt-md"
            to={"/admin/addemployee/reg/" + this.props.match.params.id}
          >
            <i class="fa fa-check" aria-hidden="true"></i> Assign User Access
          </Link>
        )}
      </React.Fragment>
    );
  }
}

export default AddEmployeeCertificate;
