import { NextResponse, NextRequest } from 'next/server';
import {
  authApiMiddleware,
  authMiddleware,
} from './middlewares/api/authMiddleware';

export async function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname);

  if (
    request.nextUrl.pathname.startsWith('/api/auth/login') ||
    request.nextUrl.pathname.startsWith('/api/auth/signup')
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
