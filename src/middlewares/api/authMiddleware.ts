function validateToken(token: any) {
  const validToken = false;
  if (!validToken || !token) {
    return false;
  }
  return true;
}

export function authMiddleware(request: Request) {
  const token = request.headers.get("Authorization")?.split(" "[1]);
  return { isValid: true };
  return { isValid: validateToken(token) };
}
