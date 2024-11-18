'use client';

import React, { useEffect, useState } from 'react';
import { RxDashboard } from 'react-icons/rx';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { SlEvent } from 'react-icons/sl';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { GrChatOption } from 'react-icons/gr';
import { RiTeamLine } from 'react-icons/ri';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Link from 'next/link';
import './NavMenuDashboard.scss';
import { useTheme } from '../../../../context/ThemeContext';
import SwitchThemeMode from '../../../ui/switch-theme-mode/SwitchThemeMode';
import { useRouter } from 'next/navigation';

type Props = {
  closeModal?: () => void;
};

const categories = [
  {
    category: 'Dashboard',
    icon: <RxDashboard />,
  },
  {
    category: 'Evenemang',
    subCategories: [
      { title: 'Evenemang', href: '/events' },
      { title: 'Skapa Evenemang', href: '/create-event' },
      { title: 'Hantera Evenemang', href: '/update-event' },
    ],
    icon: <SlEvent />,
  },
  {
    category: 'Lag och Medlemmar',
    subCategories: [
      { title: 'Skapa Lag', href: '/create-teams' },
      { title: 'Hantera Lag', href: '/update-teams' },
      { title: 'Medlemslista', href: '/team-memberships' },
    ],
    icon: <RiTeamLine />,
  },
  {
    category: 'Kommunikation',
    subCategories: [
      { title: 'Meddelanden', href: '/messages' },
      { title: 'Notiser', href: '/notifications' },
      { title: 'Forum / Diskussionsgrupper', href: '/forms' },
    ],
    icon: <GrChatOption />,
  },

  {
    category: 'Betalning',
    subCategories: [
      { title: 'Fakturor och Betalningar', href: '/payments' },
      { title: 'Prenumerationer', href: '/subscriptions' },
    ],
    icon: <RiSecurePaymentLine />,
  },

  {
    category: 'Inställningar',
    subCategories: [
      { title: 'Profilinställningar', href: '/profile-settings' },
      { title: 'Systeminställningar', href: '/system-settings' },
      { title: 'Notisinställningar', href: '/notifications-settings' },
    ],
    icon: <IoSettingsOutline />,
  },
  {
    category: 'Support och Hjälp',
    subCategories: [
      { title: 'Hjälpcenter', href: '/help' },
      { title: 'Kontakt Support', href: '/contact' },
      { title: 'Feedback', href: '/feedback' },
    ],
    icon: <IoIosHelpCircleOutline />,
  },
];

function NavMenuDashboard({ closeModal }: Props) {
  const { theme, toggleTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const [showMenu, setShowMenu] = useState<string | null>('Dashboard');
  const router = useRouter();

  function handleIsChecked() {
    setIsChecked((prev) => !prev);
    toggleTheme();
  }

  useEffect(() => {
    if (theme === 'dark') {
      setIsChecked(true);
    }
  }, [theme]);

  function handleOnClick(title: string) {
    if (title === 'Dashboard') {
      router.push('/dashboard');
    }

    setShowMenu((prev) => (prev === title ? null : title));
  }

  return (
    <nav className="nav-menu-dashboard">
      {categories.map((category) => {
        return (
          <section
            key={category.category}
            className={`nav-menu-dashboard__category ${
              showMenu === category.category && 'active'
            }`}
            onClick={() => handleOnClick(category.category)}
          >
            <section className="nav-menu-dashboard__menu">
              <section className="nav-menu-dashboard__title">
                {category.icon}
                <p>{category.category}</p>
              </section>

              <section className="nav-menu-dashboard__arrow">
                {showMenu === category.category &&
                category.subCategories?.length ? (
                  <MdKeyboardArrowDown className="arrow" />
                ) : (
                  category.category !== 'Dashboard' && (
                    <MdKeyboardArrowRight className="arrow" />
                  )
                )}
              </section>
            </section>
            {showMenu === category.category && category.subCategories && (
              <ul className="nav-menu-dashboard__subcategory">
                {category.subCategories?.map((subCat) => {
                  return (
                    <Link
                      key={subCat.href}
                      href={subCat.href}
                      onClick={closeModal}
                    >
                      {subCat.title}
                    </Link>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}

      <section className="nav-menu-dashboard__theme-settings">
        <SwitchThemeMode isChecked={isChecked} onChange={handleIsChecked} />
      </section>
    </nav>
  );
}

export default NavMenuDashboard;
