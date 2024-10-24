import React from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';

import {
  getTournamentById,
  getTournamentGroupsById,
} from '../../../../actions';
import { GiChampions } from 'react-icons/gi';

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const tournament = await getTournamentById(id);
  const { groups } = await getTournamentGroupsById(id);

  const teams_participating = [];
  for (let i = 0; i < groups.length; i++) {
    const teams = groups[i].teams;

    for (let j = 0; j < teams.length; j++) {
      const team = teams[j];

      teams_participating.push(team);
    }
  }
  return (
    <Tournament data={tournament}>
      <div className="tournament-overview-details__teams-participating">
        <div className="tournament-overview-details__teams-participating__title">
          <GiChampions />
          <p>Lag medverkar:</p>
        </div>
        <div className="tournament-overview-details__teams-participating__teams">
          {teams_participating.map((team) => (
            <p key={team.name}>{team.name}</p>
          ))}
        </div>
      </div>
    </Tournament>
  );
}

export default page;
