import React from "react";
import "./Group.scss";

function Group({ data }: any) {
  return (
    <section className="groups">
      {data?.map((group, index) => {
        return (
          <section key={group.group} className="group">
            <section className="group-header">
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

            {group?.teams
              ?.sort((teamA, teamB) => teamB.points - teamA.points)
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
