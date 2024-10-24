import { Types } from 'mongoose';
import mongoose from 'mongoose';
import { getTournamentGroupsDB } from '../db/groups';

export async function getAllTournamentGroupsById(id: Types.ObjectId) {
  if (!mongoose.isValidObjectId(id)) {
    return { status: 400, message: 'Invalid ID format. Must be a ObjectId' };
  }

  const groups = await getTournamentGroupsDB(id);

  if (!groups) {
    return { status: 400, message: 'Groups not found' };
  }

  return { status: 200, groups };
}
