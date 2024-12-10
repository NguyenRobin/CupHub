import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '../../../../lib/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const sessionCookie = (await cookies()).get(process.env.TOKEN_NAME!);
  const sessionToken = sessionCookie?.value;
  const isAuth = isAuthenticated(sessionToken!);
  // console.log('isAuth', isAuth);
  return NextResponse.json({ status: 200, isAuthenticated: isAuth });
}
