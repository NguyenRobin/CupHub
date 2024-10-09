import React from "react";
import "./EventSelection.scss";
import Image from "next/image";
import { IoCreateOutline } from "react-icons/io5";
import Link from "next/link";

function EventSelection() {
  return (
    <section className="event-selection">
      <section className="event-selection__title">
        <IoCreateOutline />
        <h2>Skapa och Hantera</h2>
      </section>

      <Link href="/dashboard/tournaments/new" className="event-selection__type">
        <section className="event-selection__type--information">
          <h3>Gruppspel + Slutspel</h3>
          <p>Varje grupp spelar en turnering där alla möter alla.</p>
        </section>

        <section className="event-selection__type--image">
          <Image
            src="/golden-trophy-white-background.png"
            height={100}
            width={100}
            alt="cup"
          />
        </section>
      </Link>

      <Link href="/dashboard/tournament/new" className="event-selection__type">
        <section className="event-selection__type--information">
          <h3>Serie</h3>
          <p>Lagen möts i en serie där alla spelar mot alla</p>
        </section>

        <section className="event-selection__type--image">
          <Image
            src="/golden-trophy-white-background.png"
            height={100}
            width={100}
            alt="cup"
          />
        </section>
      </Link>

      <Link
        href="/dashboard/create-tournament/playoff"
        className="event-selection__type"
      >
        <section className="event-selection__type--information">
          <h3>Slutspel</h3>
          <p>
            Utslagsturnering där vinnaren går vidare tills en mästare koras.
          </p>
        </section>

        <section className="event-selection__type--image">
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

export default EventSelection;
