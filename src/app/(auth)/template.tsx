import ThemeSwitcher from "@/components/theme-switcher-03";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {/* top bar */}
      <div className="flex items-center justify-between w-full h-16 px-4">
        <div></div>
        <ThemeSwitcher />
      </div>

      {/* main content */}
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}
