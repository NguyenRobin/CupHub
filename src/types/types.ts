import { Types } from 'mongoose';
import { format } from 'path';

export type KeyValue =
  | 'rounds'
  | 'win'
  | 'draw'
  | 'loss'
  | 'teamsPerGroupAdvancing'
  | 'final'
  | 'semifinal'
  | 'quarterfinal'
  | 'roundOf16'
  | 'roundOf32'
  | 'roundOf62';

export type TBodyTournament = {
  name: string;
  description?: string;
  sport?: string;
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
  format: 'league' | 'knockout' | 'group_stage_with_knockout';
  teams_participating?: string[];
  groups: { group: string; teams: string[] }[];
};

export type TNewTournament = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  total_teams: number;
  status: 'scheduled' | 'ongoing' | 'completed';
  points_system: {
    won: number;
    draw: number;
    loss: number;
    numberOfMeetings: number;
    teamsPerGroupAdvancing?: number;
  };
  format: 'league' | 'group_stage_with_knockout' | 'knockout';
  groups: Types.ObjectId[];
  createdByUserId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  teams_participating: { team_id: Types.ObjectId }[];
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
    won: number;
    draw: number;
    loss: number;
    numberOfMeetings: number;
    teamsPerGroupAdvancing?: number;
  };
  format: string;
};
export type TBodyLeague = {
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
    won: number;
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
  teams: { team_id: Types.ObjectId; name: string }[];
  standings: TGroupStanding[];
};

export type TGroupStanding = {
  _id?: Types.ObjectId;
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
};

export type TStanding = {
  _id?: Types.ObjectId;
  league_id: Types.ObjectId;
  name: string;
  standings: TLeagueStanding[];
};

export type TLeagueStanding = {
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
};

export type TMatch = {
  _id?: Types.ObjectId;
  match_id: string;
  tournament_id?: Types.ObjectId;
  group_id?: Types.ObjectId;
  round_id?: string;
  league_id?: Types.ObjectId;
  status: 'scheduled' | 'ongoing' | 'completed';
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
  createdByUserId: Types.ObjectId;
  tournaments_teamParticipates_in?: Types.ObjectId[];
  leagues_teamParticipates_in?: Types.ObjectId[];
};

export type TCreateTeam = {
  name: string;
  tournaments_teamParticipates_in?: Types.ObjectId[];
  leagues_teamParticipates_in?: Types.ObjectId[];
  createdByUserId: Types.ObjectId;
};

export type TWho = 'homeTeam' | 'awayTeam';
