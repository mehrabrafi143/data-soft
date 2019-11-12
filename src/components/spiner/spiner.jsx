import React from "react";
import gif from "../../assets/5.gif";

const Spiner = ({ loader }) => {
  return loader ? (
    <div className="full-body">
      <div className="center">
        <img src={gif} alt="loading" />
      </div>
    </div>
  ) : null;
};

export default Spiner;
