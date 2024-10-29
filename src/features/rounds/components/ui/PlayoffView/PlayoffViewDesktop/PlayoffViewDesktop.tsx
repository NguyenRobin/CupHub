import React from 'react';
import Bracket from '../PlayoffBracket/PlayoffBracket';
import './PlayoffViewDesktop.scss';
import { TPlayoff } from '../../../../../../types/types';

type Props = {
  playoff: TPlayoff[];
};

function PlayoffViewDesktop({ playoff }: Props) {
  return (
    <div className={`playoff-view-desktop`}>
      {playoff.map((el) => (
        <div
          key={el.round}
          className={`playoff-view-desktop__elimination ${el.round
            .toLowerCase()
            .split(' ')
            .join('')}`}
        >
          <div className="playoff-view-desktop__elimination--title">
            <h2>{el.round.toUpperCase()}</h2>
          </div>
          {el.matches.map((el, i) => (
            <div className={'bracket-wrapper-desktop'} key={`${i}`}>
              <Bracket
                homeTeam={el.homeTeam.name}
                homeTeamScore={el.homeTeam.score}
                awayTeam={el.awayTeam.name}
                awayTeamScore={el.awayTeam.score}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PlayoffViewDesktop;
