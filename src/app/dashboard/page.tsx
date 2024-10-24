import React, { Suspense } from 'react';
import './dashboard.scss';
import DashboardOverview from '../../components/dashboard-page/ui/DashboardOverview/DashboardOverview';
import LoadingSpinner from '../../components/ui/loading-spinner/LoadingSpinner';

function DashboardHomePage() {
  return (
    <Suspense fallback={<LoadingSpinner size={40} />}>
      <DashboardOverview />
    </Suspense>
  );
}

export default DashboardHomePage;
