import React from "react";

const InputBox = ({ label, id, name, value, onChange, type, placeholder }) => {
  return (
    <div>
      <label htmlFor={id}>{label} </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        required
      />
    </div>
  );
};

export default InputBox;
