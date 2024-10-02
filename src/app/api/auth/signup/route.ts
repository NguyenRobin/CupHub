import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(request);

  return NextResponse.json({ status: 200, message: "test" });
  try {
  } catch (error) {}
}
