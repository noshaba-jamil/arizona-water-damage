/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Red Theme — Premium Professional (see app/globals.css for the
        // canonical CSS custom properties actually consumed by components;
        // these Tailwind tokens mirror the same palette for anyone
        // extending the site with Tailwind utility classes directly).
        dark: {
          DEFAULT: "#111111",
          soft: "#1C1414",
        },
        red: {
          DEFAULT: "#C62828",  // Primary Red
          dark: "#8E1B1B",     // Dark Red — emergency/CTA sections
          accent: "#E53935",   // Accent Red — hover/highlight
          soft: "#FFEBEE",     // Light Red — badge/callout backgrounds
        },
        bg: "#F8F9FA",
        card: "#FFFFFF",
        "text-main": "#333333",
        "text-slate": "#666666",
        border: "#E5E5E5",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Montserrat", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
        lg: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(17,17,17,0.06), 0 1px 3px rgba(17,17,17,0.08)",
        md: "0 4px 16px rgba(17,17,17,0.08), 0 2px 6px rgba(17,17,17,0.06)",
        lg: "0 20px 40px rgba(17,17,17,0.14), 0 6px 14px rgba(17,17,17,0.08)",
      },
      maxWidth: {
        container: "1240px",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(198,40,40,0.55)" },
          "70%": { boxShadow: "0 0 0 8px rgba(198,40,40,0)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 1.6s infinite",
      },
    },
  },
  plugins: [],
};
