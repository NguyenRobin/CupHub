import mongoose, { Schema, model, Types } from "mongoose";

type TTeam = {
  name: string;
  createdByUserId?: Types.ObjectId;
  tournaments_teamParticipates_in?: Types.ObjectId[];
  leagues_teamParticipates_in?: Types.ObjectId[];
};

const teamSchema = new Schema<TTeam>({
  name: { type: String, required: true },
  tournaments_teamParticipates_in: [
    {
      _id: false,
      tournament_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Tournament",
      },
    },
  ],
  leagues_teamParticipates_in: [
    {
      _id: false,
      league_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "League",
      },
    },
  ],
  createdByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const TeamModel = mongoose.models.Team || model<TTeam>("Team", teamSchema);

export default TeamModel;
