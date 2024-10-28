import { ClientSession, Types } from 'mongoose';
import TournamentModel from '../../models/Tournament';
import {
  TBodyTournament,
  TNewTournament,
  TTournament,
} from '../../../../types/types';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';

export async function createTournamentDB(
  body: TBodyTournament,
  userId: Types.ObjectId,
  session?: ClientSession
) {
  const options = session ? { session } : {};

  const {
    name,
    location,
    startDate,
    endDate,
    total_teams,
    format,
    status,
    points_system,
    description,
  } = body;

  const newTournament = new TournamentModel({
    name,
    description,
    location,
    startDate,
    endDate,
    total_teams,
    format,
    status,
    points_system,
    createdByUserId: userId,
  });

  const document: TNewTournament = await newTournament.save(options);
  return document;
}

export async function updateTournamentWithTeamsParticipatingDB(
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

export async function updateTournamentWithGroupIdsDB(
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

export async function getTournamentDB(id: Types.ObjectId) {
  const tournament: TTournament | null = await TournamentModel.findById({
    _id: id,
  });
  return tournament;
}
