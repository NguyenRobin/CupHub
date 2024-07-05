import React from "react";
import "./UpcomingEvent.scss";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

import Link from "next/link";

function UpcomingEvent() {
  return (
    <section className="upcomingEvent-container">
      <section className="upcomingEvent-container__title">
        <SlCalender />
        <h2>Kommande Evenemang</h2>
      </section>

      <section className="upcomingEvent">
        <section className="upcomingEvent__image">
          <section className="upcomingEvent__image-date">
            <p className="upcomingEvent__image-date--day">29</p>
            <p className="upcomingEvent__image-date--month">Juli</p>
          </section>
          <Image
            src="/IFK_Uppsala_logo.svg.png"
            height={60}
            width={60}
            alt="IFk"
          />
        </section>

        <section className="upcomingEvent__details">
          <h3>Lucia Cupen</h3>

          <section className="upcomingEvent__location">
            <MdLocationOn />
            <p>Uppsala, Sweden</p>
            {/* <Link href="#" className="upcomingEvent__location-info">
              Info
            </Link> */}
          </section>
        </section>
      </section>

      <section className="upcomingEvent">
        <section className="upcomingEvent__image">
          <section className="upcomingEvent__image-date">
            <p className="upcomingEvent__image-date--day">20</p>
            <p className="upcomingEvent__image-date--month">Aug</p>
          </section>
          <Image
            src="/IFK_Uppsala_logo.svg.png"
            height={60}
            width={60}
            alt="IFk"
          />
        </section>

        <section className="upcomingEvent__details">
          <h3>Fotbollsskola</h3>

          <section className="upcomingEvent__location">
            <MdLocationOn />
            <p>Uppsala, Sweden</p>
          </section>
        </section>
      </section>

      <section className="upcomingEvent">
        <section className="upcomingEvent__image">
          <section className="upcomingEvent__image-date">
            <p className="upcomingEvent__image-date--day">1</p>
            <p className="upcomingEvent__image-date--month">Sep</p>
          </section>
          <Image
            src="/IFK_Uppsala_logo.svg.png"
            height={60}
            width={60}
            alt="IFk"
          />
        </section>

        <section className="upcomingEvent__details">
          <h3>Gothia Cup</h3>

          <section className="upcomingEvent__location">
            <MdLocationOn />
            <p>Uppsala, Sweden</p>
          </section>
        </section>
      </section>
    </section>
  );
}

export default UpcomingEvent;
