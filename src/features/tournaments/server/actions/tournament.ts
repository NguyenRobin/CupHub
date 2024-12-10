import {
  createTournamentDB,
  deleteTournamentDB,
  getTournamentDB,
  updateTournamentWithGroupIdsDB,
  updateTournamentWithTeamsParticipatingDB,
} from '../db/tournament';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';

import {
  buildPlayoffMatches,
  generateRobinRound,
  getCookieFromServerComponent,
  validatePossibleTeamsPerGroupGoingToPlayoff,
  verifyToken,
} from '../../../../lib/server';
import { createPlayoffRoundDB } from '../../../rounds/server/db/rounds';
import {
  createGroupDB,
  updateGroupWithMatchIdsDB,
} from '../../../groups/server/db/groups';
import { createMatchesDB } from '../../../matches/server/db/match';
import mongoose, { Types } from 'mongoose';
import { TBodyTournament } from '../../../../types/types';
import { createTournamentTeams } from '../../../teams/server/actions/teams';

export async function createNewTournament(body: TBodyTournament) {
  const token = await getCookieFromServerComponent();

  console.log(token);
  if (!token) {
    return { status: 404, message: 'Cookie not provided' };
  }

  const verifiedTokenCookie = await verifyToken(token);

  if (!verifiedTokenCookie) {
    return {
      status: 401,
      message:
        'Authentication failed. Token not valid to create a new tournament',
    };
  }

  if (!mongoose.isValidObjectId(verifiedTokenCookie.id)) {
    return {
      status: 404,
      message: 'ID is not a ObjectId. Error creating new tournament',
    };
  }

  const {
    total_teams,
    teams_participating,
    format,
    status,
    groups,
    points_system: { teamsPerGroupAdvancing },
    total_groups,
  } = body;

  if (total_teams !== teams_participating?.length) {
    return {
      status: 400,
      message: 'Invalid total_teams AND teams_participating must be equal',
    };
  }

  if (!teamsPerGroupAdvancing || !total_groups) {
    return {
      status: 400,
      message:
        'teamsPerGroupAdvancing & total_groups is required when creating a group stage with playoff',
    };
  }

  if (!total_groups || !teamsPerGroupAdvancing) {
    return {
      status: 400,
      message: 'total_groups AND teamsPerGroupAdvancing must be included.',
    };
  }
  const totalTeamsGoingToPlayoff = total_groups * teamsPerGroupAdvancing;

  if (totalTeamsGoingToPlayoff > total_teams) {
    return {
      status: 404,
      message: `Total teams going to playoff: ${totalTeamsGoingToPlayoff}. Cannot be greater than total teams participating: ${total_teams}. `,
    };
  }

  const playoffInformation = validatePossibleTeamsPerGroupGoingToPlayoff(
    totalTeamsGoingToPlayoff
  );

  // 1) connect to the database and start the session
  await connectToMongoDB();

  const session = await mongoose.startSession();
  session.startTransaction();

  // 2) Add the tournament to database to then retrieve the _id
  const newTournament = await createTournamentDB(
    body,
    verifiedTokenCookie.id,
    session
  );

  // 3) with the _id from tournament we can now create a relationship between tournament in the TournamentModel and the teams in the TeamModel.
  const teamsAddedToDb = await createTournamentTeams(
    teams_participating,
    verifiedTokenCookie.id,
    newTournament._id,
    format,
    session
  );

  // 4) Now we also need to update the newTournament with all the teams that participate in specific tournament.
  const updatedNewTournamentWithTeams =
    await updateTournamentWithTeamsParticipatingDB(
      newTournament._id,
      teamsAddedToDb,
      session
    );

  //!TEST

  const test = buildPlayoffMatches(
    playoffInformation.playoff_round,
    newTournament._id
  );

  // 5) create rounds and insert them in to ROUNDS COLLECTION
  // const roundsAddedToDb = await createPlayoffRoundDB(
  //   newTournament._id,
  //   playoffInformation.playoff_round,
  //   status,
  //   session
  // );

  // 5) create the groups to groups model
  const groupsAddedToDB = await createGroupDB(
    groups,
    newTournament._id,
    teamsAddedToDb,
    session
  );

  // 6) create the matches generate so all teams play against each other.
  const matches = generateRobinRound(groupsAddedToDB);

  const matchesAddedToDB = await createMatchesDB(
    [...matches, ...test],
    session
  );
  // console.log(matchesAddedToDB);
  const groupMatches = matchesAddedToDB.filter((match) => !match.isPlayoff);

  // 7) update tournament model with the groups _id ref in the tournaments group array
  await updateTournamentWithGroupIdsDB(
    newTournament._id,
    groupsAddedToDB,
    session
  );
  // 8) update the groups model with the match _id ref in the groups matches array
  await updateGroupWithMatchIdsDB(groupMatches, session);

  await session.commitTransaction();
  session.endSession();

  return {
    status: 201,
    message: 'yehe tournament created',
    tournament: newTournament,
  };
}

export async function getTournamentById(id: Types.ObjectId) {
  if (!mongoose.isValidObjectId(id)) {
    return { status: 400, message: 'Invalid ID format. Must be a ObjectId' };
  }
  await connectToMongoDB();

  const tournament = await getTournamentDB(id);

  if (!tournament) {
    return { status: 400, message: 'Tournament not found' };
  }

  return { status: 200, tournament };
}

export async function deleteTournamentById(id: Types.ObjectId) {
  if (!mongoose.isValidObjectId(id)) {
    return { status: 400, message: 'Invalid ID format. Must be a ObjectId' };
  }

  await connectToMongoDB();
  const tournament = await deleteTournamentDB(id);

  return { status: 200, message: 'Tournament successfully deleted' };
}
