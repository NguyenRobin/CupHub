import mongoose, { Schema, Types, model } from 'mongoose';

export interface ITournament {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  total_teams: number;
  total_groups?: number;
  status: 'scheduled' | 'ongoing' | 'completed';
  points_system: {
    won: number;
    draw: number;
    loss: number;
    teamsPerGroupAdvancing?: number;
    numberOfMeetings?: number;
  };
  format: 'group_stage_with_knockout';
  teams_participating?: {
    team_id: Types.ObjectId;
  }[];
  groups: Types.ObjectId[];
  createdByUserId: Types.ObjectId;
}

const tournamentSchema = new Schema<ITournament>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    total_teams: { type: Number, required: true, min: 2, max: 64 },
    total_groups: { type: Number, required: false, min: 1 },
    status: {
      type: String,
      enum: ['scheduled', 'ongoing', 'completed'],
      required: true,
    },
    points_system: {
      won: { type: Number, required: true, min: 0, max: 9 },
      draw: { type: Number, required: true, min: 0, max: 9 },
      loss: { type: Number, required: true, min: 0, max: 9 },
      teamsPerGroupAdvancing: { type: Number, required: true, min: 1 },
      numberOfMeetings: { type: Number, required: true, min: 1, max: 2 },
    },
    format: {
      type: String,
      enum: ['group_stage_with_knockout'],
      required: true,
    },
    teams_participating: [
      {
        _id: false,
        team_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team',
          required: false,
        },
      },
    ],
    groups: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Group' },
    ],
    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const TournamentModel =
  mongoose.models.Tournament ||
  model<ITournament>('Tournament', tournamentSchema);

export default TournamentModel;
