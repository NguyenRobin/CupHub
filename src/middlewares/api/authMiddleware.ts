import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenByJose } from '../../lib/client';
import { cookies } from 'next/headers';
import { verifyToken } from '../../lib/server';

if (process.env.TOKEN_NAME === undefined) {
  throw new Error('process.env.TOKEN_NAME NOT defined');
}

export async function authMiddleware(
  token: string | undefined,
  request: NextRequest
) {
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const isTokenValid = await verifyTokenByJose(token);

    if (!isTokenValid) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // if (isTokenValid) {
    //   console.log(isTokenValid);
    //   // return NextResponse.next();
    // }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export async function authApiMiddleware(token: string | undefined) {
  if (!token) {
    return NextResponse.json({
      status: 401,
      message: 'Authentication failed. Token not provided. MIDDLEWARE',
    });
  }
  const isTokenValid = await verifyTokenByJose(token);

  if (!isTokenValid) {
    return NextResponse.json({
      status: 401,
      message: 'Authentication failed. Token not valid. MIDDLEWARE',
    });
  }

  return NextResponse.next();
}
