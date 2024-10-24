import React, { Suspense } from 'react';
import { Types } from 'mongoose';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';
import PlayoffView from '../../../../../features/rounds/components/ui/PlayoffView/PlayoffView';
import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';
import { getTournamentPlayoffById } from '../../../../../features/rounds/server/actions/rounds';
import { parse } from 'path';
import { stringify } from 'querystring';

async function page({ params }: { params: { id: Types.ObjectId } }) {
  const { id } = params;

  return (
    <Suspense fallback={<LoadingSpinner size={40} />}>
      <Tournament tournamentId={id}>
        <PlayoffView tournamentId={id} />
      </Tournament>
    </Suspense>
  );
}

export default page;
