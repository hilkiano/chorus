"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/kibo-ui/combobox";
import { useState } from "react";
import { useChooseCongregation } from "./choose-congregation-provider";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Plus, Send } from "lucide-react";
import CreateCongregationDialog from "./create-congregation-dialog";

export default function ChooseCongregationBody() {
  const { congregations } = useChooseCongregation();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState<string>();

  const handleLogout = async () => {
    await authClient.signOut();

    router.replace("/sign-in");
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground">
        Right now, you are not registered in a congregation. Please choose the
        congregation listed in the dropdown and send a request to join.
      </p>

      <Combobox
        data={congregations}
        onOpenChange={setOpen}
        onValueChange={(value) => {
          setValue(value);
        }}
        open={open}
        type="congregation"
        value={value}
      >
        <ComboboxTrigger />
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxEmpty />
          <ComboboxList>
            <ComboboxGroup>
              {congregations.map((congregation) => (
                <ComboboxItem
                  key={congregation.value}
                  value={congregation.value}
                >
                  {congregation.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Button disabled={!value} className="self-end">
        <Send />
        Send Join Request
      </Button>

      <p className="text-muted-foreground">
        Otherwise, you may create a new congregation.
      </p>

      <Button onClick={() => setOpenDialog(true)}>
        <Plus />
        Register New Congregation
      </Button>

      <Button
        onClick={handleLogout}
        className="self-end mt-4"
        variant="ghost"
        size="sm"
      >
        <LogOut />
        Sign Out
      </Button>

      <CreateCongregationDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
}
