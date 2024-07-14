"use client";
import React, { useEffect, useState } from "react";
const tournamentData = {
  rounds: [
    {
      name: "Åttondelsfinal",
      matches: [
        { team1: "Astralis", team2: "Gambit", score1: 1, score2: 0 },
        // ...fler matcher
      ],
    },
    {
      name: "Kvartsfinal",
      matches: [
        { team1: "Astralis", team2: "G2", score1: 1, score2: 0 },
        // ...fler matcher
      ],
    },
    // ...fler rundor
  ],
};
function Test() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const information = localStorage.getItem("tournamentInfo");
      const teams = localStorage.getItem("addTeam");
      const settings = localStorage.getItem("groupSettings");

      const parsedInformation = information ? JSON.parse(information) : {};
      const parsedTeams = teams ? JSON.parse(teams) : {};
      const parsedSettings = settings ? JSON.parse(settings) : {};

      const mergedData = {
        ...parsedInformation,
        ...parsedTeams,
        ...parsedSettings,
      };

      setData(mergedData);
    }
  }, []);

  const amountOfGroups = data.totalGroups;
  const teamsPerGroupAdvancing = data.teamsPerGroupAdvancing;
  const amountOfTeams = data.teamAmount;

  console.log("amountOfGroups", amountOfGroups);
  console.log("teamsPerGroupAdvancing", teamsPerGroupAdvancing);
  console.log("amountOfTeams", amountOfTeams);

  const totalTeamsInPlayoff = amountOfGroups * teamsPerGroupAdvancing;
  console.log("totalTeamsInPlayoff", totalTeamsInPlayoff);
  // if totalTeamsInPlayoff <= 2 CREATE bracket final
  // if totalTeamsInPlayoff <= 3 CREATE bracket with semifinal, final, one team goes to final automatic
  // if totalTeamsInPlayoff <= 4 CREATE bracket with semifinal, final
  // if totalTeamsInPlayoff <= 5 CREATE bracket with quarterfinal (one team goes to semifinal automatic) semifinal, final

  return (
    <section>
      <div className="" style={{ overflow: "scroll" }}>
        <div className="bracket disable-image">
          {/* Round 32 */}
          <div className="bracket-stage round32">
            <TeamOneVsTeamTwo
              teamOneName="IFK Uppsala"
              teamOneScore={2}
              teamTwoName="Rimbo"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Sirius"
              teamOneScore={5}
              teamTwoName="Gusk"
              teamTwoScore={2}
            />

            <TeamOneVsTeamTwo
              teamOneName="Procyon"
              teamOneScore={1}
              teamTwoName="Sunnersta"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Dalkurd"
              teamOneScore={2}
              teamTwoName="Sharmota FC"
              teamTwoScore={5}
            />

            <TeamOneVsTeamTwo
              teamOneName="IFK Uppsala"
              teamOneScore={2}
              teamTwoName="Rimbo"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Sirius"
              teamOneScore={5}
              teamTwoName="Gusk"
              teamTwoScore={2}
            />

            <TeamOneVsTeamTwo
              teamOneName="Procyon"
              teamOneScore={1}
              teamTwoName="Sunnersta"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Dalkurd"
              teamOneScore={2}
              teamTwoName="Sharmota FC"
              teamTwoScore={5}
            />
            <TeamOneVsTeamTwo
              teamOneName="IFK Uppsala"
              teamOneScore={2}
              teamTwoName="Rimbo"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Sirius"
              teamOneScore={5}
              teamTwoName="Gusk"
              teamTwoScore={2}
            />

            <TeamOneVsTeamTwo
              teamOneName="Procyon"
              teamOneScore={1}
              teamTwoName="Sunnersta"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Dalkurd"
              teamOneScore={2}
              teamTwoName="Sharmota FC"
              teamTwoScore={5}
            />

            <TeamOneVsTeamTwo
              teamOneName="IFK Uppsala"
              teamOneScore={2}
              teamTwoName="Rimbo"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Sirius"
              teamOneScore={5}
              teamTwoName="Gusk"
              teamTwoScore={2}
            />

            <TeamOneVsTeamTwo
              teamOneName="Procyon"
              teamOneScore={1}
              teamTwoName="Sunnersta"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Dalkurd"
              teamOneScore={2}
              teamTwoName="Sharmota FC"
              teamTwoScore={5}
            />
          </div>
          {/* ROUND 16 */}
          <div className="bracket-stage round16">
            <TeamOneVsTeamTwo
              teamOneName="IFK Uppsala"
              teamOneScore={2}
              teamTwoName="Sirius"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Sirius"
              teamOneScore={5}
              teamTwoName="Gusk"
              teamTwoScore={2}
            />

            <TeamOneVsTeamTwo
              teamOneName="Procyon"
              teamOneScore={1}
              teamTwoName="Sunnersta"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Dalkurd"
              teamOneScore={2}
              teamTwoName="Sharmota FC"
              teamTwoScore={5}
            />

            <TeamOneVsTeamTwo
              teamOneName="IFK Uppsala"
              teamOneScore={2}
              teamTwoName="Rimbo"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Sirius"
              teamOneScore={5}
              teamTwoName="Gusk"
              teamTwoScore={2}
            />

            <TeamOneVsTeamTwo
              teamOneName="Procyon"
              teamOneScore={1}
              teamTwoName="Sunnersta"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Dalkurd"
              teamOneScore={2}
              teamTwoName="Sharmota FC"
              teamTwoScore={5}
            />
          </div>

          {/* QUARTER FINAL */}
          <div className="bracket-stage quarterfinal">
            <TeamOneVsTeamTwo
              teamOneName="IFK Uppsala"
              teamOneScore={2}
              teamTwoName="Rimbo"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Sirius"
              teamOneScore={5}
              teamTwoName="Gusk"
              teamTwoScore={2}
            />

            <TeamOneVsTeamTwo
              teamOneName="Procyon"
              teamOneScore={1}
              teamTwoName="Sunnersta"
              teamTwoScore={0}
            />

            <TeamOneVsTeamTwo
              teamOneName="Dalkurd"
              teamOneScore={2}
              teamTwoName="Sharmota FC"
              teamTwoScore={5}
            />
          </div>

          {/* SEMI FINAL */}
          <div className="bracket-stage semifinal">
            <TeamOneVsTeamTwo
              teamOneName="Dalkurd"
              teamOneScore={2}
              teamTwoName="Sharmota FC"
              teamTwoScore={5}
            />
            <TeamOneVsTeamTwo
              teamOneName="Dalkurd"
              teamOneScore={2}
              teamTwoName="Sharmota FC"
              teamTwoScore={5}
            />
          </div>

          {/* FINAL */}
          <div className="bracket-stage final">
            <TeamOneVsTeamTwo
              teamOneName="Dalkurd"
              teamOneScore={2}
              teamTwoName="Sharmota FC"
              teamTwoScore={5}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Test;

function TeamOneVsTeamTwo({
  teamOneName,
  teamOneScore,
  teamTwoName,
  teamTwoScore,
}: any) {
  return (
    <div className="bracket-stage__match">
      <div className="team team-one">
        <div>
          <span className="image"></span>
          <span className="name">{teamOneName}</span>
        </div>
        <span className="score">{teamOneScore}</span>
      </div>

      <div className="team team-two">
        <div>
          <span className="image"></span>
          <span className="name">{teamTwoName}</span>
        </div>
        <span className="score">{teamTwoScore}</span>
      </div>

      <div className="next-game__line forward">
        <div className="line one"></div>
        <div className="line two"></div>
      </div>

      <div className="next-game__line back">
        <div className="line one"></div>
      </div>
    </div>
  );
}
