import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Planote",
    template: "%s | Planote",
  },
  description: "Plan and note — unified productivity. Kanban task management with premium rich-text notes.",
  applicationName: "Planote",
};

/**
 * Root Layout — wraps every page in the app.
 *
 * This is a Server Component (no "use client" directive).
 * In Next.js App Router, layouts are server-rendered by default.
 *
 * Responsibilities:
 * - Defines the HTML shell (lang, body)
 * - Sets metadata (tab title, description)
 * - Will wrap the app in ClerkProvider (auth) in Milestone 2
 * - Defaults to dark mode — per 05-ui-ux-design.md, dark is the
 *   primary/hero experience. A user-toggleable theme preference
 *   (persisted, e.g. via next-themes) is a separate future piece.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
