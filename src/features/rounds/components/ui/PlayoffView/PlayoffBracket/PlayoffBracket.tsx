import React from 'react';
import './PlayoffBracket.scss';

function PlayoffBracket({
  status,
  homeTeam,
  homeTeamScore,
  awayTeam,
  awayTeamScore,
}: any) {
  return (
    <div className="bracket">
      <div className="bracket__team bracket__team--home">
        <div className="bracket__team-info">
          <span className="bracket__team-image"></span>
          <span className="bracket__team-name">{homeTeam}</span>
        </div>
        {/* <span className="bracket__team-score">{homeTeamScore}</span> */}
        {status === 'scheduled' && <p className="bracket__team-score">-</p>}

        {status === 'ongoing' && (
          <p className="bracket__team-score">
            {homeTeamScore} - {awayTeamScore}
          </p>
        )}
        {status === 'completed' && (
          <p className="bracket__team-score">
            {homeTeamScore} - {awayTeamScore}
          </p>
        )}
      </div>

      <div className="bracket__team bracket__team--away">
        <div className="bracket__team-info">
          <span className="bracket__team-image"></span>
          <span className="bracket__team-name">{awayTeam}</span>
        </div>
        {status === 'scheduled' && <p className="bracket__team-score">-</p>}

        {status === 'ongoing' && (
          <p className="bracket__team-score">
            {homeTeam.score} - {awayTeam.score}
          </p>
        )}
        {status === 'completed' && (
          <p className="bracket__team-score">
            {homeTeam.score} - {awayTeam.score}
          </p>
        )}
      </div>
    </div>
  );
}

export default PlayoffBracket;
