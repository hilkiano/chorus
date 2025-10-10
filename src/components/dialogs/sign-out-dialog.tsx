"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useSignOutDialog } from "../sign-out-dialog-provider";
import { Spinner } from "../ui/spinner";

export function SignOutDialog() {
  const { open, setOpen } = useSignOutDialog();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authClient.signOut();

      router.replace("/sign-in");
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Sign Out</DialogTitle>
          <DialogDescription>
            This will end your sign-in session.
            <br />
            Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col sm:flex-row items-center gap-2 justify-end w-full">
            <Button
              className="w-full sm:w-auto"
              size="sm"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto"
              size="sm"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? <Spinner /> : <></>}
              Sign Out
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
