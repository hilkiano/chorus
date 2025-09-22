import { createAuthClient } from "better-auth/react";
import { ac, user, admin, superadmin } from "@/lib/permissions";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    organizationClient({
      ac,
      roles: {
        user,
        admin,
        superadmin,
      },
    }),
  ],
});
