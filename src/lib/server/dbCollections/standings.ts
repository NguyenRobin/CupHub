import { ClientSession, Types } from "mongoose";
import StandingModel from "../../../models/Standing";
import { TTeam } from "../../../types/types";

export async function getLeagueStanding(_id: string) {
  try {
    const leagueStanding = await StandingModel.findOne({ league_id: _id });

    return leagueStanding;
  } catch (error) {
    throw error;
  }
}

export type TUpdateStanding = {
  team: string;
  won: number;
  draw: number;
  loss: number;
  goal: number;
  goal_difference: number;
  matches_played: number;
  points: number;
};

export async function updateLeagueStanding(
  league_id: string,
  team_id: string,
  update: TUpdateStanding
) {
  try {
    const { won, draw, loss, goal, goal_difference, matches_played, points } =
      update;

    const leagueStanding = await StandingModel.findOne({
      league_id: league_id,
    });

    if (!leagueStanding) {
      throw new Error("League not found");
    }

    const team = leagueStanding.standings.find((team: any) => {
      return team.team_id.toString() === team_id;
    });

    team.won = won ?? team.won;
    team.draw = draw ?? team.draw;
    team.loss = loss ?? team.loss;
    team.goal = goal ?? team.goal;
    team.goal_difference = goal_difference ?? team.goal_difference;
    team.matches_played = matches_played ?? team.matches_played;
    team.points = points ?? team.points;

    await leagueStanding.save();

    return leagueStanding;
  } catch (error) {
    throw error;
  }
}

export async function createStandingToStandingsCollectionDB(
  _id: Types.ObjectId,
  name: string,
  arr: TTeam[],
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const newStandings = new StandingModel({
    league_id: _id,
    name: name,
    standings: arr.map((team) => {
      return {
        team_id: team._id,
        team: team.name,
        won: 0,
        draw: 0,
        loss: 0,
        goal: 0,
        goal_difference: 0,
        matches_played: 0,
        points: 0,
      };
    }),
  });

  try {
    const data = await newStandings.save(options);
    return data;
  } catch (error) {
    throw error;
  }
}
