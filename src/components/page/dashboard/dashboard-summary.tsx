"use client";

import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardSummary() {
  const { auth } = useAuth();

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <User size={16} />
            My Profile
          </CardTitle>
          <CardContent className="px-0">
            <Item className="px-0">
              <ItemContent>
                <ItemTitle>Name</ItemTitle>
                <ItemDescription>{auth.user?.name}</ItemDescription>
              </ItemContent>
            </Item>
            <ItemSeparator />
            <Item className="px-0">
              <ItemContent>
                <ItemTitle>Email</ItemTitle>
                <ItemDescription>{auth.user?.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                {auth.user?.emailVerified ? <Badge>Verified</Badge> : <></>}
              </ItemActions>
            </Item>
            <ItemSeparator />
            <Item className="px-0">
              <ItemContent>
                <ItemTitle>Congregation</ItemTitle>
                <ItemDescription>{auth.congregation?.name}</ItemDescription>
              </ItemContent>
            </Item>
            <ItemSeparator />
            <Item className="px-0">
              <ItemContent>
                <ItemTitle>Application Role</ItemTitle>
                <ItemDescription>
                  <code>{auth.role}</code>
                </ItemDescription>
              </ItemContent>
            </Item>
          </CardContent>
        </CardHeader>
      </Card>
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Activities</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
