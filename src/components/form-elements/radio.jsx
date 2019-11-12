import React from "react";

const Input = ({ name, value, type = "text", label, error, onChange, id }) => {
  return (
    <div className="form__element">
      <input
        type={type}
        className="form__input"
        id={name}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        id={id}
      />
      <small id="emailHelp" className="form-text text-danger">
        {error ? error : null}
      </small>
    </div>
  );
};

export default Input;
