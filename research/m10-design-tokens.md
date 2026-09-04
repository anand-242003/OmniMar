# Milestone 10 — Web-2.0 Design Tokens Specification
## OmniMarketX Design System Foundations: Tokens Architecture

**Target**: `web-2.0` Design System Implementation Reference  
**Baseline**: `research/m9-visual-direction.md`, `research/m9-ui-audit.md`, `research/m8-redesign-principles.md`  
**Status**: Authoritative Design Token Specification  
**Design North Star**: *"The Credible Forecaster's Arena"* (Prediction Market Rigor + Premium Fintech Craft + Social Vitality)  
**Rules**: No application code changes. Pure token architecture and specifications.

---

## 1. Core Color Architecture & Token Schema

The color system strictly obeys the **80/15/5 Distribution Standard**:
- **`80%` Base Neutrals**: Deep Space Navy foundation (`#090426`), midnight-purple elevated surfaces, and dark borders.
- **`15%` Text Neutrals**: Pure white primary headlines (`#ffffff`), slate secondary reading text (`#94a3b8`), and muted metadata (`#64748b`).
- **`5%` High-Signal Accents**: Semantic Emerald (`#10b981`), Semantic Rose (`#f43f5e`), Brand Hot Pink (`#f23064`), and Sandbox Violet (`#8b5cf6`).

```
                                COLOR TOKENS TAXONOMY
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ GLOBAL CANVASES:  --omx-color-bg-base          #090426 (Dark)  |  #f8fafc (Light)      │
│ SURFACES:         --omx-color-surface-card     #110a36 (Dark)  |  #ffffff (Light)      │
│ ELEVATED:         --omx-color-surface-elevated #1b1150 (Dark)  |  #f1f5f9 (Light)      │
│ BORDERS:          --omx-color-border-subtle    rgba(255,255,255,0.08)                  │
│                   --omx-color-border-default   rgba(255,255,255,0.12)                  │
│                   --omx-color-border-strong    rgba(255,255,255,0.20)                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ SEMANTIC OUTCOMES:--omx-color-outcome-yes      #10b981 (Emerald YES / Profit / Bull)   │
│                   --omx-color-outcome-no       #f43f5e (Rose NO / Loss / Bear)         │
│ BRAND ACTIONS:    --omx-color-brand-primary    #f23064 (Hot Pink Brand Accent)         │
│                   --omx-color-brand-gradient   linear-gradient(135deg, #f23064, #ff6b1a│
│ SANDBOX IDENTITY: --omx-color-sandbox-demo     #8b5cf6 (Violet Virtual Practice)       │
│ REAL FINANCIAL:   --omx-color-real-capital     #10b981 (Emerald Consequential Capital) │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Master Color Tokens Table

| Token Variable | Dark Mode Value | Light Mode Value | Usage Scope | WCAG Contrast |
|:---|:---:|:---:|:---|:---:|
| `--omx-color-bg-base` | `#090426` | `#f8fafc` | Canvas backdrop for entire document | N/A |
| `--omx-color-surface-card` | `#110a36` | `#ffffff` | Primary container cards, order slips, tables | N/A |
| `--omx-color-surface-elevated` | `#1b1150` | `#f1f5f9` | Modals, flyout menus, tooltips, drawers | N/A |
| `--omx-color-surface-hover` | `rgba(242, 48, 100, 0.08)` | `rgba(242, 48, 100, 0.05)` | Interactive row hover, table row highlight | N/A |
| `--omx-color-surface-active` | `rgba(242, 48, 100, 0.14)` | `rgba(242, 48, 100, 0.10)` | Pressed states, active tab backgrounds | N/A |
| `--omx-color-border-subtle` | `rgba(255, 255, 255, 0.08)` | `#f1f5f9` | Internal card hairline dividers | N/A |
| `--omx-color-border-default` | `rgba(255, 255, 255, 0.12)` | `#e2e8f0` | Standard card, input, and button borders | N/A |
| `--omx-color-border-strong` | `rgba(255, 255, 255, 0.20)` | `#cbd5e1` | Selected cards, focused inputs, table outlines | N/A |
| `--omx-color-text-primary` | `#ffffff` | `#0f172a` | Market propositions, prices, main headlines | `16.2:1` (AAA) |
| `--omx-color-text-secondary` | `#94a3b8` | `#475569` | Explanatory copy, table headers, subtitles | `7.1:1` (AAA) |
| `--omx-color-text-muted` | `#64748b` | `#94a3b8` | Timestamps, secondary units, unselected pills | `4.8:1` (AA) |
| `--omx-color-outcome-yes` | `#10b981` | `#059669` | YES outcome pills, net profit, bullish tag | `6.2:1` (AA) |
| `--omx-color-outcome-yes-bg` | `rgba(16, 185, 129, 0.12)` | `rgba(5, 150, 105, 0.10)` | Background tint for YES buttons and badges | N/A |
| `--omx-color-outcome-no` | `#f43f5e` | `#e11d48` | NO outcome pills, loss indicators, bearish tag | `5.8:1` (AA) |
| `--omx-color-outcome-no-bg` | `rgba(244, 63, 94, 0.12)` | `rgba(225, 29, 72, 0.10)` | Background tint for NO buttons and badges | N/A |
| `--omx-color-brand-primary` | `#f23064` | `#e11d48` | Primary CTA buttons, active route indicators | `5.4:1` (AA) |
| `--omx-color-brand-gradient` | `linear-gradient(135deg, #f23064, #ff6b1a)` | `linear-gradient(135deg, #e11d48, #ea580c)` | Order execution commitment buttons | `4.9:1` (AA) |
| `--omx-color-sandbox-demo` | `#8b5cf6` | `#7c3aed` | Virtual sandbox mode badges, practice receipts | `5.1:1` (AA) |
| `--omx-color-sandbox-demo-bg`| `rgba(139, 92, 246, 0.12)`| `rgba(124, 58, 237, 0.10)`| Background fill for demo sandbox pills | N/A |
| `--omx-color-real-capital` | `#10b981` | `#059669` | Consequential real money balance badges | `6.2:1` (AA) |
| `--omx-color-status-warning` | `#f59e0b` | `#d97706` | Closing soon markets, unlinked wallet alerts | `6.8:1` (AA) |
| `--omx-color-status-error` | `#ef4444` | `#dc2626` | Input validation errors, insufficient balance | `5.9:1` (AA) |
| `--omx-color-status-info` | `#38bdf8` | `#0284c7` | Oracle resolution notes, educational tooltips | `6.4:1` (AA) |

