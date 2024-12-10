import { NextResponse, NextRequest } from 'next/server';
import {
  authApiMiddleware,
  authMiddleware,
} from './middlewares/api/authMiddleware';

if (process.env.TOKEN_NAME === undefined) {
  throw new Error('process.env.TOKEN_NAME NOT defined');
}

export async function middleware(request: NextRequest) {
  request.url;
  const sessionCookie = process.env.TOKEN_NAME;
  const sessionToken = request.cookies.get(sessionCookie!)?.value;
  const url = request.nextUrl.pathname;

  // console.log('------>', url, '+', sessionToken, '<------');

  if (url === '/login' && !sessionToken) {
    return NextResponse.next();
  }

  if (url === '/login' && sessionToken) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token`,
      {
        headers: {
          Cookie: `${sessionCookie}=${sessionToken};`,
        },
      }
    );
    const data = await response.json();

    const { isAuthenticated } = data;

    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (
    url.startsWith('/api/checkout_sessions') ||
    url.startsWith('/api/session_status')
  ) {
    return NextResponse.next();
  }

  if (
    (url.startsWith('/api/auth/signup') || url.startsWith('/api/auth/login')) &&
    !sessionToken
  ) {
    return NextResponse.next();
  }

  if (sessionToken) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token`,
      {
        headers: {
          Cookie: `${sessionCookie}=${sessionToken};`,
        },
      }
    );
    const data = await response.json();

    const { isAuthenticated } = data;

    if (isAuthenticated) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if (!sessionToken) {
  //   console.log('first');
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // if (request.nextUrl.pathname.startsWith('/api')) {
  //   return await authApiMiddleware(token);
  // }

  // return NextResponse.next();

  // if (
  //   request.nextUrl.pathname.startsWith('/api/checkout_sessions') ||
  //   request.nextUrl.pathname.startsWith('/api/session_status')
  // ) {
  //   return NextResponse.next();
  // }

  // if (
  //   (request.nextUrl.pathname.startsWith('/api/auth/signup') ||
  //     request.nextUrl.pathname.startsWith('/api/auth/login')) &&
  //   !token
  // ) {
  //   return NextResponse.next();
  // }

  // if (request.nextUrl.pathname.startsWith('/api/auth/token') && token) {
  //   return NextResponse.next();
  // }

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return await authMiddleware(token, request);
  // }

  // if (request.nextUrl.pathname.startsWith('/api')) {
  //   return await authApiMiddleware(token);
  // }
}

// Trigger in every /api endpoint
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/api/:path*'],
};
