import { Types } from 'mongoose';
import mongoose from 'mongoose';
import { getTournamentGroupsDB } from '../db/groups';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';

export async function getTournamentGroupsById(id: Types.ObjectId) {
  if (!mongoose.isValidObjectId(id)) {
    return { status: 400, message: 'Invalid ID format. Must be a ObjectId' };
  }

  await connectToMongoDB();
  const groups = await getTournamentGroupsDB(id);

  if (!groups) {
    return { status: 400, message: 'Groups not found' };
  }

  return { status: 200, groups };
}
