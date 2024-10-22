import React from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';
import {
  getTournamentById,
  getTournamentGroupsById,
} from '../../../../actions';
import ListAllGroups from '../../../../../features/groups/components/ui/ListAllGroups/ListAllGroups';

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const tournament = await getTournamentById(id);
  const groups = await getTournamentGroupsById(id);

  return (
    <Tournament data={tournament}>
      <ListAllGroups data={groups.groups} />
    </Tournament>
  );
}

export default page;
