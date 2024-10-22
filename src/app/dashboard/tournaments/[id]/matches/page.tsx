import React from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';
import { cookies } from 'next/headers';
import ListTournamentMatches from '../../../../../features/matches/components/ui/ListTournamentMatches/ListTournamentMatches';
import {
  getTournamentById,
  getTournamentMatchesById,
} from '../../../../actions';

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const tournament = await getTournamentById(id);
  const matches = await getTournamentMatchesById(id);

  return (
    <Tournament data={tournament}>
      <ListTournamentMatches matches={matches.matches} />
    </Tournament>
  );
}

export default page;
