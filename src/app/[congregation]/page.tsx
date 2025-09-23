import { ContentLayout } from "@/components/admin-panel/content-layout";
import LogoutButton from "@/components/reusable/logout-button";
import React from "react";

export default function Dashboard() {
  return (
    <ContentLayout title="Dashboard">
      <LogoutButton />
    </ContentLayout>
  );
}
