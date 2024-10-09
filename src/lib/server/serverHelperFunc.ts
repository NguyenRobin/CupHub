import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

type TJwtPayload = {
  id: string;
  username: string;
  iat: number;
  exp: number;
};

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function compareUserInputPasswordWithHashedPassword(
  notHashedPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isPasswordMatching = await bcrypt.compare(
    notHashedPassword,
    hashedPassword
  );
  return isPasswordMatching;
}

export function createToken(user: { id: string; username: string }) {
  const encodedToken = jwt.sign(user, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "15m",
  });

  return encodedToken;
}

export function verifyToken(encodedToken: string) {
  const decodedToken = jwt.verify(encodedToken, JWT_SECRET_KEY!);
  return decodedToken as TJwtPayload;
}

export function getCookieValue(request: Request) {
  const sessionToken = request.headers.get("cookie")?.split("=")[1];
  return sessionToken;
}
