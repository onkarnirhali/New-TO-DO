export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`text-lg font-extrabold tracking-tight ${className}`}>
      Plan
      <span className="bg-accent-gradient bg-clip-text text-transparent">ote</span>
    </span>
  );
}
