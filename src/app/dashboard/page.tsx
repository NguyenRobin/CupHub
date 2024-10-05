import React from "react";
import "./dashboard.scss";
import Overview from "../../components/dashboard-page/ui/Overview/Overview";
import { cookies } from "next/headers";

function DashboardHomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.TOKEN_NAME!)?.value;
  return <Overview token={token} />;
}

export default DashboardHomePage;
