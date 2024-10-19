import React, { Suspense } from 'react';
import Match from '../../../../components/dashboard-page/ui/Match/Match';
import { cookies } from 'next/headers';
import { getMatchById } from '../../../actions';
import LoadingSpinner from '../../../../components/loading-spinner/LoadingSpinner';

async function MatchPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const match = await getMatchById(id);

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner size={40} />
        </div>
      }
    >
      <Match match={match} />;
    </Suspense>
  );
}

export default MatchPage;
