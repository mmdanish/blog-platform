import React from "react";

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border rounded p-2"
        required
      />
    </div>
  );
};

export default InputField;
