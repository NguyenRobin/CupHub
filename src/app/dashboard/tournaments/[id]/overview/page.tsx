import React from 'react';
import Tournament from '../../../../../components/dashboard-page/ui/Tournament/Tournament';
import { cookies } from 'next/headers';
import TournamentOverviewDetails from '../../../../../components/dashboard-page/ui/TournamentOverviewDetails/TournamentOverviewDetails';
import { getTournamentById } from '../../../../actions';

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const tournament = await getTournamentById(id);
  const {
    name,
    description,
    location,
    status,
    startDate,
    endDate,
    total_teams,
    format,
  } = tournament?.tournament;

  return (
    <Tournament data={tournament}>
      <TournamentOverviewDetails
        name={name}
        description={description}
        location={location}
        status={status}
        startDate={startDate}
        endDate={endDate}
        total_teams={total_teams}
        format={format}
      />
    </Tournament>
  );
}

export default page;
