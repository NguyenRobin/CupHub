import { NextRequest, NextResponse } from "next/server";
import { verifyTokenByJose } from "../../lib/client/clientHelperFunc";
const TOKEN_NAME = process.env.TOKEN_NAME;

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME!)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const isTokenValid = verifyTokenByJose(token);

  if (!isTokenValid) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}
