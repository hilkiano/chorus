import { createAuthClient } from "better-auth/react";
import { ac, user, admin, superadmin, owner } from "@/lib/permissions";
import { apiKeyClient, organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    apiKeyClient(),
    organizationClient({
      ac,
      roles: {
        user,
        admin,
        owner,
        superadmin,
      },
    }),
  ],
});
