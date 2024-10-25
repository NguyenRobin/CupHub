import mongoose, { Types } from 'mongoose';
import {
  getMatchAndUpdateDB,
  getMatchDB,
  getMatchesDB,
  saveMatchDB,
} from '../db/match';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';
import {
  TGroup,
  TMatch,
  TTeamStanding,
  TTournament,
} from '../../../../types/types';
import { NextResponse } from 'next/server';
import TournamentModel from '../../../tournaments/models/Tournament';
import GroupModel from '../../../groups/models/Group';

export async function getTournamentMatchesByID(id: Types.ObjectId) {
  if (!mongoose.isValidObjectId(id)) {
    return { status: 400, message: 'Invalid ID format. Must be a ObjectId' };
  }

  await connectToMongoDB();

  const matches = await getMatchesDB(id);

  if (!matches) {
    return { status: 400, message: 'Matches for the tournament was not found' };
  }

  return { status: 200, matches };
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
    const match = getMatchAndUpdateDB(_id, status);

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

  if (status === 'completed') {
    const match: TMatch = await getMatchDB(_id);

    if (!match) {
      return { status: 404, message: 'Match NOT found' };
    }

    const { homeTeam, awayTeam } = match;
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

    // return {
    //   status: 200,
    //   message: `Match status: "${status}" successfully updated`,
    //   match,
    // };

    // !TESING !!!!!!!!!!!!!!!!!!!!!!!!
    // 2) need the some of the tournament info later
    const { tournament_id, group_id } = match;

    const tournament: TTournament | null = await TournamentModel.findById({
      _id: tournament_id,
    });

    if (!tournament) {
      return false;
    }

    const currentGroup = await GroupModel.findById({
      _id: group_id,
    });

    if (!currentGroup) {
      return false;
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

    const nonUpdatedStandings = standings.filter(
      (team: TTeamStanding) =>
        team.team_id.toString() !== homeTeam.team_id.toString() &&
        team.team_id.toString() !== awayTeam.team_id.toString()
    );

    const teamsPlayingAgainEachOtherStandings = standings
      .filter(
        (team: TTeamStanding) =>
          team.team_id.toString() === homeTeam.team_id.toString() ||
          team.team_id.toString() === awayTeam.team_id.toString()
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

    currentGroup.standings = [
      ...nonUpdatedStandings,
      ...teamsPlayingAgainEachOtherStandings,
    ];

    const isSaved = await currentGroup.save();
    return {
      status: 200,
      message: 'Completed match has updated new group data',
      match: match,
      group: currentGroup,
    };
  }
}
