import React from 'react';
import Tournament from '../../../../../components/dashboard-page/ui/Tournament/Tournament';
import { cookies } from 'next/headers';
import ListTournamentMatches from '../../../../../components/dashboard-page/ui/ListTournamentMatches/ListTournamentMatches';
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
