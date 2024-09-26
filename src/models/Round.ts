import mongoose, { Schema, Types, model } from "mongoose";

interface IMatch {
  match_id?: string; // Optional since MongoDB's _id can be used
  homeTeam?: { team_id: Types.ObjectId; name: string; score: number };
  awayTeam?: { team_id: Types.ObjectId; name: string; score: number };
  date?: Date;
  location?: string;
}

interface IRound {
  tournament_id: Types.ObjectId;
  status: "scheduled" | "ongoing" | "completed";
  playoff: {
    round: string;
    matches: IMatch[];
  }[];
}

const matchSchema = new Schema<IMatch>(
  {
    match_id: { type: String, required: false }, // Optional, can rely on _id
    homeTeam: {
      team_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Team",
      },
      name: { type: String, required: false },
      score: { type: Number, required: false },
    },
    awayTeam: {
      team_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Team",
      },
      name: { type: String, required: false },
      score: { type: Number, required: false },
    },
    location: { type: String, required: false },
  },
  { _id: false }
);

const roundSchema = new Schema<IRound>(
  {
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tournament",
    },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed"],
      required: true,
    },

    playoff: [
      {
        _id: false,
        round: { type: String, required: true },
        matches: [matchSchema],
      },
    ],
  },
  { timestamps: true }
);

const RoundModel = mongoose.models.Round || model<IRound>("Round", roundSchema);

export default RoundModel;
