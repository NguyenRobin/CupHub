import Test from "@/components/Dashboard/test";

function page() {
  // const [data, setData] = useState({});
  // if (typeof window !== "undefined") {
  //   const information = localStorage.getItem("tournamentInfo");
  //   const teams = localStorage.getItem("addTeam");
  //   const settings = localStorage.getItem("groupSettings");
  //   const parsedInformation = information ? JSON.parse(information) : {};
  //   const parsedTeams = teams ? JSON.parse(teams) : {};
  //   const parsedSettings = settings ? JSON.parse(settings) : {};
  //   const mergedData = {
  //     ...parsedInformation,
  //     ...parsedTeams,
  //     ...parsedSettings,
  //   };
  //   console.log(mergedData);
  // }
  // return (
  //   <section>
  //     {mergedData.name}
  //     {mergedData.name}
  //     {mergedData.name}
  //     {mergedData.name}
  //     {mergedData.totalGroups}
  //     <p>Total Groups: {mergedData.totalGroups}</p>
  //   </section>
  // );

  return (
    <section>
      <Test />
    </section>
  );
}

export default page;
