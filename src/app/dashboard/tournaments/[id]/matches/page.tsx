import React, { Suspense } from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';
import ListTournamentMatches from '../../../../../features/matches/components/ui/ListTournamentMatches/ListTournamentMatches';
import { Types } from 'mongoose';
import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';
import { getTournamentMatchesByID } from '../../../../../features/matches/server/actions/match';

async function page(props: { params: Promise<{ id: Types.ObjectId }> }) {
  const params = await props.params;
  const { id } = params;

  const response = await getTournamentMatchesByID(id);

  if (response.status !== 200) {
    return <p>{response.message}</p>;
  }

  const { matches } = response;

  if (!matches) {
    return [];
  }

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner size={40} />
        </div>
      }
    >
      <Tournament tournamentId={id}>
        <ListTournamentMatches matches={matches} />
      </Tournament>
    </Suspense>
  );
}

export default page;
