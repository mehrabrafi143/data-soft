import React, { Component } from "react";
import TableHead from "./Thead/thead";
import TableBody from "./tablebody/tableBody";

class Table extends Component {
  state = {};

  render() {
    const { headerNames, data, orderBy } = this.props;
    return (
      <table className="table">
        <TableHead headerNames={headerNames} orderBy={orderBy} />
        <TableBody headerNames={headerNames} data={data} />
      </table>
    );
  }
}

export default Table;
