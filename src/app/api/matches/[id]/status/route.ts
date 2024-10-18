import { NextResponse } from 'next/server';
import { updateMatchStatus } from '../../../../../lib/server/dbCollections/match';
import MatchModel from '../../../../../models/Match';
import GroupModel from '../../../../../models/Group';
import TournamentModel from '../../../../../models/Tournament';

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

      const pointsToWinner = {};
      const pointsToLoser = {};
      const pointsTie = {};

      // const homeTeam_standings = standings.filter(
      //   (team) => team.team_id.toString() === homeTeam.team_id.toString()
      // )[0];

      // const awayTeam_standings = standings.filter(
      //   (team) => team.team_id.toString() === awayTeam.team_id.toString()
      // )[0];

      const teamsPlayingStandings = standings
        .filter(
          (team) =>
            team.team_id.toString() === homeTeam.team_id.toString() ||
            team.team_id.toString() === awayTeam.team_id.toString()
        )
        .map((team) => {
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
              goals_scored: totalGoalsScored,
              goals_conceded: totalGoalsConceded,
              goal_difference: totalGoalDifferences,
              matches_played: team.matches_played + 1,
              points: team.points + points_system.draw,
            };
          } else if (winner === 'FIXA SENN!') {
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
              goals_scored: totalGoalsScored,
              goals_conceded: totalGoalsConceded,
              goal_difference: totalGoalDifferences,
              matches_played: team.matches_played + 1,
              points: team.points + points_system.draw,
            };
          }
        });

      // console.log(homeTeam_standings);
      // console.log(awayTeam_standings);
      console.log(teamsPlayingStandings);

      // let winnerInfo;

      // if (winner === 'tie') {
      //   winnerInfo = null;
      // } else if (homeTeam.name === winner) {
      //   winnerInfo = homeTeam;
      // } else if (awayTeam.name === winner) {
      //   winnerInfo = awayTeam;
      // }

      //   const updatedStandings = standings.filter((team) => {
      //     if (team.team === winner) {
      //       console.log('team.team === winner');
      //       return {
      //         ...team,
      //         won: team.won + 1,
      //         goals_scored: team.goals_scored + winnerInfo.score,
      //         goals_conceded: team.goals_conceded + loserInfo.score,
      //         goal_difference: team.goals_scored - team.goals_conceded,
      //         matches_played: team.matches_played + 1,
      //         points: team.points + points_system.won,
      //       };
      //     } else if (team.team !== winner && winner !== 'tie') {
      //       console.log('team.team !== winner && winner !== tie ');

      //       return {
      //         ...team,
      //         loss: team.loss + 1,
      //         goals_scored: team.goals_scored + loserInfo.score,
      //         goals_conceded: team.goals_conceded + winnerInfo.score,
      //         goal_difference: team.goals_scored - team.goals_conceded,
      //         matches_played: team.matches_played + 1,
      //         points: team.points + points_system.loss,
      //       };
      //     } else if (winner === 'tie') {
      //       const currentTeam = team.team === homeTeam.name ? homeTeam : awayTeam;
      //       return {
      //         ...team,
      //         goals_scored: team.goals_scored + currentTeam.score,
      //         goals_conceded: team.goals_conceded + currentTeam.score,
      //         goal_difference: team.goals_scored - currentTeam.score,
      //         matches_played: team.matches_played + 1,
      //         points: team.points + points_system.draw,
      //       };
      //     }
      //   });
      //   console.log('updatedStandings', updatedStandings);
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
