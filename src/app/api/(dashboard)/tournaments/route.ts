import connectToMongoDB from "@/lib/connectToMongoDB";
import RoundModel from "@/models/Round";
import TeamModel from "@/models/Team";
import TournamentModel from "@/models/Tournament";
import UserModel from "@/models/User";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";

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

async function addTournamentToTournamentCollectionDB(body, userId) {
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
// function createMatchesBasedOnKnockoutStage() {}
// function buildBracketRounds(total_groups, teamsPerGroupAdvancing) {
//   const amountOfTeamsToPlayOff = total_groups * teamsPerGroupAdvancing;
//   const stage = ["final", "semifinal", "quarterfinal", "round 16", "round 32"];
//   const result = [];

//   let stagesToFinal = 0;
//   if (amountOfTeamsToPlayOff === 32) {
//     stagesToFinal = 4; // round 32
//   }
//   if (amountOfTeamsToPlayOff === 16) {
//     stagesToFinal = 3; // round 16
//   }
//   if (amountOfTeamsToPlayOff === 8) {
//     stagesToFinal = 2; // quarterfinal
//   }
//   if (amountOfTeamsToPlayOff === 4) {
//     stagesToFinal = 1; // semifinal
//   }
//   if (amountOfTeamsToPlayOff === 2) {
//     stagesToFinal = 0; // final
//   }

//   let currentStage = amountOfTeamsToPlayOff;
//   console.log("amountOfTeamsToPlayOff", amountOfTeamsToPlayOff);
//   for (let i = stagesToFinal; i >= 0; i--) {
//     // create the current amount of matches based on stage.
//     const arr = Array.from({ length: currentStage });
//     console.log("arr", arr);
//     const newObj = {
//       round: stage[i], // ex final, semifinal
//       matches: arr.map(() => {
//         return {
//           match_id: null,
//           homeTeam: {
//             team_id: null,
//             name: null,
//             score: null,
//           },
//           awayTeam: {
//             team_id: null,
//             name: null,
//             score: null,
//           },
//           location: null,
//           date: null,
//         };
//       }),
//     };

//     result.push(newObj);

//     // In every stage only the winnng team will proceed to next stage. So half of the others will get eliminated.
//     currentStage = currentStage / 2;
//     console.log("currentStage", currentStage);
//   }
//   return result;
// }

function buildBracketRounds(
  total_groups: number,
  teamsPerGroupAdvancing: number
) {
  const amountOfTeamsToPlayOff = total_groups * teamsPerGroupAdvancing;
  const stage = ["final", "semifinal", "quarterfinal", "round 16", "round 32"];
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

  let currentTeams = amountOfTeamsToPlayOff;

  // Iterera genom stegen och skapa matcher
  for (let i = stagesToFinal; i >= 0; i--) {
    const matchesInRound = currentTeams / 2;

    // if (matchesInRound < 1) break; // Om inga matcher kan spelas, avsluta

    const newObj = {
      round: stage[i], // ex final, semifinal
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

    // Halvera antalet lag för nästa runda
    currentTeams = matchesInRound;
  }

  return result;
}

async function updateNewTournamentCollectionWithTeamsParticipating(
  tournament_id: any,
  arr: any
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
    } = body;

    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({
        message: "Invalid userId for ObjectId",
        status: 400,
      });
    }

    // 1) Add the tournament to database to then retrieve the _id
    // const newTournament = await addTournamentToTournamentCollectionDB(
    //   body,
    //   userId
    // );

    // // 2) with the _id from tournament we can now create a relationship between tournament in the TournamentModel and the teams in the TeamModel.
    // const teamsAddedToDb = await addTeamToTeamCollectionDB(
    //   teams_participating,
    //   userId,
    //   newTournament._id
    // );

    // // 3) Now we also need to update the newTournament with all the teams that participate in specific tournament.
    // const updatedNewTournamentWithTeams =
    //   await updateNewTournamentCollectionWithTeamsParticipating(
    //     newTournament._id,
    //     teamsAddedToDb
    //   );

    // 4) check tournament_format.
    if (tournament_format === "group_stage_with_knockout") {
      if (total_teams < 0 || total_teams !== teams_participating.length) {
        return NextResponse.json({
          message:
            "Invalid total_teams. Must be greater than 0. total_teams also have same value as teams_participating",
          status: 400,
        });
      }
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
      await connectToMongoDB();
      const playoff = buildBracketRounds(total_groups, teamsPerGroupAdvancing);
      console.log("playoff", playoff);
      const newRound = new RoundModel({
        tournament_id: Types.ObjectId.createFromHexString(
          "66d85a735a777728d90d2e77"
        ),
        status,
        playoff,
      });

      console.log(newRound.playoff[0].matches);
      await newRound.save();
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
