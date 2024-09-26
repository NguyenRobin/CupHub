import mongoose, { Schema, Types, model } from "mongoose";

interface ITournament {
  name: string;
  description?: string;
  sport: string;
  location: string;
  startDate: Date;
  endDate: Date;
  total_teams: number;
  total_groups?: number;
  createdAt: Date;
  updatedAt: Date;
  status: "scheduled" | "ongoing" | "completed";
  points_system: {
    win: number;
    draw: number;
    loss: number;
    teamsPerGroupAdvancing?: number;
    numberOfMeetings?: number;
  };
  tournament_format: "league" | "knockout" | "group_stage_with_knockout";
  teams_participating?: {
    team_id: Types.ObjectId;
  }[];
  groups?: Types.ObjectId[];
  createdByUserId: Types.ObjectId;
}

const tournamentSchema = new Schema<ITournament>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    location: { type: String, required: true },
    sport: { type: String, enum: ["soccer", "golf"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    total_teams: { type: Number, required: true },
    total_groups: { type: Number, required: false },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed"],
      required: true,
    },
    points_system: {
      win: { type: Number, required: true },
      draw: { type: Number, required: true },
      loss: { type: Number, required: true },
      teamsPerGroupAdvancing: { type: Number, required: false },
      numberOfMeetings: { type: Number, required: false },
    },
    tournament_format: {
      type: String,
      enum: ["league", "knockout", "group_stage_with_knockout"],
      required: true,
    },
    teams_participating: [
      {
        _id: false,
        team_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
          required: true,
        },
      },
    ],
    groups: [
      { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Group" },
    ],
    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const TournamentModel =
  mongoose.models.Tournament ||
  model<ITournament>("Tournament", tournamentSchema);

export default TournamentModel;
