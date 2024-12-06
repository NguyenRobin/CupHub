import React from 'react';
import './PlayoffBracket.scss';
import Pulse from '../../../../../../components/ui/pulse/Pulse';

function PlayoffBracket({
  status,
  homeTeam,
  homeTeamScore,
  awayTeam,
  awayTeamScore,
  onClick,
}: any) {
  const homeTeamWinner =
    status === 'completed' && homeTeamScore > awayTeamScore
      ? 'playoff-bracket__team-info--winner'
      : '';

  const awayTeamWinner =
    status === 'completed' && awayTeamScore > homeTeamScore
      ? 'playoff-bracket__team-info--winner'
      : '';

  return (
    <div className="playoff-bracket" onClick={onClick}>
      <div>{status === 'ongoing' && <Pulse />}</div>

      <div className="playoff-bracket__teams">
        <div className="playoff-bracket__team">
          <div className="playoff-bracket__team-info">
            <p className={homeTeamWinner}>{homeTeam}</p>
          </div>

          <div className="playoff-bracket__team-result">
            {status === 'scheduled' && (
              <p className="playoff-bracket__team-result--scheduled">-</p>
            )}

            {status === 'ongoing' && (
              <p className="playoff-bracket__team-result--ongoing">
                {homeTeamScore}
              </p>
            )}
            {status === 'completed' && (
              <p
                className={`playoff-bracket__team-result--completed ${homeTeamWinner}`}
              >
                {homeTeamScore}
              </p>
            )}
          </div>
        </div>

        <div className="playoff-bracket__team">
          <div className="playoff-bracket__team-info">
            <p className={awayTeamWinner}>{awayTeam}</p>
          </div>

          <div className="playoff-bracket__team-result">
            {status === 'scheduled' && (
              <p className="playoff-bracket__team-result--scheduled">-</p>
            )}

            {status === 'ongoing' && (
              <p className="playoff-bracket__team-result--ongoing">
                {awayTeamScore}
              </p>
            )}
            {status === 'completed' && (
              <p
                className={`playoff-bracket__team-result--completed ${awayTeamWinner}`}
              >
                {awayTeamScore}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayoffBracket;
