import * as jose from 'jose';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// jsonwebtoken doesn't support running on Edge environment as it's different from Node.js. You could use jose which supports Vercel's Edge Runtime instead of jsonwebtoken.

export async function verifyTokenByJose(encodedToken: string) {
  try {
    const { payload } = await jose.jwtVerify(
      encodedToken,
      new TextEncoder().encode(JWT_SECRET_KEY!)
    );

    console.log('payload', payload);
    return payload;
  } catch (error) {
    console.log('jose');
    console.log(error);
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
