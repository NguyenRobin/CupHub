import mongoose, { Types } from 'mongoose';
import {
  getMatchAndUpdateDB,
  getMatchDB,
  getMatchesByStatusDB,
  getMatchesDB,
  getPlayoffMatchesDB,
  saveMatchDB,
  updatePlayoffMatchDB,
} from '../db/match';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';
import {
  TMatch,
  TPlayoff,
  TStatus,
  TTeamStanding,
} from '../../../../types/types';
import {
  getTournamentGroupDB,
  saveTournamentGroupDB,
} from '../../../groups/server/db/groups';
import { getTournamentDB } from '../../../tournaments/server/db/tournament';
import { sortStandingPointsByDescendingOrder } from '../../../../lib/server';

export async function getTournamentMatchesByID(id: Types.ObjectId) {
  if (!mongoose.isValidObjectId(id)) {
    return { status: 400, message: 'Invalid ID format. Must be a ObjectId' };
  }

  await connectToMongoDB();

  const matches: TMatch[] = await getMatchesDB(id);

  if (!matches) {
    return { status: 400, message: 'Matches for the tournament was not found' };
  }

  const removePlayoffMatches = matches.filter((match) => !match.isPlayoff);

  return { status: 200, matches: removePlayoffMatches };
}

export async function getMatchByID(id: Types.ObjectId) {
  await connectToMongoDB();

  if (!mongoose.isValidObjectId(id)) {
    return { status: 400, message: 'Invalid ID format. Must be a ObjectId' };
  }

  const match = await getMatchDB(id);

  if (!match) {
    return { status: 400, message: 'Match was not found' };
  }

  return { status: 200, match };
}

export async function updateMatchTeamScore(
  _id: Types.ObjectId,
  teamScoring: 'homeTeam' | 'awayTeam',
  point: number,
  operator: '+' | '-'
) {
  let team = teamScoring === 'homeTeam' ? 'homeTeam' : 'awayTeam';

  await connectToMongoDB();
  const match = await getMatchDB(_id);

  if (!match) {
    return { status: 400, message: 'Match was not found' };
  }

  switch (operator) {
    case '+':
      match[team] = {
        ...match[team],
        score: match[team].score + point,
      };
      break;
    case '-':
      match[team] = {
        ...match[team],
        score: match[team].score - point,
      };
      break;
    default:
      return;
  }

  if (match[team].score < 0) {
    return { status: 404, message: 'Team cannot have a score less than 0' };
  }

  await saveMatchDB(match);

  return { status: 200, message: 'match successfully updated with new score' };
}

