import React, { Suspense } from 'react';
import DashboardOverview from '../../components/dashboard-page/ui/DashboardOverview/DashboardOverview';
import LoadingSpinner from '../../components/ui/loading-spinner/LoadingSpinner';

async function DashboardHomePage() {
  return <DashboardOverview />;
}

export default DashboardHomePage;
