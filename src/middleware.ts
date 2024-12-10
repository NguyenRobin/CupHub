import { NextResponse, NextRequest } from 'next/server';
import {
  authApiMiddleware,
  authMiddleware,
} from './middlewares/api/authMiddleware';
import connectToMongoDB from './mongoose/connectToMongoDB';

if (process.env.TOKEN_NAME === undefined) {
  throw new Error('process.env.TOKEN_NAME NOT defined');
}

export async function middleware(request: NextRequest) {
  const TOKEN_NAME = process.env.TOKEN_NAME;
  const token = request.cookies.get(TOKEN_NAME!)?.value ?? undefined;

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
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return await authMiddleware(token, request);
  }

  if (request.nextUrl.pathname.startsWith('/api')) {
    return await authApiMiddleware(token);
  }
}

// Trigger in every /api endpoint
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
