import connectToMongoDB from "@/lib/connectToMongoDB";
import RoundModel from "@/models/Round";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { tournamentId: string } }
) {
  const tournament_id = params.tournamentId;
  try {
    if (!mongoose.isValidObjectId(tournament_id)) {
      return NextResponse.json({
        message: "Invalid request. Make sure tournament_id is a valid ObjectId",
        status: 400,
      });
    }

    await connectToMongoDB();

    const playoff = await RoundModel.findOne({ tournament_id });
    return NextResponse.json({ status: 200, message: "success", playoff });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: "Error fetching a playoff schedule",
    });
  }
}
