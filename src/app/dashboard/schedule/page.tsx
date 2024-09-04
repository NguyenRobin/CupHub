import BracketGenerator from "@/components/Dashboard/BracketGenerator/BracketGenerator";
async function getPlayOffScheduleByTournament() {
  const data = await fetch(
    "http://localhost:3000/api/playoffs/66d85a735a777728d90d2e77"
  );

  const playoff = data.json();
  return playoff;
}
async function page() {
  const data = await getPlayOffScheduleByTournament();
  return (
    <section>
      <BracketGenerator data={data} />
    </section>
  );
}

export default page;
