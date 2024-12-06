import mongoose, { ClientSession, Types } from 'mongoose';
import TournamentModel from '../../models/Tournament';
import {
  TBodyTournament,
  TNewTournament,
  TTeam,
  TTournament,
} from '../../../../types/types';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';
import GroupModel from '../../../groups/models/Group';
import MatchModel from '../../../matches/models/Match';
import TeamModel from '../../../teams/models/Team';
import { log } from 'console';

export async function createTournamentDB(
  body: TBodyTournament,
  userId: Types.ObjectId,
  session?: ClientSession
) {
  const options = session ? { session } : {};

  const {
    name,
    location,
    startDate,
    endDate,
    total_teams,
    format,
    status,
    points_system,
    description,
  } = body;

  const newTournament = new TournamentModel({
    name,
    description,
    location,
    startDate,
    endDate,
    total_teams,
    format,
    status,
    points_system,
    createdByUserId: userId,
  });

  const document: TNewTournament = await newTournament.save(options);
  return document;
}

export async function updateTournamentWithTeamsParticipatingDB(
  tournament_id: any,
  arr: any[],
  session?: ClientSession
) {
  const options = session ? { session } : {};

  const teams_participating = arr.map((team) => {
    return { team_id: team._id };
  });
  const updatedTournament = await TournamentModel.findByIdAndUpdate(
    { _id: tournament_id },
    { teams_participating },
    options
  );
  return updatedTournament;
}

export async function updateTournamentWithGroupIdsDB(
  tournament_id: any,
  arr: any[],
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const groupIds = arr.map((group) => group._id);

  const updatedTournament = await TournamentModel.findByIdAndUpdate(
    { _id: tournament_id },
    { groups: groupIds },
    options
  );
  return updatedTournament;
}

export async function getTournamentDB(id: Types.ObjectId) {
  const tournament: TTournament | null = await TournamentModel.findById({
    _id: id,
  });
  return tournament;
}

export async function deleteTournamentDB(id: Types.ObjectId) {
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const tournament = await TournamentModel.deleteOne({ _id: id }).session(
      session
    );
    const groups = await GroupModel.deleteMany({ tournament_id: id }).session(
      session
    );
    const matches = await MatchModel.deleteMany({ tournament_id: id }).session(
      session
    );
    const teams: TTeam[] = await TeamModel.find({
      tournaments_teamParticipates_in: { $elemMatch: { tournament_id: id } },
    })
      .session(session)
      .lean<any>();

    const teamsToBeUpdated: TTeam[] = [];
    const teamsToBeRemoved = teams
      .map((team) => ({
        ...team,
        tournaments_teamParticipates_in:
          team.tournaments_teamParticipates_in?.filter(
            (tournament) =>
              tournament.tournament_id.toString() !== id.toString()
          ),
      }))
      .filter((team) => {
        if (
          team.tournaments_teamParticipates_in?.length === 0 &&
          (team.leagues_teamParticipates_in?.length === 0 ||
            team.leagues_teamParticipates_in === undefined)
        ) {
          return team;
        } else {
          teamsToBeUpdated.push(team);
        }
      });

    for (const team of teamsToBeRemoved) {
      const teamsDeleted = await TeamModel.findByIdAndDelete({
        _id: team._id,
      }).session(session);
    }

    for (const team of teamsToBeUpdated) {
      const teamsUpdated = await TeamModel.findByIdAndUpdate(
        { _id: team._id },
        {
          tournaments_teamParticipates_in: team.tournaments_teamParticipates_in,
        }
      ).session(session);
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();

    console.error(error);
    throw error;
  } finally {
    session.endSession();
  }
}
