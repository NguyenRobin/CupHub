import React from 'react';
import Match from '../../../../components/dashboard-page/ui/Match/Match';
import { cookies } from 'next/headers';
import { getMatchById } from '../../../actions';

async function MatchPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const match = await getMatchById(id);
  return <Match match={match} />;
}

export default MatchPage;
