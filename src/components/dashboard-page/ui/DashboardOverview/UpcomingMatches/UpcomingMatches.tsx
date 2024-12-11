import React from 'react';
import CardWrapper from '../../../../ui/card-wrapper/CardWrapper';
import './UpcomingMatches.scss';
import { LuCalendarClock } from 'react-icons/lu';
import { getMatchesByStatus } from '../../../../../features/matches/server/actions/match';
import ListTournamentMatches from '../../../../../features/matches/components/ui/ListTournamentMatches/ListTournamentMatches';

async function UpcomingMatches({ matches }: any) {
  return (
    <CardWrapper>
      <section className="upcoming-matches__title">
        <LuCalendarClock />
        <h2>Kommande matcher</h2>
      </section>
      <section className="upcoming-matches__scheduled">
        {!matches?.length ? (
          <p>Inga kommande matcher.</p>
        ) : (
          <ListTournamentMatches matches={matches} />
        )}
      </section>
    </CardWrapper>
  );
}

export default UpcomingMatches;
