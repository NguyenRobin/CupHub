import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";

// Trigger in every /api endpoint
export const config = {
  matcher: "/api/:path*",
};

export function middleware(request: Request) {
  console.log(request);
  const isAuthenticated = authMiddleware(request);
  console.log(isAuthenticated.isValid);
  if (!isAuthenticated.isValid && request.url.includes("/api/users")) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }
  return NextResponse.next();
}
