import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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

export function createToken(user: any) {
  const encodedToken = jwt.sign(user, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "15m",
  });

  return encodedToken;
}

export function verifyToken(encodedToken: string) {
  const decodedToken = jwt.verify(encodedToken, JWT_SECRET_KEY!);
  return decodedToken;
}
