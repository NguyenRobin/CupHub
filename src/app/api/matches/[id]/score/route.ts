import { NextResponse } from 'next/server';
import { updateMatchTeamScore } from '../../../../../features/matches/server/actions/match';
import { Types } from 'mongoose';
import connectToMongoDB from '../../../../../mongoose/connectToMongoDB';

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: Types.ObjectId }> }
) {
  const params = await props.params;
  const { id } = params;
  try {
    const body = await request.json();

    const { homeTeam, awayTeam, operator } = body;

    if ((!homeTeam || !awayTeam) && !operator) {
      return NextResponse.json({
        status: 400,
        message: 'body must include "homeTeam" OR "awayTeam" AND a "operator"',
      });
    }

    const teamWhoScored = homeTeam ? 'homeTeam' : 'awayTeam';
    const point = homeTeam ? homeTeam : awayTeam;

    await connectToMongoDB();

    const response = await updateMatchTeamScore(
      id,
      teamWhoScored,
      point,
      operator
    );

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error updating a match',
      errorMsg: error,
    });
  }
}
