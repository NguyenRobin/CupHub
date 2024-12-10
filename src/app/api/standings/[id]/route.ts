import { NextResponse } from 'next/server';
import mongoose, { Types } from 'mongoose';
import { getLeagueStandingById } from '../../../../features/standings/server/actions/standings';

export async function GET(request: Request, props: { params: Promise<{ id: Types.ObjectId }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const leagueStanding = await getLeagueStandingById(id);

    return NextResponse.json({
      status: 200,
      leagueStanding,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: error.status || 500,
      error: error.message,
      message: 'At route handler /api/standings/[id]',
    });
  }
}
