"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useEffect, useState } from "react";

export default function UsersSummary() {
  const [summary, setSummary] = useState({
    total: 0,
    totalActive: 0,
    totalInactive: 0,
  });
  const [loading, setLoading] = useState(true);

  const reloadSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/summary/users");
      const data = await res.json();

      if (res.ok) {
        setSummary(data.users);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error reloading summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadSummary();
  }, []);

  return (
    <div>
      <Card className="w-72 gap-2 relative">
        <LoadingOverlay loading={loading} />
        <CardHeader>
          <Item className="p-0">
            <ItemContent>
              <ItemTitle className="text-lg">Total Users</ItemTitle>
            </ItemContent>
            <ItemActions className="text-lg">
              {Intl.NumberFormat().format(summary.total)}
            </ItemActions>
          </Item>
        </CardHeader>
        <CardContent>
          <Item className="p-0">
            <ItemContent>
              <ItemTitle>Active User</ItemTitle>
            </ItemContent>
            <ItemActions>
              {Intl.NumberFormat().format(summary.totalActive)}
            </ItemActions>
          </Item>
          <Item className="p-0">
            <ItemContent>
              <ItemTitle>Inactive User</ItemTitle>
            </ItemContent>
            <ItemActions>
              {Intl.NumberFormat().format(summary.totalInactive)}
            </ItemActions>
          </Item>
        </CardContent>
      </Card>
    </div>
  );
}
