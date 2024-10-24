import { cookies, headers } from 'next/headers';

export async function getUpcomingEvents() {
  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const token = cookies().get('AUTH_SESSION_TOKEN');
  console.log(token);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tournaments`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTournamentMatchesById(id: string) {
  const token = cookies().get(process.env.TOKEN_NAME!);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tournaments/${id}/matches`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      console.log('response.ok is', response.ok);
    }
    const matches = await response.json();
    return matches;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getTournamentById(id: string) {
  const token = cookies().get(process.env.TOKEN_NAME!);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tournaments/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      console.log('response.ok is', response.ok);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getTournamentGroupsById(id: string) {
  const token = cookies().get(process.env.TOKEN_NAME!);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/groups/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      console.log('response.ok is', response.ok);
    }
    const groups = await response.json();
    return groups;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getTournamentPlayoffById(id: string) {
  const token = cookies().get(process.env.TOKEN_NAME!);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/playoffs/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      console.log('response.ok is', response.ok);
    }

    const playoff = await response.json();
    return playoff;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getMatchById(id: string) {
  const token = cookies().get(process.env.TOKEN_NAME!);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Match not found');
  }

  const data = await response.json();
  return data;
}
