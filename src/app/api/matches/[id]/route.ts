import { NextResponse } from 'next/server';
import { getMatchDB } from '../../../../features/matches/server/db/match';
import { Types } from 'mongoose';

export async function GET(request: Request, props: { params: Promise<{ id: Types.ObjectId }> }) {
  const params = await props.params;
  const { id } = params;
  try {
    console.log(params.id);
    const match = await getMatchDB(id);

    if (!match) {
      return NextResponse.json({
        status: 404,
        message: 'Match not found',
      });
    }
    return NextResponse.json({
      status: 200,
      match,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error getting a match',
      errorMsg: error,
    });
  }
}

export async function POST() {}

export async function UPDATE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error updating a match',
      errorMsg: error,
    });
  }
}

export async function DELETE() {}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // const updatedMatch = await updateMatch(params.id, {
    //   "homeTeam.score": body.homeTeam.score,
    // });
    // console.log(updatedMatch);

    // if (!updatedMatch) {
    //   return NextResponse.json({
    //     status: 404,
    //     message: "Match could not be updated",
    //   });
    // }
    return NextResponse.json({
      status: 200,
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
