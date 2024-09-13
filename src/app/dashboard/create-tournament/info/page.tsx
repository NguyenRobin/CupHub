"use client";

import GroupSettingsForm from "@/components/Dashboard/GroupSettingsForm/GroupSettingsForm";
import "./tournament.scss";
import TournamentInfo from "@/components/Dashboard/TournamentInfo/TournamentInfo";
import AddTeam from "@/components/Dashboard/AddTeam/AddTeam";

function page() {
  return (
    <section>
      <TournamentInfo />
    </section>
  );
}

export default page;
