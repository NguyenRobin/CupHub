import { NextRequest, NextResponse } from 'next/server';
import { isUserLoggedIn } from '../../../../features/stripe/server/actions/stripe';

export async function GET(request: NextRequest) {
  const isLoggedIn = isUserLoggedIn();
  console.log(isLoggedIn, 'isLoggedIn');
  return NextResponse.json({ status: 200, isLoggedIn });
}
