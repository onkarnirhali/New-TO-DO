import { LayoutGrid } from "lucide-react";
import { AppShell } from "../../components/layout/AppShell";

/**
 * Dashboard placeholder — proves the app shell (nav + sidebar) renders
 * correctly. Real Kanban board content lands once the frontend is wired
 * to the Dashboards/Tasks API (TanStack Query, per 03-tech-stack.md).
 */
export default function DashboardPage() {
  return (
    <AppShell activeTab="dashboard">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <LayoutGrid size={32} className="text-[var(--text-muted)]" />
        <p className="text-body text-[var(--text-muted)]">
          Kanban board coming soon — this is the app shell only.
        </p>
      </div>
    </AppShell>
  );
}
