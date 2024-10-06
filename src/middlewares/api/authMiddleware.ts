import { NextRequest, NextResponse } from "next/server";
import { verifyTokenByJose } from "../../lib/client/clientHelperFunc";

const TOKEN_NAME = process.env.TOKEN_NAME;

export async function authMiddleware(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_NAME!)?.value;

    console.log("FUCKING TOKEN", token);
    if (!token) {
      console.log("!token");
      return NextResponse.redirect(new URL("/auth/login", request.url));
      return NextResponse.json({ message: "NO BITCH" });
    }

    const isTokenValid = await verifyTokenByJose(token);

    if (!isTokenValid) {
      console.log("!isTokenValid");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("error from authMiddle", error);
  }
}
