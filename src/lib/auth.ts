import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { apiKey, customSession, organization } from "better-auth/plugins";
import { ac, user, admin, superadmin, owner } from "@/lib/permissions";
import { schema, teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { members, users } from "@/db/schema";

const options = {
  user: {
    additionalFields: {
      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null,
        input: false,
      },
      apiKey: {
        type: "string",
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
          const data = await auth.api.createApiKey({
            body: {
              userId: user.id,
              remaining: null,
            },
          });

          // Update user
          await db
            .update(schema.users)
            .set({ apiKey: data.key })
            .where(eq(users.id, user.id));
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
        owner,
        superadmin,
      },
      teams: {
        enabled: true,
      },
    }),
    apiKey({
      apiKeyHeaders: "x-better-auth-api-key",
      keyExpiration: {
        defaultExpiresIn: null,
      },
      rateLimit: {
        enabled: false,
      },
    }),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }) => {
      const qMembers = await db
        .select({
          role: members.role,
        })
        .from(schema.members)
        .where(eq(members.userId, user.id))
        .limit(1);

      const myMember = qMembers[0];
      return {
        role: myMember?.role ?? null,
        user,
        session,
      };
    }, options),
  ],
});

export type User = typeof auth.$Infer.Session.user;
export type Member = typeof auth.$Infer.Member;
