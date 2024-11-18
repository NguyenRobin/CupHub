import React from 'react';
import { GoSun } from 'react-icons/go';
import { IoMoonSharp } from 'react-icons/io5';
import './SwitchThemeMode.scss';

type Props = {
  isChecked: boolean;
  onChange: () => void;
};

function SwitchThemeMode({ isChecked, onChange }: Props) {
  return (
    <label className="switch-theme-mode">
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <div className="slider round">
        <GoSun className="theme-light_mode" />
        <IoMoonSharp className="theme-dark_mode" />
      </div>
    </label>
  );
}

export default SwitchThemeMode;
