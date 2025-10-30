"use client";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/kibo-ui/dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { File, Check, LoaderCircleIcon } from "lucide-react";
import { ReactNode, useState } from "react";

interface DownloadPublisherTemplateStep {
  step: number;
  label: string;
  description: string;
  content: ReactNode;
}

export const DownloadPublisherTemplateCard = () => {
  const [files, setFiles] = useState<File[] | undefined>();

  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(
        `/api/backend/template/import?type=csv&model=Publisher`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch CSV file");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `publisher-template.csv`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading CSV:", err);
      alert("Failed to download CSV file");
    }
  };

  const steps: DownloadPublisherTemplateStep[] = [
    {
      step: 1,
      label: "Download template",
      description:
        "Download the template by clicking the button below and fill it with your data.",
      content: (
        <Button onClick={handleDownload} className="mt-4">
          <File />
          Download
        </Button>
      ),
    },
    {
      step: 2,
      label: "Upload",
      description:
        "Upload the template filled with your data by drag or select it from the dropzone below.",
      content: (
        <Dropzone
          accept={{
            "text/csv": [".csv"],
          }}
          maxFiles={1}
          onDrop={handleDrop}
          onError={console.error}
          src={files}
          className="mt-4"
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader className="typography">
        <h3>Mass Registration</h3>
        <h5 className="m-0">Please follow these steps below</h5>
      </CardHeader>
      <CardContent>
        <Stepper
          className="flex items-start gap-6"
          defaultValue={1}
          orientation="vertical"
          indicators={{
            completed: <Check className="size-4" />,
          }}
        >
          <StepperNav>
            {steps.map((step) => (
              <StepperItem
                key={step.step}
                step={step.step}
                loading={step.step === 2}
              >
                <StepperTrigger>
                  <StepperIndicator>{step.step}</StepperIndicator>
                </StepperTrigger>
                {steps.length > step.step && (
                  <StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
                )}
              </StepperItem>
            ))}
          </StepperNav>
          <StepperPanel className="-m-1">
            {steps.map((step) => (
              <StepperContent key={step.step} value={step.step}>
                <h3 className="text-lg font-semibold">{step.label}</h3>
                <h5>{step.description}</h5>
                {step.content}
              </StepperContent>
            ))}
          </StepperPanel>
        </Stepper>
      </CardContent>
    </Card>
  );
};
