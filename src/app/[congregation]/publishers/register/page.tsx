import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import React from "react";

export default async function PublishersRegister() {
  return (
    <ContentLayout title="Add Publisher">
      <Button>Download Template</Button>
    </ContentLayout>
  );
}
