import { AuthProvider } from "@/components/auth-provider";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await headers()).get("x-user");
  const role = (await headers()).get("x-role");
  const congregation = (await headers()).get("x-congregation");
  const session = (await headers()).get("x-session");
  const permissions = (await headers()).get("x-permissions");

  if (user && session && congregation && permissions) {
    return (
      <AuthProvider
        initialAuth={{
          user: JSON.parse(user),
          session: JSON.parse(session),
          congregation: JSON.parse(congregation),
          role: role,
          permissions: JSON.parse(permissions),
        }}
      >
        {children}
      </AuthProvider>
    );
  }
}
