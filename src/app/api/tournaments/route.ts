import { NextResponse } from 'next/server';
import connectToMongoDB from '../../../mongooose/connectToMongoDB';
import TournamentModel from '../../../features/tournaments/models/Tournament';
import { TBodyTournament } from '../../../types/types';

import { createNewTournament } from '../../../features/tournaments/server/actions/tournament';

export async function GET(request: Request) {
  try {
    await connectToMongoDB();

    const tournaments = await TournamentModel.find({
      // user: Types.ObjectId.createFromHexString(userId),
    });

    return NextResponse.json({
      status: 200,
      message: 'success',
      result: tournaments.length,
      tournaments,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function POST(request: Request) {
  try {
    const body: TBodyTournament = await request.json();

    const newTournament = await createNewTournament(body);

    return NextResponse.json({
      status: 201,
      message: 'Tournament successfully created',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: error.status || 500,
      error: error.message,
      message:
        'Error creating a tournament from route handler /api/tournaments',
    });
  }
}
