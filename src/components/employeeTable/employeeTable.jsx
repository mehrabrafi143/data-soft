import React, { Component } from "react";
import _ from "lodash";
import Paginate from "./../common/paginate/paginate";
import Pagination from "./../pagination/pagination";
import Table from "./../table/table";
import SearchBox from "./../form-elements/search";
import Spiner from "./../spiner/spiner";
import { Link } from "react-router-dom";
import { GetEmployees } from "./../../service/employeeServices/employeeServices";

class EmployeeTable extends Component {
  state = {
    data: [],
    pageSize: 12,
    currentPage: 1,
    currentOrder: {
      name: "name",
      order: "asc"
    },
    query: "",
    loader: false
  };

  headerNames = [
    {
      label: "Name",
      content: employee => (
        <Link to={"/admin/employees/employeedetails/" + employee.id}>
          {employee.name}
        </Link>
      ),
      path: "name"
    },
    { label: "Address", path: "address" },
    { label: "Phone Number", path: "mobileNumber" },
    { label: "Position", path: "position" },
    { label: "Rate/Hour", path: "perHourRate" },
    { label: "Working Hours", path: "workingHours" }
  ];

  redirectTo = item => {
    this.props.history.push("/admin/addemployee/" + item.id);
  };

  async componentDidMount() {
    try {
      const { data } = await GetEmployees();
      if (data) this.setState({ data, loader: false });
    } catch (error) {
      console.log(error.response);
      this.setState({ loader: false });
    }
  }

  handelQuery = e => {
    const query = e.currentTarget.value;
    this.setState({ query, currentPage: 1 });
  };

  handelOrder = path => {
    const currentOrder = { ...this.state.currentOrder };
    if (currentOrder.name === path && currentOrder.order === "asc")
      currentOrder.order = "desc";
    else currentOrder.order = "asc";

    currentOrder.name = path;

    this.setState({ currentOrder });
  };

  handelPageChange = pagenum => {
    this.setState({ currentPage: pagenum });
  };

  render() {
    const {
      loader,
      pageSize,
      data,
      currentPage,
      currentOrder,
      query
    } = this.state;

    let item = query.trim()
      ? data.filter(f =>
          f.name.toLowerCase().includes(query.toLowerCase().trim())
        )
      : data;

    const count = item.length;

    const employee = Paginate(item, pageSize, currentPage);
    const filterdemployee = _.orderBy(
      employee,
      currentOrder.name,
      currentOrder.order
    );
    return (
      <React.Fragment>
        <div className="section-top-title">
          <i class="fa fa-briefcase" aria-hidden="true"></i> Employees
        </div>
        <div className="row">
          <Spiner loader={loader} />
          <SearchBox onQuery={this.handelQuery} query={query} />
          <Table
            headerNames={this.headerNames}
            data={filterdemployee}
            orderBy={this.handelOrder}
          />
          <Pagination
            onPageChange={this.handelPageChange}
            pageSize={pageSize}
            count={count}
            currentPage={currentPage}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeTable;
