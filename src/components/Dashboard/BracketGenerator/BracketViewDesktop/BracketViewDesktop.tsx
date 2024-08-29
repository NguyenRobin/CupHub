import React from "react";
import Bracket from "../Bracket/Bracket";

function BracketViewDesktop({ data }) {
  return (
    <div className={`match-bracket-stage__elimination desktop`}>
      {data.rounds.map((el) => (
        <div
          key={el.name}
          className={`match-bracket-stage__elimination--${el.name
            .toLowerCase()
            .split(" ")
            .join("")}`}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>{el.name}</h2>
          </div>
          {el.matches.map((el, i) => (
            <div className={"card"} key={el.awayTeam}>
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

export default BracketViewDesktop;
