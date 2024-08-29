import React from "react";
import "./Bracket.scss";

function Bracket({ homeTeam, homeTeamScore, awayTeam, awayTeamScore }) {
  return (
    <div className="bracket">
      <div className="bracket__team bracket__team--home">
        <div className="bracket__team-info">
          <span className="bracket__team-image"></span>
          <span className="bracket__team-name">{homeTeam}</span>
        </div>
        <span className="bracket__team-score">{homeTeamScore}</span>
      </div>

      <div className="bracket__team bracket__team--away">
        <div className="bracket__team-info">
          <span className="bracket__team-image"></span>
          <span className="bracket__team-name">{awayTeam}</span>
        </div>
        <span className="bracket__team-score">{awayTeamScore}</span>
      </div>
    </div>
  );
}

export default Bracket;
