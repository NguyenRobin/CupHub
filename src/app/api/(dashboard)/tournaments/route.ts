import connectToMongoDB from "@/lib/connectToMongoDB";
import GroupModel from "@/models/Group";
import MatchModel from "@/models/Match";
import RoundModel from "@/models/Round";
import TeamModel from "@/models/Team";
import TournamentModel from "@/models/Tournament";
import { match } from "assert";

import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  try {
    // const { searchParams } = new URL(request.url);
    // const userId = searchParams.get("userId");

    // if (!userId || !mongoose.isValidObjectId(userId)) {
    //   return NextResponse.json({
    //     message: "Invalid request. Missing userId or ObjectId is invalid",
    //     status: 400,
    //   });
    // }
    await connectToMongoDB();

    // const user = await User.findById(userId);
    // console.log(user);
    // if (!user) {
    //   return NextResponse.json({
    //     message: "User not found",
    //     status: 400,
    //   });
    // }

    const tournaments = await TournamentModel.find({
      // user: Types.ObjectId.createFromHexString(userId),
    });
    console.log(tournaments);
    return NextResponse.json({
      status: 200,
      message: "success",
      result: tournaments.length,
      tournaments,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
async function saveTeamToDB(arr: string[], ownerId: any) {
  arr.forEach(async (team) => {
    const newTeam = await new TeamModel({
      name: team,
      createdByUserId: Types.ObjectId.createFromHexString(ownerId),
    }).save();

    console.log(newTeam);
  });
}

async function createPlayoffRoundToRoundCollectionDB(
  tournament_id: string,
  playoff_round: number,
  status: "scheduled" | "ongoing" | "completed"
) {
  const playoffSchedule = buildPlayoffSchedule(playoff_round);

  const newRound = new RoundModel({
    tournament_id: tournament_id,
    status: status,
    playoff: playoffSchedule,
  });

  await newRound.save();
}

async function addTeamToTeamCollectionDB(
  teams: string[],
  createdByUserId: any,
  tournament_id: any
) {
  const teamsArr = [];
  for (let i = 0; i < teams.length; i++) {
    const newTeam = {
      name: teams[i],
      createdByUserId,
      tournaments_teamParticipates_in: [{ tournament_id: tournament_id }],
    };
    teamsArr.push(newTeam);
  }
  const docs = await TeamModel.insertMany(teamsArr);

  return docs;
}

async function createTournamentToTournamentCollectionDB(body, userId) {
  const {
    id,
    name,
    sport,
    location,
    startDate,
    endDate,
    total_teams,
    teams_participating,
    tournament_format,
    createdAt,
    updatedAt,
    status,
    points_system,
  } = body;

  const newTournament = new TournamentModel({
    id,
    name,
    sport,
    location,
    startDate,
    endDate,
    total_teams,
    tournament_format,
    createdAt,
    updatedAt,
    status,
    points_system,
    createdByUserId: Types.ObjectId.createFromHexString(userId),
  });

  await connectToMongoDB();

  const created = await newTournament.save();
  return created;
}

async function addMatchesToMatchesCollectionDB(array) {
  const docs = await MatchModel.insertMany(array);

  return docs;
}

function buildPlayoffSchedule(amountOfTeamsToPlayOff: number) {
  const stages = ["final", "semifinal", "quarterfinal", "round 16", "round 32"];
  const result = [];

  let stagesToFinal = 0;

  // Bestäm antal steg till final beroende på antalet lag som går vidare
  if (amountOfTeamsToPlayOff === 32) {
    stagesToFinal = 4; // round 32
  } else if (amountOfTeamsToPlayOff === 16) {
    stagesToFinal = 3; // round 16
  } else if (amountOfTeamsToPlayOff === 8) {
    stagesToFinal = 2; // quarterfinal
  } else if (amountOfTeamsToPlayOff === 4) {
    stagesToFinal = 1; // semifinal
  } else if (amountOfTeamsToPlayOff === 2) {
    stagesToFinal = 0; // final
  }

  let currentRound = amountOfTeamsToPlayOff;

  // Iterera genom stegen och skapa matcher
  for (let i = stagesToFinal; i >= 0; i--) {
    const matchesInRound = currentRound / 2;

    // if (matchesInRound < 1) break; // Om inga matcher kan spelas, avsluta

    const newObj = {
      round: stages[i], // ex final, semifinal
      matches: Array.from({ length: matchesInRound }).map(() => ({
        match_id: null,
        homeTeam: {
          team_id: null,
          name: null,
          score: null,
        },
        awayTeam: {
          team_id: null,
          name: null,
          score: null,
        },
        location: null,
        date: null,
      })),
    };

    result.push(newObj);

    currentRound = matchesInRound;
  }

  return result;
}

async function updateTournamentCollectionWithTeamsParticipating(
  tournament_id: any,
  arr: any[]
) {
  const teams_participating = arr.map((team) => {
    return { team_id: team._id };
  });
  const updatedTournament = await TournamentModel.findByIdAndUpdate(
    { _id: tournament_id },
    { teams_participating }
  );
  return updatedTournament;
}

async function updateTournamentCollectionWithGroupIds(
  tournament_id: any,
  arr: any[]
) {
  const groupIds = arr.map((group) => group._id);

  const updatedTournament = await TournamentModel.findByIdAndUpdate(
    { _id: tournament_id },
    { groups: groupIds }
  );
  return updatedTournament;
}

async function createGroupCollectionToDB(
  groups: any[],
  tournament_id: string,
  teamsArr: any[]
) {
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
          win: 0,
          draw: 0,
          loss: 0,
          goal: 0,
          goal_difference: 0,
          matches_played: 0,
          points: 0,
        };
      }),
    };
    allGroups.push(newGroup);
  }
  const groupsAddedToDB = await GroupModel.insertMany(allGroups);
  return groupsAddedToDB;
}

