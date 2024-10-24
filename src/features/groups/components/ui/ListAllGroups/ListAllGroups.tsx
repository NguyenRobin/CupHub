import React from 'react';
import './ListAllGroups.scss';
import { getAllTournamentMatchesByID } from '../../../../matches/server/actions/match';
import { getAllTournamentGroupsById } from '../../../server/actions/groups';

async function Group({ tournamentId }: any) {
  const response = await getAllTournamentGroupsById(tournamentId);

  if (response.status !== 200) {
    return <p>{response.message}</p>;
  }

  const { groups } = response;

  return (
    <section className="groups">
      {groups?.map((group) => {
        return (
          <section key={group.group} className="group">
            <section className="group__information">
              <section className="group__information__sort">
                <p>#</p>
              </section>
              <section className="group__information__group">
                <p>Grupp {group.group}</p>
              </section>

              <section className="group__information__games">
                <p>S</p>
              </section>

              <section className="group__information__wins">
                <p>V</p>
              </section>

              <section className="group__information__ties">
                <p>O</p>
              </section>

              <section className="group__information__losses">
                <p>F</p>
              </section>

              <section className="group__information__goals-scored">
                <p>GM</p>
              </section>

              <section className="group__information__goals-conceded">
                <p>IM</p>
              </section>

              <section className="group__information__goals-difference">
                <p>MS</p>
              </section>
              <section className="group__information__points">
                <p>P</p>
              </section>
            </section>

            {group?.standings
              ?.sort((teamA, teamB) => teamB.points - teamA.points)
              .map((team, index) => {
                return (
                  <section key={team.team_id} className="group__team">
                    <p
                      className={`group__team__place ${
                        index + 1 === 1 || index + 1 === 2 ? 'leaders' : ''
                      }
                      ${group.standings.length === index + 1 ? 'losers' : ''}`}
                    >
                      {index + 1}.
                    </p>
                    <p className="group__team__name">{team.team}</p>
                    <p className="group__team__games">{team.matches_played}</p>
                    <p className="group__team__wins">{team.won}</p>
                    <p className="group__team__ties">{team.draw}</p>
                    <p className="group__team__losses">{team.loss}</p>
                    <p className="group__team__goals-scored">
                      {team.goals_scored}
                    </p>
                    <p className="group__team__goals-conceded">
                      {team.goals_conceded}
                    </p>
                    <p className="group__team__goals-difference">
                      {team.goal_difference}
                    </p>
                    <p className="group__team__points">{team.points}</p>
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
