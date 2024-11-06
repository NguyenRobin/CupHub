import React, { Suspense } from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';
import ListTournamentMatches from '../../../../../features/matches/components/ui/ListTournamentMatches/ListTournamentMatches';
import { Types } from 'mongoose';
import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';
import { getTournamentMatchesByID } from '../../../../../features/matches/server/actions/match';

async function page({ params }: { params: { id: Types.ObjectId } }) {
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
    <Suspense fallback={<LoadingSpinner size={40} />}>
      <Tournament tournamentId={id}>
        <ListTournamentMatches matches={matches} />
      </Tournament>
    </Suspense>
  );
}

export default page;
