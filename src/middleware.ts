import { NextResponse, NextRequest } from 'next/server';
import {
  authApiMiddleware,
  authMiddleware,
} from './middlewares/api/authMiddleware';

export async function middleware(request: NextRequest) {
  const TOKEN_NAME = process.env.TOKEN_NAME;
  console.log(request.nextUrl.pathname);
  const token = request.cookies.get(TOKEN_NAME!)?.value;

  if (
    (request.nextUrl.pathname.startsWith('/api/auth/login') ||
      request.nextUrl.pathname.startsWith('/api/auth/signup')) &&
    !token
  ) {
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
