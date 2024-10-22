import { ClientSession, Types } from 'mongoose';
import { TGroup, TTeam } from '../../../types/types';
import GroupModel from '../../../models/Group';

export async function createGroupCollectionToDB(
  groups: { group: string; teams: string[] }[],
  tournament_id: Types.ObjectId,
  teamsArr: TTeam[],
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const allGroups: TGroup[] = [];

  for (let i = 0; i < groups.length; i++) {
    const teams = teamsArr
      .filter((team) => groups[i].teams.includes(team.name))
      .map((team) => ({ team_id: team._id, name: team.name }));

    const newGroup: TGroup = {
      tournament_id: tournament_id,
      group: groups[i].group,
      teams: teams,
      standings: teams.map((team) => {
        return {
          team_id: team.team_id,
          team: team.name,
          won: 0,
          draw: 0,
          loss: 0,
          goals_scored: 0,
          goals_conceded: 0,
          goal_difference: 0,
          matches_played: 0,
          points: 0,
        };
      }),
    };
    allGroups.push(newGroup);
  }
  const groupsAddedToDB = await GroupModel.insertMany(allGroups, options);
  return groupsAddedToDB;
}

export async function updateGroupCollectionWithMatchIds(
  arr: any[],
  session?: ClientSession
) {
  const options = session ? { session } : {};
  const groupIds = arr.map((group) => group.group_id);
  const removedDuplicatesOfGroupIds = [...new Set(groupIds)];

  for (const id of removedDuplicatesOfGroupIds) {
    const matchIds = arr
      .filter((match) => match.group_id === id)
      .map((match) => match._id);

    const updatedGroup = await GroupModel.findByIdAndUpdate(
      { _id: id },
      { matches: matchIds },
      options
    );
  }
}