async function updateGroupCollectionWithMatchIds(arr: any[]) {
  const groupIds = arr.map((group) => group.group_id);
  const removedDuplicatesOfGroupIds = [...new Set(groupIds)];

  for (const id of removedDuplicatesOfGroupIds) {
    const matchIds = arr
      .filter((match) => match.group_id === id)
      .map((match) => match._id);

    const updatedGroup = await GroupModel.findByIdAndUpdate(
      { _id: id },
      { matches: matchIds }
    );
  }
}

function validatePossibleTeamsPerGroupGoingToPlayoff(
  totalTeams: number,
  totalGroups: number,
  totalTeamsPerGroupAdvancing: number
): {
  valid: boolean;
  message?: string;
  totalTeamsGoingToPlayoff?: number;
  wildcards?: number;
  playoff_round?: number;
} {
  const possibleTotalTeamsPlayoffRounds = [2, 4, 8, 16, 32];
  const totalTeamsGoingToPlayoff = totalGroups * totalTeamsPerGroupAdvancing;

  if (totalTeamsGoingToPlayoff > totalTeams) {
    return {
      valid: false,
      message: `The total amount of teams going to playoff ( ${totalTeamsGoingToPlayoff} ), cannot be greater than the total of team participating ( ${totalTeams} ).`,
    };
  }

  if (possibleTotalTeamsPlayoffRounds.includes(totalTeamsGoingToPlayoff)) {
    return {
      valid: true,
      totalTeamsGoingToPlayoff,
      playoff_round: totalTeamsGoingToPlayoff,
    };
  } else {
    const closestValidPlayoffRound = possibleTotalTeamsPlayoffRounds.find(
      (num) => num > totalTeamsGoingToPlayoff
    );

    if (!closestValidPlayoffRound) {
      return { valid: false, message: "No valid playoff was found" };
    }

    const wildcards = closestValidPlayoffRound - totalTeamsGoingToPlayoff;

    return {
      valid: true,
      totalTeamsGoingToPlayoff,
      wildcards,
      playoff_round: totalTeamsGoingToPlayoff + wildcards,
    };
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const body = await request.json();
    const {
      id,
      name,
      sport,
      location,
      startDate,
      endDate,
      total_teams,
      teams_participating,
      tournament_format,
      createdAt,
      updatedAt,
      status,
      points_system,
      groups,
    } = body;

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({
        message: "Invalid userId for ObjectId",
        status: 400,
      });
    }

    if (total_teams < 0 || total_teams !== teams_participating.length) {
      return NextResponse.json({
        message:
          "Invalid total_teams. Must be greater than 0. total_teams must have same value as teams_participating",
        status: 400,
      });
    }

    if (tournament_format === "group_stage_with_knockout") {
      const {
        points_system: { teamsPerGroupAdvancing },
        total_groups,
      } = body;

      if (!teamsPerGroupAdvancing || !total_groups) {
        return NextResponse.json({
          message:
            "teamsPerGroupAdvancing & total_groups is required when creating a group stage with knockout",
          status: 400,
        });
      }

      const playoffInformation = validatePossibleTeamsPerGroupGoingToPlayoff(
        total_teams,
        total_groups,
        teamsPerGroupAdvancing
      );

      if (!playoffInformation.valid) {
        return NextResponse.json({
          message: playoffInformation.message,
          status: 400,
        });
      }

      // 1) connect to the database and start the session
      await connectToMongoDB();

      // 2) Add the tournament to database to then retrieve the _id
      const newTournament = await createTournamentToTournamentCollectionDB(
        body,
        userId
      );

      // 3) with the _id from tournament we can now create a relationship between tournament in the TournamentModel and the teams in the TeamModel.
      const teamsAddedToDb = await addTeamToTeamCollectionDB(
        teams_participating,
        userId,
        newTournament._id
      );

      // 4) Now we also need to update the newTournament with all the teams that participate in specific tournament.
      const updatedNewTournamentWithTeams =
        await updateTournamentCollectionWithTeamsParticipating(
          newTournament._id,
          teamsAddedToDb
        );

      // 5) create rounds and insert them in to ROUNDS COLLECTION
      const roundsAddedToDb = await createPlayoffRoundToRoundCollectionDB(
        newTournament._id,
        playoffInformation.playoff_round!,
        status
      );

      // 5) create the groups to groups model
      const groupsAddedToDB = await createGroupCollectionToDB(
        groups,
        newTournament._id,
        teamsAddedToDb
      );

      // 6) create the matches generate so all teams play against each other.
      const matches = generateRobinRound(groupsAddedToDB);

      const matchesAddedToDB = await addMatchesToMatchesCollectionDB(matches);

      // 7) update tournament model with the groups _id ref in the tournaments group array
      await updateTournamentCollectionWithGroupIds(
        newTournament._id,
        groupsAddedToDB
      );

      // 8) update the groups model with the match _id ref in the groups matches array
      await updateGroupCollectionWithMatchIds(matchesAddedToDB);
    }

    if (tournament_format === "league") {
      // create a new league
      // console.log("league");
    }

    if (tournament_format === "knockout") {
      // console.log("knockout");
    }

    // await connectToMongoDB();

    // const user = await UserModel.findById(userId);

    // if (!user) {
    //   return NextResponse.json({
    //     message: "User not found in database",
    //     status: 400,
    //   });
    // }
    // await saveTeamToDB(teams_participating, userId);

    // const newTournament = new TournamentModel({
    //   ...body,
    //   createdByUserId: Types.ObjectId.createFromHexString(userId),
    // });

    // console.log(newTournament);

    // await newTournament.save();

    return NextResponse.json({ status: 200, message: "success" });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: "Error creating a tournament",
    });
  }
}

