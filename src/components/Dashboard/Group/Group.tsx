import React from "react";
import "./Group.scss";

const data = {
  groups: [
    {
      group: "A",
      teams: [
        {
          name: "Team 1",
          played: 3,
          won: 2,
          drawn: 1,
          lost: 0,
          goals_for: 5,
          goals_against: 2,
          points: 7,
        },
        {
          name: "Team 2",
          played: 3,
          won: 1,
          drawn: 1,
          lost: 1,
          goals_for: 3,
          goals_against: 3,
          points: 4,
        },
        {
          name: "Team 3",
          played: 3,
          won: 0,
          drawn: 2,
          lost: 1,
          goals_for: 1,
          goals_against: 4,
          points: 2,
        },
        {
          name: "Team 4",
          played: 3,
          won: 0,
          drawn: 0,
          lost: 3,
          goals_for: 2,
          goals_against: 5,
          points: 0,
        },
      ],
    },
    {
      group: "B",
      teams: [
        {
          name: "Team 5",
          played: 3,
          won: 3,
          drawn: 0,
          lost: 0,
          goals_for: 7,
          goals_against: 1,
          points: 9,
        },
        {
          name: "Team 6",
          played: 3,
          won: 1,
          drawn: 1,
          lost: 1,
          goals_for: 4,
          goals_against: 4,
          points: 4,
        },
        {
          name: "Team 7",
          played: 3,
          won: 1,
          drawn: 0,
          lost: 2,
          goals_for: 3,
          goals_against: 5,
          points: 3,
        },
        {
          name: "Team 8",
          played: 3,
          won: 0,
          drawn: 1,
          lost: 2,
          goals_for: 2,
          goals_against: 6,
          points: 1,
        },
      ],
    },
  ],
};

function Group({ data }: any) {
  // if (!data.length) {
  //   return <p>loading..</p>;
  // }

  return (
    <section className="groups">
      {data?.map((group) => {
        return (
          <section className="group" key={group.group}>
            <section key={group.group} className="group-header">
              <section className="group-header__sort">
                <span>#</span>
              </section>

              <section className="group-header__titles">
                <section className="group-header__titles__title">
                  <p>Grupp {group.group}</p>
                </section>

                <section className="group-header__titles__title">
                  <p>S</p>
                </section>

                <section className="group-header__titles__title">
                  <p>V</p>
                </section>

                <section className="group-header__titles__title">
                  <p>O</p>
                </section>

                <section className="group-header__titles__title">
                  <p>F</p>
                </section>

                <section className="group-header__titles__title">
                  <p>M</p>
                </section>

                <section className="group-header__titles__title">
                  <p>MS</p>
                </section>
                <section className="group-header__titles__title">
                  <p>P</p>
                </section>
              </section>
            </section>

            {group.teams
              .sort((teamA, teamB) => teamB.points - teamA.points)
              .map((team, index) => {
                return (
                  <section key={team.id} className="group-teams">
                    <section
                      className={`group-teams__place ${
                        index + 1 === 1 || index + 1 === 2
                          ? "group-leaders"
                          : ""
                      }
                      ${group.teams.length === index + 1 ? "losers" : ""}`}
                    >
                      <span>{index + 1}.</span>
                    </section>

                    <ul>
                      <li>{team.name}</li>
                      <li>{team.played}</li>
                      <li>{team.won}</li>
                      <li>{team.drawn}</li>
                      <li>{team.lost}</li>
                      <li>{team.goals_for + ":" + team.goals_against}</li>
                      <li>{team.goals_for - team.goals_against}</li>
                      <li>{team.points}</li>
                    </ul>
                  </section>
                );
              })}
          </section>
        );
      })}
    </section>
  );
}
export default Group;
