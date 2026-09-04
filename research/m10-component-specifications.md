# Milestone 10 — Web-2.0 Core Component Specifications
## OmniMarketX Component Architecture & Interaction Specifications

**Target**: `web-2.0` Design System Component Library  
**Baseline**: `research/m10-design-tokens.md`, `research/m9-visual-direction.md`, `research/m8-prioritization.md`  
**Status**: Authoritative Component Specification  
**Rules**: Specification and interaction architecture only. No application code changes.

---

## 1. Master Component Taxonomy Index

This document establishes the exact anatomy, states, and accessibility standards for all **28 Core Components** of OmniMarketX:

1. [Button](#1-button)
2. [Icon Button](#2-icon-button)
3. [Input](#3-input)
4. [Select](#4-select)
5. [Segmented Control](#5-segmented-control)
6. [Tabs](#6-tabs)
7. [Pill](#7-pill)
8. [Badge](#8-badge)
9. [Tooltip](#9-tooltip)
10. [Toast](#10-toast)
11. [Modal](#11-modal)
12. [Drawer](#12-drawer)
13. [Card](#13-card)
14. [Avatar](#14-avatar)
15. [Dropdown](#15-dropdown)
16. [Search Input](#16-search-input)
17. [Navigation Item](#17-navigation-item)
18. [Bottom Navigation Bar](#18-bottom-navigation-bar)
19. [Data Table](#19-data-table)
20. [Empty State](#20-empty-state)
21. [Loading State](#21-loading-state)
22. [Error State](#22-error-state)
23. [Skeleton Loader](#23-skeleton-loader)
24. [Price & Probability Chart](#24-price--probability-chart)
25. [Market Card (Definitive)](#25-market-card-definitive-web-20)
26. [Social Prediction Widget](#26-social-prediction-widget)
27. [Trade Order Slip (Definitive)](#27-trade-order-slip-definitive-web-20)
28. [Trade Confirmation Receipt](#28-trade-confirmation-receipt)

---

### 1. Button
- **Purpose**: Primary interactive trigger for actions, commitments, and navigation.
- **Anatomy**: Container + Optional Left Icon (16px) + Text Label (`Sora` Medium 14px) + Optional Right Arrow.
- **Variants**:
  - `Primary Action`: Gradient background (`#f23064` to `#ff6b1a`), pure white text, glowing focus ring.
  - `Secondary Action`: Bordered `#1b1150` with subtle transparent fill, hover `#241766`.
  - `Ghost`: Completely transparent, hover `rgba(242,48,100,0.08)`.
  - `Outcome YES`: Emerald background tint (`rgba(16,185,129,0.12)`), emerald text `#10b981`, hover emerald fill.
  - `Outcome NO`: Rose background tint (`rgba(244,63,94,0.12)`), rose text `#f43f5e`, hover rose fill.
- **States**: Default, Hover, Active (`scale(0.98)`), Focused (2px glowing ring), Disabled (opacity 0.40, cursor not-allowed).
- **Sizing**: `sm` (32px), `md` (40px), `lg` (48px).
- **Accessibility**: Minimum touch area `44px x 44px` on mobile; explicit `aria-label` when text is omitted.

### 2. Icon Button
- **Purpose**: Compact single-icon actions (Favorites star, Share link, Close modal, Search dismiss).
- **Anatomy**: Circular or rounded-md container + Centered Lucide Icon (1.75px stroke).
- **Variants**: Ghost, Bordered, Surface.
- **Sizing**: 36px x 36px (Desktop) / 44px x 44px (Mobile touch target).
- **States**: Default, Hover (`bg-surface-hover`), Active (`scale(0.95)`), Focus (2px ring).
- **Accessibility**: Mandatory `aria-label="Action description"` required on every instance.

### 3. Input
- **Purpose**: Text and numerical data entry.
- **Anatomy**: Label (`Sora` 12px Medium) + Input Field Container + Leading Prefix/Icon + Value Text (`Geist Mono` 14px) + Trailing Currency Unit (`USDC`).
- **Variants**: Standard Text, Dollar Currency Input, Numeric Shares Input, Search Input.
- **States**: Default (`border-subtle`), Hover (`border-default`), Focused (`border-brand-primary` + ring), Error (`border-status-error` + helper text), Disabled.
- **Interaction**: Auto-formats numbers with commas (e.g. `25.00`); prevents non-numeric input on currency fields.
- **Accessibility**: Associated `<label>` via `htmlFor`; `aria-invalid="true"` when error state is active.

### 4. Select
- **Purpose**: Selection of single option from 4+ choices (e.g. Category filters, Sort orders).
- **Anatomy**: Trigger Button (Label + Value + ChevronDown 16px) + Floating Popover Listbox.
- **States**: Default, Hover, Open, Disabled.
- **Accessibility**: Obey WAI-ARIA Listbox design pattern; full keyboard navigation (Up/Down/Enter/Escape).

### 5. Segmented Control
- **Purpose**: Mutually exclusive mode switching (e.g. `Real` vs `Demo`, `Buy` vs `Sell`, `Active` vs `Settled`).
- **Anatomy**: Pill container (`#0f0828`) + Animated sliding indicator pill + Option Labels (`Sora` 13px SemiBold).
- **Variants**:
  - `Financial Switch`: Real (Emerald dot) vs Demo (Violet gamepad dot).
  - `Trading Switch`: Buy (Green tint) vs Sell (Rose tint).
- **States**: Selected, Unselected, Hover.
- **Motion**: Indicator pill slides horizontally using `cubic-bezier(0.16, 1, 0.3, 1)` in 150ms.

### 6. Tabs
- **Purpose**: Surface view switching within the same page context (e.g. `/social`: `For You`, `Top`, `Latest`).
- **Anatomy**: Horizontal row + Text labels + Active bottom indicator bar (`#f23064`).
- **States**: Active (Text `#ffffff`, bottom gradient bar visible), Inactive (Text `#94a3b8`, hover `#ffffff`).
- **Accessibility**: Role `tablist`, `tab`, `tabpanel`; keyboard arrow navigation.

### 7. Pill
- **Purpose**: Quick filters and selection chips (e.g. `$10`, `$25`, `$50`, `All`, `Crypto`).
- **Anatomy**: Fully rounded capsule (`rounded-full`) + Optional Leading Emoji/Icon + Label Text.
- **Variants**: Interactive (Filter chip), Display (Status pill), Quick-Amount (Preset chips).
- **States**: Unselected, Selected (Border glow + bold text), Hover.
- **Sizing**: Height 32px; padding `px-3.5`.

### 8. Badge
- **Purpose**: Compact system status marker.
- **Anatomy**: Micro capsule (`rounded-md`, height 20px) + Leading Dot (6px) + Label (`12px` SemiBold).
- **Variants**:
  - `BULLISH`: Emerald `#10b981` dot, dark green background.
  - `BEARISH`: Rose `#f43f5e` dot, dark red background.
  - `DEMO`: Violet `#8b5cf6` dot, violet background.
  - `RESOLVED`: Slate `#94a3b8` dot, monochrome background.
- **Accessibility**: Non-interactive; accessible text description for screen readers.

### 9. Tooltip
- **Purpose**: Non-critical explanatory micro-copy (e.g. explaining "Average Price" or "Oracle Source").
- **Anatomy**: Dark elevated container (`#1b1150`, border `rgba(255,255,255,0.20)`) + Arrow pointer + Text (`Sora` 12px Regular).
- **Behavior**: Appears on 200ms hover delay or keyboard focus; dismisses immediately on mouse leave or `Escape`.

### 10. Toast
- **Purpose**: Ephemeral transactional feedback (e.g. *"Order filled"*, *"Link copied"*).
- **Anatomy**: Pill card (`#1b1150`) + Status Icon + Title + Action Link (`[View in Portfolio]`) + Close button.
- **Timing**: Auto-dismisses after 4500ms; pauses timer on hover.
- **Position**: Top-right on desktop (`top: 24px; right: 24px`); top-center on mobile (`top: 16px`).

### 11. Modal
- **Purpose**: High-focus interruptive workflows (Authentication, Group Creation, Cash-out Confirmation).
- **Anatomy**: Fixed Backdrop (`bg-black/75 backdrop-blur-sm`) + Centered Card (`max-w-md`, `#110a36`, `rounded-xl`) + Header (Title + Close Icon) + Body + Footer Actions.
- **Behavior**: Traps focus inside dialog; clicking backdrop or pressing `Escape` closes modal.
- **Motion**: Scale entry from `0.95` to `1.0` with `200ms` spring ease.

### 12. Drawer (Mobile Sheet)
- **Purpose**: Secondary mobile panels (Filter drawers, Search sheets).
- **Anatomy**: Backdrop + Bottom-anchored card + Top drag handle pill (36px x 4px) + Interior content.
- **Behavior**: Draggable swipe-down to dismiss; prevents background document scrolling when open.

### 13. Card
- **Purpose**: Standard container for grouped content.
- **Anatomy**: `#110a36` background + `1px` border `rgba(255,255,255,0.12)` + `12px` rounded corners + `16px` padding.
- **Hover**: Subtle border illumination (`rgba(255,255,255,0.20)`) and `-1px` vertical lift on interactive cards.

### 14. Avatar
- **Purpose**: User and forecaster identity representation.
- **Anatomy**: Circular container (`rounded-full`) + Real Image OR 2-letter Initials (`Geist Mono` 13px Bold).
- **Sizing**: `sm` (24px), `md` (36px), `lg` (48px), `xl` (64px).
- **Variants**: Standard User, Verified Forecaster (Gold ring), System Bot (Muted ring).

### 15. Dropdown
- **Purpose**: Contextual action menus (User profile menu, Post options, Table row actions).
- **Anatomy**: Elevated card (`#1b1150`) + Action Items list (Icon + Label + Keyboard shortcut).
- **States**: Item Hover (`bg-surface-hover`), Active.

### 16. Search Input
- **Purpose**: Global platform query matching markets, forecasters, and topics.
- **Anatomy**: Input box + Search icon (16px) + Shortcut badge (`/`) + Floating categorized autocomplete list.
- **Behavior**: Pressing `/` anywhere on the page focuses search; typing 2+ chars opens autocomplete overlay.

### 17. Navigation Item
- **Purpose**: Global desktop routing.
- **Anatomy**: Text link (`Sora` 14px Medium) + Optional Badge + Bottom active indicator bar.
- **States**:
  - `Active`: Text `#ffffff` Bold + glowing pink bottom indicator bar (`#f23064`).
  - `Inactive`: Text `#94a3b8` Medium; hover `#ffffff`.

### 18. Bottom Navigation Bar
- **Purpose**: Persistent global mobile navigation (375px viewport).
- **Anatomy**: Fixed bottom bar (Height 60px, `#090426/95 backdrop-blur-md`) + 5 equidistant tab slots.
- **Tabs**: `Markets`, `Trending`, `Social`, `Groups`, `Portfolio`.
- **States**: Active tab glows pink with colored icon; inactive tabs use muted slate icons.
- **Safe Area**: Adds `env(safe-area-inset-bottom)` padding for modern iOS home indicator bars.

### 19. Data Table
- **Purpose**: Tabular financial auditing on `/portfolio`, `/activity`, and `/leaderboard`.
- **Anatomy**: Table Header (`Sora` 12px Medium `#64748b` uppercase) + Alternating Rows + Cells (`Geist Mono` 13px).
- **Behavior**: Interactive hover row highlight (`rgba(242,48,100,0.04)`); mobile viewport stacks into cards.

### 20. Empty State
- **Purpose**: Communicating clean cold-start conditions honestly without confusing users.
- **Anatomy**: Centered layout + Contextual Illustration/Icon + Headline (*"No active positions yet"*) + Explanation + Primary Action Button (*"[Explore Trending Markets]"*).
- **Evidence-Integrity Rule**: Never show an empty table beneath a headline claiming high activity.

### 21. Loading State
- **Purpose**: Providing non-jarring feedback during data fetching.
- **Anatomy**: Layout-matching skeleton pulse blocks (`bg-white/05 animate-pulse`).
- **Rule**: Never use full-screen blocking spinners.

### 22. Error State
- **Purpose**: Explaining system failures or validation constraints.
- **Anatomy**: Alert box (Red border `#ef4444`, red background tint) + AlertCircle icon + Plain-English explanation + Recovery Action button.

### 23. Skeleton Loader
- **Purpose**: Structural wireframe placeholder while API payloads load.
- **Anatomy**: Muted grey rounded blocks matching exact typography and button sizes of the target component.

### 24. Price & Probability Chart
- **Purpose**: Visualizing historical consensus changes over time.
- **Anatomy**: Recharts SVG canvas + Responsive Container + Historical Range Pills (`1D`, `1W`, `1M`, `ALL`) + Y-Axis (Explicit `¢` and `%` tick labels) + Magnetic Snapping Tooltip Cursor.
- **Behavior**: Moving cursor over chart locks vertical hairline, displaying exact historical probability and date.

---

## 25. Market Card (Definitive Web-2.0 Specification)

The definitive card is the core discovery atom of OmniMarketX. It must be scannable in **1.5 seconds**.

```
┌─────────────────────────────────────────────────────────────┐
│ 🎬 Entertainment · Closes Nov 8, 2026           ★ Favorite  │ ◄── Meta Row
├─────────────────────────────────────────────────────────────┤
│ Will GTA VI officially release before December 2026?        │ ◄── Market Question
├─────────────────────────────────────────────────────────────┤
│ [██████████████████████████████░░░░░░░░░░░░░]               │ ◄── Probability Bar
│ 65% YES                                     35% NO          │
├─────────────────────────────────────────────────────────────┤
│ [ Buy YES 65¢ ]                     [ Buy NO 35¢ ]          │ ◄── Action Pills
├─────────────────────────────────────────────────────────────┤
│ Vol: $48.2K · 1.2K Predictors       Oracle: Rockstar Games  │ ◄── Settlement Proof
└─────────────────────────────────────────────────────────────┘
```

### Anatomy Breakdown
1. **Context & Metadata Row**:
   - Left: Category Pill with semantic icon (`🎬 Entertainment`) + Dot + Closing Date (`Closes Nov 8, 2026`).
   - Right: Quick Favorite Star icon button.
2. **The Market Question**:
   - 2-line clamped title in `Sora` 16px SemiBold (`#ffffff`).
3. **Dual Probability Bar**:
   - Dual-color visual progress bar (Height 6px, `rounded-full`): Emerald for YES (65%), Rose for NO (35%).
   - Below bar: `65% YES` (`Geist Mono` 13px Bold `#10b981`) and `35% NO` (`Geist Mono` 13px Bold `#f43f5e`).
4. **Symmetrical Quick Action Pills**:
   - Two equal-width buttons: `[ Buy YES 65¢ ]` (Green outline) and `[ Buy NO 35¢ ]` (Red outline).
   - Clicking either button directly opens the order slip staged to that outcome.
5. **Settlement Proof & Liquidity Row**:
   - Left: Verified 24h Volume (`$48.2K`) + Active Predictor Count (`1.2K`).
   - Right: Official Resolution Source / Oracle (`Oracle: Rockstar Games`).

### State Variants
- **Default State**: Sharp card border (`rgba(255,255,255,0.12)`).
- **Hover State**: Border brightens to `rgba(255,255,255,0.24)`, subtle `-2px` vertical lift, glow under YES/NO buttons.
- **Active / Staged State**: Glowing 2px border matching selected outcome (Green for YES, Red for NO).
- **Low-Activity State**: Replaces volume with *"New Market — Be the first to predict"*.
- **Resolved State**: Card opacity dims to `0.75`, YES/NO buttons replaced with a bold stamp: `RESOLVED: YES ($1.00 Payout)`.
- **Loading State**: Skeleton wireframe with pulsing probability bar.

---

## 26. Social Prediction Widget

- **Purpose**: Embedded interactive market card attached to social commentary posts.
- **Anatomy**: Compact market card interior + Author's Stated Conviction Badge (`@CryptoWhale predicted YES @ 62¢`) + Direct In-Feed Action Buttons: `[Agree YES 65¢]` and `[Bet NO 35¢]`.
- **Behavior**: Clicking `[Agree]` opens an inline micro-trade slip directly below the post without leaving the social stream.

---

## 27. Trade Order Slip (Definitive Web-2.0 Specification)

The Trade Order Slip is the single most critical conversion engine in the application.

```
┌─────────────────────────────────────────────────────────────┐
│ 🎮 PRACTICE DEMO SANDBOX                  [Switch to Real]  │ ◄── 1. Financial Mode
├─────────────────────────────────────────────────────────────┤
│ Select Outcome:                                             │
│ ┌─────────────────────────────┐ ┌─────────────────────────┐ │
│ │  ✓ YES 65¢ (65% chance)     │ │    NO 35¢ (35% chance)  │ │ ◄── 2. Outcome Selection
│ └─────────────────────────────┘ └─────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Your Stake:                                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ $ 25.00                                            USDC │ │ ◄── 3. Dollar-First Input
│ └─────────────────────────────────────────────────────────┘ │
│ (Buys 38.4 shares @ 65¢ per share)   [ $10 ] [ $25 ] [ $50 ]│
├─────────────────────────────────────────────────────────────┤
│ Potential Return:                                           │
│ • If YES wins:  $38.46 Total Payout (+$13.46 Net Profit)    │ ◄── 4. Math Transparency
│ • If NO wins:   $0.00 Payout (-$25.00 Stake)                │
├─────────────────────────────────────────────────────────────┤
│ [✓] Share prediction to community feed                      │ ◄── 5. Social Consent
├─────────────────────────────────────────────────────────────┤
│ [            Confirm YES Prediction ($25.00)              ] │ ◄── 6. Commitment CTA
└─────────────────────────────────────────────────────────────┘
```

### Exact Sizing & Spacing
- Container: Desktop width `360px`, `rounded-xl`, `#110a36` background, `border rgba(255,255,255,0.16)`.
- Interior Padding: `20px` (`p-5`).
- Spacing between sections: `16px` (`space-y-4`).

### Section-by-Section Functional Specification
1. **Financial Mode Badge**:
   - Demo State: Violet badge reading `🎮 PRACTICE DEMO SANDBOX` with secondary link `[Switch to Real]`.
   - Real State: Emerald badge reading `💎 REAL CAPITAL (USDC)` with secondary link `[Switch to Demo]`.
2. **Outcome Selection Grid**:
   - Two large buttons side-by-side (Height 48px).
   - Selected state: Solid colored fill + glowing border (Green for YES, Red for NO).
   - Label: `YES 65¢ (65% chance)` in `Sora` 14px SemiBold.
3. **Dollar-First Stake Input**:
   - Large numeric field defaulted to currency ($).
   - Below field: Automated contract calculation in `Geist Mono` 12px: `(Buys 38.4 shares @ 65¢)`.
   - Quick-chips row: `[$10]`, `[$25]`, `[$50]`, `[$100]`, `[MAX]`.
4. **Mathematical Payout Breakdown**:
   - Clean 2-row summary table:
     - Winning Outcome: **`$38.46 Total Payout`** with profit highlighted in emerald: `(+$13.46 Net Profit)`.
     - Losing Outcome: **`$0.00 Payout`** with risk highlighted: `(-$25.00 Stake)`.
5. **Social Prediction Consent Checkbox**:
   - Native styled checkbox: `[✓] Share prediction to community feed`.
6. **Primary Order Execution CTA**:
   - Full-width button (Height 48px) with fiery brand gradient.
   - Dynamic label: **`Confirm YES Prediction ($25.00)`**.

---

## 28. Trade Confirmation Receipt

When the user clicks `Confirm Prediction`, the order slip does not silently reset; it transitions into this celebratory, closed-loop receipt:

```
┌─────────────────────────────────────────────────────────────┐
│                       🎉 PREDICTION PLACED!                 │
│                                                             │
│ Market:  Will GTA VI release before December 2026?          │
│ Outcome: YES · 38.4 Shares @ 65¢                            │
│ Stake:   $25.00 (Demo Virtual Balance)                      │
│ Payout:  $38.46 on Resolution (+53.8% ROI)                  │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Add a thought: "Rockstar never misses a holiday window" │ │ ◄── Optional Share
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [ View in Portfolio ]               [ Explore More Markets ]│
└─────────────────────────────────────────────────────────────┘
```

- **Restrained Celebration**: Animated green checkmark with a subtle 300ms spring bounce. Zero casino sound effects, zero flashing coin fountains.
- **Immediate Portfolio Routing**: Direct button takes user to their active position in `/portfolio`.

---

*Document established in `research/m10-component-specifications.md`.*
