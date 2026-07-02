import {
  Calendar,
  CheckSquare,
  FileText,
  Link2,
  Lock,
  Plus,
  Settings,
  Zap,
} from "lucide-react";

// Static placeholder content — replace with real data once the dashboards/notes
// API is wired up on the frontend (TanStack Query, per 03-tech-stack.md).
const PLACEHOLDER_DASHBOARDS = [
  { name: "Work Projects", color: "#6D28D9", count: 12, active: true },
  { name: "Personal", color: "#3B82F6", count: 5 },
  { name: "Side Project", color: "#10B981", count: 8 },
  { name: "Learning", color: "#F59E0B", count: 3 },
];

const QUICK_LINKS = [
  { label: "Due Today", icon: Calendar, count: 3 },
  { label: "High Priority", icon: Zap, count: 5 },
  { label: "All Tasks", icon: CheckSquare, count: 28 },
];

const NOTES_LINKS = [
  { label: "All Notes", icon: FileText, count: 14, active: true },
  { label: "Protected", icon: Lock, count: 2 },
  { label: "Linked to Tasks", icon: Link2, count: 6 },
];

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[1px] text-[var(--text-muted)]">
      {label}
    </div>
  );
}

export function Sidebar({ mode }: { mode: "dashboard" | "notes" }) {
  return (
    <aside className="flex w-sidebar shrink-0 flex-col overflow-hidden border-r border-[var(--border)] bg-[var(--bg-surface)] py-4">
      {mode === "dashboard" ? (
        <>
          <SectionLabel label="Dashboards" />
          <div className="flex flex-col gap-px px-2">
            {PLACEHOLDER_DASHBOARDS.map((d) => (
              <div
                key={d.name}
                className={`flex items-center gap-2.5 rounded-card px-2.5 py-1.5 ${
                  d.active ? "bg-accent-flat/10" : ""
                }`}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: d.color }}
                />
                <span
                  className={`flex-1 truncate text-[13px] ${
                    d.active
                      ? "font-semibold text-accent-flat"
                      : "font-normal text-[var(--text-body)]"
                  }`}
                >
                  {d.name}
                </span>
                <span
                  className={`rounded-tag px-1.5 py-px text-[10px] font-bold ${
                    d.active
                      ? "bg-accent-flat/30 text-accent-flat"
                      : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"
                  }`}
                >
                  {d.count}
                </span>
              </div>
            ))}
            <div className="mt-1 flex items-center gap-2.5 rounded-card border-[1.5px] border-dashed border-[var(--border)] px-2.5 py-1.5">
              <Plus size={13} className="text-[var(--text-muted)]" />
              <span className="text-[13px] text-[var(--text-muted)]">New dashboard</span>
            </div>
          </div>

          <hr className="my-4 border-t border-[var(--border)]" />

          <SectionLabel label="Quick" />
          <div className="flex flex-col gap-px px-2">
            {QUICK_LINKS.map(({ label, icon: Icon, count }) => (
              <div key={label} className="flex items-center gap-2.5 rounded-card px-2.5 py-1.5">
                <Icon size={14} className="text-[var(--text-muted)]" />
                <span className="flex-1 text-[13px] text-[var(--text-body)]">{label}</span>
                <span className="text-[10px] font-semibold text-[var(--text-muted)]">{count}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <SectionLabel label="Notes" />
          <div className="flex flex-col gap-px px-2">
            {NOTES_LINKS.map(({ label, icon: Icon, count, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 rounded-card px-2.5 py-1.5 ${
                  active ? "bg-accent-flat/10" : ""
                }`}
              >
                <Icon size={14} className={active ? "text-accent-flat" : "text-[var(--text-muted)]"} />
                <span
                  className={`flex-1 text-[13px] ${
                    active ? "font-semibold text-accent-flat" : "font-normal text-[var(--text-body)]"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    active ? "text-accent-flat" : "text-[var(--text-muted)]"
                  }`}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex-1" />
      <hr className="border-t border-[var(--border)]" />
      <div className="flex flex-col gap-px px-2 pt-3">
        <div className="flex items-center gap-2.5 rounded-card px-2.5 py-1.5">
          <Settings size={14} className="text-[var(--text-muted)]" />
          <span className="text-[13px] text-[var(--text-muted)]">Settings</span>
        </div>
      </div>
    </aside>
  );
}
