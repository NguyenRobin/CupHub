import mongoose, { Types } from 'mongoose';
import { getTournamentPlayoffDB } from '../db/rounds';
import { parse } from 'path';
import { stringify } from 'querystring';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';

export async function getTournamentPlayoffById(id: Types.ObjectId) {
  if (!mongoose.isValidObjectId(id)) {
    return { status: 400, message: 'Invalid ID format. Must be a ObjectId' };
  }
  await connectToMongoDB();

  const playoff = await getTournamentPlayoffDB(id);

  if (!playoff) {
    return { status: 400, message: 'Playoff/Round not found' };
  }

  return { status: 200, playoff: JSON.parse(JSON.stringify(playoff)) };
}
