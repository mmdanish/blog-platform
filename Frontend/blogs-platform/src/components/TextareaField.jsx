import React from "react";

const TextareaField = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className="w-full border rounded p-2"
        rows="5"
        required
      />
    </div>
  );
};

export default TextareaField;
