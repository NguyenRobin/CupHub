import BracketGenerator from "../../../../components/dashboard/BracketGenerator/BracketGenerator";

async function getPlayOffScheduleByTournament(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/playoffs/${id}`);
    if (!response.ok) {
      console.log("response.ok is", response.ok);
    }
    const data = response.json();

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}
async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getPlayOffScheduleByTournament(id);

  return (
    <section style={{ backgroundColor: "orange", height: "100%" }}>
      {data.status === 200 ? (
        <BracketGenerator data={data} />
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
          }}
        >
          No playoff found. 😢
        </p>
      )}
    </section>
  );
}

export default page;
