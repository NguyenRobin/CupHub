import { NextResponse, NextRequest } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";

const TOKEN_NAME = process.env.TOKEN_NAME;

// Trigger in every /api endpoint
export const config = {
  matcher: ["/api/tournaments/:path*", "/dashboard/:path*"],
};

export async function middleware(request: NextRequest) {
  if (!request.url.includes("/auth/login")) {
    const isAuthenticated = authMiddleware(request);
    return isAuthenticated;
  }

  if (
    request.url.includes("/auth/login") ||
    request.url.includes("/api/users")
  ) {
    return NextResponse.next();
  }
}
