import {
  generateRobinRoundTEST,
  getCookieFromServerComponent,
  verifyToken,
} from '../../../../lib/server';
import { TBodyLeague } from '../../../../types/types';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';
import {
  createLeagueDB,
  updateLeagueWithTeamsParticipatingDB,
} from '../db/league';
import { createMatchesDB } from '../../../matches/server/db/match';
import { createStandingDB } from '../../../standings/server/db/standings';
import { createTournamentTeams as createLeagueTeams } from '../../../teams/server/actions/teams';
import mongoose from 'mongoose';

export async function createNewLeague(body: TBodyLeague) {
  const token = getCookieFromServerComponent();

  if (!token) {
    return { status: 404, message: 'Cookie not provided' };
  }

  const verifiedTokenCookie = verifyToken(token);

  if (!verifiedTokenCookie) {
    return {
      status: 401,
      message: 'Authentication failed. Token not valid to create a new league',
    };
  }

  if (!mongoose.isValidObjectId(verifiedTokenCookie.id)) {
    return {
      status: 404,
      message: 'ID is not a ObjectId. Error creating new league',
    };
  }

  const {
    name,
    teams_participating,
    format,
    points_system: { numberOfMeetings },
  } = body;

  await connectToMongoDB();

  const session = await mongoose.startSession();

  session.startTransaction();

  const newLeague = await createLeagueDB(body, verifiedTokenCookie.id, session);

  const teamsAddedToDb = await createLeagueTeams(
    teams_participating,
    verifiedTokenCookie.id,
    newLeague._id,
    format,
    session
  );

  const updatedNewLeagueWithTeams = await updateLeagueWithTeamsParticipatingDB(
    newLeague._id,
    teamsAddedToDb,
    session
  );

  const matches = generateRobinRoundTEST(
    newLeague._id,
    teamsAddedToDb,
    numberOfMeetings
  );

  const matchesAddedToDB = await createMatchesDB(matches, session);

  const standings = await createStandingDB(
    newLeague._id,
    name,
    teamsAddedToDb,
    session
  );

  await session.commitTransaction();
  session.endSession();

  return { status: 200, message: 'League successfully created' };
}
