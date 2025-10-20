import { AuthProvider } from "@/components/auth-provider";
import { db } from "@/db/drizzle";
import { apiKeys } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await headers()).get("x-user");
  const congregation = (await headers()).get("x-congregation");
  const session = (await headers()).get("x-session");
  const apiKey = (await headers()).get("x-api-key");

  const { role } = await auth.api.getActiveMemberRole({
    headers: await headers(),
  });

  if (user && session && congregation) {
    return (
      <AuthProvider
        initialAuth={{
          user: JSON.parse(user),
          session: JSON.parse(session),
          congregation: JSON.parse(congregation),
          role: role,
          apiKey: apiKey,
        }}
      >
        {children}
      </AuthProvider>
    );
  }
}
