import { NextResponse } from 'next/server';
import connectToMongoDB from '../../../../mongooose/connectToMongoDB';
import TournamentModel from '../../../../features/tournaments/models/Tournament';
import UserModel from '../../../../features/users/models/User';
import mongoose from 'mongoose';
import MatchModel from '../../../../features/matches/models/Match';
import GroupModel from '../../../../features/groups/models/Group';
import RoundModel from '../../../../features/rounds/models/Round';
import { exec } from 'child_process';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json({
        message: 'Invalid id for ObjectId',
        status: 400,
      });
    }
    await connectToMongoDB();

    // const tournament = await TournamentModel.findById(id).lean();
    const tournament = await TournamentModel.findById(id);

    if (!tournament) {
      return NextResponse.json({
        status: 404,
        message: 'No tournament found in database',
      });
    }

    // const matches = await MatchModel.find({ tournament_id: id });
    // const groups = await GroupModel.find({ tournament_id: id });
    // const playoff = await RoundModel.find({ tournament_id: id });

    // const [matches, groups, playoff] = await Promise.all([
    //   MatchModel.find({ tournament_id: id }),
    //   GroupModel.find({ tournament_id: id }),
    //   RoundModel.find({ tournament_id: id }),
    // ]);

    return NextResponse.json({
      message: 'Success',
      status: 200,
      tournament,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error fetching single tournament',
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({
        message: 'Invalid userId for ObjectId',
        status: 400,
      });
    }

    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json({
        message: 'Invalid id for ObjectId',
        status: 400,
      });
    }

    await connectToMongoDB();

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: 'User not found in database',
      });
    }

    const tournament = await TournamentModel.findOne({
      _id: id,
      createdByUserId: userId,
    });

    if (!tournament) {
      return NextResponse.json({
        status: 404,
        message: 'Tournament not found in database',
      });
    }

    const updatedTournament = await TournamentModel.findByIdAndUpdate(id, body);

    return NextResponse.json({
      status: 200,
      message: 'Tournament successfully updated',
      tournament: updatedTournament,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error updating a tournament',
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { tournament: string } }
) {
  const id = params.tournament;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({
        message: 'Invalid userId for ObjectId',
        status: 400,
      });
    }

    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json({
        message: 'Invalid id for ObjectId',
        status: 400,
      });
    }

    await connectToMongoDB();

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: 'User not found in database',
      });
    }

    const tournament = await TournamentModel.findOne({
      _id: id,
      createdByUserId: userId,
    });

    if (!tournament) {
      return NextResponse.json({
        status: 404,
        message: 'Tournament not found in database',
      });
    }

    await TournamentModel.findByIdAndDelete(id);

    return NextResponse.json({
      status: 200,
      message: 'Tournament deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error deleting a tournament',
    });
  }
}
