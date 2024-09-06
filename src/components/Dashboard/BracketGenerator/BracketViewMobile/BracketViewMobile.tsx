import React from "react";
import Bracket from "../Bracket/Bracket";

type Data = {};

function BracketViewMobile({ data }) {
  console.log(data, "viewMobile");
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
          {el.matches?.map((match, i) => (
            <div className={"card"} key={`${i}`}>
              <Bracket
                homeTeam={match.homeTeam.name}
                homeTeamScore={match.homeTeam.score}
                awayTeam={match.awayTeam.name}
                awayTeamScore={match.awayTeam.score}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BracketViewMobile;
