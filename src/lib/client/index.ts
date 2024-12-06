import * as jose from 'jose';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// jsonwebtoken doesn't support running on Edge environment as it's different from Node.js. You could use jose which supports Vercel's Edge Runtime instead of jsonwebtoken.

export async function verifyTokenByJose(encodedToken: string) {
  try {
    const { payload } = await jose.jwtVerify(
      encodedToken,
      new TextEncoder().encode(JWT_SECRET_KEY!)
    );

    return payload;
  } catch (error) {
    console.log('JOSE ->', error);
  }
}

export function getMonthName(monthNumber: number): string {
  const MAX_LENGTH = 3;
  const months = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  let output = '';

  for (let i = 0; i < MAX_LENGTH; i++) {
    output += months[monthNumber - 1][i];
  }

  return output;
}

export function formatDate(date: string) {
  const formattedDate = date.split('T')[0];
  return formattedDate;
}

export function generateRandomIndexByArraySize(size: number) {
  return Math.floor(Math.random() * size);
}

export function divideTeamsByGroup(
  totalTeams: number,
  totalGroups: number,
  standings: any[]
) {
  const totalTeamPerGroup = Math.floor(totalTeams / totalGroups);
  const leftOverTeams = totalTeams % totalGroups; // if totalTeamPerGroup is not even. we need to add it to some of the groups

  const allGroups: any = [];

  let currentIndex = 0;
  for (let i = 0; i < totalGroups; i++) {
    // fromCharCode(65) starts at letter 'a'
    const newGroup = { group: String.fromCharCode(65 + i), standings: [] };

    allGroups.push(newGroup);

    for (let j = 0; j < totalTeamPerGroup; j++) {
      allGroups[i].standings.push(standings[currentIndex]);
      currentIndex++;
    }
  }

  let usedIndexes: number[] = [];

  for (let i = 0; i < leftOverTeams; i++) {
    if (usedIndexes.length === totalGroups) {
      usedIndexes = []; // restore it if all indexes been used once
    }
    let index = generateRandomIndexByArraySize(totalGroups);

    while (usedIndexes.includes(index)) {
      index = generateRandomIndexByArraySize(totalGroups); // generate until a non used index is found.
    }
    usedIndexes.push(index);

    const randomGroup = allGroups[index];
    randomGroup.standings.push(standings[currentIndex]);
    currentIndex++;
  }

  return allGroups;
}

export function validateApprovedGroups(totalTeams: number) {
  if (totalTeams === 2) {
    return 1;
  }

  let numberOfGroups = 0;

  for (let i = 1; i <= totalTeams; i++) {
    if (i % 3 === 0) {
      numberOfGroups++;
    }
  }

  return numberOfGroups;
}