// import connectToMongoDB from "@/lib/connectToMongoDB";
// import Tournament from "@/models/Tournament";

// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     await connectToMongoDB();
//     const tournaments = await Tournament.find();

//     return NextResponse.json({
//       status: 200,
//       message: "success",
//       result: tournaments.length,
//       tournaments,
//     });
//   } catch (error: any) {
//     NextResponse.json({ error: error.message });
//   }
// }

// export async function POST(request: Request) {
//   console.log(request);

//   try {
//     return NextResponse.json({ status: 201, message: "success" });
//   } catch (error: any) {
//     return NextResponse.json({ status: 404, message: error.message });
//   }
// }

type TGroup = {
  _id?: string;
  tournament_id: string;
  group: string;
  teams: { team_id: string; name: string }[];
  standings: TStanding[];
};

type TStanding = {
  team_id: string;
  team: string;
  win: number;
  draw: number;
  loss: number;
  goal: number;
  goal_difference: number;
  matches_played: number;
  points: number;
};

type TMatch = {
  _id?: string;
  match_id: string;
  tournament_id: string;
  group_id?: string;
  round_id?: string;
  league_id?: string;
  status: "scheduled" | "ongoing" | "completed";
  homeTeam: { team_id: string; name: string; score: number | null };
  awayTeam: { team_id: string; name: string; score: number | null };
  date?: Date;
  location?: string;
};

