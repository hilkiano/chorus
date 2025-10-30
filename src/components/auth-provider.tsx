"use client";

import React, { createContext, useContext, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { PageKey } from "@/lib/permission-keys";

type AuthData = {
  user: typeof authClient.$Infer.Session.user | null;
  session: typeof authClient.$Infer.Session.session | null;
  congregation: typeof authClient.$Infer.Organization | null;
  role: string | null;
  permissions: {
    page: PageKey[];
  };
};

type AuthContextType = {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialAuth,
}: {
  children: React.ReactNode;
  initialAuth: AuthData;
}) {
  const [auth, setAuth] = useState<AuthData>(initialAuth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
