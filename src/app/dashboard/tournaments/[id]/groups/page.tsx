import React from 'react';
import Tournament from '../../../../../components/dashboard-page/ui/Tournament/Tournament';
import {
  getTournamentById,
  getTournamentGroupsById,
} from '../../../../actions';
import Group from '../../../../../components/dashboard-page/ui/Group/Group';

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const tournament = await getTournamentById(id);
  const groups = await getTournamentGroupsById(id);

  return (
    <Tournament data={tournament}>
      <Group data={groups.groups} />
    </Tournament>
  );
}

export default page;
