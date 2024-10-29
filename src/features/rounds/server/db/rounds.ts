import { ClientSession, Types } from 'mongoose';
import {
  buildPlayoffMatches,
  buildPlayoffSchedule,
} from '../../../../lib/server';
import RoundModel from '../../models/Round';
import MatchModel from '../../../matches/models/Match';

export async function createPlayoffRoundDB(
  tournament_id: Types.ObjectId,
  playoff_round: number,
  status: 'scheduled' | 'ongoing' | 'completed',
  session?: ClientSession
) {
  const options = session ? { session } : {};

  const playoffSchedule = buildPlayoffMatches(playoff_round, tournament_id);

  // const newRound = new RoundModel({
  //   tournament_id: tournament_id,
  //   status: status,
  //   playoff: playoffSchedule,
  // });

  // return await newRound.save(options);
}

export async function getTournamentPlayoffDB(id: Types.ObjectId) {
  const test = await MatchModel.find({
    tournament_id: id,
    isPlayoff: true,
  });
  return test;

  const playoff = await RoundModel.findOne({ tournament_id: id }).lean();
  return playoff;
}
