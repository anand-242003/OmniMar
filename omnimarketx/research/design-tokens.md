# OmniMarketX Design Tokens Specification

Extracted directly from production CSS (`0bih42lh0d_w7.css`) on `https://www.omnimarketx.com`.

---

## 1. Typography

- **Primary Sans Font**: `"Sora", system-ui, -apple-system, sans-serif`
  - CSS Variable: `--font-sora`
  - Usage: All UI labels, headings, body copy, and button text.
- **Monospace / Numerics Font**: `"Geist Mono", monospace`
  - CSS Variable: `--font-geist-mono`
  - Usage: Prices (e.g. `50¢`), percentages, timestamps, wallet addresses, and statistics.

---

## 2. Color System

### Light Mode (`:root` / `[data-theme="light"]`)
```css
--color-omx-bg: #f4f5f7;
--color-omx-card: #ffffff;
--color-omx-elevated: #ffffff;
--color-omx-muted: #f8fafc;
--color-omx-hover: #fff1f2;
--color-omx-active: #ffe4e6;
--color-omx-sidebar: #ffffff;
--color-omx-text: #0f172a;
--color-omx-text-secondary: #475569;
--color-omx-text-muted: #94a3b8;
--color-omx-border: #e2e8f0;
--color-omx-border-strong: #cbd5e1;

/* Outcome Colors */
--color-omx-yes: #15803d;
--color-omx-yes-bg: rgba(21, 128, 61, 0.1);
--color-omx-yes-border: rgba(21, 128, 61, 0.35);

--color-omx-no: #e11d48;
--color-omx-no-bg: rgba(225, 29, 72, 0.1);
--color-omx-no-border: rgba(225, 29, 72, 0.35);
```

### Dark Mode (`[data-theme="dark"]`)
```css
--color-omx-bg: #090426;
--color-omx-card: #110a36;
--color-omx-elevated: #1b1150;
--color-omx-muted: #0f0828;
--color-omx-hover: rgba(242, 48, 100, 0.1);
--color-omx-active: rgba(242, 48, 100, 0.18);
--color-omx-sidebar: #110a36;
--color-omx-text: #ffffff;
--color-omx-text-secondary: #94a3b8;
--color-omx-text-muted: #64748b;
--color-omx-border: rgba(255, 255, 255, 0.08);
--color-omx-border-strong: rgba(255, 255, 255, 0.14);

/* Outcome Colors */
--color-omx-yes: #16a34a;
--color-omx-yes-bg: rgba(22, 163, 74, 0.12);
--color-omx-yes-border: rgba(22, 163, 74, 0.35);

--color-omx-no: #dc2626;
--color-omx-no-bg: rgba(220, 38, 38, 0.12);
--color-omx-no-border: rgba(220, 38, 38, 0.35);
```

---

## 3. Gradients

- **Brand Primary Gradient**:
  ```css
  background: linear-gradient(135deg, #f23064 0%, #ff4f55 48%, #ff6b1a 100%);
  ```
- **Deposit / Wallet Gradient**:
  ```css
  background: linear-gradient(135deg, #d92588 0%, #5430d9 100%);
  ```
- **Soft Accent Gradient**:
  ```css
  background: linear-gradient(135deg, rgba(242, 48, 100, 0.12) 0%, rgba(255, 107, 26, 0.08) 100%);
  ```

---

## 4. Border Radii

```css
--radius-omx-sm: 8px;
--radius-omx-md: 12px;
--radius-omx-lg: 16px;
--radius-omx-xl: 20px;
--radius-omx-2xl: 24px;
```

---

## 5. Box Shadows

### Light Mode
```css
--shadow-omx-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
--shadow-omx-md: 0 4px 16px rgba(15, 23, 42, 0.08);
--shadow-omx-lg: 0 12px 40px rgba(15, 23, 42, 0.12);
```

### Dark Mode
```css
--shadow-omx-sm: 0 1px 2px rgba(0, 0, 0, 0.35);
--shadow-omx-md: 0 8px 24px rgba(0, 0, 0, 0.45);
--shadow-omx-lg: 0 16px 48px rgba(0, 0, 0, 0.55);
--shadow-omx-glow: 0 0 24px rgba(217, 37, 136, 0.35);
```

---

## 6. Category Color Tokens

| Category | Slug | Icon | Hex Color |
|---|---|---|---|
| Gaming | `gaming` | 🎮 | `#f264b7` |
| Crypto | `crypto` | ₿ | `#f59e0b` |
| Politics | `politics` | 🗳 | `#ef4444` |
| Sports | `sports` | ⚽ | `#10b981` |
| Economy | `economy` | 💰 | `#3b82f6` |
| Entertainment | `entertainment` | 🎬 | `#6f65fb` |
| Tech | `tech` | 🤖 | `#06b6d4` |
