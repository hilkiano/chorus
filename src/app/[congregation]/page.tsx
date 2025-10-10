import { ContentLayout } from "@/components/admin-panel/content-layout";
import DashboardSummary from "@/components/page/dashboard/dashboard-summary";
import React from "react";

export default function Dashboard() {
  return (
    <ContentLayout title="Dashboard">
      <DashboardSummary />
    </ContentLayout>
  );
}
