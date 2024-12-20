'use client';
import React, { useState } from 'react';
import './UpcomingEvents.scss';
import Image from 'next/image';
import { MdLocationOn } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import { getMonthName } from '../../../../../lib/client';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import CardWrapper from '../../../../ui/card-wrapper/CardWrapper';

function UpcomingEvents({ events }) {
  return (
    <CardWrapper>
      <section className="upcoming-events__title">
        <SlCalender />
        <h2>Kommande Evenemang</h2>
      </section>

      <Events events={events} />
    </CardWrapper>
  );
}

export default UpcomingEvents;

function Events({ events }) {
  const [isShowingAll, setIsShowingAll] = useState(false);

  if (events?.length === 0) {
    return <p>Inga kommande evenemang. 😢</p>;
  }

  const showEvents = events.map((el) => (
    <Event
      id={el._id}
      key={el._id}
      day={el.startDate.split('T')[0].split('-')[2]}
      month={getMonthName(+el.startDate.split('T')[0].split('-')[1])}
      name={el.name}
      location={el.location}
    />
  ));

  const showThreeEvents = events
    .slice(0, 3)
    .map((el) => (
      <Event
        id={el._id}
        key={el._id}
        day={el.startDate.split('T')[0].split('-')[2]}
        month={getMonthName(+el.startDate.split('T')[0].split('-')[1])}
        name={el.name}
        location={el.location}
      />
    ));

  const showAllEvents = events.map((el) => (
    <Event
      id={el._id}
      key={el._id}
      day={el.startDate.split('T')[0].split('-')[2]}
      month={getMonthName(+el.startDate.split('T')[0].split('-')[1])}
      name={el.name}
      location={el.location}
    />
  ));

  return (
    <section className="events">
      {events.length <= 3 && !isShowingAll && showEvents}

      {events.length > 3 && !isShowingAll && showThreeEvents}

      {isShowingAll && showAllEvents}

      {events.length > 3 && (
        <p
          className="events__show"
          onClick={() => setIsShowingAll((prev) => !prev)}
        >
          {`${!isShowingAll ? 'Visa mer' : 'Visa mindre'}`}
          <span>{!isShowingAll ? <MdExpandMore /> : <MdExpandLess />}</span>
        </p>
      )}
    </section>
  );
}

function Event({ day, month, name, location, id }) {
  const router = useRouter();
  return (
    <section
      className="event"
      onClick={() => router.push(`/dashboard/tournaments/${id}/overview`)}
    >
      <section className="event__image">
        <section className="event__image-date">
          <p className="event__image-date--day">{day}</p>
          <p className="event__image-date--month">{month}</p>
        </section>
      </section>

      <section className="event__details">
        <h3>{name}</h3>

        <section className="event__location">
          <MdLocationOn />
          <p>{location}</p>
        </section>
      </section>
    </section>
  );
}
