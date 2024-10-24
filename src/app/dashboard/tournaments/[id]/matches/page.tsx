import React, { Suspense } from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';
import ListTournamentMatches from '../../../../../features/matches/components/ui/ListTournamentMatches/ListTournamentMatches';
import { Types } from 'mongoose';
import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';

async function page({ params }: { params: { id: Types.ObjectId } }) {
  const { id } = params;

  return (
    <Suspense fallback={<LoadingSpinner size={40} />}>
      <Tournament tournamentId={id}>
        <ListTournamentMatches tournamentId={id} />
      </Tournament>
    </Suspense>
  );
}

export default page;
