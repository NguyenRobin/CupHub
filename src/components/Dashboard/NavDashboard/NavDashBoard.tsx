"use client";

import React, { useState } from "react";
import "./NavDashboard.scss";
import { IoIosMenu, IoIosSearch } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";
import NavMenu from "../NavMenu/NavMenu";

function NavDashBoard() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClick() {
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      <nav className="nav-dashboard-container">
        <section className="nav-dashboard-container__admin">
          <section className="nav-dashboard-container__admin-profile">
            <Image
              height={44}
              width={44}
              src="/IFK_Uppsala_logo.svg.png"
              alt="user profile image"
            />
          </section>
          <IoIosNotificationsOutline />
          <CiSearch />
        </section>

        <section className="nav-dashboard-container__icons">
          <section
            className="nav-dashboard-container__hamburger"
            onClick={handleOnClick}
          >
            {!isOpen ? (
              <IoIosMenu
                size={30}
                className="nav-dashboard-container__hamburger-icon"
              />
            ) : (
              <RxCross2
                size={30}
                className="nav-dashboard-container__hamburger-icon"
              />
            )}
          </section>
        </section>
      </nav>

      {isOpen && (
        <Modal isOpen={isOpen}>
          <NavMenu />
        </Modal>
      )}
    </>
  );
}

export default NavDashBoard;
