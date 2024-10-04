"use client";

import { IoIosMenu } from "react-icons/io";

import { RxCross2 } from "react-icons/rx";
import "./Nav.scss";
import { useState } from "react";

import NavMenu from "../NavMenu/NavMenu";
import { GiSoccerBall } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import Modal from "../../../modal/Modal";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <nav className="nav">
        <section className="nav-logo">
          {/* <Link href="/" onClick={() => setIsOpen(false)}> */}
          <GiSoccerBall
            onClick={() => setIsOpen(false)}
            color="green"
            size={45}
          />
          {/* </Link> */}
        </section>

        <section className="nav-icons">
          <section className="">
            <CiSearch size={30} className="nav-icons__search-icon" />
          </section>

          <section className="nav-icons__hamburger" onClick={handleOnClick}>
            {!isOpen ? (
              <IoIosMenu size={30} className="nav-icons__hamburger-icon" />
            ) : (
              <RxCross2 size={30} className="nav-icons__hamburger-icon" />
            )}
          </section>
        </section>
      </nav>
      {isOpen && (
        <Modal isActive={isOpen}>
          <NavMenu />
        </Modal>
      )}
    </>
  );
}

export default Nav;
