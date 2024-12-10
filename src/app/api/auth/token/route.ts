import { NextRequest, NextResponse } from 'next/server';
import { isUserLoggedIn } from '../../../../lib/server';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';

export async function GET(request: NextRequest) {
  await connectToMongoDB();

  const isAuthenticated = isUserLoggedIn();

  return NextResponse.json({ status: 200, isAuthenticated });
}