function generateRobinRound(groups: TGroup[]): TMatch[] {
  const matches: TMatch[] = [];

  for (let i = 0; i < groups.length; i++) {
    const totalTeamsInGroup = groups[i].teams.length;
    const currentGroupOfTeams = groups[i].teams;

    // if totalTeamsInGroup i ODD, we must create a 'BYE' match to have EVEN matches
    if (totalTeamsInGroup % 2 !== 0) {
      currentGroupOfTeams.push({ name: "bye", team_id: "bye" });
    }

    // Amount of rounds needed to be played fore all teams to have played against each other.
    const totalPlayingRounds = currentGroupOfTeams.length - 1;

    for (let round = 0; round < totalPlayingRounds; round++) {
      // create each match between two teams. Therefore we currentGroupOfTeams.length / 2, so this statement determine the amount of for each round.
      for (let j = 0; j < currentGroupOfTeams.length / 2; j++) {
        // start with the FIRST team in the array
        const teamOne = currentGroupOfTeams[j].name;
        // against the LAST team in the array
        const teamTwo =
          currentGroupOfTeams[currentGroupOfTeams.length - 1 - j].name; // 3,2

        // we don't want to add 'BYE' matches to the matches array. So we only push a match if both team are not a 'bye' team.
        if (teamOne !== "bye" && teamTwo !== "bye") {
          const newMatch: TMatch = {
            match_id: uuidv4(),
            tournament_id: groups[i].tournament_id,
            group_id: groups[i]._id,
            status: "scheduled",
            homeTeam: {
              team_id: currentGroupOfTeams[j].team_id,
              name: teamOne,
              score: 0,
            },
            awayTeam: {
              team_id:
                currentGroupOfTeams[currentGroupOfTeams.length - 1 - j].team_id,
              name: teamTwo,
              score: 0,
            },
          };
          matches.push(newMatch);
        }
      }

      // After completing all iterations of the inner loop (which creates the matchups for the current round),
      // we need to rotate the teams to prepare for the next round. This ensures that each team will face a
      // new opponent in the next round, preventing the same matchups from occurring repeatedly.
      // The rotation works by moving the last team in the array to the position right after the first team.
      // The first team at index 0 remains fixed throughout all rounds, while all other teams are rotated one position to the right.
      // This rotation guarantees that teamTwo (the second team in a matchup) changes in the next round.
      const lastTeam = currentGroupOfTeams.pop()!;

      // Now, we modify the `currentGroupOfTeams` array by inserting `lastTeam` at index 1, right after the first team. We use `splice(1, 0, lastTeam)` to insert without removing any elements from the array. This shifts all other teams one position to the right, which ensures that the matchups change in the next round.

      // The first team (index 0) stays fixed, and the remaining teams rotate positions, ensuring a new opponent for each team in each round.
      currentGroupOfTeams.splice(1, 0, lastTeam);
    }
  }

  return matches;
}
