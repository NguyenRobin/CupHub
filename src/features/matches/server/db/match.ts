import { ClientSession, Types } from 'mongoose';
import MatchModel from '../../models/Match';
import { TWho } from '../../../../types/types';

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
  const match = await MatchModel.findById({ _id: _id });
  return match;
}

export async function updateMatchStatusDB(
  _id: string,
  status: 'scheduled' | 'ongoing' | 'paused' | 'completed'
) {
  try {
    if (status === 'completed') {
      const match = await MatchModel.findById({ _id: _id });
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

      const updatedMatch = await match.save();
      return updatedMatch;
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

    return updateMatch;
  } catch (error) {
    throw error;
  }
}

export async function updateMatchTeamScoreDB(
  _id: string,
  who: TWho,
  score: number,
  operator: '+' | '-'
) {
  let teamScoring = who === 'homeTeam' ? 'homeTeam' : 'awayTeam';

  try {
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
