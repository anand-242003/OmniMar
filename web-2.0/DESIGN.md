---
name: OmniMarketX
description: The Credible Forecaster's Arena — Binary Probability Engine
colors:
  primary: "#f23064"
  neutral-bg: "#f8fafc"
  neutral-card: "#ffffff"
  neutral-text: "#0f172a"
  dark-bg: "#0a0e17"
  dark-card: "#111622"
  dark-text: "#f8fafc"
  yes: "#059669"
  no: "#e11d48"
  sandbox: "#4f46e5"
typography:
  display:
    fontFamily: "Sora, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Sora, system-ui, -apple-system, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Sora, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Sora, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#e11d48"
  card-market:
    backgroundColor: "{colors.neutral-card}"
    rounded: "{rounded.xl}"
    padding: "16px"
---

# Design System: OmniMarketX

## Overview

**Creative North Star: "The Credible Forecaster's Arena"**

OmniMarketX combines prediction market rigor with premium fintech craft and social vitality. It rejects casino gamification, neon glows, and gradient fluff in favor of institutional clarity, mathematical transparency, and high-precision financial tooling.

Every screen communicates probability and financial risk with unmistakable truth: winning contracts settle at $1.00, losing contracts settle at $0.00, and prices directly reflect market consensus implied probability.

**Key Characteristics:**
- Two-font typographic discipline: Sora for natural human language, Geist Mono for numbers, odds, and financial figures.
- 80/15/5 color discipline: 80% calm canvas, 15% clean structure, 5% high-contrast semantic accents.
- Strict role separation: YES profit green is never reused for real-money indicators or brand CTAs.
- Full risk disclosure: dollar-first order sizing with explicit worst-case ($0.00) and best-case ($1.00) calculations before commitment.

## Colors

The palette is engineered around high semantic differentiation, eliminating ambiguity between outcomes, capital levels, and interface actions.

### Primary
- **Brand Crimson Accent** (`#f23064` / hover `#e11d48`): Primary identity anchor and high-priority action triggers. Strictly prohibited from indicating loss or negative state.

### Neutral
- **Light Canvas Background** (`#f8fafc`): Crisp, glare-free daylight canvas.
- **Light Card Surface** (`#ffffff`): High-clarity elevated card surface.
- **Dark Obsidian Canvas** (`#0a0e17`): Deep neutral slate eliminating purple/crypto fatigue.
- **Dark Card Surface** (`#111622`): Elevated dark card surface with precise hairline borders.
- **Primary Ink** (`#0f172a` light / `#f8fafc` dark): Maximum readability body and heading text.
- **Secondary Ink** (`#475569` light / `#94a3b8` dark): High-contrast contextual metadata.
- **Muted Ink** (`#64748b`): Distinct tertiary labels, footnotes, and timestamps.

### Semantic Outcomes
- **YES Consensus** (`#059669` light / `#10b981` dark): Solid emerald outcome indicator.
- **NO Consensus** (`#e11d48` light / `#f43f5e` dark): Disciplined rose outcome indicator.
- **Demo Sandbox** (`#4f46e5` light / `#6366f1` dark): Distinct indigo role cleanly separating practice funds from real capital.

### Named Rules
**The Color Role Invariance Rule.** No two semantically different roles may share a hue band. Profit green, real capital, brand CTA, and loss red are strictly non-overlapping.

**The 80/15/5 Rule.** Screens must devote 80% of visual area to canvas neutrals, 15% to structural cards and borders, and no more than 5% to high-chroma semantic accents.

## Typography

**Display & UI Font:** Sora (with system fallbacks)  
**Numerical & Financial Font:** Geist Mono (with monospace fallbacks)

**Character:** Sora brings human editorial confidence and architectural authority; Geist Mono delivers uncompromised mathematical rigor and tabular number alignment.

### Hierarchy
- **Display** (ExtraBold 800, clamp(2rem, 5vw, 3.5rem), line-height 1.12): High-confidence value propositions on hero and feature banners.
- **Headline** (Bold 700, 1.75rem / 28px, line-height 1.2): Section titles, market proposition headlines.
- **Title** (SemiBold 600, 1.125rem / 18px, line-height 1.3): Card titles, modal headers, order slip headings.
- **Body** (Regular 400 & Medium 500, 0.875rem / 14px, line-height 1.5): Analytical commentary, resolution source criteria, debate copy. Max line length 65ch.
- **Label / Metric** (SemiBold 600, 0.75rem / 12px, Geist Mono): Cents pricing (e.g. `72¢`), probabilities (`72%`), contracts held, and dollar amounts.

