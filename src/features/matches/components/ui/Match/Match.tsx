import './Match.scss';
import React from 'react';
import CardWrapper from '../../../../../components/ui/card-wrapper/CardWrapper';
import AdminMatchPanel from '../AdminMatchPanel/AdminMatchPanel';
import Pulse from '../../../../../components/ui/pulse/Pulse';

function Match({ match }: any) {
  if (!match) {
    return <p>Not Found</p>;
  }
  const { homeTeam, awayTeam, status, _id } = JSON.parse(JSON.stringify(match));

  return (
    <CardWrapper>
      <div className="match">
        <div className="match__team">
          <div className="match__team--home">
            <p>H</p>
          </div>
          <p>{homeTeam.name}</p>
        </div>

        <div className="match__score">
          <div className="match__score--date">
            <p></p>
          </div>
          <div className="match__score--result">
            {status === 'scheduled' && <p>-</p>}
            {status === 'ongoing' && (
              <p>
                {homeTeam.score} - {awayTeam.score}
              </p>
            )}
            {status === 'completed' && (
              <p>
                {homeTeam.score} - {awayTeam.score}
              </p>
            )}
          </div>
          <div className="match__score--status">
            <p>{status === 'scheduled' && 'kommande'}</p>

            {status === 'ongoing' && (
              <div>
                <Pulse />
                <p>Live</p>
              </div>
            )}
            <p>{status === 'completed' && 'Avslutad'}</p>
          </div>
        </div>

        <div className="match__team">
          <div className="match__team--away">
            <p>B</p>
          </div>
          <p>{awayTeam.name}</p>
        </div>
      </div>

      {/* THIS SHOULD LATER ONLY BE VISIBLY FOR THE ADIMIN/CREATOR OF TOURNAMENT ETC */}

      <AdminMatchPanel
        homeTeamName={homeTeam.name}
        awayTeamName={awayTeam.name}
        matchId={_id}
      />
    </CardWrapper>
  );
}

export default Match;
