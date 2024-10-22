import { ObjectId } from 'mongodb';
import mongoose, { Schema, Types, model } from 'mongoose';

interface ILeague {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  total_teams: number;
  status: 'scheduled' | 'ongoing' | 'completed';
  points_system: {
    won: number;
    draw: number;
    loss: number;
    numberOfMeetings?: number;
  };
  format: 'league' | 'knockout' | 'group_stage_with_knockout';
  teams_participating?: {
    team_id: Types.ObjectId;
  }[];
  standings?: Types.ObjectId[];
  createdByUserId: Types.ObjectId;
}

const leagueSchema = new Schema<ILeague>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },

    location: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    total_teams: { type: Number, required: true },
    status: {
      type: String,
      enum: ['scheduled', 'ongoing', 'completed'],
      required: true,
    },
    points_system: {
      won: { type: Number, required: true, min: 0, max: 9 },
      draw: { type: Number, required: true, min: 0, max: 9 },
      loss: { type: Number, required: true, min: 0, max: 9 },
      numberOfMeetings: { type: Number, required: true, min: 1, max: 2 },
    },
    format: {
      type: String,
      enum: ['league', 'knockout', 'group_stage_with_knockout'],
      required: true,
    },
    teams_participating: [
      {
        _id: false,

        team_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team',
          required: true,
        },
      },
    ],
    standings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Standing',
      },
    ],
    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },

  { timestamps: true }
);

const LeagueModel =
  mongoose.models.League || model<ILeague>('League', leagueSchema);

export default LeagueModel;
