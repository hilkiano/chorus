import { useAuth } from "@/components/auth-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Member, User } from "@/lib/auth";
import { generateRandomString } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import {
  Check,
  Copy,
  Key,
  MoreVertical,
  UserMinus,
  UserPlus,
  UserRoundCog,
} from "lucide-react";
import React, { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

interface UsersDataTableActionsProps {
  row: Row<{
    users: User;
    members: Member;
  }>;
}

export default function UsersDataTableActions({
  row,
}: UsersDataTableActionsProps) {
  const [copiedText, copy] = useCopyToClipboard();
  const { auth } = useAuth();

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDialogOpen = (open: boolean) => {
    if (!open) {
      setOpen(false);
      setCopied(false);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-2 w-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <UserRoundCog /> Change Role
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {row.original.users.deletedAt ? (
          <DropdownMenuItem>
            <UserPlus /> Activate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem variant="destructive">
            <UserMinus /> Deactivate
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
