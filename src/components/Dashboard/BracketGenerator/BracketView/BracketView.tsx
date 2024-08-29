import React from "react";
import "./BracketView.scss";
import BracketViewMobile from "../BracketViewMobile/BracketViewMobile";
import BracketViewDesktop from "../BracketViewDesktop/BracketViewDesktop";

const tournamentData = {
  rounds: [
    {
      name: "Round 32",
      matches: [
        {
          homeTeam: "Team A",
          awayTeam: "Team B",
          homeTeamScore: 1,
          awayTeamScore: 0,
        },
        {
          homeTeam: "Team C",
          awayTeam: "Team D",
          homeTeamScore: 0,
          awayTeamScore: 1,
        },
        {
          homeTeam: "Team E",
          awayTeam: "Team F",
          homeTeamScore: 2,
          awayTeamScore: 3,
        },
        {
          homeTeam: "Team G",
          awayTeam: "Team H",
          homeTeamScore: 3,
          awayTeamScore: 1,
        },
        {
          homeTeam: "Team I",
          awayTeam: "Team J",
          homeTeamScore: 1,
          awayTeamScore: 0,
        },
        {
          homeTeam: "Team K",
          awayTeam: "Team L",
          homeTeamScore: 4,
          awayTeamScore: 2,
        },
        {
          homeTeam: "Team M",
          awayTeam: "Team N",
          homeTeamScore: 0,
          awayTeamScore: 1,
        },
        {
          homeTeam: "Team O",
          awayTeam: "Team P",
          homeTeamScore: 2,
          awayTeamScore: 0,
        },
        {
          homeTeam: "Team Q",
          awayTeam: "Team R",
          homeTeamScore: 1,
          awayTeamScore: 3,
        },
        {
          homeTeam: "Team S",
          awayTeam: "Team T",
          homeTeamScore: 3,
          awayTeamScore: 2,
        },
        {
          homeTeam: "Team U",
          awayTeam: "Team V",
          homeTeamScore: 1,
          awayTeamScore: 0,
        },
        {
          homeTeam: "Team W",
          awayTeam: "Team X",
          homeTeamScore: 0,
          awayTeamScore: 2,
        },
        {
          homeTeam: "Team Y",
          awayTeam: "Team Z",
          homeTeamScore: 2,
          awayTeamScore: 3,
        },
        {
          homeTeam: "Team AA",
          awayTeam: "Team AB",
          homeTeamScore: 3,
          awayTeamScore: 1,
        },
        {
          homeTeam: "Team AC",
          awayTeam: "Team AD",
          homeTeamScore: 1,
          awayTeamScore: 0,
        },
        {
          homeTeam: "Team AE",
          awayTeam: "Team AF",
          homeTeamScore: 2,
          awayTeamScore: 3,
        },
      ],
    },
    {
      name: "Round 16",
      matches: [
        {
          homeTeam: "Team B",
          awayTeam: "Team D",
          homeTeamScore: 0,
          awayTeamScore: 1,
        },
        {
          homeTeam: "Team F",
          awayTeam: "Team G",
          homeTeamScore: 1,
          awayTeamScore: 0,
        },
        {
          homeTeam: "Team I",
          awayTeam: "Team K",
          homeTeamScore: 2,
          awayTeamScore: 1,
        },
        {
          homeTeam: "Team N",
          awayTeam: "Team O",
          homeTeamScore: 1,
          awayTeamScore: 3,
        },
        {
          homeTeam: "Team R",
          awayTeam: "Team S",
          homeTeamScore: 0,
          awayTeamScore: 2,
        },
        {
          homeTeam: "Team U",
          awayTeam: "Team X",
          homeTeamScore: 1,
          awayTeamScore: 0,
        },
        {
          homeTeam: "Team Z",
          awayTeam: "Team AA",
          homeTeamScore: 2,
          awayTeamScore: 3,
        },
        {
          homeTeam: "Team AC",
          awayTeam: "Team AF",
          homeTeamScore: 1,
          awayTeamScore: 0,
        },
      ],
    },
    {
      name: "Quarterfinal",
      matches: [
        {
          homeTeam: "Team D",
          awayTeam: "Team F",
          homeTeamScore: 1,
          awayTeamScore: 0,
        },
        {
          homeTeam: "Team I",
          awayTeam: "Team O",
          homeTeamScore: 2,
          awayTeamScore: 1,
        },
        {
          homeTeam: "Team S",
          awayTeam: "Team U",
          homeTeamScore: 1,
          awayTeamScore: 0,
        },
        {
          homeTeam: "Team AA",
          awayTeam: "Team AC",
          homeTeamScore: 3,
          awayTeamScore: 2,
        },
      ],
    },
    {
      name: "Semifinal",
      matches: [
        {
          homeTeam: "Team D",
          awayTeam: "Team I",
          homeTeamScore: 0,
          awayTeamScore: 1,
        },
        {
          homeTeam: "Team S",
          awayTeam: "Team AA",
          homeTeamScore: 2,
          awayTeamScore: 3,
        },
      ],
    },
    {
      name: "Final",
      matches: [
        {
          homeTeam: "Team I",
          awayTeam: "Team AA",
          homeTeamScore: 1,
          awayTeamScore: 2,
        },
      ],
    },
  ],
};

function BracketView({ currentIndex, onBack, onNext }) {
  const currentStage = [tournamentData.rounds[currentIndex]];

  return (
    <div className="match-bracket-stage">
      <div className="match-bracket-stage__title">
        <button
          style={{
            visibility: `${!currentIndex ? "hidden" : "visible"}`,
          }}
          onClick={onBack}
        >
          Back
        </button>
        <h2>{currentStage[0].name}</h2>

        <button
          style={{
            visibility: `${
              currentStage[0].name === "Final" ? "hidden" : "visible"
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
      <BracketViewDesktop data={tournamentData} />
    </div>
  );
}
export default BracketView;
