import mongoose, { Schema, Types, model } from "mongoose";

interface IMatch {
  match_id: string;
  tournament_id: Types.ObjectId;
  group_id?: Types.ObjectId;
  round_id?: Types.ObjectId;
  league_id?: Types.ObjectId;
  status: "scheduled" | "ongoing" | "completed";
  homeTeam: { team_id: Types.ObjectId; name: string; score: number };
  awayTeam: { team_id: Types.ObjectId; name: string; score: number };
  date: Date;
  location?: string;
}

const matchSchema = new Schema<IMatch>(
  {
    match_id: { type: String, required: true },
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tournament",
    },
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Group",
    },
    round_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Round",
    },
    league_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "League",
    },
    status: { type: String, required: true },

    homeTeam: {
      team_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Team",
      },
      name: { type: String, required: true },
      score: { type: Number, required: true },
    },
    awayTeam: {
      team_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Team",
      },
      name: { type: String, required: true },
      score: { type: Number, required: true },
    },

    date: { type: Date, required: false },
    location: { type: String, required: false },
  },
  { timestamps: true }
);

const MatchModel = mongoose.models.Match || model<IMatch>("Match", matchSchema);

export default MatchModel;
