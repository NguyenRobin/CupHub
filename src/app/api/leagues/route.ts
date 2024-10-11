import { NextResponse } from "next/server";
import {
  generateRobinRound,
  generateRobinRoundTEST,
  getCookieValue,
  verifyToken,
} from "../../../lib/server/serverHelperFunc";
import { TCreateLeague, TUser } from "../../../types/types";
import connectToMongoDB from "../../../lib/server/connectToMongoDB";
import UserModel from "../../../models/User";
import mongoose from "mongoose";
import {
  createLeagueToLeagueCollectionDB,
  updateLeagueCollectionWithTeamsParticipating,
} from "../../../lib/server/dbCollections/league";
import { addTeamToTeamCollectionDB } from "../../../lib/server/dbCollections/team";
import { addMatchesToMatchesCollectionDB } from "../../../lib/server/dbCollections/match";
import { createStandingToStandingsCollectionDB } from "../../../lib/server/dbCollections/standings";

export async function POST(request: Request) {
  const sessionCookieToken = getCookieValue(request) ?? "";
  const tokenInfo = verifyToken(sessionCookieToken);

  if (!tokenInfo) {
    return NextResponse.json({
      status: 401,
      message:
        "Authentication failed. Token not valid to create a new tournament",
    });
  }

  try {
    const body: TCreateLeague = await request.json();

    const {
      name,
      total_teams,
      teams_participating,
      format,
      points_system: { numberOfMeetings },
    } = body;

    await connectToMongoDB();

    const user: TUser | null = await UserModel.findById({
      _id: tokenInfo.id,
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    const newLeague = await createLeagueToLeagueCollectionDB(
      body,
      user._id,
      session
    );

    const teamsAddedToDb = await addTeamToTeamCollectionDB(
      teams_participating,
      user._id,
      newLeague._id,
      format,
      session
    );

    const updatedNewLeagueWithTeams =
      await updateLeagueCollectionWithTeamsParticipating(
        newLeague._id,
        teamsAddedToDb,
        session
      );

    const matches = generateRobinRoundTEST(
      newLeague._id,
      teamsAddedToDb,
      numberOfMeetings
    );

    const matchesAddedToDB = await addMatchesToMatchesCollectionDB(
      matches,
      session
    );

    const standings = await createStandingToStandingsCollectionDB(
      newLeague._id,
      name,
      teamsAddedToDb,
      session
    );

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      status: 200,
      message: "League successfully created",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: "Error creating new league",
    });
  }
}
