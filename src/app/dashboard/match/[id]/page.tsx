import React from 'react';
import Match from '../../../../components/dashboard-page/ui/Match/Match';
import { cookies } from 'next/headers';

async function getMatch(id: string) {
  const token = cookies().get(process.env.TOKEN_NAME!);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Match not found');
  }

  const data = await response.json();
  return data;
}

async function MatchPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const match = await getMatch(id);
  return <Match match={match} />;
}

export default MatchPage;
