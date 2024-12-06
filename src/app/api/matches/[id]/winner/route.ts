import { NextResponse } from 'next/server';
import { updateMatchWinnerDB } from '../../../../../features/matches/server/db/match';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const body = await request.json();

    const { winner } = body;

    if (!winner) {
      return NextResponse.json({
        status: 400,
        message: 'body must include "winner"',
      });
    }

    const updatedWinner = await updateMatchWinnerDB(id, winner);

    return NextResponse.json({
      status: 200,
      updatedWinner,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error updating a match',
    });
  }
}
