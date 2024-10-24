import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';
import RoundModel from '../../../../features/rounds/models/Round';

export async function GET(
  request: Request,
  { params }: { params: { tournamentId: string } }
) {
  const tournament_id = params.tournamentId;
  try {
    if (!mongoose.isValidObjectId(tournament_id)) {
      return NextResponse.json({
        message: 'Invalid request. Make sure tournament_id is a valid ObjectId',
        status: 400,
      });
    }

    await connectToMongoDB();

    const { playoff } = await RoundModel.findOne({ tournament_id });

    if (!playoff) {
      return NextResponse.json({
        message: `No playoff found with ID ${tournament_id}`,
        status: 400,
      });
    }

    return NextResponse.json({ status: 200, message: 'success', playoff });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error fetching a playoff schedule',
    });
  }
}
