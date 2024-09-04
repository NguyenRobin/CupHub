import React from "react";
import Bracket from "../Bracket/Bracket";

function BracketViewMobile({ data }) {
  return (
    <div className={`match-bracket-stage__elimination mobile`}>
      {data.map((el) => (
        <div
          key={el.round}
          className={`match-bracket-stage__elimination--${el.round
            .toLowerCase()
            .split(" ")
            .join("")}`}
        >
          {data.matches?.map(
            <div className={`card`} key={el.awayTeam}>
              <Bracket
                key={el?.homeTeam}
                homeTeam={el?.homeTeam?.name || ""}
                homeTeamScore={el?.homeTeam?.score || ""}
                awayTeam={el?.awayTeam?.name}
                awayTeamScore={el?.awayTeamScore?.score || ""}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BracketViewMobile;
