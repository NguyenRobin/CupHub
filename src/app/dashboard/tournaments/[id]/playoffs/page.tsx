import React from 'react';
import Tournament from '../../../../../components/dashboard-page/ui/Tournament/Tournament';

import {
  getTournamentById,
  getTournamentPlayoffById,
} from '../../../../actions';
import BracketGenerator from '../../../../../components/dashboard-page/ui/BracketGenerator/BracketGenerator';

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const tournament = await getTournamentById(id);
  const playoff = await getTournamentPlayoffById(id);

  return (
    <Tournament data={tournament}>
      <BracketGenerator playoff={playoff.playoff} />
    </Tournament>
  );
}

export default page;
