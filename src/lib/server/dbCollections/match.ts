import { ClientSession, Types } from 'mongoose';
import MatchModel from '../../../models/Match';
import { TWho } from '../../../types/types';

export async function addMatchesToMatchesCollectionDB(
  array: any[],
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const docs = await MatchModel.insertMany(array, options);
  return docs;
}

export async function getMatch(_id: string) {
  try {
    const match = await MatchModel.findById({ _id: _id });
    if (!match) {
      throw new Error('Match not found');
    }

    return match;
  } catch (error) {
    throw error;
  }
}

export async function updateMatchStatus(
  _id: string,
  status: 'scheduled' | 'ongoing' | 'paused' | 'completed'
) {
  try {
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

export async function updateMatchResult(
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

    return updateMatch;
  } catch (error) {
    throw error;
  }
}

export async function updateMatchWinner(
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

    return updateMatch;
  } catch (error) {
    throw error;
  }
}

export async function updateMatchTeamScore(
  _id: string,
  who: TWho,
  score: number,
  operator: '+' | '-'
) {
  // let teamScoring = who === 'homeTeam' ? 'homeTeam.score' : 'awayTeam.score';
  let teamScoring = who === 'homeTeam' ? 'homeTeam' : 'awayTeam';

  try {
    // const updateMatch = await MatchModel.findByIdAndUpdate(
    //   { _id: _id },
    //   { [teamScoring]: score },
    //   {
    //     runValidators: true,
    //     new: true,
    //   }
    // );

    // return updateMatch;

    const match = await MatchModel.findById({ _id: _id });

    if (!match) {
      throw new Error('Match not found');
    }

    switch (operator) {
      case '+':
        match[teamScoring] = {
          ...match[teamScoring],
          score: match[teamScoring].score + score,
        };
        break;
      case '-':
        match[teamScoring] = {
          ...match[teamScoring],
          score: match[teamScoring].score - score,
        };
        break;
      default:
        break;
    }
    await match.save();

    return match;
  } catch (error) {
    throw error;
  }
}