---

## 2. Typography Tokens & Dual-Font Discipline

OmniMarketX enforces strict separation of concerns between its two typography engines:
- **`Sora`**: Headlines, propositions, narrative commentary, labels, buttons, navigation links.
- **`Geist Mono`**: Probabilities, share prices, currencies, payouts, timestamps, table cells.

```
                              TYPOGRAPHIC SCALE (6 TIERS)
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TIER 1: DISPLAY    32px / 1.2 / Bold 700 / -0.02em      (Sora)    Hero Headline        │
│ TIER 2: HEADLINE   20px / 1.3 / Bold 700 / -0.01em      (Sora)    Market Question      │
│ TIER 3: SUBHEAD    16px / 1.4 / SemiBold 600 / 0em      (Sora)    Section Header       │
│ TIER 4: BODY       14px / 1.5 / Regular 400 / 0em       (Sora)    Descriptions         │
│ TIER 5: DATA LARGE 18px / 1.2 / Bold 700 / 0em          (Geist)   Probability "65%"    │
│ TIER 6: DATA BODY  13px / 1.4 / Medium 500 / 0em        (Geist)   Prices "65¢", Payout │
│ CAPTION            12px / 1.4 / Medium 500 / +0.01em    (Sora)    Oracle, Meta, Dates  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Master Typography Tokens Table

| Token Name | Font Family | Size (px / rem) | Line Height | Weight | Letter Spacing | Concrete Usage Scope |
|:---|:---|:---:|:---:|:---:|:---:|:---|
| `--omx-font-display` | `'Sora', sans-serif` | `32px` / `2.0rem` | `1.2` (`38px`) | `700` (Bold) | `-0.02em` | Homepage Hero, Primary Landing Callouts |
| `--omx-font-headline` | `'Sora', sans-serif` | `20px` / `1.25rem`| `1.3` (`26px`) | `700` (Bold) | `-0.01em` | Market Detail Question, Card Headlines |
| `--omx-font-subhead` | `'Sora', sans-serif` | `16px` / `1.0rem` | `1.4` (`22px`) | `600` (SemiBold)| `0em` | Section Titles, Market Card Titles |
| `--omx-font-body` | `'Sora', sans-serif` | `14px` / `0.875rem`| `1.5` (`21px`)| `400` (Regular) | `0em` | Explanations, Resolution Rules, Comments |
| `--omx-font-body-medium`| `'Sora', sans-serif`| `14px` / `0.875rem`| `1.5` (`21px`)| `500` (Medium) | `0em` | Form labels, Tab items, Primary buttons |
| `--omx-font-data-large`| `'Geist Mono', monospace`| `18px` / `1.125rem`| `1.2` (`22px`)| `700` (Bold)| `0em` | Probability calls (`65%`), Balances (`$10k`) |
| `--omx-font-data-body` | `'Geist Mono', monospace`| `13px` / `0.8125rem`| `1.4` (`18px`)| `500` (Medium)| `0em` | Contract price (`65¢`), Payouts (`$38.46`) |
| `--omx-font-caption` | `'Sora', sans-serif` | `12px` / `0.75rem` | `1.4` (`17px`) | `500` (Medium) | `+0.01em` | Timestamps, Oracle citations, Status tags |

*Accessibility Rule*: Sub-12px typography (`10px`, `11px`) is completely prohibited across all Web-2.0 surfaces.

---

## 3. Spatial System, Radii & Layout Tokens

All layout, margins, padding, and gaps are strictly anchored to an **8pt modular spatial scale** (with a 4px sub-grid for compact controls).

### Layout Tokens
- **`--omx-layout-max-width`**: `1280px` (Max desktop container width for optimal readability).
- **`--omx-layout-gutter-desktop`**: `32px` (`px-8` on screen $\ge 1024px$).
- **`--omx-layout-gutter-mobile`**: `16px` (`px-4` on screen $< 768px$).
- **`--omx-layout-sidebar-width`**: `240px` (Desktop navigation and category drawer).
- **`--omx-layout-rail-width`**: `360px` (Desktop order slip and right context rail).
- **`--omx-layout-grid-columns-desktop`**: `12` columns (`gap-6` / `24px`).
- **`--omx-layout-grid-columns-tablet`**: `8` columns (`gap-4` / `16px`).
- **`--omx-layout-grid-columns-mobile`**: `4` columns (`gap-3` / `12px`).

### Spatial Tokens Scale Table

| Token Variable | Value (px / rem) | Practical Component Usage |
|:---|:---:|:---|
| `--omx-space-1` | `4px` / `0.25rem` | Badge padding, icon gap, sub-component alignment |
| `--omx-space-2` | `8px` / `0.50rem` | Button icon gaps, input interior padding, pill spacing |
| `--omx-space-3` | `12px` / `0.75rem`| Quick-chip gaps, compact card padding, list dividers |
| `--omx-space-4` | `16px` / `1.00rem`| Standard card padding, modal interior gaps, mobile gutters |
| `--omx-space-6` | `24px` / `1.50rem`| Desktop grid gaps, major component separation |
| `--omx-space-8` | `32px` / `2.00rem`| Section padding, desktop page gutters |
| `--omx-space-12`| `48px` / `3.00rem`| Large landing page section dividers |

### Radii Tokens Table

| Token Variable | Value | Usage Scope |
|:---|:---:|:---|
| `--omx-radius-sm` | `4px` | Sub-chips, status dots, sparkline cursors |
| `--omx-radius-md` | `8px` | Buttons, inputs, dropdown menus, table headers |
| `--omx-radius-lg` | `12px` | Standard market cards, order slip interior panels |
| `--omx-radius-xl` | `16px` | Structural containers, desktop order slip, modals |
| `--omx-radius-full`| `9999px`| Outcome pills, category badges, user avatar circles |

---

## 4. Elevation, Border & Shadow Tokens

In accordance with Section 4 of `research/m9-visual-direction.md`, depth is created through **hairline border contrast and surface elevation**, not muddy drop-shadows.

```
LEVEL 0 (Canvas)   --omx-color-bg-base          (#090426)
LEVEL 1 (Cards)    --omx-color-surface-card     (#110a36) + --omx-border-default
LEVEL 2 (Slips)    --omx-color-surface-card     (#110a36) + --omx-border-strong + --omx-shadow-card
LEVEL 3 (Modals)   --omx-color-surface-elevated (#1b1150) + --omx-border-strong + --omx-shadow-modal
```

### Elevation & Shadow Tokens Table

| Token Variable | Specification | Purpose / Usage |
|:---|:---|:---|
| `--omx-shadow-none` | `none` | Standard cards and stationary containers |
| `--omx-shadow-card` | `0 4px 20px -2px rgba(0, 0, 0, 0.45)` | Sticky Order Slip, hover-elevated market cards |
| `--omx-shadow-modal`| `0 20px 40px -4px rgba(0, 0, 0, 0.70)` | Centered dialogs, mobile slide-up sheets |
| `--omx-shadow-glow-yes`| `0 0 20px rgba(16, 185, 129, 0.25)` | Active YES outcome pill selection |
| `--omx-shadow-glow-no` | `0 0 20px rgba(244, 63, 94, 0.25)` | Active NO outcome pill selection |
| `--omx-shadow-glow-brand`| `0 0 25px rgba(242, 48, 100, 0.35)`| Primary order execution commitment button |

---

## 5. Control Heights & Touch Target Tokens

To satisfy Apple HIG and WCAG 2.1 touch criteria:

| Token Variable | Value | Purpose / Usage | Touch Area |
|:---|:---:|:---|:---:|
| `--omx-control-height-sm` | `32px` | Compact category filter pills, table action buttons | `32px` desktop / `44px` mobile |
| `--omx-control-height-md` | `40px` | Standard text inputs, secondary buttons, select boxes | `40px` desktop / `44px` mobile |
| `--omx-control-height-lg` | `48px` | Primary order execution CTA, mobile bottom tabs | `48px` universal |
| `--omx-touch-target-min` | `44px` | Minimum bounding box for any interactive element | `44px x 44px` strict minimum |

---

## 6. Motion & Animation Tokens

```
                                MOTION SYSTEM
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ DURATION INSTANT:   --omx-motion-instant   80ms   (Button clicks, active state)        │
│ DURATION FAST:      --omx-motion-fast      150ms  (Hover fills, tooltip fades)         │
│ DURATION NORMAL:    --omx-motion-normal    220ms  (Drawer slide, modal entry)          │
│ DURATION BOUNCE:    --omx-motion-celebrate 300ms  (Celebration checkmark receipt)      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ EASING STANDARD:    --omx-ease-standard    cubic-bezier(0.16, 1, 0.3, 1)  (Natural)   │
│ EASING DECEL:       --omx-ease-decel       cubic-bezier(0.0, 0.0, 0.2, 1) (Entrances) │
│ EASING ACCEL:       --omx-ease-accel       cubic-bezier(0.4, 0.0, 1, 1)   (Exits)     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Zero Parallax or Looping Gradients**: Ambient animations that loop endlessly are strictly forbidden to conserve battery and eliminate visual distraction.

---

*Document established in `research/m10-design-tokens.md`.*
