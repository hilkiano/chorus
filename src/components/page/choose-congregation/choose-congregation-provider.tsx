"use client";

import { authClient } from "@/lib/auth-client";
import { createContext, useContext, useState } from "react";

type ChooseCongregationType = {
  session: typeof authClient.$Infer.Session | null;
  congregations: { label: string; value: string }[];
  setCongregations: React.Dispatch<
    React.SetStateAction<{ label: string; value: string }[]>
  >;
};

const ChooseCongregationContext = createContext<
  ChooseCongregationType | undefined
>(undefined);

export function ChooseCongregationProvider({
  session,
  congregations: initialCongregations,
  children,
}: {
  session: typeof authClient.$Infer.Session | null;
  congregations: { label: string; value: string }[];
  children: React.ReactNode;
}) {
  const [congregations, setCongregations] = useState(initialCongregations);

  return (
    <ChooseCongregationContext.Provider
      value={{ session, congregations, setCongregations }}
    >
      {children}
    </ChooseCongregationContext.Provider>
  );
}

export function useChooseCongregation() {
  const ctx = useContext(ChooseCongregationContext);
  if (!ctx) {
    throw new Error(
      "useChooseCongregation must be used inside ChooseCongregationProvider"
    );
  }
  return ctx;
}
