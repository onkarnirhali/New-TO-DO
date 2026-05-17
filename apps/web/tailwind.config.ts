import type { Config } from "tailwindcss";

/**
 * Planote Design System — Tailwind Configuration
 *
 * All design tokens from 05-ui-ux-design.md are mapped here.
 * Use these tokens everywhere — never hardcode hex values in components.
 * When the design changes, one edit here updates the entire app.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    // Include shared packages if they ever have UI
    "../../packages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Dark mode surface hierarchy ──────────────────────────────
        dark: {
          base:     "#0C0C11",   // Main page canvas
          surface:  "#12121A",   // Cards, panels
          elevated: "#1A1A26",   // Hover, selected items
          overlay:  "#22223A",   // Modals, dropdowns
          border:   "#2A2A40",   // Dividers, card borders
        },

        // ── Light mode surface hierarchy ─────────────────────────────
        light: {
          base:     "#F4F4F8",   // Main page canvas (cool off-white)
          surface:  "#FFFFFF",   // Cards
          elevated: "#F0F0F7",   // Sidebar, secondary panels
          overlay:  "#E8E8F0",   // Hover states
          border:   "#E2E2EC",   // Dividers
        },

        // ── Accent (same in both modes) ───────────────────────────────
        accent: {
          start: "#7C3AED",      // Gradient start — violet
          end:   "#4F46E5",      // Gradient end — indigo
          flat:  "#6D28D9",      // Single-colour accent for icons, tags
        },

        // ── Text — dark mode ──────────────────────────────────────────
        "dark-text": {
          primary:   "#F0F0FF",  // Headings, primary content
          secondary: "#A0A0C0",  // Labels, metadata
          muted:     "#6B6B90",  // Placeholders, disabled (min 4.5:1)
        },

        // ── Text — light mode ─────────────────────────────────────────
        "light-text": {
          primary:  "#0C0C1E",   // Headings
          body:     "#3A3A5A",   // Body text (min 4.5:1 on white)
          secondary:"#4A4A6A",   // Labels (decorative — 3.1:1)
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      fontSize: {
        "display":    ["28px", { fontWeight: "700", lineHeight: "1.2" }],
        "heading":    ["20px", { fontWeight: "600", lineHeight: "1.3" }],
        "subheading": ["16px", { fontWeight: "500", lineHeight: "1.4" }],
        "body":       ["14px", { fontWeight: "400", lineHeight: "1.6" }],
        "label":      ["12px", { fontWeight: "500", lineHeight: "1.4" }],
        "caption":    ["11px", { fontWeight: "400", lineHeight: "1.4" }],
      },

      borderRadius: {
        "card":  "8px",
        "tag":   "6px",
        "modal": "12px",
      },

      spacing: {
        "sidebar": "240px",
      },

      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #7C3AED, #4F46E5)",
      },

      transitionDuration: {
        "micro":  "150ms",  // Hover, focus states
        "state":  "200ms",  // Component state changes
        "page":   "250ms",  // Route transitions
      },

      animation: {
        "fade-in": "fadeIn 200ms ease-out",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
