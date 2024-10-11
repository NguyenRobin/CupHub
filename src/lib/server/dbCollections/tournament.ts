import { ClientSession } from "mongoose";
import TournamentModel from "../../../models/Tournament";

export async function createTournamentToTournamentCollectionDB(
  body: any,
  userId: any,
  session?: ClientSession
) {
  const options = session ? { session } : {};

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

  const created = await newTournament.save(options);
  console.log("created", created);
  return created;
}

export async function updateTournamentCollectionWithTeamsParticipating(
  tournament_id: any,
  arr: any[],
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const teams_participating = arr.map((team) => {
    return { team_id: team._id };
  });
  const updatedTournament = await TournamentModel.findByIdAndUpdate(
    { _id: tournament_id },
    { teams_participating },
    options
  );
  return updatedTournament;
}

export async function updateTournamentCollectionWithGroupIds(
  tournament_id: any,
  arr: any[],
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const groupIds = arr.map((group) => group._id);

  const updatedTournament = await TournamentModel.findByIdAndUpdate(
    { _id: tournament_id },
    { groups: groupIds },
    options
  );
  return updatedTournament;
}
