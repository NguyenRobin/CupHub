'use client';
import './NavBar.scss';
import { GiSoccerBall } from 'react-icons/gi';
import { IoIosMenu } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import NavMenu from '../NavMenu/NavMenu';
import Modal from '../../../ui/modal/Modal';
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { GrGroup } from 'react-icons/gr';
import { BsSend } from 'react-icons/bs';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <nav className="nav">
        <section className="nav__logo">
          <GiSoccerBall onClick={() => setIsOpen(false)} size={45} />
        </section>

        <section className="nav__icons">
          <section className="">
            {/* <CiSearch size={30} className="nav-icons__search-icon" /> */}
          </section>

          <section className="nav__icon" onClick={handleOnClick}>
            {!isOpen ? (
              <IoIosMenu size={45} className="nav__icon--hamburger" />
            ) : (
              <RxCross2 size={45} className="nav__icon--cross" />
            )}
          </section>
        </section>

        <ul className="navbar">
          <li className="navbar__list" onClick={() => setIsOpen(false)}>
            <AiOutlineHome />
            <Link href="/">Hem</Link>
          </li>

          <li className="navbar__list" onClick={() => setIsOpen(false)}>
            <GrGroup />
            <Link href="/sport-events">Turneringar</Link>
          </li>

          <li className="navbar__list" onClick={() => setIsOpen(false)}>
            <GrGroup />
            <Link href="/about">Om oss</Link>
          </li>

          <li className="navbar__list" onClick={() => setIsOpen(false)}>
            <BsSend />
            <Link href="/contact-us">Kontakt</Link>
          </li>

          <Link href="/dashboard" className="navbar__btn">
            Demo
          </Link>
        </ul>
      </nav>

      {isOpen && (
        <Modal isActive={isOpen}>
          <NavMenu closeModal={handleOnClick} />
        </Modal>
      )}
    </>
  );
}

export default NavBar;
