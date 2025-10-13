"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Spinner } from "./spinner";

interface LoadingOverlayProps {
  loading: boolean;
  isError?: boolean;
}

function LoadingOverlay({
  className,
  loading,
  isError,
  ...props
}: React.ComponentProps<"div"> & LoadingOverlayProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-card/50 backdrop-blur-xs w-full h-full rounded-xl transition-opacity duration-300",
        className,
        loading || isError ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      {...props}
    >
      <div className="relative h-full">
        {isError ? (
          <p className="text-sm text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Fetching data failed.
          </p>
        ) : (
          <Spinner className="size-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </div>
  );
}

export { LoadingOverlay };
