'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { GoTrophy } from 'react-icons/go';
import { GrContact } from 'react-icons/gr';
import { IoIosContact } from 'react-icons/io';
import {
  MdLiveTv,
  MdOutlineAdminPanelSettings,
  MdOutlinePayment,
} from 'react-icons/md';
import { TbTournament } from 'react-icons/tb';
import './Features.scss';

const dummyData = [
  {
    id: 'tournament',
    icon: <GoTrophy className="icon" />,
    title: 'Turneringsskapare',
    content:
      'Vår turneringsskapare låter dig skapa och hantera turneringar med några få klick. Anpassa format, regler och deltagarlistor enkelt och håll koll på all nödvändig information på ett ställe. Med ett användarvänligt gränssnitt blir det enkelt att organisera professionella turneringar.',
  },
  {
    id: 'team-administration',
    icon: <MdOutlineAdminPanelSettings className="icon" />,
    title: 'Lagadministration',
    content:
      'Hantera lagens information effektivt med vår lagadministrationsfunktion. Du kan enkelt lägga till, ta bort och redigera spelare och personal. Håll koll på kontaktinformation, betalningsstatus och andra viktiga detaljer för varje lag.',
  },
  // {
  //   id: 'players-information',
  //   icon: <IoIosContact className="icon" />,
  //   title: 'Spelinformation',
  //   content:
  //     'Ge spelare och fans all nödvändig spelinformation direkt i appen. Från matchtider och platser till domarlistor och resultat - allt är lättillgängligt. Med pushnotiser håller alla sig uppdaterade med de senaste ändringarna.',
  // },
  {
    id: 'schedule',
    icon: <TbTournament className="icon" />,
    title: 'Lottning av spelschema',
    content:
      'Slipp manuella misstag och spara tid med vår spelschemagenerator. Den automatiserar schemaläggningen baserat på dina inställningar och förutsättningar, vilket gör det enkelt att skapa rättvisa och balanserade spelscheman.',
  },
  {
    id: 'live-tv',
    icon: <MdLiveTv className="icon" />,
    title: 'Liveresultat',
    content:
      'Håll engagemanget uppe med liveresultat och uppdateringar i realtid. Följ matchens utveckling direkt i appen och ge fansen en upplevelse som om de vore på plats.',
  },
  {
    id: 'payments',
    icon: <MdOutlinePayment className="icon" />,
    title: 'Betalningshantering',
    content:
      'Hantera alla betalningar smidigt och säkert. Vår betalningshanteringsfunktion gör det enkelt att ta emot betalningar för turneringsavgifter, lagavgifter och annat. Du får en tydlig översikt över alla transaktioner och kan enkelt följa upp obetalda fakturor.',
  },
  {
    id: 'communication',
    icon: <GrContact className="icon" />,
    title: 'Kommunikation',
    content:
      'Förbättra kommunikationen med våra verktyg för meddelanden och notifikationer. Skicka viktiga meddelanden till hela laget eller specifika grupper och säkerställ att ingen missar viktig information. Med inbyggd chatt och e-postintegration blir kommunikationen smidigare än någonsin.',
  },
];

function Features() {
  const [scrollToElement, setScrollToElement] = useState<string | null>(null);

  function handleClick(event: React.SyntheticEvent) {
    event.preventDefault();

    const id = event.currentTarget.id;
    const element = document.getElementById(String(id)) as HTMLElement;
    const yOffset = -200;
    const y = element?.getBoundingClientRect()?.top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setScrollToElement(id);
  }

  function handleScrollTo(id: string) {
    setScrollToElement(id);

    const element = document.getElementById(String(id)) as HTMLElement;
    const yOffset = -200;
    const y = element?.getBoundingClientRect()?.top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  return (
    <>
      <section className="features-container">
        <section className="features-container__title">
          <h2>Funktioner</h2>
          <p>
            Skapa, hantera och marknadsför dina turneringar med några få klick.
          </p>
        </section>

        <ul className="features-container__items">
          {dummyData.map((feature) => (
            <li key={feature.id} onClick={() => handleScrollTo(feature.id)}>
              <span>{feature.icon}</span>
              {feature.title}
            </li>
          ))}
        </ul>
      </section>

      <section className="feature-container">
        {dummyData.map((feature) => (
          <section
            key={feature.id}
            className={`feature-container__feature
      ${scrollToElement === feature.id ? 'scroll-to-view' : ''}`}
            id={feature.id}
            onClick={handleClick}
          >
            <i className="icon">{feature.icon}</i>

            <section>
              <h2>{feature.title}</h2>
              <p>{feature.content}</p>
              {scrollToElement === feature.id && (
                <Link href={feature.id}>Läs mer</Link>
              )}
            </section>
          </section>
        ))}
      </section>
    </>
  );
}

export default Features;
