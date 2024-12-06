import { ClientSession, Types } from 'mongoose';

import { TMatch, TStatus, TWho } from '../../../../types/types';
import { revalidatePath } from 'next/cache';
import MatchModel from '../../models/Match';
import { match } from 'assert';
import connectToMongoDB from '../../../../mongoose/connectToMongoDB';

export async function getMatchesDB(id: Types.ObjectId) {
  const matches = await MatchModel.find({ tournament_id: id });
  return matches;
}

export async function createMatchesDB(array: any[], session?: ClientSession) {
  const options = session ? { session } : {};
  const docs = await MatchModel.insertMany(array, options);
  return docs;
}

export async function getMatchDB(_id: Types.ObjectId) {
  const match: TMatch | null = await MatchModel.findById({ _id: _id });
  return match;
}

export async function updateMatchStatusDB(
  _id: Types.ObjectId,
  status: 'scheduled' | 'ongoing' | 'paused' | 'completed'
) {
  try {
    await connectToMongoDB();

    if (status === 'completed') {
      const match = await getMatchDB(_id);

      const { homeTeam, awayTeam } = match;

      let winner = '';
      const result = `${homeTeam.score}-${awayTeam.score}`;

      if (homeTeam.score === awayTeam.score) {
        winner = 'tie';
      } else if (homeTeam.score > awayTeam.score) {
        winner = homeTeam.name;
      } else if (awayTeam.score > homeTeam.score) {
        winner = awayTeam.name;
      }

      match.winner = winner;
      match.result = result;
      match.status = status;

      // const updatedMatch = await match.save();
      await saveMatchDB(match);

      return { status: 200, message: 'Match status successfully updated' };
    }

    const updateMatch = await MatchModel.findByIdAndUpdate(
      { _id: _id },
      { status: status },
      {
        runValidators: true,
        new: true,
      }
    );
    return updateMatch;
  } catch (error) {
    throw error;
  }
}

export async function updateMatchResultDB(
  _id: string,
  result: { result: string }
) {
  try {
    const updateMatch = await MatchModel.findByIdAndUpdate(
      { _id: _id },
      { result: result },
      {
        runValidators: true,
        new: true,
      }
    );
    revalidatePath(`/dashboard/match/${_id}`);
    return updateMatch;
  } catch (error) {
    throw error;
  }
}

export async function updateMatchWinnerDB(
  _id: string,
  winner: { winner: string }
) {
  try {
    const match = await MatchModel.findById(_id);
    const { homeTeam, awayTeam } = match;
    const checkWinner =
      homeTeam.score === awayTeam.score
        ? 'draw'
        : homeTeam.score > awayTeam.score
        ? homeTeam.name
        : awayTeam.name;

    if (winner !== checkWinner) {
      // return { status: 400, message: "Invalid winner based on result" };
      throw new Error('Invalid winner based on result');
    }

    const updateMatch = await MatchModel.findByIdAndUpdate(
      { _id: _id },
      { winner: checkWinner },
      {
        runValidators: true,
        new: true,
      }
    );
    revalidatePath(`/dashboard/match/${_id}`);
    return updateMatch;
  } catch (error) {
    throw error;
  }
}

export async function saveMatchDB(match: any) {
  await match.save();
}

export async function getMatchAndUpdateDB(
  _id: Types.ObjectId,
  status: 'scheduled' | 'ongoing' | 'paused'
) {
  const updateMatch = await MatchModel.findByIdAndUpdate(
    { _id: _id },
    { status: status },
    {
      runValidators: true,
      new: true,
    }
  );
  return updateMatch;
}

export async function getPlayoffMatchesDB(_id: Types.ObjectId) {
  const matches = await MatchModel.find({
    tournament_id: _id,
    isPlayoff: true,
  });

  return matches;
}

export async function updatePlayoffMatchDB(_id: Types.ObjectId, update: any) {
  const match = await MatchModel.findByIdAndUpdate(
    {
      _id: _id,
    },
    update,
    {
      new: true,
    }
  );

  return match;
}

export async function getMatchesByStatusDB(status: TStatus, amount?: number) {
  let query = MatchModel.find().where({ status: status });

  if (amount) {
    query = query.limit(amount);
  }
  const matches = await query;
  return matches;
}
