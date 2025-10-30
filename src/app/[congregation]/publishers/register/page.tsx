import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DownloadPublisherTemplateCard } from "@/components/page/publishers/register/download-publisher-template-card";
import React from "react";

export default async function PublishersRegister() {
  return (
    <ContentLayout title="Add Publisher">
      <DownloadPublisherTemplateCard />
    </ContentLayout>
  );
}
