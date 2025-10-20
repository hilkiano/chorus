import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";
import { ac, user, admin, superadmin } from "@/lib/permissions";
import { apiKeys, schema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { teamMembers, members } from "../../auth-schema";
import { generateRandomString } from "./utils";

export const auth = betterAuth({
  user: {
    additionalFields: {
      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null,
        input: false,
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Create API key
          await db.insert(apiKeys).values({
            id: generateRandomString(),
            userId: user.id,
            key: generateRandomString(64),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        },
      },
    },
    session: {
      create: {
        before: async (sessionData) => {
          // Automatically add active team and organization upon signing in
          const userId = sessionData.userId;

          const qTeamMembers = await db
            .select({
              teamId: teamMembers.teamId,
            })
            .from(schema.teamMembers)
            .where(eq(teamMembers.userId, userId))
            .limit(1);
          const qMembers = await db
            .select({
              organizationId: members.organizationId,
            })
            .from(schema.members)
            .where(eq(members.userId, userId))
            .limit(1);

          const myTeamMember = qTeamMembers[0];
          const myMember = qMembers[0];

          if (myTeamMember || myMember) {
            return {
              data: {
                ...sessionData,
                activeOrganizationId: myMember?.organizationId ?? null,
                activeTeamId: myTeamMember?.teamId ?? null,
              },
            };
          }

          return { data: sessionData };
        },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    nextCookies(),
    organization({
      ac,
      roles: {
        user,
        admin,
        superadmin,
      },
      teams: {
        enabled: true,
      },
    }),
  ],
});

export type User = typeof auth.$Infer.Session.user;
export type Member = typeof auth.$Infer.Member;
