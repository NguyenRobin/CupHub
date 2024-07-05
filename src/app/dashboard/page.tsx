import React from "react";
import "./dashboard.scss";
import NavDashBoard from "@/components/Dashboard/NavDashboard/NavDashBoard";
import UpcomingEvent from "@/components/Dashboard/UpcomingEvent/UpcomingEvent";
import Event from "@/components/Dashboard/Event/Event";
import Overview from "@/components/Dashboard/Overview/Overview";

function Dashboard() {
  return (
    <>
      <Overview />
    </>
  );
}

export default Dashboard;
