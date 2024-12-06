import { Types } from 'mongoose';
import mongoose from 'mongoose';
import { getLeagueStandingDB } from '../../../../features/standings/server/db/standings';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';

export async function getLeagueStandingById(league_id: Types.ObjectId) {
  if (!mongoose.isValidObjectId(league_id)) {
    throw {
      status: 404,
      message: 'id is not a valid objectId',
    };
  }

  await connectToMongoDB();

  const leagueStanding = await getLeagueStandingDB(league_id);

  if (!leagueStanding) {
    throw {
      status: 404,
      message: 'League standing not found',
    };
  }
  return leagueStanding;
}
