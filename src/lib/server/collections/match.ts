import { Types } from "mongoose";
import MatchModel from "../../../models/Match";
import { TWho } from "../../../types/types";

export async function getMatch(_id: string) {
  try {
    const match = await MatchModel.findById({ _id: _id });
    if (!match) {
      return false;
    }

    return match;
  } catch (error) {
    throw error;
  }
}

export async function updateMatchStatus(
  _id: string,
  status: { status: string }
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

export async function updateMatchWinner(_id: string, obj: { winner: string }) {
  try {
    const updateMatch = await MatchModel.findByIdAndUpdate({ _id: _id }, obj, {
      runValidators: true,
      new: true,
    });

    return updateMatch;
  } catch (error) {
    throw error;
  }
}

export async function updateMatchTeamScore(
  _id: string,
  who: TWho,
  score: number
) {
  const teamScoring = who === "homeTeam" ? "homeTeam.score" : "awayTeam.score";

  try {
    const updateMatch = await MatchModel.findByIdAndUpdate(
      { _id: _id },
      { [teamScoring]: score },
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
