"use client";

import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

interface CreateCongregationDialogInterface {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function makeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

function toTitleCase(str: string) {
  return str.replace(/\b\w+/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}
export default function CreateCongregationDialog({
  open,
  setOpen,
}: CreateCongregationDialogInterface) {
  const router = useRouter();
  const [slug, setSlug] = useState<string>();

  const schema = z.object({
    name: z.string().min(3),
  });
  type FormSchema = z.infer<typeof schema>;
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (payload: FormSchema) => {
    const { data: checkSlug, error } = await authClient.organization.checkSlug({
      slug: slug!,
    });

    if (error && error.code === "SLUG_IS_TAKEN") {
      toast.info(`${payload.name} already registered.`);
    }

    if (checkSlug?.status) {
      const { data } = await authClient.organization.create({
        name: payload.name,
        slug: slug!,
        keepCurrentActiveOrganization: false,
      });
      if (data) {
        router.replace("/");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onCloseAutoFocus={() => {
          form.reset();
          setSlug(undefined);
        }}
        className="w-full max-w-md p-6"
      >
        <DialogHeader>
          <DialogTitle>Register New Congregation</DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-400">
            Please enter the name of your congregation
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel htmlFor="congregation-name">
                      Congregation Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        id="congregation-name"
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const rawValue = e.currentTarget.value;
                          const formattedValue = toTitleCase(rawValue);

                          onChange(formattedValue);
                          setSlug(makeSlug(formattedValue));
                        }}
                      />
                    </FormControl>
                    <FormDescription className="typography">
                      {slug ? (
                        <>
                          URL slug: <code>{"/" + slug}</code>
                        </>
                      ) : (
                        ""
                      )}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!form.formState.isValid}>
                  <Check />
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
