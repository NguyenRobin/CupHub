import Link from "next/link";
import "./Navbar.scss";
import { AiOutlineHome } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { IoMoonSharp } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

function NavBar() {
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
    <nav className="nav-container">
      <ul>
        <li className="list">
          <AiOutlineHome className="list-icon" />
          <Link className="list-link" href="/">
            Hem
          </Link>
        </li>

        <li className="list">
          <GrGroup className="list-icon" />
          <Link className="list-link" href="/turneringar">
            Turneringar
          </Link>
        </li>

        <li className="list">
          <GrGroup className="list-icon" />
          <Link className="list-link" href="/about">
            Om Oss
          </Link>
        </li>

        <li className="list">
          <BsSend className="list-icon" />
          <Link className="list-link" href="/contact-us">
            Kontakt
          </Link>
        </li>
      </ul>

      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={handleIsChecked} />
        <span className="slider round">
          <IoMoonSharp className="theme-dark_mode" />
          <GoSun className="theme-light_mode" />
        </span>
      </label>
    </nav>
  );
}

export default NavBar;
