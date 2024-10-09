import React, { Suspense } from "react";
import "./dashboard.scss";
import Overview from "../../components/dashboard-page/ui/Overview/Overview";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";

function DashboardHomePage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingSpinner size={40} />
        </div>
      }
    >
      <Overview />
    </Suspense>
  );
}

export default DashboardHomePage;
