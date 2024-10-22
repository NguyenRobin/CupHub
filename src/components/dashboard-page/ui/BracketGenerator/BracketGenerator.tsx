'use client';
import React, { useState } from 'react';
import './BracketGenerator.scss';
import BracketView from './BracketView/BracketView';

// async function getPlayOffScheduleByTournament() {
//   const data = await fetch(
//     'http://localhost:3000/api/playoffs/66d85a735a777728d90d2e77'
//   );

//   const playoff = data.json();
//   return playoff;
// }

function BracketGenerator({ playoff }: any) {
  console.log(playoff);
  const [currentIndex, setCurrentIndex] = useState(0); // Börja med Round 32

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
    <div className="bracket-generator-container">
      <BracketView
        currentIndex={currentIndex}
        onBack={handleBack}
        onNext={handleNext}
        playoff={playoff}
      />
    </div>
  );
}

export default BracketGenerator;
