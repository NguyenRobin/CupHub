import { NextResponse } from 'next/server';
import { updateMatchTeamScore } from '../../../../../features/matches/server/db/match';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const score = homeTeam ? homeTeam : awayTeam;

    const updatedMatchResults = await updateMatchTeamScore(
      id,
      teamWhoScored,
      score,
      operator
    );

    return NextResponse.json({
      status: 200,
      updatedMatchResults,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error updating a match',
      errorMsg: error,
    });
  }
}
