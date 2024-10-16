import React from 'react';
import CardWrapper from '../../../card-wrapper/CardWrapper';
import './UpcomingMatches.scss';
import { LuCalendarClock } from 'react-icons/lu';

function UpcomingMatches() {
  return (
    <CardWrapper>
      <section className="upcoming-matches__title">
        <LuCalendarClock />
        <h2>Kommande matcher</h2>
      </section>
      <section className="upcoming-matches__scheduled">
        <p>Inga kommande matcher.</p>
      </section>
      <section className=""></section>
    </CardWrapper>
  );
}

export default UpcomingMatches;
