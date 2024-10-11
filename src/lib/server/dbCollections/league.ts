import { ClientSession, Types } from "mongoose";
import LeagueModel from "../../../models/League";

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
