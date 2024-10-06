import { NextResponse, NextRequest } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";

const TOKEN_NAME = process.env.TOKEN_NAME;

export async function middleware(request: NextRequest) {
  console.log("MIDDLEWARE IS RUNING");
  console.log("request.url   ------------>", request.url);
  const token = request.cookies.get(TOKEN_NAME)?.value;
  console.log("middleware token ->", token, TOKEN_NAME);

  if (
    request.url.includes("/auth/login") ||
    request.url.includes("/auth/signup")
  ) {
    return NextResponse.next();
  }

  if (request.url.includes("/api")) {
    return await authMiddleware(request);
  }
}
// Trigger in every /api endpoint
export const config = {
  // matcher: ["/dashboard/:path*", "/api/:path*"],
  matcher: ["/api/:path*"],
};
