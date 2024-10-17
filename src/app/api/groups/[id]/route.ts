import { NextResponse } from 'next/server';
import connectToMongoDB from '../../../../lib/server/connectToMongoDB';
import mongoose from 'mongoose';
import GroupModel from '../../../../models/Group';

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

    const groups = await GroupModel.find({ tournament_id: id });

    if (!groups) {
      return NextResponse.json({
        status: 404,
        message: 'Tournament groups not found',
      });
    }

    return NextResponse.json({
      message: 'Success',
      status: 200,
      groups,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error getting a tournament groups',
      errorMsg: error,
    });
  }
}
