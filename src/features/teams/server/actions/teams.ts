import { ClientSession, Types } from 'mongoose';
import { createTeamsDB } from '../db/team';
import { TCreateTeam } from '../../../../types/types';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';

export async function createTournamentTeams(
  teams: string[] = [],
  createdByUserId: Types.ObjectId,
  _id: Types.ObjectId,
  format: string,
  session?: ClientSession
) {
  const playing_format =
    format === 'group_stage_with_knockout'
      ? 'tournaments_teamParticipates_in'
      : 'leagues_teamParticipates_in';

  const id =
    format === 'group_stage_with_knockout' ? 'tournament_id' : 'league_id';

  const teamsArr: TCreateTeam[] = [];

  for (let i = 0; i < teams.length; i++) {
    const newTeam: TCreateTeam = {
      name: teams[i],
      [playing_format]: [{ [id]: _id }],
      createdByUserId,
    };

    teamsArr.push(newTeam);
  }

  await connectToMongoDB();
  const teamAddedToDb = await createTeamsDB(teamsArr, session);
  return teamAddedToDb;
}
