"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChooseCongregationBody from "./choose-congregation-body";
import { useChooseCongregation } from "./choose-congregation-provider";

export default function ChooseCongregationCard() {
  const { session } = useChooseCongregation();

  return (
    <Card className="w-full sm:w-md mx-auto">
      <CardHeader className="typography">
        <h3>Welcome!</h3>
        <h6 className="mt-0">{session?.user.email}</h6>
      </CardHeader>
      <CardContent>
        <ChooseCongregationBody />
      </CardContent>
    </Card>
  );
}
