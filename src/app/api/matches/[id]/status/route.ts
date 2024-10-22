import { NextResponse } from 'next/server';
import { updateMatchStatus } from '../../../../../features/matches/server/db/match';
import MatchModel from '../../../../../features/matches/models/Match';
import GroupModel from '../../../../../features/groups/models/Group';
import TournamentModel from '../../../../../features/tournaments/models/Tournament';
import { TGroup, TStanding, TTeam } from '../../../../../types/types';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const match_id = params.id;
  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({
        status: 400,
        message: 'body must include "status"',
      });
    }

    const updatedMatchStatus = await updateMatchStatus(match_id, status);

    console.log('updatedMatchStatus', updatedMatchStatus);

    //! testar
    const tournament = await TournamentModel.findById({
      _id: updatedMatchStatus.tournament_id,
    });

    if (updatedMatchStatus.status === 'completed') {
      console.log('COMPLETED');
      const currentGroup = await GroupModel.findById({
        _id: updatedMatchStatus.group_id,
      });

      if (!currentGroup) {
        return NextResponse.json({
          status: 400,
          message: 'the current group could not be found',
        });
      }

      const { homeTeam, awayTeam, result, winner } = updatedMatchStatus;
      const { standings } = currentGroup;
      const { points_system } = tournament;

      const theWinningTeam =
        winner === homeTeam.name
          ? homeTeam
          : winner === awayTeam.name
          ? awayTeam
          : 'tie';

      const theLosingTeam =
        winner === 'tie'
          ? 'tie'
          : winner === homeTeam.name
          ? awayTeam
          : homeTeam;

      const nonUpdatedStandings = standings.filter(
        (team) =>
          team.team_id.toString() !== homeTeam.team_id.toString() ||
          team.team_id.toString() !== awayTeam.team_id.toString()
      );

      const teamsPlayingStandings: TStanding[] = standings
        .filter(
          (team: TStanding) =>
            team.team_id.toString() === homeTeam.team_id.toString() ||
            team.team_id.toString() === awayTeam.team_id.toString()
        )
        .map((team: TStanding) => {
          if (winner === 'tie') {
            const currentTeam =
              team.team === homeTeam.name ? homeTeam : awayTeam;
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
          } else if (winner === theWinningTeam.name) {
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
        ...teamsPlayingStandings,
      ];

      console.log(currentGroup.standings);

      // currentGroup.save();
    }

    const match = await MatchModel.findById({ _id: match_id });

    return NextResponse.json({
      status: 200,
      updatedMatchStatus,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error updating a match',
      errorMsg: error,
    });
  }
}
