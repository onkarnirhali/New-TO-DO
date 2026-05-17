/**
 * Root page — temporary placeholder.
 * Will redirect to /dashboard (authenticated) or /login in Milestone 2.
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)]">
      <div className="text-center">
        <h1 className="text-display font-bold bg-accent-gradient bg-clip-text text-transparent">
          Planote
        </h1>
        <p className="mt-2 text-body text-[var(--text-muted)]">
          Foundation ready. Auth coming in Milestone 2.
        </p>
      </div>
    </div>
  );
}
