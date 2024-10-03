import mongoose, { Schema, model, Types } from "mongoose";

interface ITeam {
  name: string;
  createdByUserId?: Types.ObjectId;
  tournaments_teamParticipates_in?: Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>({
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
  createdByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const TeamModel = mongoose.models.Team || model<ITeam>("Team", teamSchema);

export default TeamModel;
