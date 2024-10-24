'use client';

import React, { useState } from 'react';
import Bracket from '../PlayoffBracket/PlayoffBracket';
import './PlayoffViewMobile.scss';

type Props = {
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

function PlayoffViewMobile({ playoff }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0); // Börja med Round 32
  const currentStage = playoff[currentIndex];

  const handleNext = () => {
    if (currentIndex < playoff.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={`playoff-view-mobile`}>
      <div className="playoff-view-mobile__title">
        <button
          className="playoff-view-mobile btn"
          style={{
            visibility: `${!currentIndex ? 'hidden' : 'visible'}`,
          }}
          onClick={handleBack}
        >
          Back
        </button>
        <h2>{currentStage.round.toUpperCase()}</h2>

        <button
          className="playoff-view-mobile btn"
          style={{
            visibility: `${
              currentStage.round === 'final' ? 'hidden' : 'visible'
            }`,
          }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      <div
        key={currentStage.round}
        className={`playoff-view-mobile__elimination ${currentStage.round
          .toLowerCase()
          .split(' ')
          .join('')}`}
      >
        {currentStage.matches?.map((match, i) => (
          <div
            className={`bracket-wrapper-mobile ${
              currentIndex === 0 ? 'first-round' : ''
            }`}
            key={`${i}`}
          >
            <Bracket
              homeTeam={match.homeTeam.name}
              homeTeamScore={match.homeTeam.score}
              awayTeam={match.awayTeam.name}
              awayTeamScore={match.awayTeam.score}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayoffViewMobile;
