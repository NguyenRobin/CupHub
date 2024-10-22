import { NextResponse } from "next/server";
import { getLeagueStanding } from "../../../../lib/server/dbCollections/standings";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({
      status: 404,
      message: "id is not a valid objectId",
    });
  }

  try {
    const leagueStanding = await getLeagueStanding(id);

    if (!leagueStanding) {
      return NextResponse.json({
        status: 404,
        message: "League standing not found",
      });
    }

    return NextResponse.json({
      status: 200,
      leagueStanding,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
