import React from "react";
import "./AuthInput.scss";
type Props = {
  htmlFor: string;
  labelText: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  errorMessage: string;
  onChange: (e: any) => void;
};

function AuthInput({
  htmlFor,
  labelText,
  type,
  name,
  placeholder,
  value,
  errorMessage,
  onChange,
}: Props) {
  return (
    <div className="auth-input">
      <label htmlFor={htmlFor}>{labelText}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${errorMessage ? "invalid" : ""}`}
        value={value}
        onChange={onChange}
      />

      {errorMessage && (
        <p className={`${errorMessage ? "invalid" : ""}`}>{errorMessage}</p>
      )}
    </div>
  );
}

export default AuthInput;
