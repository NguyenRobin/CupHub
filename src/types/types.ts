import { Types } from "mongoose";

export type KeyValue =
  | "rounds"
  | "win"
  | "draw"
  | "loss"
  | "teamsPerGroupAdvancing"
  | "final"
  | "semifinal"
  | "quarterfinal"
  | "roundOf16"
  | "roundOf32"
  | "roundOf62";

export type TCreateTournamentBody = {
  name: string;
  description?: string;
  sport?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  total_teams: number;
  total_groups?: number;
  status: "scheduled" | "ongoing" | "completed";
  points_system: {
    win: number;
    draw: number;
    loss: number;
    teamsPerGroupAdvancing?: number;
    numberOfMeetings?: number;
  };
  format: "league" | "knockout" | "group_stage_with_knockout";
  teams_participating?: string[];
  groups: string[];
};

export type TCreateLeague = {
  name: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  sport?: string;
  teams_participating?: string[];
  total_teams: number;
  status: string;
  points_system: {
    win: number;
    draw: number;
    loss: number;
    numberOfMeetings: number;
    teamsPerGroupAdvancing?: number;
  };
  format: string;
};

export type TUser = {
  _id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TGroup = {
  _id?: Types.ObjectId;
  tournament_id: Types.ObjectId;
  group: string;
  teams: { team_id: string; name: string }[];
  standings: TStanding[];
};

export type TStanding = {
  team_id: string;
  team: string;
  won: number;
  draw: number;
  loss: number;
  goal: number;
  goal_difference: number;
  matches_played: number;
  points: number;
};

export type TMatch = {
  _id?: Types.ObjectId;
  match_id: string;
  tournament_id?: Types.ObjectId;
  group_id?: Types.ObjectId;
  round_id?: string;
  league_id?: Types.ObjectId;
  status: "scheduled" | "ongoing" | "completed";
  homeTeam?: { team_id: string; name: string; score: number | null };
  awayTeam?: { team_id: string; name: string; score: number | null };
  result?: string;
  winner?: string;
  date?: Date;
  location?: string;
};

export type TTeam = {
  _id: Types.ObjectId;
  name: string;
  createdByUserId?: Types.ObjectId;
  tournaments_teamParticipates_in?: Types.ObjectId[];
  leagues_teamParticipates_in?: Types.ObjectId[];
};

export type TWho = "homeTeam" | "awayTeam";
