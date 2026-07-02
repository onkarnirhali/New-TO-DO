export function Tag({ label, color = "#6D28D9" }: { label: string; color?: string }) {
  return (
    <span
      className="rounded-tag px-[7px] py-[2px] text-[10px] font-semibold"
      style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}
    >
      {label}
    </span>
  );
}
