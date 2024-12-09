import React, { Suspense } from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';
import TournamentOverviewDetails from '../../../../../features/tournaments/components/ui/TournamentOverviewDetails/TournamentOverviewDetails';

import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';

import { Types } from 'mongoose';
import { getTournamentById } from '../../../../../features/tournaments/server/actions/tournament';

async function page({ params }: { params: { id: Types.ObjectId } }) {
  const { id } = params;

  return (
    <Tournament tournamentId={id}>
      <TournamentOverviewDetails tournamentId={id} />
    </Tournament>
  );
}

export default page;
