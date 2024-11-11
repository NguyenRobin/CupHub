import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenByJose } from '../../lib/client';
import { cookies } from 'next/headers';

const TOKEN_NAME = process.env.TOKEN_NAME;

export async function authMiddleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME!)?.value;
  console.log(token);
  try {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    console.log('token before signing a new token', token);

    const isTokenValid = await verifyTokenByJose(token);

    if (!isTokenValid) {
      // console.log('!isTokenValid', isTokenValid);
      return NextResponse.redirect(new URL('/login', request.url));
      // return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export async function authApiMiddleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME!)?.value;

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
