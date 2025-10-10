import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { SignOutDialog } from "@/components/dialogs/sign-out-dialog";
import { SignOutDialogProvider } from "@/components/sign-out-dialog-provider";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SignOutDialogProvider>
      <AdminPanelLayout>{children}</AdminPanelLayout>
      <SignOutDialog />
    </SignOutDialogProvider>
  );
}
