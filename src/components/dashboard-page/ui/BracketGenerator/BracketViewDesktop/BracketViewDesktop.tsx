import React from 'react';
import Bracket from '../Bracket/Bracket';

function BracketViewDesktop({ data }: any) {
  return (
    <div className={`match-bracket-stage__elimination desktop`}>
      {data.map((el) => (
        <div
          key={el.round}
          className={`match-bracket-stage__elimination--${el.round
            .toLowerCase()
            .split(' ')
            .join('')}`}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2>{el.round}</h2>
          </div>
          {el.matches.map((el, i) => (
            <div className={'card'} key={`${i}`}>
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

export default BracketViewDesktop;
