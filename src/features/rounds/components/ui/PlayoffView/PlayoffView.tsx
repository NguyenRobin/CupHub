'use client';
import React, { useState } from 'react';
import './PlayoffView.scss';
import PlayoffViewMobile from './PlayoffViewMobile/PlayoffViewMobile';
import PlayoffViewDesktop from './PlayoffViewDesktop/PlayoffViewDesktop';

function PlayoffView({ playoff }: any) {
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
    <div className="match-bracket-stage">
      <div className="match-bracket-stage__title">
        <button
          style={{
            visibility: `${!currentIndex ? 'hidden' : 'visible'}`,
          }}
          onClick={handleBack}
        >
          Back
        </button>
        <h2>{currentStage.round}</h2>

        <button
          style={{
            visibility: `${
              currentStage.round === 'Final' ? 'hidden' : 'visible'
            }`,
          }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {/* CSS max-width: 480p */}
      <PlayoffViewMobile data={currentStage} />

      {/* CSS min-width: 481px */}
      <PlayoffViewDesktop data={playoff} />
    </div>
  );
}

export default PlayoffView;
