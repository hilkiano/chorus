import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function Template({ children }: { children: React.ReactNode }) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
