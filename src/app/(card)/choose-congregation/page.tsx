import ChooseCongregationCard from "@/components/page/choose-congregation/choose-congregation-card";
import { ChooseCongregationProvider } from "@/components/page/choose-congregation/choose-congregation-provider";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ChooseCongregationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const congregations = (await db.select().from(schema.organizations)).map(
    (congregation) => {
      return {
        label: congregation.name,
        value: congregation.id,
      };
    }
  );

  return (
    <main className="mx-4 sm:mx-0 w-full">
      <ChooseCongregationProvider
        session={session}
        congregations={congregations}
      >
        <ChooseCongregationCard />
      </ChooseCongregationProvider>
    </main>
  );
}
