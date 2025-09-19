import { createAuthClient } from "better-auth/react";
import { ac, user, admin, superadmin } from "@/lib/permissions";
import { organization } from "better-auth/plugins/organization";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    organization({
      ac,
      roles: {
        user,
        admin,
        superadmin,
      },
    }),
  ],
});
