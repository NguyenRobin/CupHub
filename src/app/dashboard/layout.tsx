import React, { Suspense } from 'react';
import './dashboard.scss';
import NavBarDashboard from '../../components/dashboard-page/ui/NavBarDashboard/NavBarDashboard';
import NavMenuDashboard from '../../components/dashboard-page/ui/NavMenuDashboard/NavMenuDashboard';
import LoadingWrapper from './loading';

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <section className="dashboard">
      <section className="dashboard__navbar">
        <NavBarDashboard />
      </section>

      <section className="dashboard__side-menu">
        <NavMenuDashboard />
      </section>

      <main className="dashboard__main-children">
        <Suspense fallback={<LoadingWrapper />}>{children}</Suspense>
      </main>
    </section>
  );
}

export default layout;
