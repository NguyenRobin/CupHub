import './PlayoffView.scss';
import React from 'react';
import PlayoffViewMobile from './PlayoffViewMobile/PlayoffViewMobile';
import PlayoffViewDesktop from './PlayoffViewDesktop/PlayoffViewDesktop';
import { getTournamentPlayoffById } from '../../../server/actions/rounds';
import { Types } from 'mongoose';
import { getTournamentPlayoffByID } from '../../../../matches/server/actions/match';
import { TPlayoff } from '../../../../../types/types';

type Props = {
  tournamentId: Types.ObjectId;
};

async function PlayoffView({ tournamentId }: Props) {
  const response = await getTournamentPlayoffByID(tournamentId);

  if (response.status !== 200) {
    return <p>{response.message}</p>;
  }

  const playoff: TPlayoff[] = JSON.parse(JSON.stringify(response.playoff));

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
