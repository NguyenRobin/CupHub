import mongoose, { Schema, model, Types } from 'mongoose';

interface IStanding {
  league_id: Types.ObjectId;
  name: string;
  standings: {
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
  }[];
}

const standingSchema = new Schema<IStanding>(
  {
    league_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'League',
      required: true,
    },
    name: { type: String, required: true },
    standings: [
      {
        team_id: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
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

const StandingModel =
  mongoose.models.Standing || model<IStanding>('Standing', standingSchema);

export default StandingModel;
