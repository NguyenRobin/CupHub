import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { TGroup, TMatch, TTeamStanding } from '../../types/types';
import { Types } from 'mongoose';
import { cookies } from 'next/headers';
import { saveTournamentGroupDB } from '../../features/groups/server/db/groups';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

type TJwtPayload = {
  id: Types.ObjectId;
  username: string;
  iat: number;
  exp: number;
};

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function compareUserInputPasswordWithHashedPassword(
  notHashedPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isPasswordMatching = await bcrypt.compare(
    notHashedPassword,
    hashedPassword
  );
  return isPasswordMatching;
}

export function createToken(user: { id: Types.ObjectId; username: string }) {
  const encodedToken = jwt.sign(user, process.env.JWT_SECRET_KEY as string, {
    // expiresIn: "15m",
    expiresIn: '24h',
  });

  return encodedToken;
}

export function verifyToken(encodedToken: string) {
  const decodedToken = jwt.verify(encodedToken, JWT_SECRET_KEY!);
  return decodedToken as TJwtPayload;
}

export function getCookieValue(request: Request) {
  const sessionToken = request.headers.get('cookie')?.split('=')[1];
  return sessionToken;
}

export function getCookieFromServerComponent() {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.TOKEN_NAME as string)?.value;

  return token;
}

type TValidRounds = {
  totalTeamsGoingToPlayoff: number;
  wildcards?: number;
  playoff_round: number;
};

export function validatePossibleTeamsPerGroupGoingToPlayoff(
  totalTeamsGoingToPlayoff: number
): TValidRounds {
  const possibleTotalTeamsPlayoffRounds = [2, 4, 8, 16, 32];

  if (possibleTotalTeamsPlayoffRounds.includes(totalTeamsGoingToPlayoff)) {
    return {
      totalTeamsGoingToPlayoff,
      playoff_round: totalTeamsGoingToPlayoff,
    };
  } else {
    const closestValidPlayoffRound = possibleTotalTeamsPlayoffRounds.find(
      (num) => num > totalTeamsGoingToPlayoff
    );

    if (!closestValidPlayoffRound) {
      throw new Error('No valid playoff round could be made');
    }

    const wildcards = closestValidPlayoffRound - totalTeamsGoingToPlayoff;

    return {
      totalTeamsGoingToPlayoff,
      wildcards,
      playoff_round: totalTeamsGoingToPlayoff + wildcards,
    };
  }
}

export function buildPlayoffSchedule(amountOfTeamsToPlayOff: number) {
  const stages = ['final', 'semifinal', 'quarterfinal', 'round 16', 'round 32'];
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

  for (let i = stagesToFinal; i >= 0; i--) {
    const matchesInRound = currentRound / 2;

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

export function generateRobinRound(groups: TGroup[]): TMatch[] {
  const matches: TMatch[] = [];

  for (let i = 0; i < groups.length; i++) {
    const totalTeamsInGroup = groups[i].teams.length;
    const currentGroupOfTeams = groups[i].teams;

    // if totalTeamsInGroup i ODD, we must create a 'BYE' match to have EVEN matches
    if (totalTeamsInGroup % 2 !== 0) {
      currentGroupOfTeams.push({ name: 'bye', team_id: 'bye' });
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
        if (teamOne !== 'bye' && teamTwo !== 'bye') {
          const newMatch: TMatch = {
            match_id: uuidv4(),
            tournament_id: groups[i].tournament_id,
            group_id: groups[i]._id,
            status: 'scheduled',
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
            result: '',
            winner: '',
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

export function generateRobinRoundTEST(
  _id: Types.ObjectId,
  league: any[],
  numberOfMeetings: number
): TMatch[] {
  const matches: TMatch[] = [];

  const totalTeamsInLeague = league.length;

  if (totalTeamsInLeague % 2 !== 0) {
    league.push({ name: 'bye', team_id: 'bye' });
  }

  const numberOfRoundsToCompleteLeague = league.length - 1;

  for (let round = 0; round < numberOfRoundsToCompleteLeague; round++) {
    for (let i = 0; i < league.length / 2; i++) {
      const teamOne = league[i].name;

      const teamTwo = league[league.length - 1 - i].name;

      if (teamOne !== 'bye' && teamTwo !== 'bye') {
        for (let match = 0; match < numberOfMeetings; match++) {
          const home = match === 0 ? 'homeTeam' : 'awayTeam';
          const away = match === 0 ? 'awayTeam' : 'homeTeam';

          const newMatch: TMatch = {
            match_id: uuidv4(),
            league_id: _id,
            status: 'scheduled',
            [home]: {
              team_id: league[i]._id,
              name: teamOne,
              score: 0,
            },
            [away]: {
              team_id: league[league.length - 1 - i]._id,
              name: teamTwo,
              score: 0,
            },
            result: '',
            winner: '',
          };
          matches.push(newMatch);
        }
      }
    }

    const lastTeam = league.pop()!;

    league.splice(1, 0, lastTeam);
  }

  return matches;
}

export function dateFormatter(date: Date) {
  return date.toISOString().split('T')[0];
}

export function sortStandingPointsByDescendingOrder(teams: TTeamStanding[]) {
  return teams.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }
    if (a.goal_difference !== b.goal_difference) {
      return b.goal_difference - a.goal_difference;
    }
    if (a.goals_scored !== b.goals_scored) {
      return b.goals_scored - a.goals_scored;
    }
    return 0; // everything is same
  });
}
