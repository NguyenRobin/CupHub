import React from "react";
import "./Event.scss";
import Image from "next/image";
import { IoCreateOutline } from "react-icons/io5";
import Link from "next/link";

function Event() {
  return (
    <section className="event">
      <section className="event__title">
        <IoCreateOutline />
        <h2>Skapa och Hantera</h2>
      </section>

      <Link
        href="/dashboard/create-tournament/tournament"
        className="event__type"
      >
        <section className="event__type--information">
          <h3>Gruppspel + Slutspel</h3>
          <p>Varje grupp spelar en turnering där alla möter alla.</p>
        </section>

        <section className="event__type--image">
          <Image
            src="/golden-trophy-white-background.png"
            height={100}
            width={100}
            alt="cup"
          />
        </section>
      </Link>

      <Link href="/dashboard/create-tournament/cup" className="event__type">
        <section className="event__type--information">
          <h3>Serie</h3>
          <p>Lagen möts i en serie där alla spelar mot alla</p>
        </section>

        <section className="event__type--image">
          <Image
            src="/golden-trophy-white-background.png"
            height={100}
            width={100}
            alt="cup"
          />
        </section>
      </Link>

      <Link href="/dashboard/create-tournament/playoff" className="event__type">
        <section className="event__type--information">
          <h3>Slutspel</h3>
          <p>
            Utslagsturnering där vinnaren går vidare tills en mästare koras.
          </p>
        </section>

        <section className="event__type--image">
          <Image
            src="/golden-trophy-white-background.png"
            height={100}
            width={100}
            alt="cup"
          />
        </section>
      </Link>

      <Link href="/dashboard/create-tournament/playoff" className="event__type">
        <section className="event__type--information">
          <h3>Träningsläger</h3>
          <p>Arrangera träningsläger för ditt lag eller din förening</p>
        </section>

        <section className="event__type--image">
          <Image
            src="/golden-trophy-white-background.png"
            height={100}
            width={100}
            alt="cup"
          />
        </section>
      </Link>
    </section>
  );
}

export default Event;
