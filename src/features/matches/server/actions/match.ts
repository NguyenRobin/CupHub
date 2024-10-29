import mongoose, { Types } from 'mongoose';
import {
  getMatchAndUpdateDB,
  getMatchDB,
  getMatchesDB,
  getPlayoffMatchesDB,
  saveMatchDB,
  updatePlayoffMatchDB,
} from '../db/match';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';
import { TMatch, TPlayoff, TTeamStanding } from '../../../../types/types';
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

  const matches = await getMatchesDB(id);

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
      throw new Error('Invalid operator');
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

  if (status === 'ongoing') {
    const match = await getMatchAndUpdateDB(_id, status);

    if (!match) {
      return {
        status: 404,
        message: `Match status: ${status}, could NOT be updated`,
      };
    }

    return {
      status: 200,
      message: `Match status: ${status}, successfully be updated`,
      match,
    };
  }

  // update group standings
  if (status === 'completed') {
    const match: TMatch = await getMatchDB(_id);

    if (!match) {
      return { status: 404, message: 'Match NOT found' };
    }

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

    // 1) check all the groups in tournament and send the ones to playoff by re rules from the tournament
    // 2) check the group winner and update the playff match with the correkt index

    // At this point we are done with the groups. so we need the first round in the playoff. Then we need to update the teams advancing.
    const { playoff } = await getTournamentPlayoffByID(tournament_id!);

    if (!playoff?.length) {
      return { status: 404, message: 'Playoff matches to not found' };
    }

    // we want need to check if no playoff has been updated before. meaning, no homeTeam och awayTeam info has been updated by any group.
    const hasNotUpdatedBefore = playoff[0].matches.every(
      (match) => !match.homeTeam.team_id && !match.awayTeam.team_id
    );

    for (let i = 0; i < points_system.teamsPerGroupAdvancing!; i++) {
      const currentTeamToPlayoff = currentGroup.standings[i];

      if (i === 0) {
        const firstEmptyHomeSlot = playoff[0].matches.find(
          (match) => !match.homeTeam.team_id
        );

        if (!firstEmptyHomeSlot) {
          return {
            status: 404,
            message: 'No available home slot found for group winner',
          };
        }

        firstEmptyHomeSlot.homeTeam = {
          ...firstEmptyHomeSlot.homeTeam,
          team_id: currentTeamToPlayoff.team_id,
          name: currentTeamToPlayoff.team,
        };

        await updatePlayoffMatchDB(firstEmptyHomeSlot._id!, {
          homeTeam: firstEmptyHomeSlot.homeTeam,
        });
      } else if (hasNotUpdatedBefore === true) {
        console.log('hasNotUpdatedBefore === true');
        const firstEmptyAwaySlot = playoff[0].matches.find(
          (match) => !match.awayTeam.team_id && match.index !== 0
        );

        if (!firstEmptyAwaySlot) {
          return {
            status: 404,
            message: 'No available away slot found for group runner-up',
          };
        }

        firstEmptyAwaySlot.awayTeam = {
          ...firstEmptyAwaySlot.awayTeam,
          team_id: currentTeamToPlayoff.team_id,
          name: currentTeamToPlayoff.team,
        };

        await updatePlayoffMatchDB(firstEmptyAwaySlot._id!, {
          awayTeam: firstEmptyAwaySlot.awayTeam,
        });
      } else if (hasNotUpdatedBefore === false) {
        const remaining = playoff[0].matches.filter(
          (match) => !match.homeTeam.team_id || !match.awayTeam.team_id
        );

        if (!remaining) {
          return {
            status: 404,
            message: 'No available away slot found for group runner-up',
          };
        }

        if (currentTeamToPlayoff) {
          const firstEmptySlot = remaining.find(
            (match) => !match.homeTeam.team_id || !match.awayTeam.team_id
          );

          if (!firstEmptySlot) {
            return {
              status: 404,
              message: 'No available away slot found for firstEmptySlot',
            };
          }

          const key = !firstEmptySlot.homeTeam.team_id
            ? 'homeTeam'
            : 'awayTeam';

          firstEmptySlot[key] = {
            ...firstEmptySlot[key],
            team_id: currentTeamToPlayoff.team_id,
            name: currentTeamToPlayoff.team,
          };

          await updatePlayoffMatchDB(firstEmptySlot._id!, {
            [key]: firstEmptySlot[key],
          });
        }
      }
    }

    return {
      status: 200,
      message: 'FUCKOFF match has updated new group data',
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

  const playoffRounds = [...new Set(matches.map((match) => match.round_type))];

  const playoff: TPlayoff[] = [];

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
