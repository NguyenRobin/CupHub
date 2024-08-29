import React from "react";
import Bracket from "../Bracket/Bracket";

function BracketViewMobile({ data }) {
  return (
    <div className={`match-bracket-stage__elimination mobile`}>
      {data.map((el) => (
        <div
          key={el.name}
          className={`match-bracket-stage__elimination--${el.name
            .toLowerCase()
            .split(" ")
            .join("")}`}
        >
          {el.matches.map((el, i) => (
            <div className={`card`} key={el.awayTeam}>
              <Bracket
                key={el.homeTeam}
                homeTeam={el.homeTeam}
                homeTeamScore={el.homeTeamScore}
                awayTeam={el.awayTeam}
                awayTeamScore={el.awayTeamScore}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BracketViewMobile;
