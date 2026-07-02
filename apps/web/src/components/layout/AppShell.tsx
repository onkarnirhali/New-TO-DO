import type { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";

export function AppShell({
  activeTab,
  children,
}: {
  activeTab: "dashboard" | "notes";
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--bg-base)]">
      <TopNav activeTab={activeTab} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar mode={activeTab} />
        {children}
      </div>
    </div>
  );
}
