'use client';
import './NavBar.scss';
import { GiSoccerBall } from 'react-icons/gi';
import { IoIosMenu } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import NavMenu from '../NavMenu/NavMenu';
import Modal from '../../../ui/modal/Modal';
import { useState } from 'react';

function NavBar() {
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

export default NavBar;
