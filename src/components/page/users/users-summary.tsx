"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/lib/query-keys";

export default function UsersSummary() {
  const getSummary = async () => {
    const res = await fetch("/api/summary/users");
    const data = await res.json();

    return data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: userKeys.summary(),
    queryFn: getSummary,
  });

  return (
    <Accordion
      defaultExpandedValue="summary"
      className="flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700"
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <AccordionItem value="summary" className="py-2">
        <AccordionTrigger className="text-left text-zinc-950 dark:text-zinc-50">
          <div className="flex items-center justify-start gap-2">
            <div>Summary</div>
            <ChevronDown className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:-rotate-180 dark:text-zinc-50" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-4">
          <Card className="w-72 gap-2 relative">
            <LoadingOverlay isError={isError} loading={isPending} />
            <CardHeader>
              <Item className="p-0">
                <ItemContent>
                  <ItemTitle className="text-lg">Total Users</ItemTitle>
                </ItemContent>
                <ItemActions className="text-lg">
                  {data ? Intl.NumberFormat().format(data.total) : 0}
                </ItemActions>
              </Item>
            </CardHeader>
            <CardContent>
              <Item className="p-0">
                <ItemContent>
                  <ItemTitle>Active User</ItemTitle>
                </ItemContent>
                <ItemActions>
                  {data ? Intl.NumberFormat().format(data.totalActive) : 0}
                </ItemActions>
              </Item>
              <Item className="p-0">
                <ItemContent>
                  <ItemTitle>Inactive User</ItemTitle>
                </ItemContent>
                <ItemActions>
                  {data ? Intl.NumberFormat().format(data.totalInactive) : 0}
                </ItemActions>
              </Item>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
