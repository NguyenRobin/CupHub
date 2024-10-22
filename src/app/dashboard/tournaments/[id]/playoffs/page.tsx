import React from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';

import {
  getTournamentById,
  getTournamentPlayoffById,
} from '../../../../actions';
import BracketGenerator from '../../../../../features/rounds/components/ui/PlayoffView/PlayoffView';

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
