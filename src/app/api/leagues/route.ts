import { NextResponse } from 'next/server';
import { getCookieValue, verifyToken } from '../../../lib/server';
import { TCreateLeague } from '../../../types/types';

import { createNewLeague } from '../../../features/leagues/server/actions/league';
import connectToMongoDB from '../../../mongoose/connectToMongoDB';

export async function POST(request: Request) {
  try {
    await connectToMongoDB();

    const body: TCreateLeague = await request.json();

    const newLeague = await createNewLeague(body);

    return NextResponse.json({
      status: 200,
      message: 'League successfully created',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error creating new league at route /api/leagues',
    });
  }
}
