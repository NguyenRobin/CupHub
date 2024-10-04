import * as jose from "jose";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// jsonwebtoken doesn't support running on Edge environment as it's different from Node.js. You could use jose which supports Vercel's Edge Runtime instead of jsonwebtoken.

export async function verifyTokenByJose(encodedToken: string) {
  const { payload } = await jose.jwtVerify(
    encodedToken,
    new TextEncoder().encode(JWT_SECRET_KEY!)
  );

  return payload;
}
