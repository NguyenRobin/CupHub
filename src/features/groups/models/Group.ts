import mongoose, { Types, Schema, model } from 'mongoose';

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
  won: number;
  draw: number;
  loss: number;
  goals_scored: number;
  goals_conceded: number;
  goal_difference: number;
  matches_played: number;
  points: number;
}

const groupSchema = new Schema<IGroup>(
  {
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
      required: true,
    },
    group: { type: String, required: true },
    teams: [
      {
        _id: false,
        team_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Team',
        },
        name: { type: String, required: true },
      },
    ],
    matches: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Match' },
    ],
    standings: [
      {
        team_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team',
          required: true,
        },
        team: { type: String, required: true },
        won: { type: Number, required: true },
        draw: { type: Number, required: true },
        loss: { type: Number, required: true },
        goals_scored: { type: Number, required: true },
        goals_conceded: { type: Number, required: true },
        goal_difference: { type: Number, required: true },
        matches_played: { type: Number, required: true },
        points: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const GroupModel = mongoose.models.Group || model<IGroup>('Group', groupSchema);

export default GroupModel;
