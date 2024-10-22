import Link from "next/link";
import "./NavMenu.scss";
import { AiOutlineHome } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";

import { useEffect, useState } from "react";
import SwitchThemeMode from "../../../switch-theme-mode/SwitchThemeMode";
import { useTheme } from "../../../../context/ThemeContext";

function NavMenu() {
  const { theme, toggleTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  function handleIsChecked() {
    setIsChecked((prev) => !prev);
    toggleTheme();
  }

  useEffect(() => {
    if (theme === "dark") {
      setIsChecked(true);
    }
  }, [theme]);

  return (
    <nav className="nav-menu">
      <ul className="nav-menu__ul">
        <li className="nav-menu__ul--list">
          <AiOutlineHome className="nav-menu__ul--list-icon" />
          <Link className="nav-menu__ul--list-link" href="/">
            Hem
          </Link>
        </li>

        <li className="nav-menu__ul--list">
          <GrGroup className="nav-menu__ul--list-icon" />
          <Link className="nav-menu__ul--list-link" href="/turneringar">
            Turneringar
          </Link>
        </li>

        <li className="nav-menu__ul--list">
          <GrGroup className="nav-menu__ul--list-icon" />
          <Link className="nav-menu__ul--list-link" href="/about">
            Om Oss
          </Link>
        </li>

        <li className="nav-menu__ul--list">
          <BsSend className="nav-menu__ul--list-icon" />
          <Link className="nav-menu__ul--list-link" href="/contact-us">
            Kontakt
          </Link>
        </li>
      </ul>

      <SwitchThemeMode isChecked={isChecked} onChange={handleIsChecked} />
    </nav>
  );
}

export default NavMenu;
