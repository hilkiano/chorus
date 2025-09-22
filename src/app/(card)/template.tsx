import ThemeSwitcher from "@/components/theme-switcher-03";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen relative">
      {/* top bar */}
      <div className="absolute top-0 z-50 flex items-center justify-between w-full h-16 px-4 bg-background">
        <div></div>
        <ThemeSwitcher />
      </div>

      {/* main content */}
      <div className="flex items-center justify-center h-screen">
        {children}
      </div>
    </div>
  );
}
