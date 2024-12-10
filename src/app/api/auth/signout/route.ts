import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(request: NextRequest) {
  (await cookies()).delete(process.env.TOKEN_NAME!);

  return NextResponse.json({
    status: 200,
    message: 'User successfully signed out',
  });
}
