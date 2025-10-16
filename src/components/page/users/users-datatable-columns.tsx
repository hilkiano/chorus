"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Member, User } from "@/lib/auth";
import { ColumnDef } from "@tanstack/react-table";
import { BadgeCheck } from "lucide-react";
import { format } from "date-fns";
import UsersDatatableActions from "./users-datatable-actions";

interface UsersDataTableColumns {
  users: User;
  members: Member;
}

export const columns: ColumnDef<UsersDataTableColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="font-mono">{row.original.users.id}</div>;
    },
    size: 100,
  },
  {
    accessorKey: "users.name",
    header: "Name",
    size: 80,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          {row.original.users.email}
          {row.original.users.emailVerified ? (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <BadgeCheck color="green" strokeWidth={2.8} size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Email is verified.</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "members.role",
    header: "Role",
    cell: ({ row }) => {
      return (
        <div className="font-mono">{row.original.members?.role || "-"}</div>
      );
    },
    size: 80,
  },
  {
    accessorKey: "users.createdAt",
    header: "Registered At",
    cell: ({ row }) => {
      return format(row.original.users.createdAt, "MM/dd/yyyy HH:mm:ss");
    },
    size: 80,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UsersDatatableActions row={row} />;
    },
    size: 20,
    meta: {
      align: "center",
    },
  },
];
