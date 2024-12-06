import React from 'react';
import { IoMoonSharp } from 'react-icons/io5';
import './SwitchThemeMode.scss';
import { IoSunny } from 'react-icons/io5';
type Props = {
  isChecked: boolean;
  onChange: () => void;
};

function SwitchThemeMode({ isChecked, onChange }: Props) {
  return (
    <label className="switch-theme-mode">
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <div className="slider round">
        <IoSunny className="theme-light_mode" />
        <IoMoonSharp className="theme-dark_mode" />
      </div>
    </label>
  );
}

export default SwitchThemeMode;
