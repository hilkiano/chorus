import { Button } from "@/components/ui/button";
import { Member, User } from "@/lib/auth";
import { Row } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import React from "react";

interface UsersDataTableActionsProps {
  row: Row<{
    users: User;
    members: Member;
  }>;
}

export default function UsersDataTableActions({
  row,
}: UsersDataTableActionsProps) {
  return (
    <Button variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">Open menu</span>
      <MoreVertical className="h-2 w-2" />
    </Button>
  );
}
