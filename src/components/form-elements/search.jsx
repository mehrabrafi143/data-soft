import React from "react";

const SearchBox = ({ onQuery, query }) => {
  return (
    <div class="input-group mb-3 search">
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={onQuery}
        value={query}
      />
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">
          <i className="fa fa-search"></i>
        </span>
      </div>
    </div>
  );
};

export default SearchBox;
