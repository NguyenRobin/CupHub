import './PlayoffView.scss';
import React from 'react';
import PlayoffViewMobile from './PlayoffViewMobile/PlayoffViewMobile';
import PlayoffViewDesktop from './PlayoffViewDesktop/PlayoffViewDesktop';
import { getTournamentPlayoffById } from '../../../server/actions/rounds';
import { Types } from 'mongoose';

type Props = {
  tournamentId: Types.ObjectId;
};

type TPlayoff = {
  playoff: {
    round: string;
    matches: {
      match_id: string | null;
      homeTeam: { name: string; score: null | number; team_id: string };
      awayTeam: { name: string; score: null | number; team_id: string };
      location: string | null;
    }[];
  }[];
};

async function PlayoffView({ tournamentId }: Props) {
  const response = await getTournamentPlayoffById(tournamentId);

  if (response.status !== 200) {
    return <p>{response.message}</p>;
  }

  const { playoff }: TPlayoff = response?.playoff;

  return (
    <div className="playoff-view-container">
      {/* CSS max-width: 480p */}
      <PlayoffViewMobile playoff={playoff} />

      {/* CSS min-width: 481px */}
      <PlayoffViewDesktop playoff={playoff} />
    </div>
  );
}

export default PlayoffView;
