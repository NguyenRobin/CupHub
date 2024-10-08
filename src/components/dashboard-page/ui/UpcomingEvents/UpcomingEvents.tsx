"use server";

import React, { Suspense } from "react";
import "./UpcomingEvents.scss";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { getMonthName } from "../../../../lib/client/clientHelperFunc";
import { cookies, headers } from "next/headers";
import { getUpcomingEvents } from "../../../../app/actions";

async function UpcomingEvents() {
  const events = await getUpcomingEvents();
  if (!events) {
    return [];
  }

  return (
    <section className="upcomingEvent-container">
      <section className="upcomingEvent-container__title">
        <SlCalender />
        <h2>Kommande Evenemang</h2>
      </section>

      {events?.tournaments.length === 0 ? (
        <p>Inga kommande evenemang. 😢</p>
      ) : (
        events.tournaments.map((el) => (
          <UpcomingEvent
            key={el._id}
            day={el.startDate.split("T")[0].split("-")[2]}
            month={getMonthName(+el.startDate.split("T")[0].split("-")[1])}
            name={el.name}
            location={el.location}
          />
        ))
      )}
    </section>
  );
}

export default UpcomingEvents;

function UpcomingEvent({ day, month, name, location }) {
  return (
    <section className="upcomingEvent">
      <section className="upcomingEvent__image">
        <section className="upcomingEvent__image-date">
          <p className="upcomingEvent__image-date--day">{day}</p>
          <p className="upcomingEvent__image-date--month">{month}</p>
        </section>
        <Image
          src="/IFK_Uppsala_logo.svg.png"
          height={60}
          width={60}
          alt="IFk"
        />
      </section>

      <section className="upcomingEvent__details">
        <h3>{name}</h3>

        <section className="upcomingEvent__location">
          <MdLocationOn />
          <p>{location}</p>
          {/* <Link href="#" className="upcomingEvent__location-info">
        Info
      </Link> */}
        </section>
      </section>
    </section>
  );
}
