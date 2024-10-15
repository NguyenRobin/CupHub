import React from 'react';
import Tournament from '../../../../components/dashboard-page/ui/Tournament/Tournament';
import { cookies } from 'next/headers';

async function getTournament(id: string) {
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
async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getTournament(id);
  return <Tournament data={data} />;
}

export default page;
