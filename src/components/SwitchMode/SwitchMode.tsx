import React from "react";
import { GoSun } from "react-icons/go";
import { IoMoonSharp } from "react-icons/io5";
import "./SwitchMode.scss";

type Props = {
  isChecked: boolean;
  onChange: () => void;
};
function SwitchMode({ isChecked, onChange }: Props) {
  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span className="slider round">
        <IoMoonSharp className="theme-dark_mode" />
        <GoSun className="theme-light_mode" />
      </span>
    </label>
  );
}

export default SwitchMode;
