import React from 'react';
import teamDummyData from '../../../../dummyData/data.json';
import Image from 'next/image';
import './Testimonials.scss';
import { FaStar } from 'react-icons/fa';
function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <section className="testimonials__title">
        <h2>Vad våra nöjda kunder säger om Cup Maker</h2>
        <p>
          Hundratals turneringsarrangörer världen över litar på CupMaker för att
          effektivt hantera sina tävlingar. Oavsett om det gäller små lokala
          turneringar eller stora internationella evenemang, erbjuder vi en
          användarvänlig lösning som sparar tid och gör planeringen smidigare.
        </p>
      </section>

      <section className="testimonials__stars">
        <FaStar size={40} color="yellow" />
        <FaStar size={40} color="yellow" />
        <FaStar size={40} color="yellow" />
        <FaStar size={40} color="yellow" />
        <FaStar size={40} color="yellow" />
      </section>

      <section className="testimonials__slide">
        {teamDummyData.teams.map((team) => (
          <section className={`testimonials__item ${team.id}`} key={team.id}>
            <Image src={team.logo} height={100} width={100} alt={team.name} />
            <p>{team.name}</p>
          </section>
        ))}
      </section>
    </section>
  );
}

export default Testimonials;
