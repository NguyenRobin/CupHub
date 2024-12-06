import mongoose, { Schema, Types, model } from 'mongoose';

type IMatch = {
  match_id: string;
  tournament_id?: Types.ObjectId;
  group_id?: Types.ObjectId;
  round_id?: Types.ObjectId;
  league_id?: Types.ObjectId;
  isPlayoff: boolean;
  index?: number;
  round_type?:
    | 'round-64'
    | 'round-32'
    | 'round-16'
    | 'quarterfinal'
    | 'semifinal'
    | 'final';
  status: 'scheduled' | 'ongoing' | 'completed';
  homeTeam: { team_id: Types.ObjectId; name: string; score: number };
  awayTeam: { team_id: Types.ObjectId; name: string; score: number };
  result?: string;
  winner?: string;
  date: Date;
  location?: string;
};

const matchSchema = new Schema<IMatch>(
  {
    match_id: { type: String, required: true },
    tournament_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Tournament',
    },
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Group',
    },
    round_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Round',
    },
    league_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'League',
    },
    isPlayoff: { type: Boolean, required: false },
    index: { type: Number, required: false },
    round_type: {
      type: String,
      required: false,
      enum: [
        'round-64',
        'round-32',
        'round-16',
        'quarterfinal',
        'semifinal',
        'final',
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ['scheduled', 'ongoing', 'paused', 'completed'],
    },

    homeTeam: {
      team_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Team',
      },
      name: { type: String, required: false },
      score: { type: Number, required: true },
    },
    awayTeam: {
      team_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Team',
      },
      name: { type: String, required: false },
      score: { type: Number, required: true },
    },
    result: { type: String, required: false },
    winner: { type: String, required: false },
    date: { type: Date, required: false },
    location: { type: String, required: false },
  },
  { timestamps: true }
);

const MatchModel = mongoose.models.Match || model<IMatch>('Match', matchSchema);

export default MatchModel;
