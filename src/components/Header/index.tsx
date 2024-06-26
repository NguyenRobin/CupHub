"use client";
import { IoIosMenu } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import "./header.scss";
import { useState } from "react";
import Modal from "../Modal";
import NavBar from "../Navbar";
import { GiSoccerBall } from "react-icons/gi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <header className="header">
        <section className="header-logo">
          {/* <h2>TO</h2> */}
          <GiSoccerBall color="green" size={45} />
        </section>

        <section className="header-icons">
          <section className="">
            <IoIosSearch size={30} className="icon" />
          </section>

          <section className="header-icons__hamburger" onClick={handleOnClick}>
            {!isOpen ? (
              <IoIosMenu size={30} className="icon" />
            ) : (
              <RxCross2 size={30} className="icon" />
            )}
          </section>
        </section>
      </header>
      {isOpen && (
        <Modal isOpen={isOpen}>
          <NavBar />
        </Modal>
      )}
    </>
  );
}

export default Header;
