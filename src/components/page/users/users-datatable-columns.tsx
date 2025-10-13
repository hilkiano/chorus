"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@/lib/auth";
import { ColumnDef } from "@tanstack/react-table";
import { BadgeCheck } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="font-mono">{row.getValue("id")}</div>;
    },
    size: 100,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 80,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          {row.getValue("email")}
          {row.original.emailVerified ? (
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
];
