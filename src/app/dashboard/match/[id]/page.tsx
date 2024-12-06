import React, { Suspense } from 'react';
import LoadingSpinner from '../../../../components/ui/loading-spinner/LoadingSpinner';
import Match from '../../../../features/matches/components/ui/Match/Match';
import { getMatchByID } from '../../../../features/matches/server/actions/match';
import { Types } from 'mongoose';

async function MatchPage({ params }: { params: { id: Types.ObjectId } }) {
  const { id } = params;
  const match = await getMatchByID(id);

  return (
    <Suspense fallback={<LoadingSpinner size={40} />}>
      <Match match={match.match} />
    </Suspense>
  );
}

export default MatchPage;
