import mongoose, { Types, Schema, model } from "mongoose";

interface IGroup {
  tournament_id: Types.ObjectId;
  group: string;
  teams?: { team_id: Types.ObjectId; name: string }[];
  matches?: Types.ObjectId[];
  standings?: IStanding[];
}

interface IStanding {
  team_id: Types.ObjectId;
  team: string;
  win: number;
  draw: number;
  loss: number;
  goal: number;
  goal_difference: number;
  matches_played: number;
  points: number;
  lastUpdated?: Date;
}

const groupSchema = new Schema<IGroup>(
  {
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    group: { type: String, required: true },
    teams: [
      {
        _id: false,
        team_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Team",
        },
        name: { type: String, required: true },
      },
    ],
    matches: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Match" },
    ],
    standings: [
      {
        team_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
          required: true,
        },
        team: { type: String, required: true },
        win: { type: Number, required: true },
        draw: { type: Number, required: true },
        loss: { type: Number, required: true },
        goal: { type: Number, required: true },
        goal_difference: { type: Number, required: true },
        matches_played: { type: Number, required: true },
        points: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const GroupModel = mongoose.models.Group || model<IGroup>("Group", groupSchema);

export default GroupModel;
