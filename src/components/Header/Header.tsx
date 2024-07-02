"use client";
import { IoIosMenu } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import "./Header.scss";
import { useState } from "react";
import Modal from "../Modal/Modal";
import NavBar from "../Navbar/NavBar";
import { GiSoccerBall } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <header className="header">
        <section className="header-logo">
          {/* <Link href="/" onClick={() => setIsOpen(false)}> */}
          <GiSoccerBall
            onClick={() => setIsOpen(false)}
            color="green"
            size={45}
          />
          {/* </Link> */}
        </section>

        <section className="header-icons">
          <section className="">
            <CiSearch size={30} className="header-icons__search-icon" />
          </section>

          <section className="header-icons__hamburger" onClick={handleOnClick}>
            {!isOpen ? (
              <IoIosMenu size={30} className="header-icons__hamburger-icon" />
            ) : (
              <RxCross2 size={30} className="header-icons__hamburger-icon" />
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