export async function updateMatchStatus(
  _id: Types.ObjectId,
  status: 'scheduled' | 'ongoing' | 'paused' | 'completed'
) {
  await connectToMongoDB();
  const match = await getMatchDB(_id);
  console.log('match', match);

  if (!match) {
    return {
      status: 404,
      message: `Match with id: ${_id}, could NOT be found`,
    };
  }

  if (status === 'ongoing') {
    if (match.status === 'ongoing') {
      return {
        status: 404,
        message: `Match is already ongoing. You cannot start the match again`,
      };
    }

    match.status = status;

    await saveMatchDB(match);

    return {
      status: 200,
      message: `Match status: ${status}, successfully be updated`,
      match,
    };
  }

  // if the matchs is a playoff match we dont want to do dis calcluation. then just check the result
  // check our rounde_type. if is for exapmlpe is qarterfinal. we need to now the index somehow. so if index is 0 next playoff should be 1
  // check the team that won. is it home or away team? add it to the same in next game

  if (status == 'completed' && match.isPlayoff) {
    if (match.status === 'completed') {
      return {
        status: 404,
        message: `Match has already been completed before.`,
      };
    }

    const { homeTeam, awayTeam, tournament_id, round_type, index } = match;
    if (index === undefined) {
      return { status: 400, message: 'No index found on the current match' };
    }

    const playoff = await getTournamentPlayoffByID(tournament_id!);

    if (!playoff.playoff) {
      return { status: 400, message: 'No playoff found' };
    }

    const homeTeamScore = homeTeam.score;
    const awayTeamScore = awayTeam.score;

    let winner = '';
    const result = `${homeTeamScore}-${awayTeamScore}`;

    if (homeTeamScore === awayTeamScore) {
      winner = 'tie';
    } else if (homeTeamScore > awayTeamScore) {
      winner = homeTeam.name;
    } else if (awayTeamScore > homeTeamScore) {
      winner = awayTeam.name;
    }

    match.winner = winner;
    match.result = result;
    match.status = status;

    await saveMatchDB(match);

    if (match.round_type === 'final') {
      return {
        status: 200,
        message: 'Final match has been updated.',
        match: match,
      };
    }

    const currentPlayingRoundIndex = playoff.playoff
      .map((round) => round.round)
      .indexOf(round_type!);

    const nextPlayingRoundIndex = currentPlayingRoundIndex + 1;

    const nextRound = playoff.playoff[nextPlayingRoundIndex];

    const winningTeamGoingToNextRound =
      winner !== 'tie' && homeTeam.name === winner ? homeTeam : awayTeam;

    const key = index % 2 === 0 ? 'homeTeam' : 'awayTeam';
    const nextMatchIndex = Math.trunc(index / 2);
    const nextPlayoffMatch = nextRound.matches[nextMatchIndex];

    await updatePlayoffMatchDB(nextPlayoffMatch._id!, {
      [key]: { ...winningTeamGoingToNextRound, score: 0 },
    });
    return {
      status: 200,
      message: 'Next playoff match has been updated with the winning team.',
      match: nextPlayoffMatch,
    };
  }

  // update group standings
  if (status === 'completed' && !match.isPlayoff) {
    if (match.status === 'completed') {
      return {
        status: 404,
        message: `Match has already been updated before. Please do not update same match`,
      };
    }

    const { homeTeam, awayTeam, tournament_id, group_id } = match;
    const homeTeamScore = homeTeam?.score || 0;
    const awayTeamScore = awayTeam?.score || 0;

    let winner = '';
    const result = `${homeTeam?.score}-${awayTeam?.score}`;

    if (homeTeam?.score === awayTeam?.score) {
      winner = 'tie';
    } else if (homeTeamScore > awayTeamScore) {
      winner = homeTeam?.name || '';
    } else if (awayTeamScore > homeTeamScore) {
      winner = awayTeam?.name || '';
    }

    match.winner = winner;
    match.result = result;
    match.status = status;

    await saveMatchDB(match);

    const tournament = await getTournamentDB(tournament_id!);

    if (!tournament) {
      return { status: 404, message: 'Tournament NOT found' };
    }

    const currentGroup = await getTournamentGroupDB(group_id!);

    if (!currentGroup) {
      return { status: 404, message: 'Group NOT found' };
    }

    const { standings } = currentGroup;
    const { points_system } = tournament;

    const theWinningTeam =
      winner === homeTeam.name
        ? homeTeam
        : winner === awayTeam.name
        ? awayTeam
        : 'tie';

    const theLosingTeam =
      winner === 'tie' ? 'tie' : winner === homeTeam.name ? awayTeam : homeTeam;

    const teamStandingToNotBeUpdated = standings.filter(
      (team: TTeamStanding) =>
        team.team_id.toString() !== homeTeam.team_id?.toString() &&
        team.team_id.toString() !== awayTeam.team_id?.toString()
    );

    const teamsPlayingAgainEachOtherUpdatedStanding = standings
      .filter(
        (team: TTeamStanding) =>
          team.team_id.toString() === homeTeam.team_id?.toString() ||
          team.team_id.toString() === awayTeam.team_id?.toString()
      )
      .map((team: TTeamStanding) => {
        if (winner === 'tie') {
          const currentTeam = team.team === homeTeam.name ? homeTeam : awayTeam;

          const currentOpponentTeam =
            team.team === homeTeam.name ? awayTeam : homeTeam;

          const totalGoalsScored = team.goals_scored + currentTeam.score;

          const totalGoalsConceded =
            team.goals_conceded + currentOpponentTeam.score;

          const totalGoalDifferences = totalGoalsScored - totalGoalsConceded;

          return {
            ...team,
            draw: team.draw + 1,
            goals_scored: totalGoalsScored,
            goals_conceded: totalGoalsConceded,
            goal_difference: totalGoalDifferences,
            matches_played: team.matches_played + 1,
            points: team.points + points_system.draw,
          };
        } else if (
          theLosingTeam !== 'tie' &&
          theWinningTeam !== 'tie' &&
          winner === theWinningTeam.name
        ) {
          if (winner === team.team) {
            const totalGoalsScoredAsWinner =
              team.goals_scored + theWinningTeam.score;

            const totalGoalsConcededAsWinner =
              team.goals_conceded + theLosingTeam.score;

            const totalGoalDifferencesAsWinner =
              totalGoalsScoredAsWinner - totalGoalsConcededAsWinner;

            return {
              ...team,
              won: team.won + 1,
              goals_scored: totalGoalsScoredAsWinner,
              goals_conceded: totalGoalsConcededAsWinner,
              goal_difference: totalGoalDifferencesAsWinner,
              matches_played: team.matches_played + 1,
              points: team.points + points_system.won,
            };
          } else {
            const totalGoalsScoredAsLoser =
              team.goals_scored + theLosingTeam.score;

            const totalGoalsConcededAsLoser =
              team.goals_conceded + theWinningTeam.score;

            const totalGoalDifferencesAsLoser =
              totalGoalsScoredAsLoser - totalGoalsConcededAsLoser;
            return {
              ...team,
              loss: team.loss + 1,
              goals_scored: totalGoalsScoredAsLoser,
              goals_conceded: totalGoalsConcededAsLoser,
              goal_difference: totalGoalDifferencesAsLoser,
              matches_played: team.matches_played + 1,
              points: team.points + points_system.loss,
            };
          }
        }
      });

    const newStanding = sortStandingPointsByDescendingOrder([
      ...teamStandingToNotBeUpdated,
      ...(teamsPlayingAgainEachOtherUpdatedStanding as TTeamStanding[]),
    ]);

    currentGroup.standings = newStanding;

    const updatedGroupStandings = await saveTournamentGroupDB(currentGroup);

    // check teams going to playoff
    // 1) check if all matches has been played
    // 2) check the tournament rules with "antal retur möten"
    const totalTeamsInGroup = currentGroup.standings.length;
    const rematches = points_system.numberOfMeetings;

    const totalMatchesInOneRound =
      totalTeamsInGroup * (currentGroup.standings.length - 1);

    const totalMatchesInGroupToKnowTeamsAdvancingToPlayoff =
      totalMatchesInOneRound * rematches;

    const currentTotalPlayedMatchesInGroup = currentGroup.standings.reduce(
      (acc, curr) => acc + curr.matches_played,
      0
    );

    if (
      totalMatchesInGroupToKnowTeamsAdvancingToPlayoff !==
      currentTotalPlayedMatchesInGroup
    ) {
      return {
        status: 200,
        message: 'Completed match has updated new group data',
        match: match,
        group: currentGroup,
      };
    }

    const { playoff } = await getTournamentPlayoffByID(tournament_id!);

    if (!playoff?.length) {
      return { status: 404, message: 'Playoff matches to not found' };
    }

    const hasNotUpdatedBefore = playoff[0].matches.every(
      (match) => !match.homeTeam.team_id && !match.awayTeam.team_id
    );

    for (let i = 0; i < points_system.teamsPerGroupAdvancing!; i++) {
      const currentTeamToPlayoff = currentGroup.standings[i];

      if (i === 0) {
        // group winner should be places as homeTeam
        const homeTeamMatchAvailable = playoff[0].matches.find(
          (match) => !match.homeTeam.team_id
        );

        if (homeTeamMatchAvailable) {
          homeTeamMatchAvailable.homeTeam = {
            ...homeTeamMatchAvailable.homeTeam,
            team_id: currentTeamToPlayoff.team_id,
            name: currentTeamToPlayoff.team,
          };

          await updatePlayoffMatchDB(homeTeamMatchAvailable._id!, {
            homeTeam: homeTeamMatchAvailable.homeTeam,
          });
        }

        // if there is a playoff like a final. and we have two groups and 1 team from each group go to playoff final. Then both team are group winner. then place does not matter.
        if (!homeTeamMatchAvailable) {
          const awayTeamMatchAvailable = playoff[0].matches.find(
            (match) => !match.awayTeam.team_id
          );

          if (!awayTeamMatchAvailable) {
            return {
              status: 404,
              message: 'No available match found for the current group winner',
            };
          } else {
            awayTeamMatchAvailable.awayTeam = {
              ...awayTeamMatchAvailable.awayTeam,
              team_id: currentTeamToPlayoff.team_id,
              name: currentTeamToPlayoff.team,
            };

            await updatePlayoffMatchDB(awayTeamMatchAvailable._id!, {
              awayTeam: awayTeamMatchAvailable.awayTeam,
            });
          }
        }
      } else if (hasNotUpdatedBefore === true) {
        // teams after group winner should be placed as awayTeam in a different match like index 1
        const awayTeamMatchAvailable = playoff[0].matches.find(
          (match) => !match.awayTeam.team_id && match.index !== 0
        );

        // if there is enough matches.
        if (awayTeamMatchAvailable) {
          awayTeamMatchAvailable.awayTeam = {
            ...awayTeamMatchAvailable.awayTeam,
            team_id: currentTeamToPlayoff.team_id,
            name: currentTeamToPlayoff.team,
          };

          await updatePlayoffMatchDB(awayTeamMatchAvailable._id!, {
            awayTeam: awayTeamMatchAvailable.awayTeam,
          });
        } else if (!awayTeamMatchAvailable) {
          // if there is NOT enough matches. then we need to added it som the same match.index
          const nextAvailableMatch = playoff[0].matches.find(
            (match) => !match.homeTeam.team_id || !match.awayTeam.team_id
          );

          if (nextAvailableMatch) {
            const key = !nextAvailableMatch.homeTeam.team_id
              ? 'homeTeam'
              : 'awayTeam';

            nextAvailableMatch[key] = {
              ...nextAvailableMatch[key],
              team_id: currentTeamToPlayoff.team_id,
              name: currentTeamToPlayoff.team,
            };

            nextAvailableMatch.awayTeam = {
              ...nextAvailableMatch.awayTeam,
              team_id: currentTeamToPlayoff.team_id,
              name: currentTeamToPlayoff.team,
            };

            await updatePlayoffMatchDB(nextAvailableMatch._id!, {
              [key]: nextAvailableMatch[key],
            });
          }
        } else {
          return {
            status: 404,
            message: 'No available match found for the team in the same group.',
          };
        }
      } else if (hasNotUpdatedBefore === false) {
        // When we have multiple groups and a group with teams has already been added to the playoff schedule
        const remainingMatches = playoff[0].matches.filter(
          (match) => !match.homeTeam.team_id || !match.awayTeam.team_id
        );

        if (!remainingMatches) {
          return {
            status: 404,
            message: 'No remaining matches found',
          };
        }

        if (currentTeamToPlayoff) {
          const match = remainingMatches.find(
            (match) => !match.homeTeam.team_id || !match.awayTeam.team_id
          );

          if (!match) {
            return {
              status: 404,
              message:
                'No remaining spots could be found for the playoff match.',
            };
          }

          const key = !match.homeTeam.team_id ? 'homeTeam' : 'awayTeam';

          match[key] = {
            ...match[key],
            team_id: currentTeamToPlayoff.team_id,
            name: currentTeamToPlayoff.team,
          };

          await updatePlayoffMatchDB(match._id!, {
            [key]: match[key],
          });
        }
      }

      // all teams going to playoff has been looped and now er need to know if any matches are still available because amount of teams going to playoff did not match the playoff schedule.
      if (i === points_system.teamsPerGroupAdvancing! - 1) {
        const leftOverMatches = playoff[0].matches.filter(
          (match) => !match.homeTeam.team_id || !match.awayTeam.team_id
        );

        if (leftOverMatches.length > 0) {
          for (const match of leftOverMatches) {
            if (!match.homeTeam.team_id && !match.homeTeam.name) {
              match.homeTeam.name = 'Bye';
              await updatePlayoffMatchDB(match._id!, {
                homeTeam: match.homeTeam,
              });
            }

            if (!match.awayTeam.team_id && !match.awayTeam.name) {
              match.awayTeam.name = 'Bye';
              await updatePlayoffMatchDB(match._id!, {
                awayTeam: match.awayTeam,
              });
            }

            if (!match.homeTeam.team_id && !match.awayTeam.team_id) {
              match.awayTeam.name = 'Bye';
              match.homeTeam.name = 'Bye';

              await updatePlayoffMatchDB(match._id!, {
                homeTeam: match.homeTeam,
              });

              await updatePlayoffMatchDB(match._id!, {
                awayTeam: match.awayTeam,
              });
            }
          }
        }
      }
    }
    return {
      status: 200,
      message: 'Teams going to playoff has been updated',
      match: playoff,
    };
  }
}

export async function getTournamentPlayoffByID(id: Types.ObjectId) {
  if (!mongoose.isValidObjectId(id)) {
    return { status: 400, message: 'Invalid ID format. Must be a ObjectId' };
  }

  await connectToMongoDB();

  const matches = await getPlayoffMatchesDB(id);

  if (!matches) {
    return { status: 400, message: 'Matches for the tournament was not found' };
  }

  console.log(matches);

  const playoffRounds = [...new Set(matches.map((match) => match.round_type))];

  const playoff: TPlayoff[] = [];

  console.log(playoffRounds);

  for (let i = 0; i < playoffRounds.length; i++) {
    const obj: TPlayoff = {
      round: playoffRounds[i],
      matches: matches
        .filter((match) => match.round_type === playoffRounds[i])
        .sort((a, b) => a.index - b.index),
    };

    playoff.push(obj);
  }

  return { status: 200, playoff };
}

export async function getMatchesByStatus(status: TStatus, amount: number) {
  await connectToMongoDB();

  const matches = await getMatchesByStatusDB(status, amount);

  if (!matches) {
    return { status: 404, message: 'No matches found by status', matches: [] };
  }

  return { status: 200, matches: matches };
}
