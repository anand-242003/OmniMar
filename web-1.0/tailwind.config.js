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
          muted: "var(--color-omx-muted)",
          hover: "var(--color-omx-hover)",
          active: "var(--color-omx-active)",
          sidebar: "var(--color-omx-sidebar)",
          text: "var(--color-omx-text)",
          "text-secondary": "var(--color-omx-text-secondary)",
          "text-muted": "var(--color-omx-text-muted)",
          border: "var(--color-omx-border)",
          "border-strong": "var(--color-omx-border-strong)",
          yes: "var(--color-omx-yes)",
          "yes-bg": "var(--color-omx-yes-bg)",
          "yes-border": "var(--color-omx-yes-border)",
          no: "var(--color-omx-no)",
          "no-bg": "var(--color-omx-no-bg)",
          "no-border": "var(--color-omx-no-border)",
        },
      },
      borderRadius: {
        "omx-sm": "var(--radius-omx-sm)",
        "omx-md": "var(--radius-omx-md)",
        "omx-lg": "var(--radius-omx-lg)",
        "omx-xl": "var(--radius-omx-xl)",
        "omx-2xl": "var(--radius-omx-2xl)",
      },
      boxShadow: {
        "omx-sm": "var(--shadow-omx-sm)",
        "omx-md": "var(--shadow-omx-md)",
        "omx-lg": "var(--shadow-omx-lg)",
        "omx-glow": "var(--shadow-omx-glow)",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "-apple-system", "sans-serif"],
        sora: ["var(--font-sora)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "omx-brand": "linear-gradient(135deg, #f23064 0%, #ff4f55 48%, #ff6b1a 100%)",
        "omx-deposit": "linear-gradient(135deg, #d92588 0%, #5430d9 100%)",
        "omx-soft": "linear-gradient(135deg, rgba(242, 48, 100, 0.12) 0%, rgba(255, 107, 26, 0.08) 100%)",
      },
    },
  },
  plugins: [],
}
