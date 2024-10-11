import { ClientSession, Types } from "mongoose";
import RoundModel from "../../../models/Round";
import { buildPlayoffSchedule } from "../serverHelperFunc";

export async function createPlayoffRoundToRoundCollectionDB(
  tournament_id: Types.ObjectId,
  playoff_round: number,
  status: "scheduled" | "ongoing" | "completed",
  session?: ClientSession
) {
  const options = session ? { session } : {};

  const playoffSchedule = buildPlayoffSchedule(playoff_round);

  const newRound = new RoundModel({
    tournament_id: tournament_id,
    status: status,
    playoff: playoffSchedule,
  });

  await newRound.save(options);
}
