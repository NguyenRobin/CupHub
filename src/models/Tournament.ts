// import mongoose, { Schema, Types, model } from "mongoose";

// type TMatch = {
//   match_id: string;
//   homeTeam: { teamId: string; name: string; score: number };
//   awayTeam: { teamId: string; name: string; score: number };
//   date: Date;
//   location?: string;
// };

// type TGroup = {
//   group: string;
//   teams: string[];
//   standings: {
//     teamId: string;
//     matches_played: number;
//     win: number;
//     draw: number;
//     loss: number;
//     goal_scored: number;
//     goal_difference: number;
//     points: number;
//   }[];
// };

// type TRound = {
//   round: string;
//   matches: {
//     match_id: string;
//     homeTeam: { teamId: string; name: string; score: number };
//     awayTeam: { teamId: string; name: string; score: number };
//     date: Date;
//     location?: string;
//   }[];
// };

// interface ITournament {
//   readonly id: string;
//   name: string;
//   description?: string;
//   sport: string;
//   location: string;
//   startDate: Date;
//   endDate: Date;
//   type: "league" | "group_stage" | "knockout" | "group_stage_with_knockout";
//   teams_participating: string[];
//   total_teams: number;
//   total_groups?: number;
//   createdAt: Date;
//   updatedAt: Date;
//   status?: "scheduled" | "ongoing" | "completed";
//   createdByUserId: Types.ObjectId;
//   points_system: {
//     win: number;
//     draw: number;
//     loss: number;
//     teamsPerGroupAdvancing?: number;
//     numberOfMeetings?: number;
//   };
//   format_details: {
//     league?: {
//       matches: TMatch[];
//     };
//     group_stage?: {
//       groups: TGroup[];
//     };
//     knockout?: {
//       rounds: TRound[];
//     };
//   };
// }

// const tournamentSchema = new Schema<ITournament>(
//   {
//     id: { type: String, required: true },
//     name: { type: String, required: true },
//     description: { type: String, required: false },
//     location: { type: String, required: true },
//     sport: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     type: {
//       type: String,
//       enum: ["group-stage", "league", "knockout", "group_stage_with_knockout"],
//       required: true,
//     },
//     teams_participating: { type: [String], required: true },
//     total_teams: { type: Number, required: true },
//     total_groups: { type: Number, required: false },
//     createdAt: { type: Date, required: true },
//     updatedAt: { type: Date, required: true },
//     status: { type: String, required: true },
//     points_system: { type: Object, required: true },
//     format_details: { type: Object, required: true },
//     // set up the relationship, this will refer to the users collection
//     createdByUserId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// const TournamentModel =
//   mongoose.models.Tournament ||
//   model<ITournament>("Tournament", tournamentSchema);

// export default TournamentModel;

import mongoose, { Schema, Types, model } from "mongoose";

// interface ITournament {
//   readonly id: string;
//   name: string;
//   description?: string;
//   sport: string;
//   location: string;
//   startDate: Date;
//   endDate: Date;
//   type: "league" | "group_stage" | "knockout" | "group_stage_with_knockout";
//   total_teams: number;
//   total_groups?: number;
//   createdAt: Date;
//   updatedAt: Date;
//   status: "scheduled" | "ongoing" | "completed";
//   points_system: {
//     win: number;
//     draw: number;
//     loss: number;
//     teamsPerGroupAdvancing?: number;
//     numberOfMeetings?: number;
//   };
//   tournament_format: {
//     groups?: Types.ObjectId[];
//     rounds?: Types.ObjectId[];
//     league?: Types.ObjectId;
//     standings?: Types.ObjectId;
//     matches?: Types.ObjectId[];
//   };
//   // teams_participating: Types.ObjectId[];
//   createdByUserId: Types.ObjectId;
// }

interface ITournament {
  readonly id: string;
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

  createdByUserId: Types.ObjectId;
}

const tournamentSchema = new Schema<ITournament>(
  {
    id: { type: String, required: true },
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
