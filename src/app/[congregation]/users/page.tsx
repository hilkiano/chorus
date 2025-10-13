import { ContentLayout } from "@/components/admin-panel/content-layout";
import UsersDatatable from "@/components/page/users/users-datatable";
import UsersSummary from "@/components/page/users/users-summary";
import React from "react";

export default async function Users() {
  return (
    <ContentLayout title="Users">
      <div className="grid grid-cols-1 gap-4">
        <UsersSummary />
        <UsersDatatable />
      </div>
    </ContentLayout>
  );
}
