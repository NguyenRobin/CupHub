import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenByJose } from '../../lib/client';

if (process.env.TOKEN_NAME === undefined) {
  throw new Error('process.env.TOKEN_NAME NOT defined');
}

export async function authMiddleware(
  token: string | undefined,
  request: NextRequest
) {
  if (!token) {
    console.warn('No token provided, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const isValid = await verifyTokenByJose(token);
    if (!isValid) {
      console.warn('Invalid token, redirecting to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error('Error during token validation:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export async function authApiMiddleware(token: string | undefined) {
  if (!token) {
    return NextResponse.json({
      status: 401,
      error: 'Authentication failed',
      message: 'Token not provided. MIDDLEWARE',
    });
  }
  const isTokenValid = await verifyTokenByJose(token);

  if (!isTokenValid) {
    return NextResponse.json({
      status: 401,
      error: 'Authentication failed',
      message: 'Token not valid. MIDDLEWARE',
    });
  }

  return NextResponse.next();
}
