'use client';

import React, { useState } from 'react';
import './NavBarDashboard.scss';
import { IoIosMenu, IoIosSearch } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { IoIosNotificationsOutline } from 'react-icons/io';
import Image from 'next/image';
import { CgProfile } from 'react-icons/cg';
import NavMenuDashboard from '../NavMenuDashboard/NavMenuDashboard';
import Modal from '../../../ui/modal/Modal';

function NavBarDashboard() {
  const [showNavigation, setShowNavigation] = useState(false);
  const [queryInput, setQueryInput] = useState('');

  function handleOnChangeQueryInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQueryInput(value);
  }

  function handleOnClick() {
    setShowNavigation((prev) => !prev);
  }

  return (
    <>
      <nav className="nav-dashboard-container">
        <section className="nav-dashboard-container__admin">
          <section className="nav-dashboard-container__profile-image">
            <Image
              height={44}
              width={44}
              src="/default-profile.jpg"
              alt="user profile image"
              priority
              className="image-icon"
            />
          </section>

          <section className="nav-dashboard-container__notification">
            <span className="nav-dashboard-container__notification--amount">
              1
            </span>
            <IoIosNotificationsOutline className="notification-icon" />
          </section>

          <section className="nav-dashboard-container__search">
            <CiSearch className="search-icon" />
          </section>

          <div className="nav-dashboard-container__search-bar">
            <input
              value={queryInput}
              placeholder="search..."
              onChange={handleOnChangeQueryInput}
              type="text"
              className="nav-dashboard-container__search-input"
            />
            <CiSearch
              size={30}
              className="nav-dashboard-container__search-bar-icon"
            />
          </div>
        </section>

        <section className="nav-dashboard-container__icons">
          <section
            className="nav-dashboard-container__hamburger"
            onClick={handleOnClick}
          >
            {!showNavigation ? (
              <IoIosMenu
                size={30}
                className="nav-dashboard-container__hamburger--icon"
              />
            ) : (
              <RxCross2
                size={30}
                className="nav-dashboard-container__hamburger--icon"
              />
            )}
          </section>
        </section>
      </nav>

      {showNavigation && (
        <Modal isActive={showNavigation}>
          <NavMenuDashboard closeModal={handleOnClick} />
        </Modal>
      )}
    </>
  );
}

export default NavBarDashboard;
