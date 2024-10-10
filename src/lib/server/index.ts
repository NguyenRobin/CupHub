import { ClientSession, Types } from "mongoose";
import GroupModel from "../../models/Group";
import LeagueModel from "../../models/League";
import MatchModel from "../../models/Match";
import RoundModel from "../../models/Round";
import TeamModel from "../../models/Team";
import TournamentModel from "../../models/Tournament";
import { TGroup, TTeam } from "../../types/types";
import { buildPlayoffSchedule } from "./serverHelperFunc";
import StandingModel from "../../models/Standing";

export async function createPlayoffRoundToRoundCollectionDB(
  tournament_id: Types.ObjectId,
  playoff_round: number,
  status: "scheduled" | "ongoing" | "completed"
) {
  const playoffSchedule = buildPlayoffSchedule(playoff_round);

  const newRound = new RoundModel({
    tournament_id: tournament_id,
    status: status,
    playoff: playoffSchedule,
  });

  // connectToMongoDB();

  await newRound.save();
}

export async function addTeamToTeamCollectionDB(
  teams: string[] = [],
  createdByUserId: Types.ObjectId,
  _id: Types.ObjectId,
  format: string,
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const playing_format =
    format === "group_stage_with_knockout"
      ? "tournaments_teamParticipates_in"
      : "leagues_teamParticipates_in";

  const id =
    format === "group_stage_with_knockout" ? "tournament_id" : "league_id";

  const teamsArr = [];

  for (let i = 0; i < teams.length; i++) {
    const newTeam = {
      name: teams[i],
      [playing_format]: [{ [id]: _id }],
      createdByUserId,
    };

    teamsArr.push(newTeam);
  }

  const docs: TTeam[] = await TeamModel.insertMany(teamsArr, options);

  return docs;
}

export async function addMatchesToMatchesCollectionDB(
  array: any[],
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const docs = await MatchModel.insertMany(array, options);
  return docs;
}

export async function updateTournamentCollectionWithTeamsParticipating(
  tournament_id: any,
  arr: any[]
) {
  const teams_participating = arr.map((team) => {
    return { team_id: team._id };
  });
  const updatedTournament = await TournamentModel.findByIdAndUpdate(
    { _id: tournament_id },
    { teams_participating }
  );
  return updatedTournament;
}

export async function updateTournamentCollectionWithGroupIds(
  tournament_id: any,
  arr: any[]
) {
  const groupIds = arr.map((group) => group._id);

  const updatedTournament = await TournamentModel.findByIdAndUpdate(
    { _id: tournament_id },
    { groups: groupIds }
  );
  return updatedTournament;
}

export async function createGroupCollectionToDB(
  groups: any[],
  tournament_id: Types.ObjectId,
  teamsArr: any[]
) {
  const allGroups: TGroup[] = [];
  for (let i = 0; i < groups.length; i++) {
    const teams = teamsArr
      .filter((team) => groups[i].teams.includes(team.name))
      .map((team) => ({ team_id: team._id, name: team.name }));

    const newGroup: TGroup = {
      tournament_id: tournament_id,
      group: groups[i].group,
      teams: teams,
      standings: teams.map((team) => {
        return {
          team_id: team.team_id,
          team: team.name,
          win: 0,
          draw: 0,
          loss: 0,
          goal: 0,
          goal_difference: 0,
          matches_played: 0,
          points: 0,
        };
      }),
    };
    allGroups.push(newGroup);
  }
  const groupsAddedToDB = await GroupModel.insertMany(allGroups);
  return groupsAddedToDB;
}

export async function updateGroupCollectionWithMatchIds(arr: any[]) {
  const groupIds = arr.map((group) => group.group_id);
  const removedDuplicatesOfGroupIds = [...new Set(groupIds)];

  for (const id of removedDuplicatesOfGroupIds) {
    const matchIds = arr
      .filter((match) => match.group_id === id)
      .map((match) => match._id);

    const updatedGroup = await GroupModel.findByIdAndUpdate(
      { _id: id },
      { matches: matchIds }
    );
  }
}

export async function createTournamentToTournamentCollectionDB(
  body: any,
  userId: any
) {
  const {
    name,
    sport,
    location,
    startDate,
    endDate,
    total_teams,
    format,
    createdAt,
    updatedAt,
    status,
    points_system,
  } = body;

  const newTournament = new TournamentModel({
    name,
    sport,
    location,
    startDate,
    endDate,
    total_teams,
    format,
    createdAt,
    updatedAt,
    status,
    points_system,
    createdByUserId: userId,
  });

  const created = await newTournament.save();
  return created;
}

export async function createLeagueToLeagueCollectionDB(
  body: any,
  userId: any,
  session?: ClientSession
) {
  const options = session ? { session } : {};

  const {
    name,
    description,
    location,
    startDate,
    endDate,
    total_teams,
    status,
    total_groups,
    points_system,
    format,
  } = body;
  const newLeague = new LeagueModel({
    name,
    description,
    location,
    startDate,
    endDate,
    total_teams,
    status,
    total_groups,
    points_system,
    format,
    createdByUserId: userId,
  });

  try {
    const data = await newLeague.save(options);
    return data;
  } catch (error: any) {
    throw error; // send the error to my handler and catch the error
  }
}

export async function updateLeagueCollectionWithTeamsParticipating(
  _id: Types.ObjectId,
  arr: any[],
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const teams_participating = arr.map((team) => {
    return { team_id: team._id };
  });

  const updatedLeague = await LeagueModel.findByIdAndUpdate(
    { _id: _id },
    { teams_participating },
    options
  );

  return updatedLeague;
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
