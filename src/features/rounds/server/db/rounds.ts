import { ClientSession, Types } from 'mongoose';
import { buildPlayoffSchedule } from '../../../../lib/server';
import RoundModel from '../../models/Round';

export async function createPlayoffRoundDB(
  tournament_id: Types.ObjectId,
  playoff_round: number,
  status: 'scheduled' | 'ongoing' | 'completed',
  session?: ClientSession
) {
  const options = session ? { session } : {};

  const playoffSchedule = buildPlayoffSchedule(playoff_round);

  const newRound = new RoundModel({
    tournament_id: tournament_id,
    status: status,
    playoff: playoffSchedule,
  });

  return await newRound.save(options);
}
