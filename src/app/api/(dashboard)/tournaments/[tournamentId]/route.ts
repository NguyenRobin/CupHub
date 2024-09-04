import connectToMongoDB from "@/lib/connectToMongoDB";
import TournamentModel from "@/models/Tournament";
import UserModel from "@/models/User";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { tournamentId: string } }
) {
  const tournamentId = params.tournamentId;
  try {
    if (!tournamentId || !mongoose.isValidObjectId(tournamentId)) {
      return NextResponse.json({
        message: "Invalid tournamentId for ObjectId",
        status: 400,
      });
    }
    await connectToMongoDB();

    const tournament = await TournamentModel.findById(tournamentId);

    if (!tournament) {
      return NextResponse.json({
        status: 404,
        message: "No tournament found in database",
      });
    }
    return NextResponse.json({ status: 200, tournament });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: "Error fetching single tournament",
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { tournamentId: string } }
) {
  try {
    const tournamentId = params.tournamentId;

    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({
        message: "Invalid userId for ObjectId",
        status: 400,
      });
    }

    if (!tournamentId || !mongoose.isValidObjectId(tournamentId)) {
      return NextResponse.json({
        message: "Invalid tournamentId for ObjectId",
        status: 400,
      });
    }

    await connectToMongoDB();

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found in database",
      });
    }

    const tournament = await TournamentModel.findOne({
      _id: tournamentId,
      createdByUserId: userId,
    });

    if (!tournament) {
      return NextResponse.json({
        status: 404,
        message: "Tournament not found in database",
      });
    }

    const updatedTournament = await TournamentModel.findByIdAndUpdate(
      tournamentId,
      body
    );

    return NextResponse.json({
      status: 200,
      message: "Tournament successfully updated",
      tournament: updatedTournament,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: "Error updating a tournament",
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { tournament: string } }
) {
  const tournamentId = params.tournament;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({
        message: "Invalid userId for ObjectId",
        status: 400,
      });
    }

    if (!tournamentId || !mongoose.isValidObjectId(tournamentId)) {
      return NextResponse.json({
        message: "Invalid tournamentId for ObjectId",
        status: 400,
      });
    }

    await connectToMongoDB();

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found in database",
      });
    }

    const tournament = await TournamentModel.findOne({
      _id: tournamentId,
      createdByUserId: userId,
    });

    if (!tournament) {
      return NextResponse.json({
        status: 404,
        message: "Tournament not found in database",
      });
    }

    await TournamentModel.findByIdAndDelete(tournamentId);

    return NextResponse.json({
      status: 200,
      message: "Tournament deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: "Error deleting a tournament",
    });
  }
}
