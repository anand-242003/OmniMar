/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        omx: {
          bg: "var(--color-omx-bg)",
          card: "var(--color-omx-card)",
          elevated: "var(--color-omx-elevated)",
          hover: "var(--color-omx-hover)",
          active: "var(--color-omx-active)",
          border: "var(--color-omx-border)",
          "border-strong": "var(--color-omx-border-strong)",
          "border-subtle": "var(--color-omx-border-subtle)",
          text: "var(--color-omx-text)",
          "text-secondary": "var(--color-omx-text-secondary)",
          "text-muted": "var(--color-omx-text-muted)",
          yes: "var(--color-omx-yes)",
          "yes-bg": "var(--color-omx-yes-bg)",
          no: "var(--color-omx-no)",
          "no-bg": "var(--color-omx-no-bg)",
          brand: "var(--color-omx-brand)",
          sandbox: "var(--color-omx-sandbox)",
          "sandbox-bg": "var(--color-omx-sandbox-bg)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "-apple-system", "sans-serif"],
        sora: ["var(--font-sora)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        "omx-sm": "4px",
        "omx-md": "8px",
        "omx-lg": "12px",
        "omx-xl": "16px",
      },
      boxShadow: {
        "omx-card": "0 4px 20px -2px rgba(0, 0, 0, 0.45)",
        "omx-modal": "0 20px 40px -4px rgba(0, 0, 0, 0.70)",
      },
    },
  },
  plugins: [],
}
