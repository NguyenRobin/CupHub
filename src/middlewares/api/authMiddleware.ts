import { NextRequest, NextResponse } from "next/server";
import { verifyTokenByJose } from "../../lib/client/clientHelperFunc";

const TOKEN_NAME = process.env.TOKEN_NAME;

export async function authMiddleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME!)?.value;
  try {
    if (!token) {
      console.log("!token:", token);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const isTokenValid = await verifyTokenByJose(token);
    console.log("Token verifiering:", isTokenValid);

    if (!isTokenValid) {
      console.log("Token är ogiltig, omdirigerar till /auth/login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Fel under token-verifiering:", error);
    // Fallback till login vid fel
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export async function authApiMiddleware(request: NextRequest) {
  const token = request.cookies.get("AUTH_SESSION_TOKEN")?.value;

  if (!token) {
    console.log("!token api");
    return NextResponse.json({
      status: 401,
      message: "Authentication failed. Token not provided. MIDDLEWARE",
    });
  }
  const isTokenValid = await verifyTokenByJose(token);

  if (!isTokenValid) {
    console.log("!isTokenValid api");

    return NextResponse.json({
      status: 401,
      message: "Authentication failed. Token not valid. MIDDLEWARE",
    });
  }

  return NextResponse.next();
}
