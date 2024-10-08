import { NextResponse, NextRequest } from "next/server";
import {
  authApiMiddleware,
  authMiddleware,
} from "./middlewares/api/authMiddleware";

export async function middleware(request: NextRequest) {
  if (
    request.url.includes("/auth/login") ||
    request.url.includes("/auth/signup")
  ) {
    return NextResponse.next();
  }

  if (request.url.includes("/dashboard")) {
    return await authMiddleware(request);
  }

  if (request.url.includes("/api")) {
    return await authApiMiddleware(request);
  }
}
// Trigger in every /api endpoint
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
