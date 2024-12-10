import { NextResponse } from 'next/server';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';
import mongoose from 'mongoose';
import GroupModel from '../../../../features/groups/models/Group';
import MatchModel from '../../../../features/matches/models/Match';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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

// get matches from a tournament.
// check winner or check score
// check if the the status of the match? completed? live? scheduled?
// if match is completed. update the groups standings with all new data
// when a match is updated for example goal i score, or match is stared. Then we want to trigger a function that updates new group standings. so when we fetch it we have the latest data

export async function UPDATE(
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
    const matches = await MatchModel.find({ tournament_id: id });

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
