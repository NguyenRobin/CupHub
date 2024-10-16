import { NextResponse } from 'next/server';
import { updateMatchStatus } from '../../../../../lib/server/dbCollections/match';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({
        status: 400,
        message: 'body must include "status"',
      });
    }

    const updatedMatchStatus = await updateMatchStatus(params.id, status);

    return NextResponse.json({
      status: 200,
      updatedMatchStatus,
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
