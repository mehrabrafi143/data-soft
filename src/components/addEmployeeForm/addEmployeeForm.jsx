import React from "react";
import Form from "./../form/form";
import Joi from "joi-browser";
import Spiner from "../spiner/spiner";
import {
  AddEmployee,
  GetEmployee
} from "./../../service/employeeServices/employeeServices";
import Select from "react-dropdown-select";

class AddEmployeeForm extends Form {
  state = {
    data: {
      id: 0,
      name: "",
      address: "",
      mobileNumber: "",
      position: "",
      perHourRate: "",
      gender: ""
    },
    errors: {
      id: "",
      name: "",
      address: "",
      mobileNumber: "",
      position: "",
      perHourRate: "",
      gender: ""
    },
    selectedItems: [],
    genericErrors: "",
    servicePriceError: "",
    loader: false,
    title: ""
  };

  divStyle = {
    borderRadius: "2rem",
    padding: "2rem",
    boder: "none",
    outline: "none",
    boxShadow: "2px 2px 2px rgba($color: #000000, $alpha: 0.1)",
    fontSize: "1.6rem"
  };

  genders = [{ name: "Male" }, { name: "Female" }];

  schema = {
    id: Joi.number(),
    name: Joi.string()
      .required()
      .max(50)
      .min(3),
    address: Joi.string()
      .required()
      .max(100),
    mobileNumber: Joi.number().required(),
    position: Joi.string()
      .required()
      .max(100)
      .min(3),
    perHourRate: Joi.number().required(),
    gender: Joi.string().required()
  };

  async componentWillMount() {
    const id = this.props.match.params.id;

    this.renderTitle(id);
    try {
      if (id) {
        this.setState({ loader: true });
        const { data: emp } = await GetEmployee(id);

        if (emp) {
          const data = {
            id: emp.id,
            name: emp.name,
            address: emp.address,
            mobileNumber: emp.mobileNumber,
            position: emp.position,
            perHourRate: emp.perHourRate,
            gender: emp.gender
          };
          this.setState({ data, loader: false });
        }
      }
    } catch (error) {
      this.setState({ loader: false });
    }
  }

  renderTitle = id => {
    id === undefined
      ? this.setState({
          title: (
            <div className="">
              <i className="fa fa-plus"></i> <span> Add Employee</span>
            </div>
          )
        })
      : this.setState({
          title: (
            <div className="">
              <i className="fa fa-edit"></i>{" "}
              <span> Update Employee Information</span>
            </div>
          )
        });
  };

  setValue = v => {
    const { data } = this.state;
    if (v) {
      data.gender = v[0].name;
      this.setState({ data });
    }
  };

  dosubmit = async () => {
    this.setState({ loader: true });
    try {
      const { data } = await AddEmployee(this.state.data);
      if (data)
        this.props.history.push(
          "/admin/addEmployee/addemployeeCertificate/" + data.id
        );
    } catch (error) {
      this.setState({ genericErrors: error.response.data.message });
    }
  };

  render() {
    const { loader, data, errors, title } = this.state;

    return (
      <React.Fragment>
        <Spiner loader={loader} />
        <div className="section-top-title">{title}</div>
        <div className="row">
          <form className="col-6 form" onSubmit={this.handelSubmit}>
            {this.renderInput("name", data.name, "Name", errors.name, "text")}
            {this.renderInput(
              "address",
              data.address,
              "Address",
              errors.address,
              "text"
            )}
            {this.renderInput(
              "mobileNumber",
              data.mobileNumber,
              "Phone",
              errors.mobileNumber,
              "text"
            )}
            {this.renderInput(
              "position",
              data.position,
              "Position",
              errors.position,
              "text"
            )}
            {this.renderInput(
              "perHourRate",
              data.perHourRate,
              "Per hour rate",
              errors.perHourRate,
              "text"
            )}
            <div className="form__element">
              <Select
                create
                placeholder="Select Gender"
                values={
                  data.gender
                    ? [{ name: data.gender }]
                    : [{ name: "Select Gender" }]
                }
                options={this.genders}
                onChange={v => this.setValue(v)}
                className="form-input"
                labelField="name"
                valueField="name"
                style={this.divStyle}
              />
            </div>
            {this.renderButton("Save")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddEmployeeForm;
