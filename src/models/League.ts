import mongoose, { Schema, Types, model } from "mongoose";

interface ILeague {
  tournament_id: Types.ObjectId;
  name?: string;
  teams: Types.ObjectId[];
  matches: Types.ObjectId[];
  standings?: Types.ObjectId;
}

const leagueSchema = new Schema<ILeague>(
  {
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tournament",
    },
    name: { type: String },
    teams: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Team" },
    ],
    standings: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Standing",
    },
  },
  { timestamps: true }
);

const LeagueModel =
  mongoose.models.League || model<ILeague>("League", leagueSchema);

export default LeagueModel;
