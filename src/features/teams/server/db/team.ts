import { ClientSession, Types } from 'mongoose';
import { TCreateTeam, TTeam } from '../../../../types/types';
import TeamModel from '../../models/Team';

export async function createTeamsDB(
  teams: TCreateTeam[],
  session?: ClientSession
) {
  const options = session ? { session } : {};

  const teamsAddedToDB: TTeam[] = await TeamModel.insertMany(teams, options);

  return teamsAddedToDB;
}

export async function getTeamsDB(id: Types.ObjectId) {
  const teams = await TeamModel.find({ tournament_id: id });
}
