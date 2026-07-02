const SIZE_CLASSES = {
  sm: "h-5 w-5 text-[9px]",
  md: "h-7 w-7 text-xs",
  lg: "h-[30px] w-[30px] text-sm",
} as const;

export function Avatar({
  initials,
  size = "md",
  ringed = false,
}: {
  initials: string;
  size?: keyof typeof SIZE_CLASSES;
  ringed?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent-gradient font-bold text-white ${SIZE_CLASSES[size]} ${
        ringed ? "ring-2 ring-accent-flat/60 ring-offset-2 ring-offset-[var(--bg-surface)]" : ""
      }`}
    >
      {initials}
    </div>
  );
}