### Named Rules
**The 12px Floor Rule.** Zero sub-12px micro-text exists anywhere on any surface for any reason.  
**The Tabular Number Rule.** All numerical quantities, balances, probabilities, and payouts must render in Geist Mono with tabular numeral alignment.

## Layout

Layouts are structured upon an 8pt base grid with a 4px sub-grid for compact trading controls.
- **Desktop (1440px+):** 12-column asymmetric trading layout prioritizing proposition analysis on the left and sticky order execution on the right.
- **Tablet (768px):** Single-column stacked research flow with persistent top overview cards.
- **Mobile (375px–430px):** Clean single-column catalog with bottom slide-up drawer trading desk and zero double-bottom navigation chrome. Minimum touch target is 44×44px.

## Elevation & Depth

Surfaces rely primarily on tonal layering and crisp hairline borders rather than ambient blur shadows.
- Flat-by-default rest states with 1px hairline borders (`#e2e8f0` light / `rgba(255, 255, 255, 0.09)` dark).
- Elevated interactive cards utilize subtle micro-shadows (`0 4px 20px -2px rgba(0, 0, 0, 0.08)` light / `0 4px 20px -2px rgba(0, 0, 0, 0.45)` dark).
- Modals and drawers feature deep backdrop scrims (`rgba(10, 14, 23, 0.75)` with `backdrop-blur-sm`).

### Named Rules
**The Border-Before-Shadow Rule.** Structural card boundaries must always be defined by a visible hairline border; shadows serve only to indicate elevation during hover or modal layering.

## Shapes

- **Base Radius:** 8px (`omx-md`) for standard badges, inputs, and segmented controls.
- **Card Radius:** 16px (`omx-xl`) for all primary content containers, market cards, and guild panels.
- **Pill Radius:** 9999px for status badges and categorical topic chips.

## Components

### Buttons
- **Shape:** 12px border radius (`rounded-xl`), 48px standard touch height.
- **Primary:** Brand crimson (`#f23064`) with bold white Sora text. Hover transitions to `#e11d48`.
- **Secondary / Sandbox:** Neutral card surface with hairline border and indigo demo glyph.
- **YES Outcome Button:** Solid emerald background (`#059669` light / `#10b981` dark) with bold contrast text.
- **NO Outcome Button:** Disciplined rose background (`#e11d48` light / `#f43f5e` dark) with bold contrast text.

### Cards / Containers
- **Corner Style:** 16px radius (`rounded-2xl`).
- **Background:** Crisp card surface (`#ffffff` light / `#111622` dark).
- **Border:** 1px hairline border (`#e2e8f0` light / `rgba(255, 255, 255, 0.09)` dark).
- **Internal Padding:** 16px to 24px.

### Inputs / Order Sizing Fields
- **Style:** 12px radius, monospace dollar entry (`$25.00`), prominent currency symbol, clear quick-select presets (`$10`, `$25`, `$50`, `Max`).
- **Focus:** Sharp border shift to primary brand or outcome accent with zero blurry glow rings.

## Do's and Don'ts

### Do:
- **Do** show both payout if won ($1.00/share) and payout if lost ($0.00) on every order slip before trade confirmation.
- **Do** enforce directional glyphs (`▲ YES` / `▼ NO`) alongside colors to guarantee color-blind accessibility.
- **Do** state explicit resolution sources (e.g. "BLS Official Release", "Rockstar Press Release") on every market card.
- **Do** calculate exact Worst Case and Best Case exposure on the portfolio screen.

### Don't:
- **Don't** use neon glows, party emojis, gambling confetti, or flashing checkmarks.
- **Don't** mix the terms "Demo" and "Virtual" on the same surface; standardize strictly on "Demo" and "Sandbox".
- **Don't** use purple or violet atmospheric backgrounds in dark mode.
- **Don't** permit horizontal overflow on 375px mobile viewports.
