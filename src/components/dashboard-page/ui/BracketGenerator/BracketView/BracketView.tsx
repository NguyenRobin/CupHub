import React from 'react';
import './BracketView.scss';
import BracketViewMobile from '../BracketViewMobile/BracketViewMobile';
import BracketViewDesktop from '../BracketViewDesktop/BracketViewDesktop';

function BracketView({ playoff, currentIndex, onBack, onNext }: any) {
  const currentStage = playoff[currentIndex];
  return (
    <div className="match-bracket-stage">
      <div className="match-bracket-stage__title">
        <button
          style={{
            visibility: `${!currentIndex ? 'hidden' : 'visible'}`,
          }}
          onClick={onBack}
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
          onClick={onNext}
        >
          Next
        </button>
      </div>

      {/* CSS max-width: 480p */}
      <BracketViewMobile data={currentStage} />

      {/* CSS min-width: 481px */}
      <BracketViewDesktop data={playoff} />
    </div>
  );
}
export default BracketView;
