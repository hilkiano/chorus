import SignInCard from "@/components/page/sign-in/sign-in-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <main className="mx-4 sm:mx-0 w-full">
      <SignInCard />
    </main>
  );
}
