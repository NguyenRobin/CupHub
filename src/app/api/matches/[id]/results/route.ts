import { NextResponse } from 'next/server';
import { updateMatchResultDB } from '../../../../../features/matches/server/db/match';
import connectToMongoDB from '../../../../../mongoose/connectToMongoDB';

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const body = await request.json();
    const { result } = body;

    if (!result) {
      return NextResponse.json({
        status: 400,
        message: 'body must include "result"',
      });
    }
    await connectToMongoDB();

    const updatedMatchResults = await updateMatchResultDB(params.id, result);

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
