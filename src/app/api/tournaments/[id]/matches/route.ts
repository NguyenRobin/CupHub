import { NextResponse } from 'next/server';
import connectToMongoDB from '../../../../../mongoose/connectToMongoDB';
import MatchModel from '../../../../../features/matches/models/Match';
import mongoose from 'mongoose';
import TournamentModel from '../../../../../features/tournaments/models/Tournament';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json({
        message: 'Invalid id for ObjectId',
        status: 400,
      });
    }
    await connectToMongoDB();

    const matches = await MatchModel.find({ tournament_id: id });

    if (!matches) {
      return NextResponse.json({
        status: 404,
        message: 'Tournament Matches not found',
      });
    }

    return NextResponse.json({
      message: 'Success',
      status: 200,
      matches,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error getting a tournament matches',
      errorMsg: error,
    });
  }
}
