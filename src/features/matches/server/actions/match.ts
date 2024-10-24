import mongoose, { Types } from 'mongoose';
import { getMatchesDB } from '../db/match';

export async function getAllTournamentMatchesByID(id: Types.ObjectId) {
  if (!mongoose.isValidObjectId(id)) {
    return { status: 400, message: 'Invalid ID format. Must be a ObjectId' };
  }

  const matches = await getMatchesDB(id);

  if (!matches) {
    return { status: 400, message: 'Matches for the tournament was not found' };
  }

  return { status: 200, matches };
}
