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
  const apiKey = auth.apiKey ?? "";

  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(
    row.original.users.id === auth.user?.id ? apiKey : ""
  );
  const [copied, setCopied] = useState(false);

  const handleDialogOpen = (open: boolean) => {
    if (!open) {
      setOpen(false);
      setCopied(false);
    }
  };

  const createNewKey = async () => {
    if (auth.user) {
      const response = await fetch("/api/create/key", {
        method: "PUT",
        body: JSON.stringify({
          id: generateRandomString(),
          userId: auth.user.id,
          key: generateRandomString(64),
        }),
      })
        .then((res) => res.json())
        .then((res) => res);

      return response;
    }
  };

  const updateKey = useMutation({
    mutationFn: createNewKey,
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-2 w-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Dialog onOpenChange={(open) => handleDialogOpen(open)}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Key /> Get API Key
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>API Key</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              {auth.user?.email !== row.original.users.email && (
                <Alert variant="destructive">
                  <AlertTitle className="font-extrabold text-lg">
                    Warning
                  </AlertTitle>
                  <AlertDescription>
                    <p>
                      This key belongs to user <b>{row.original.users.email}</b>
                      .
                      <br />
                      Use it carefully.
                    </p>
                  </AlertDescription>
                </Alert>
              )}

              <FieldSet>
                <FieldGroup>
                  <Field>
                    <InputGroup>
                      <InputGroupInput readOnly value={key} />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          disabled={key === ""}
                          title="Copy"
                          size="icon-xs"
                          onClick={() => {
                            key !== "" ? copy(key) : undefined;
                            setCopied(true);
                          }}
                        >
                          {copied ? <Check /> : <Copy />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>

                    <FieldDescription>
                      Use this key for your API request header.
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Button
                disabled={key !== ""}
                className="self-start"
                onClick={() => updateKey.mutate()}
              >
                Generate API Key
              </Button>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
