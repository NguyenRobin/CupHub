import { ClientSession, Types } from "mongoose";
import { TTeam } from "../../../types/types";
import TeamModel from "../../../models/Team";

export async function addTeamToTeamCollectionDB(
  teams: string[] = [],
  createdByUserId: Types.ObjectId,
  _id: Types.ObjectId,
  format: string,
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const playing_format =
    format === "group_stage_with_knockout"
      ? "tournaments_teamParticipates_in"
      : "leagues_teamParticipates_in";

  const id =
    format === "group_stage_with_knockout" ? "tournament_id" : "league_id";

  const teamsArr = [];

  for (let i = 0; i < teams.length; i++) {
    const newTeam = {
      name: teams[i],
      [playing_format]: [{ [id]: _id }],
      createdByUserId,
    };

    teamsArr.push(newTeam);
  }

  const docs: TTeam[] = await TeamModel.insertMany(teamsArr, options);

  return docs;
}
