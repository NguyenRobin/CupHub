import mongoose, { Types, Schema, model } from "mongoose";

interface IGroup {
  tournament_id: Types.ObjectId;
  name: string;
  teams: Types.ObjectId[];
  matches: Types.ObjectId[];
  standings: Types.ObjectId;
}

const groupSchema = new Schema<IGroup>(
  {
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    name: { type: String, required: true },
    teams: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Team" },
    ],
    matches: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Match" },
    ],
    standings: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Standing",
    },
  },
  { timestamps: true }
);

const GroupModel = mongoose.models.Group || model<IGroup>("Group", groupSchema);

export default GroupModel;
