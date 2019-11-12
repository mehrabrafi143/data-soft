import React from "react";
import { Link } from "react-router-dom";

const Mainbar = () => {
  return (
    <div className="mainbar">
      <ul className="mainbar__nav">
        <li>
          <i class="fa fa-bell" aria-hidden="true"></i>
        </li>
        <li>
          <Link to="/admin/dashboard/changepassword">
            <i class="fa fa-key" aria-hidden="true"></i> Change Password
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Mainbar;
