import React from 'react';
import './dashboard.scss';
import NavBarDashboard from '../../components/dashboard-page/ui/NavBarDashboard/NavBarDashboard';

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <section className="dashboard">
      <NavBarDashboard />
      <main className="main-container__dashboard">{children}</main>
    </section>
  );
}

export default layout;
