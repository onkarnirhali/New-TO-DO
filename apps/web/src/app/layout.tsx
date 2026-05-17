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
 * - Will apply the saved theme (light/dark) in Milestone 2
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
