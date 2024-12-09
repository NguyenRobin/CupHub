import { NextRequest, NextResponse } from 'next/server';
import { isUserLoggedIn } from '../../../../lib/server';

export async function GET(request: NextRequest) {
  const isAuthenticated = isUserLoggedIn();

  return NextResponse.json({ status: 200, isAuthenticated });
}
