import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gradient" | "ghost";
  size?: "sm" | "md";
};

const SIZE_CLASSES = {
  sm: "gap-1 px-3.5 py-1.5 text-xs",
  md: "gap-1.5 px-5 py-2.5 text-[13px]",
} as const;

const VARIANT_CLASSES = {
  gradient:
    "border-none bg-accent-gradient text-white shadow-[0_2px_12px_rgba(109,40,217,0.35)]",
  ghost:
    "border-[1.5px] border-[var(--border)] bg-transparent text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]",
} as const;

export function Button({
  variant = "gradient",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-card font-semibold transition-colors duration-micro ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
