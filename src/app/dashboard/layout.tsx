import NavDashBoard from "@/components/Dashboard/NavDashboard/NavDashBoard";
import React from "react";
import "./dashboard.scss";
type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <section className="dashboard">
      <NavDashBoard />
      <main className="main-container">{children}</main>
    </section>
  );
}

export default layout;
