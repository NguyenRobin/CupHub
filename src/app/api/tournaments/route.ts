import mongoose, { Types } from 'mongoose';
import { NextResponse } from 'next/server';
import TournamentModel, { TTournament } from '../../../models/Tournament';
import connectToMongoDB from '../../../lib/server/connectToMongoDB';
import {
  generateRobinRound,
  getCookieValue,
  validatePossibleTeamsPerGroupGoingToPlayoff,
  verifyToken,
} from '../../../lib/server';
import UserModel from '../../../models/User';

import { TCreateTournamentBody, TUser } from '../../../types/types';
import {
  createTournamentToTournamentCollectionDB,
  updateTournamentCollectionWithGroupIds,
  updateTournamentCollectionWithTeamsParticipating,
} from '../../../lib/server/dbCollections/tournament';
import { addTeamToTeamCollectionDB } from '../../../lib/server/dbCollections/team';
import { createPlayoffRoundToRoundCollectionDB } from '../../../lib/server/dbCollections/round';
import {
  createGroupCollectionToDB,
  updateGroupCollectionWithMatchIds,
} from '../../../lib/server/dbCollections/group';
import { addMatchesToMatchesCollectionDB } from '../../../lib/server/dbCollections/match';

export async function GET(request: Request) {
  try {
    // const token = getCookieValue(request);

    // if (!token) {
    //   return NextResponse.json({
    //     status: 401,
    //     message: "Authentication failed. Token not provided",
    //   });
    // }

    // const userHasPermission = verifyToken(token);

    // if (!userHasPermission) {
    //   return NextResponse.json({
    //     status: 401,
    //     message: "Authentication failed",
    //   });
    // }

    // console.log("GET tournaments bitch", request);
    // const { searchParams } = new URL(request.url);
    // const userId = searchParams.get("userId");

    // if (!userId || !mongoose.isValidObjectId(userId)) {
    //   return NextResponse.json({
    //     message: "Invalid request. Missing userId or ObjectId is invalid",
    //     status: 400,
    //   });
    // }
    await connectToMongoDB();

    // const user = await User.findById(userId);
    // console.log(user);
    // if (!user) {
    //   return NextResponse.json({
    //     message: "User not found",
    //     status: 400,
    //   });
    // }

    const tournaments = await TournamentModel.find({
      // user: Types.ObjectId.createFromHexString(userId),
    });

    return NextResponse.json({
      status: 200,
      message: 'success',
      result: tournaments.length,
      tournaments,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function POST(request: Request) {
  const sessionCookieToken = getCookieValue(request) ?? '';
  const tokenInfo = verifyToken(sessionCookieToken);

  if (!tokenInfo) {
    return NextResponse.json({
      status: 401,
      message:
        'Authentication failed. Token not valid to create a new tournament',
    });
  }

  try {
    const body: TCreateTournamentBody = await request.json();
    const { total_teams, teams_participating, format, status, groups } = body;

    if (!tokenInfo || !mongoose.isValidObjectId(tokenInfo.id)) {
      return NextResponse.json({
        message: 'Invalid userId for ObjectId',
        status: 400,
      });
    }

    if (total_teams < 0 || total_teams !== teams_participating?.length) {
      return NextResponse.json({
        message:
          'Invalid total_teams. Must be greater than 0. total_teams must have same value as teams_participating',
        status: 400,
      });
    }

    if (format !== 'group_stage_with_knockout') {
      return NextResponse.json({
        status: 400,
        message: 'Tournament format must be group_stage_with_knockout',
      });
    }
    const {
      points_system: { teamsPerGroupAdvancing },
      total_groups,
    } = body;

    if (!teamsPerGroupAdvancing || !total_groups) {
      return NextResponse.json({
        message:
          'teamsPerGroupAdvancing & total_groups is required when creating a group stage with knockout',
        status: 400,
      });
    }

    const playoffInformation = validatePossibleTeamsPerGroupGoingToPlayoff(
      total_teams,
      total_groups,
      teamsPerGroupAdvancing
    );

    if (!playoffInformation.valid) {
      return NextResponse.json({
        message: playoffInformation.message,
        status: 400,
      });
    }

    // 1) connect to the database and start the session

    await connectToMongoDB();

    const session = await mongoose.startSession();
    session.startTransaction();

    const user: TUser | null = await UserModel.findById({
      _id: tokenInfo.id,
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: 'User not found',
      });
    }

    // 2) Add the tournament to database to then retrieve the _id
    const newTournament: TTournament =
      await createTournamentToTournamentCollectionDB(body, user._id, session);

    // 3) with the _id from tournament we can now create a relationship between tournament in the TournamentModel and the teams in the TeamModel.
    const teamsAddedToDb = await addTeamToTeamCollectionDB(
      teams_participating,
      user._id,
      newTournament._id,
      format,
      session
    );

    // 4) Now we also need to update the newTournament with all the teams that participate in specific tournament.
    const updatedNewTournamentWithTeams =
      await updateTournamentCollectionWithTeamsParticipating(
        newTournament._id,
        teamsAddedToDb,
        session
      );

    // 5) create rounds and insert them in to ROUNDS COLLECTION
    const roundsAddedToDb = await createPlayoffRoundToRoundCollectionDB(
      newTournament._id,
      playoffInformation.playoff_round!,
      status,
      session
    );

    // 5) create the groups to groups model
    const groupsAddedToDB = await createGroupCollectionToDB(
      groups,
      newTournament._id,
      teamsAddedToDb,
      session
    );

    // 6) create the matches generate so all teams play against each other.
    const matches = generateRobinRound(groupsAddedToDB);

    const matchesAddedToDB = await addMatchesToMatchesCollectionDB(
      matches,
      session
    );

    // 7) update tournament model with the groups _id ref in the tournaments group array
    await updateTournamentCollectionWithGroupIds(
      newTournament._id,
      groupsAddedToDB,
      session
    );
    // 8) update the groups model with the match _id ref in the groups matches array
    await updateGroupCollectionWithMatchIds(matchesAddedToDB, session);

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      status: 200,
      message: 'Tournament successfully created',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: 'Error creating a tournament',
      errorMsg: error,
    });
  }
}
