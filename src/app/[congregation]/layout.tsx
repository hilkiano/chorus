import { AuthProvider } from "@/components/auth-provider";
import { headers } from "next/headers";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await headers()).get("x-user");
  const congregation = (await headers()).get("x-congregation");
  const session = (await headers()).get("x-session");

  if (user && session && congregation) {
    return (
      <AuthProvider
        initialAuth={{
          user: JSON.parse(user),
          session: JSON.parse(session),
          congregation: JSON.parse(congregation),
        }}
      >
        {children}
      </AuthProvider>
    );
  }
}
