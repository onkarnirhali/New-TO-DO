import { Bell, LayoutGrid, Layers, FileText, Search } from "lucide-react";
import { Wordmark } from "../ui/Wordmark";
import { Avatar } from "../ui/Avatar";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "notes", label: "Notes", icon: FileText },
] as const;

export function TopNav({ activeTab }: { activeTab: (typeof TABS)[number]["id"] }) {
  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-surface)] px-5">
      <div className="flex w-[220px] items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-card bg-accent-gradient shadow-[0_2px_8px_rgba(109,40,217,0.35)]">
          <Layers size={14} color="#fff" strokeWidth={2.2} />
        </div>
        <Wordmark className="text-[17px]" />
      </div>

      <nav className="flex gap-0.5 rounded-[10px] bg-[var(--bg-elevated)] p-[3px]">
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = id === activeTab;
          return (
            <button
              key={id}
              className={`flex items-center gap-1.5 rounded-card px-4 py-1.5 text-xs font-semibold tracking-tight transition-colors duration-micro ${
                active
                  ? "bg-accent-gradient text-white shadow-[0_1px_6px_rgba(109,40,217,0.3)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              <Icon size={12} color={active ? "#fff" : "currentColor"} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="flex w-[220px] items-center justify-end gap-2">
        <button
          aria-label="Search"
          className="flex h-8 w-8 items-center justify-center rounded-card text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]"
        >
          <Search size={16} />
        </button>
        <button
          aria-label="Notifications"
          className="flex h-8 w-8 items-center justify-center rounded-card text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]"
        >
          <Bell size={16} />
        </button>
        <div className="mx-1 h-5 w-px bg-[var(--border)]" />
        <Avatar initials="AJ" size="lg" ringed />
      </div>
    </header>
  );
}
