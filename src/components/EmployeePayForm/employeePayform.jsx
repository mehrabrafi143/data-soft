import React from "react";
import Joi from "joi-browser";
import { EmployeesPay } from "./../../service/studentsPayService/studentsPay";
import Form from "./../form/form";
import Spiner from "./../spiner/spiner";
class EmployeePayForm extends Form {
  state = {
    data: {
      amount: ""
    },

    errors: {
      amount: ""
    },
    loader: false
  };

  schema = {
    amount: Joi.number().required()
  };

  dosubmit = async () => {
    this.setState({ loader: true });

    try {
      const data = {
        studentId: this.props.match.params.id,
        amount: this.state.data.amount
      };
      const { data: res } = await EmployeesPay(data);
      if (res) this.props.history.push("/admin/employee");
    } catch (error) {
      this.setState({
        loader: false
      });
    }
  };

  render() {
    const { data, errors, loader } = this.state;
    return (
      <div className="white-section">
        <div className="enter-padding">
          <Spiner loader={loader} />
          <h2 className="section-top-title">
            <i class="fa fa-credit-card" aria-hidden="true"></i> Paying Form{" "}
          </h2>
          <p className="form-text text-danger">{this.state.genericErrors}</p>
          <form className="form" onSubmit={this.handelSubmit}>
            {this.renderInput(
              "amount",
              data.amount,
              "Enter Amount",
              errors.amount
            )}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default EmployeePayForm;
