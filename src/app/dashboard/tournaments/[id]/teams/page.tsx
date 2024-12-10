import React, { Suspense } from 'react';
import Tournament from '../../../../../features/tournaments/components/ui/Tournament/Tournament';
import { getTournamentGroupsById } from '../../../../actions';
import { GiChampions } from 'react-icons/gi';
import './teams.scss';
import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';

async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

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
    <Suspense
      fallback={
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner size={40} />
        </div>
      }
    >
      <Tournament tournamentId={id}>
        <div className="tournament-overview-teams">
          <div className="tournament-overview-teams__title">
            <GiChampions />
            <p>Lag medverkar:</p>
          </div>
          <div className="tournament-overview-teams__teams">
            {teams_participating.map((team) => (
              <p key={team.name}>{team.name}</p>
            ))}
          </div>
        </div>
      </Tournament>
    </Suspense>
  );
}

export default page;
