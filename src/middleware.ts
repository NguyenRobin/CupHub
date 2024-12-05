import { NextResponse, NextRequest } from 'next/server';
import {
  authApiMiddleware,
  authMiddleware,
} from './middlewares/api/authMiddleware';

if (process.env.TOKEN_NAME === undefined) {
  throw new Error('process.env.TOKEN_NAME NOT defined');
}

export async function middleware(request: NextRequest) {
  const TOKEN_NAME = process.env.TOKEN_NAME;
  const token = request.cookies.get(TOKEN_NAME!)?.value;

  console.log('------>', request.nextUrl.pathname, '+', token, '<------');

  if (
    request.nextUrl.pathname.startsWith('/api/checkout_sessions') ||
    request.nextUrl.pathname.startsWith('/api/session_status')
  ) {
    return NextResponse.next();
  }

  if (
    (request.nextUrl.pathname.startsWith('/api/auth/signup') ||
      request.nextUrl.pathname.startsWith('/api/auth/login')) &&
    !token
  ) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/api/auth/token') && token) {
    console.log('true', ' YEHEEE');
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return await authMiddleware(request);
  }

  if (request.nextUrl.pathname.startsWith('/api')) {
    return await authApiMiddleware(request);
  }
}

// Trigger in every /api endpoint
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
