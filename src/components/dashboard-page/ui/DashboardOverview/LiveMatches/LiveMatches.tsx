import React, { Suspense } from 'react';
import CardWrapper from '../../../../ui/card-wrapper/CardWrapper';
import { RiLiveLine } from 'react-icons/ri';
import './LiveMatches.scss';
import { getMatchesByStatus } from '../../../../../features/matches/server/actions/match';
import ListTournamentMatches from '../../../../../features/matches/components/ui/ListTournamentMatches/ListTournamentMatches';

export default async function LiveMatches({ matches }: any) {
  return (
    <CardWrapper>
      <section className="live-matches__title">
        <RiLiveLine />
        <h2>Pågående matcher</h2>
      </section>

      <section className="live-matches__ongoing">
        {!matches.length ? (
          <p>Inga pågående live matcher.</p>
        ) : (
          <ListTournamentMatches matches={matches} />
        )}
      </section>
    </CardWrapper>
  );
}
