import React, { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { SlEvent } from "react-icons/sl";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrChatOption } from "react-icons/gr";
import { RiTeamLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import "./NavMenuDashboard.scss";
import SwitchThemeMode from "../../switch-theme-mode/SwitchThemeMode";
import { useTheme } from "../../../context/ThemeContext";

type Props = {
  closeModal: () => void;
};

function NavMenuDashboard({ closeModal }: Props) {
  const { theme, toggleTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const [showMenu, setShowMenu] = useState<string | null>(null);

  function handleIsChecked() {
    setIsChecked((prev) => !prev);
    toggleTheme();
  }

  useEffect(() => {
    if (theme === "dark") {
      setIsChecked(true);
    }
  }, [theme]);

  function handleOnClick(title: string) {
    setShowMenu((prev) => (prev === title ? null : title));
  }

  return (
    <nav className="nav-menu-dashboard">
      <Link
        href="/dashboard"
        onClick={closeModal}
        className={`nav-menu-dashboard__category ${
          showMenu === "dashboard" ? "active" : ""
        }`}
      >
        <section
          onClick={() => handleOnClick("dashboard")}
          style={{ alignSelf: "start" }}
        >
          <RxDashboard />
          <p>Dashboard</p>

          {/* {showMenu !== "dashboard" ? (
            <MdKeyboardArrowRight className="arrow" />
          ) : (
            <MdKeyboardArrowDown className="arrow" />
          )} */}
        </section>

        {/* {showMenu === "dashboard" && (
          <ul className="nav-menu-dashboard__subcategory">
            <li>Översikt</li>
          </ul>
        )} */}
      </Link>

      <section className="nav-menu-dashboard__category">
        <section onClick={() => handleOnClick("event")}>
          <SlEvent />
          <p>Evenemang</p>

          {showMenu !== "event" ? (
            <MdKeyboardArrowRight className="arrow" />
          ) : (
            <MdKeyboardArrowDown className="arrow" />
          )}
        </section>

        {showMenu === "event" && (
          <ul className="nav-menu-dashboard__subcategory">
            <li>Skapa Evenemang</li>
            <li>Hantera Evenemang</li>
            <li>Kalender</li>
          </ul>
        )}
      </section>

      <section className="nav-menu-dashboard__category">
        <section onClick={() => handleOnClick("team")}>
          <RiTeamLine />
          <p>Lag och Medlemmar</p>

          {showMenu !== "team" ? (
            <MdKeyboardArrowRight className="arrow" />
          ) : (
            <MdKeyboardArrowDown className="arrow" />
          )}
        </section>

        {showMenu === "team" && (
          <ul className="nav-menu-dashboard__subcategory">
            <li>Skapa Lag</li>
            <li>Hantera Lag</li>
            <li>Medlemslista</li>
          </ul>
        )}
      </section>

      <section className="nav-menu-dashboard__category">
        <section onClick={() => handleOnClick("communication")}>
          <GrChatOption />
          <p>Kommunikation</p>

          {showMenu !== "communication" ? (
            <MdKeyboardArrowRight className="arrow" />
          ) : (
            <MdKeyboardArrowDown className="arrow" />
          )}
        </section>

        {showMenu === "communication" && (
          <ul className="nav-menu-dashboard__subcategory">
            <li>Meddelanden</li>
            <li>Notiser</li>
            <li>Forum / Diskussionsgrupper</li>
          </ul>
        )}
      </section>

      <section className="nav-menu-dashboard__category">
        <section onClick={() => handleOnClick("payment")}>
          <RiSecurePaymentLine />
          <p>Betalning</p>

          {showMenu !== "payment" ? (
            <MdKeyboardArrowRight className="arrow" />
          ) : (
            <MdKeyboardArrowDown className="arrow" />
          )}
        </section>

        {showMenu === "payment" && (
          <ul className="nav-menu-dashboard__subcategory">
            <li>Fakturor och Betalningar</li>
            <li>Prenumerationer</li>
          </ul>
        )}
      </section>

      <section className="nav-menu-dashboard__category">
        <section onClick={() => handleOnClick("settings")}>
          <IoSettingsOutline />
          <p>Inställningar</p>

          {showMenu !== "settings" ? (
            <MdKeyboardArrowRight className="arrow" />
          ) : (
            <MdKeyboardArrowDown className="arrow" />
          )}
        </section>

        {showMenu === "settings" && (
          <ul className="nav-menu-dashboard__subcategory">
            <li>Profilinställningar</li>
            <li>Systeminställningar</li>
            <li>Notisinställningar</li>
          </ul>
        )}
      </section>

      <section className="nav-menu-dashboard__category">
        <section onClick={() => handleOnClick("help")}>
          <IoIosHelpCircleOutline />
          <p>Support och Hjälp</p>

          {showMenu !== "help" ? (
            <MdKeyboardArrowRight className="arrow" />
          ) : (
            <MdKeyboardArrowDown className="arrow" />
          )}
        </section>

        {showMenu === "help" && (
          <ul className="nav-menu-dashboard__subcategory">
            <li>Hjälpcenter</li>
            <li>Kontakt Support</li>
            <li>Feedback</li>
          </ul>
        )}
      </section>
      <SwitchThemeMode isChecked={isChecked} onChange={handleIsChecked} />
    </nav>
  );
}

export default NavMenuDashboard;
