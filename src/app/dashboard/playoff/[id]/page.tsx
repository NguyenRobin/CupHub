import { cookies } from 'next/headers';
import BracketGenerator from '../../../../features/rounds/components/ui/PlayoffView/PlayoffView';

async function getPlayOffScheduleByTournament(id: string) {
  const token = (await cookies()).get(process.env.TOKEN_NAME!);
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
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}
async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const data = await getPlayOffScheduleByTournament(id);

  return (
    <section style={{ backgroundColor: 'orange', height: '100%' }}>
      {data.status === 200 ? (
        <BracketGenerator data={data} />
      ) : (
        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
          }}
        >
          No playoff found. 😢
        </p>
      )}
    </section>
  );
}

export default page;
