'use client';
import React from 'react';
import PlayoffBracket from '../PlayoffBracket/PlayoffBracket';
import './PlayoffViewDesktop.scss';
import { TPlayoff } from '../../../../../../types/types';
import { useRouter } from 'next/navigation';

type Props = {
  playoff: TPlayoff[];
};

function PlayoffViewDesktop({ playoff }: Props) {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/dashboard/match/${id}`);
  };

  return (
    <div className={`playoff-view-desktop`}>
      {playoff.map((matches) => (
        <div
          key={matches.round}
          className={`playoff-view-desktop__elimination playoff-view-desktop__elimination--${matches.round
            .toLowerCase()
            .split(' ')
            .join('')}`}
        >
          <div className="playoff-view-desktop__elimination-title">
            <h2>{matches.round.toUpperCase()}</h2>
          </div>
          {matches.matches.map((match, i) => (
            <div
              className={`bracket-wrapper-desktop bracket-wrapper-desktop--${matches.round}`}
              key={`${i}`}
            >
              <PlayoffBracket
                onClick={() => handleClick(match._id)}
                homeTeam={match.homeTeam.name}
                homeTeamScore={match.homeTeam.score}
                awayTeam={match.awayTeam.name}
                awayTeamScore={match.awayTeam.score}
                status={match.status}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PlayoffViewDesktop;
