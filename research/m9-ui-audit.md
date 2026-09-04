# Milestone 9 — Visual & UI Forensic Audit for OmniMarketX Web-2.0
## Forensic Audit of Reconstructed Frontend Baseline (`web-1.0-complete`)

**Target**: `web-2.0` Visual Strategy & UI Architecture  
**Baseline**: `web-1.0` (frozen at tag `web-1.0-complete`)  
**Evidence Sources**: 
- Rendered browser captures across Desktop (1440px), Tablet (768px), and Mobile (375px).
- Dual theme states (Deep Navy Dark `#090426` and Crisp Slate Light `#f4f5f7`).
- Production CSS tokens (`tailwind.config.js`, `index.css`).
- Synthesized strategy from `research/m7-ux-audit.md` and `research/m8-prioritization.md`.
**Constraint**: Audit-only. Zero modifications to `web-1.0` application code.

---

# PART I: Systematic Visual Language Audit

A thorough forensic inspection of the 26 core design dimensions of the rendered application:

| Dimension | Current Implementation (`web-1.0`) | Evidence Class | Usability & Visual Impact | Severity | Direction for `web-2.0` |
|:---|:---|:---|:---|:---:|:---|
| **1. Composition & Grid** | 12-column fluid grid (`max-w-7xl`), 24px gutters. Uneven vertical rhythm between sections. | `OBSERVED` | Hero section feels visually disconnected from the catalog grid; bottom rails float awkwardly. | `P2` | Enforce an 8pt modular spatial scale with balanced section padding (`py-12` standard). |
| **2. Layout Architecture** | 2-column asymmetric split (left scrollable content, right sticky 360px rail). | `OBSERVED` | Excellent for desktop trading desk; highly functional and institutional. | `PRESERVE` | **KEEP EXACTLY**. Standardize this layout across Market Detail and Catalog. |
| **3. Spacing & Margins** | Mix of arbitrary spacing (`gap-3.5`, `space-y-6`, `p-5`). | `OBSERVED` | Inconsistent breathing room across cards creates visual friction and uncalibrated density. | `P2` | Standardize strictly to the 8pt token scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`). |
| **4. Typography Hierarchy** | `Sora` for headlines, `Geist Mono` for numerical values. | `OBSERVED` | Strong foundation, but too many intermediate font sizes (`text-[10px]`, `text-[11px]`, `text-xs`, `text-sm`). | `P1` | Reduce to a disciplined 6-tier type scale; eliminate unreadable sub-12px micro-text. |
| **5. Typographic Weight** | Heavy reliance on `font-bold` across almost every label and heading. | `OBSERVED` | "Everything is bold, so nothing stands out." Destroys visual hierarchy. | `P1` | Introduce `font-medium` (500) for labels and reserve `font-bold` (700) for primary outcomes and values. |
| **6. Color Hierarchy** | Deep navy `#090426`, card `#110a36`, elevated `#1b1150`. Accent `#f23064`. | `OBSERVED` | Dark theme palette is distinctive and premium, but lacks secondary contrast tiers. | `P2` | Evolve dark mode surfaces: elevate cards to `#130c3a` and soften muted text to `#94a3b8`. |
| **7. Semantic Colors** | Emerald YES (`#10b981`), Rose NO (`#f43f5e`), Violet Demo (`#8b5cf6`). | `OBSERVED` | Crystal-clear semantic meaning. Universally accessible and recognized. | `PRESERVE` | **KEEP EXACTLY**. Use as the primary communicative anchor. |
| **8. Borders & Outlines** | `border-omx-border` (`rgba(255,255,255,0.08)` dark / `#e2e8f0` light). | `OBSERVED` | In dark mode, borders are sometimes too faint, causing cards to blend into the canvas. | `P2` | Increase dark mode card border contrast to `rgba(255, 255, 255, 0.12)`. |
| **9. Shadows & Elevation** | Flat borders with minimal box-shadows (`shadow-sm`, `shadow-omx-lg` on modals). | `OBSERVED` | Clean and restrained; avoids muddy, AI-generic heavy drop-shadows. | `PRESERVE` | **KEEP**. Rely on crisp border separation and surface elevation rather than fuzzy shadows. |
| **10. Corner Radii** | Mix of `rounded-omx-md` (8px), `omx-lg` (12px), `omx-xl` (16px), `full`. | `OBSERVED` | Generally disciplined, but occasional `rounded-2xl` makes dense trading slips look bubbly. | `P2` | Standardize: `8px` for inputs/buttons, `12px` for market cards, `16px` for structural panels. |
| **11. Market Cards** | Compact container with category icon, title, probability, and Quick Buy. | `OBSERVED` | Title is prominent, but probability and prices lack immediate visual prominence. | `P0` | Redesign card anatomy: Question $\to$ Dual Probability Bar $\to$ Quick Action Pills. |
| **12. Buttons & Actions** | Pink/Orange gradient on primary CTAs (`#f23064` to `#ff6b1a`). Flat ghost for secondary. | `OBSERVED` | High-energy, distinctive primary button; secondary ghost buttons sometimes lack focus rings. | `P2` | Retain gradient on primary order buttons; add explicit `2px` focus rings for accessibility. |
| **13. Filter & Category Pills** | Horizontal pills with icons. Active state uses solid white or pink text with border. | `OBSERVED` | Effective in markets, but hero pills on `/home` are non-interactive decoys (`F-05`). | `P1` | Make all pills universally interactive; add subtle glowing active state indicator. |
| **14. Badges & Tags** | Multi-colored pills (`BULLISH`, `BEARISH`, `DEMO`, `NEW`, `RESOLVED`). | `OBSERVED` | High communicative value; sentiment badges provide instant visual shorthand. | `PRESERVE` | **KEEP**. Enforce strict badge taxonomy to prevent badge inflation. |
| **15. Charts (Price History)** | Recharts line graph with gradient fill. Historical toggles (`1D`, `1W`, `1M`, `ALL`). | `OBSERVED` | Smooth curve, but Y-axis lacks units (`¢`/`%`) and gridlines are visually distracting. | `P1` | Add explicit `¢` and `%` tick labels; subdue horizontal grid lines to `1px dotted`. |
| **16. Iconography** | Lucide React icons at `1.5px` and `2px` stroke width. | `OBSERVED` | Clean, modern, and light. Pairs harmoniously with `Sora` typography. | `PRESERVE` | **KEEP EXACTLY**. Standardize stroke width at `1.75px` across all surfaces. |
| **17. Navigation Bar** | Top horizontal bar with logo, links, search, and auth button. | `OBSERVED` | Lacks an active-page indicator (`F-08`); search bar scope is ambiguous. | `P1` | Add glowing bottom indicator pill on active link; add scope hint to search. |
| **18. Sticky Trade Order Slip** | Vertical card with Real/Demo toggle, Buy/Sell tabs, Shares input, breakdown. | `OBSERVED` | Functional layout, but input denominated in Shares (`P0-01`) and order math is opaque. | `P0` | Re-architect: Outcome Selection $\to$ Dollar Input $\to$ Transparent Profit Breakdown. |
| **19. Table Design** | Alternating row borders, monospaced figures, clean alignment. | `OBSERVED` | Portfolio and Activity tables are legible, but lack interactive hover states and cash-out buttons. | `P1` | Add subtle hover illumination (`rgba(242,48,100,0.04)`) and direct `[Cash Out]` action buttons. |
| **20. Social Feed Cards** | Author row, relative timestamp, sentiment badge, post text, market embed card. | `OBSERVED` | Clean layout, but automated demo posts fill the feed with repetitive visual noise. | `P1` | Add rich in-feed prediction preview widgets; filter out low-signal auto-posts. |
| **21. Right-Rail Widgets** | "Top Groups", "Active Discussions", "Trending Now". | `OBSERVED` | Right rails repeat the same trending markets across multiple different routes (`INIT-25`). | `P2` | Make right rails route-specific: personal watchlist on `/markets`, debates on `/social`. |
| **22. Empty States** | Generic centered text or blank cards (`"No ranked traders yet"`). | `OBSERVED` | Looks like a broken void rather than an intentional state; contradicts marketing claims. | `P1` | Implement honest, illustrated empty states with a single prominent call to action. |
| **23. Modals & Overlays** | Centered modal with dark backdrop blur (`bg-black/70 backdrop-blur-sm`). | `OBSERVED` | High contrast, excellent focus trapping, smooth entry transitions. | `PRESERVE` | **KEEP**. Ensure modal titles clearly explain purpose (e.g. *Log in or Sign Up*). |
| **24. Drawers & Sheets** | Slide-up bottom sheet on mobile viewports. | `OBSERVED` | Buried behind two taps on mobile; hides the market question during trade entry. | `P1` | Convert into a persistent, 1-tap bottom trading bar on mobile viewports. |
| **25. Notifications & Toasts** | Currently absent upon trade execution (silent reset flaw `P1-05`). | `OBSERVED` | Zero transactional feedback leaves users disoriented after placing a prediction. | `P0` | Build an animated celebration receipt toast with share link and portfolio redirect. |
| **26. Support Widget Layering** | Floating widget pinned to bottom-right at `bottom: 16px; right: 16px`. | `OBSERVED` | Overlaps the mobile trade drawer button and desktop submit button (`INIT-19`). | `P1` | Move support trigger into top header or apply dynamic bottom clearance. |

---

# PART II: Visual Hierarchy Audit (Screen by Screen)

For every primary surface, we evaluate the gap between **What the user notices first** versus **What the user SHOULD notice first**.

```
                           HIERARCHY GAP ANALYSIS
┌────────────────────────────────────────┬────────────────────────────────────────┐
│     WHAT THE USER NOTICES FIRST        │     WHAT THE USER SHOULD NOTICE FIRST  │
├────────────────────────────────────────┼────────────────────────────────────────┤
│ • Giant non-clickable hero banner      │ • What is OmniMarketX & how do I win?  │
│ • Bright pink "Sign In" button         │ • High-conviction Market of the Day    │
│ • Abstract "Shares" input box          │ • YES/NO odds & dollar stake budget    │
│ • $250k prize card over empty table    │ • Transparent trader rankings & ROI    │
│ • Faint Y-axis lines with no labels    │ • Historical probability trajectory    │
└────────────────────────────────────────┴────────────────────────────────────────┘
```

### 1. Homepage (`/home`)
- **What User Notices First**: The massive headline *"The World's Leading Social Prediction Market.™"* and a row of four floating topic pills (`FIFA World Cup`, `Bitcoin > $70K?`).
- **What User SHOULD Notice First**:
  1. A clear, 3-second value proposition: *"Predict the Future. Trade What Matters."*
  2. The 3-Step "How It Works" visual explainer banner ($1.00 binary resolution rule).
  3. The "Market of the Day" with a live probability bar and 1-click YES/NO prediction buttons.
- **Hierarchy Conflict**: Non-clickable decorative topic pills steal visual focus before the user understands what the platform is.

### 2. Markets Catalog (`/markets`)
- **What User Notices First**: The search bar and a row of horizontal category filter pills.
- **What User SHOULD Notice First**:
  1. Top high-volume, culturally urgent market questions.
  2. The current probability consensus percentage (e.g. `65% YES`).
  3. Direct action triggers (`YES 65¢` / `NO 35¢`).
- **Hierarchy Conflict**: Competing filter controls (top pills, sort dropdown, right-rail tags) create visual noise that overpowers the market questions.

### 3. Market Detail Desk (`/markets/:id`)
- **What User Notices First**: The Price History chart and the large pink `Place Order` button on the right rail.
- **What User SHOULD Notice First**:
  1. The exact market question proposition and settlement resolution date.
  2. Current probability consensus (`65% YES`).
  3. The Order Slip: Outcome Selection (`YES` vs `NO`) followed by Dollar Input (`$25`).
  4. The exact Payout Summary (*Stake $25 pays $38.46*).
- **Hierarchy Conflict**: The `Place Order` button is visually louder than the outcome selection pills, encouraging users to click before choosing YES or NO.

### 4. Forecaster Leaderboard (`/leaderboard`)
- **What User Notices First**: The top-right golden card boasting **`$250,000 Monthly Rewards`**.
- **What User SHOULD Notice First**:
  1. The top 3 ranked forecasters on the podium with verified win rates.
  2. The active competition timeframe (Daily, Weekly, Monthly, Demo Arena).
  3. Clear rules on how rankings and payouts settle.
- **Hierarchy Conflict**: The $250k prize banner creates immense expectations that collapse when the user clicks `Monthly` and sees an empty table (*"No ranked traders yet"*).

### 5. Community Groups (`/groups`)
- **What User Notices First**: Group avatar circles with large single letters (`E`, `C`, `P`) and bold `Join` buttons.
- **What User SHOULD Notice First**:
  1. Active discussion topics and recent hypotheses being debated inside each group.
  2. Category hubs (Crypto Forecasters, AI Researchers, Sports Predictors).
- **Hierarchy Conflict**: The cards look like an address book directory rather than living, vibrating communities.

---

# PART III: The Beauty Audit (Authenticity vs. Synthetic Noise)

### What Makes Current OmniMarketX Feel Beautiful (The Strengths)
- **The Deep Navy Dark Palette (`#090426`)**: Provides a calming, immersive, non-fatiguing backdrop that makes emerald and rose semantic indicators pop with cockpit-grade clarity.
- **Typographic Partnership**: `Sora` brings modern editorial personality without feeling eccentric; `Geist Mono` delivers institutional precision on all numerical data.
- **Tactile Component Radii**: Restrained `8px` and `12px` rounded corners give buttons and cards a solid, engineered physical feel.
- **Restrained Gradient Highlights**: Reserving the fiery brand gradient (`#f23064` to `#ff6b1a`) for key moments prevents visual exhaustion.

### What Makes Current OmniMarketX Feel Cheap, Synthetic, or Cluttered (The Weaknesses)
- **Pre-Launch Placeholder Content**: Hashtags like `#futurefoundry` and `#producttesting` scream "unfinished beta test."
- **Empty Void States**: Displaying blank tables with zero guidance makes the application feel abandoned.
- **Duplicated Structural Elements**: Repeating the same trending market cards on Home, Markets, Trending, and Leaderboard right rails feels like low-effort template padding.
- **Silent Interaction Feedback**: When clicking `Place Order` resets an entire form without an animation, toast, or sound, the interface feels unresponsive and broken.
- **Sub-12px Micro-Typography**: Labels rendered at `text-[10px]` in muted slate `#64748b` are unreadable on standard displays and fail WCAG contrast rules.

---

# PART IV: Theme Audit (Dark Mode vs. Light Mode)

```
                            THEME EVALUATION
┌──────────────────────────────────────┬──────────────────────────────────────┐
│        DARK MODE (#090426)           │        LIGHT MODE (#f4f5f7)          │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ ✓ Distinctive brand identity         │ ⚠ Feels generic and washed out       │
│ ✓ Cockpit-level semantic contrast    │ ⚠ Low contrast between cards and bg  │
│ ⚠ Muted text sometimes too dim       │ ⚠ Brand gradient feels abrasive      │
│ ⚠ Card borders need slight boost     │ ⚠ Geist Mono loses numerical weight  │
│ STATUS: PRESERVE & EVOLVE            │ STATUS: COMPREHENSIVE REFINE         │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

### 1. Dark Mode Deep Dive (`#090426` Foundation)
- **Evaluation**: **HIGH ASSET — PRESERVE AND EVOLVE**.
- **Surface Contrast Audit**:
  - Background: `#090426` (Deep Space Navy).
  - Card Surface: `#110a36` (Midnight Purple).
  - Elevated Popups: `#1b1150`.
  - Contrast Ratio: `1.2:1` between card and background. This is slightly too low in dark ambient lighting.
- **Recommended Evolution for `web-2.0`**:
  - Elevate card background to `#130c3a` and increase outer card border contrast to `rgba(255, 255, 255, 0.12)`.
  - Lift secondary text from `#64748b` to `#94a3b8` (achieving WCAG `4.8:1` contrast against `#130c3a`).

### 2. Light Mode Deep Dive (`#f4f5f7` Foundation)
- **Evaluation**: **NEEDS REFINEMENT**.
- **The Problem**: In light mode, OmniMarketX loses its distinctive brand identity. Pure white cards (`#ffffff`) sitting on a pale grey background (`#f4f5f7`) look like a generic Bootstrap or Tailwind starter kit. Furthermore, the intense `#f23064` brand gradient feels aggressive and glaring against a white canvas.
- **Recommended Evolution for `web-2.0`**:
  - Shift canvas background to an intentional, cool editorial tone: `#f8fafc`.
  - Introduce subtle `1px` borders in `#e2e8f0` with crisp `0 1px 3px rgba(15, 23, 42, 0.06)` elevation.
  - Soften primary gradient in light mode to deep crimson/coral (`#e11d48` to `#ea580c`), increasing legibility of white button text.

---

# PART V: Typography Audit (`Sora` + `Geist Mono`)

The existing typography pairing is exceptionally strong, but its structural execution requires discipline.

### Current Typographic Flaws
1. **Too Many Intermediate Sizes**: The codebase utilizes 11 distinct font sizes: `9px`, `10px`, `11px`, `12px`, `13px`, `14px`, `16px`, `18px`, `20px`, `24px`, `30px`. This creates typographic clutter.
2. **Excessive Uppercase Labels**: Overuse of `uppercase tracking-wider` on secondary metrics (`MY GROUP STATUS`, `MARKET MOVERS`, `VOLUME`) creates visual fatigue.
3. **Tabular Disconnection**: In positions tables, financial numbers sometimes render in `Sora` rather than `Geist Mono`, causing misaligned decimal points.

### The Unified 6-Tier Web-2.0 Typographic Scale

| Tier | Font Family | Size | Line Height | Weight | Tracking | Primary Usage |
|:---|:---|:---:|:---:|:---:|:---:|:---|
| **Display** | `Sora` | `32px` | `1.2` | Bold (700) | `-0.02em` | Homepage Hero, Primary Surface Titles |
| **Headline** | `Sora` | `20px` | `1.3` | Bold (700) | `-0.01em` | Market Detail Question, Card Headlines |
| **Subhead** | `Sora` | `16px` | `1.4` | SemiBold (600) | `0em` | Section Headers, Market Card Titles |
| **Body** | `Sora` | `14px` | `1.5` | Regular (400) / Medium (500) | `0em` | Descriptions, Community Commentary |
| **Data Large** | `Geist Mono` | `18px` | `1.2` | Bold (700) | `0em` | Probability Callouts (`65%`), Balance Displays |
| **Data Body** | `Geist Mono` | `13px` | `1.4` | Medium (500) | `0em` | Prices (`65¢`), Shares (`38.4`), Table Values |
| **Caption** | `Sora` | `12px` | `1.4` | Medium (500) | `+0.01em` | Timestamps, Oracle Metadata, Category Tags |

---

# PART VI: Market Card & Trading Desk Anatomy

### 1. Market Card Anatomy Overhaul

```
┌─────────────────────────────────────────────────────────────┐
│ 🎬 Entertainment · Closes Nov 8, 2026           ★ Favorite  │ ◄── 1. Context & Timing
├─────────────────────────────────────────────────────────────┤
│ Will GTA VI officially release before December 2026?        │ ◄── 2. The Proposition
├─────────────────────────────────────────────────────────────┤
│ [██████████████████████████████░░░░░░░░░░░░░]               │ ◄── 3. Dual Probability Bar
│ 65% YES                                     35% NO          │
├─────────────────────────────────────────────────────────────┤
│ [ Buy YES 65¢ ]                     [ Buy NO 35¢ ]          │ ◄── 4. Symmetrical Action
├─────────────────────────────────────────────────────────────┤
│ Vol: $48.2K · 1.2K Predictors       Oracle: Rockstar Games  │ ◄── 5. Proof & Settlement
└─────────────────────────────────────────────────────────────┘
```

- **Hierarchy Rule**: The user's eye must travel in a strict vertical sequence: **Category $\to$ Question $\to$ Odds $\to$ Action $\to$ Proof**.

### 2. Trading Desk (Order Slip) Anatomy Overhaul

```
┌─────────────────────────────────────────────────────────────┐
│ 🎮 PRACTICE DEMO SANDBOX                  [Switch to Real]  │ ◄── 1. Clear Mode Identity
├─────────────────────────────────────────────────────────────┤
│ Outcome:                                                    │
│ [  ✓ YES  65¢ (65% chance)  ]   [    NO   35¢ (35% chance)  ]│ ◄── 2. Outcome Selection
├─────────────────────────────────────────────────────────────┤
│ Your Stake:                                                 │
│ [ $ 25.00                       ]  [$10] [$25] [$50] [MAX]  │ ◄── 3. Dollar-First Input
│ (Buys 38.4 shares @ 65¢ per share)                          │
├─────────────────────────────────────────────────────────────┤
│ Payout Breakdown:                                           │
│ • If YES wins:  $38.46 Total Payout (+$13.46 Net Profit)    │ ◄── 4. Math Transparency
│ • If NO wins:   $0.00 Payout (-$25.00 Stake)                │
├─────────────────────────────────────────────────────────────┤
│ [✓] Share prediction to community feed                      │ ◄── 5. Social Consent
├─────────────────────────────────────────────────────────────┤
│ [   Confirm YES Prediction ($25.00)   ]                     │ ◄── 6. Primary Action CTA
└─────────────────────────────────────────────────────────────┘
```

---

# PART VII: Mobile Responsive Audit (375px Viewport)

| Mobile Friction Point (`web-1.0`) | Visual & Interaction Defect | Severity | Web-2.0 Responsive Solution |
|:---|:---|:---:|:---|
| **Hidden Community Nav** | Groups and Leaderboard locked inside hamburger menu. | `P1` | **Persistent 5-Tab Bottom Navigation Bar** (`Markets`, `Trending`, `Social`, `Groups`, `Portfolio`). |
| **Buried Order Slip** | Requires tapping "Trade" button to open a full-height drawer that conceals market rules. | `P0` | **Sticky 1-Tap Bottom Bar** displaying live probability with split `[YES 65¢] \| [NO 35¢]` triggers. |
| **Floating Widget Overlap** | Support chat icon floats directly over the mobile drawer submit button. | `P1` | Move support trigger into top header; reserve bottom 60px exclusively for navigation and trade bars. |
| **Table Horizontal Clipping** | Portfolio table rows stretch beyond 375px screen width. | `P2` | Convert table rows into stacked **Position Cards** with clear badge chips and direct cash-out buttons. |
| **Touch Target Precision** | Quick-amount buttons (`$10`, `$25`) are tightly spaced at `32px` height. | `P2` | Elevate all interactive touch targets to a minimum of **`44px x 44px`** per Apple HIG standards. |

---

# PART VIII: Anti-AI-Generic Design Checklist

An explicit inventory of synthetic AI design patterns audited against OmniMarketX:

| Synthetic Pattern | Presence in `web-1.0` | Severity | Strict Web-2.0 Prohibition |
|:---|:---|:---:|:---|
| **1. Generic Buzzword Headlines** | *"Unlock your prediction journey"* | `P2` | **BANNED**. Use concrete action verbs: *Predict*, *Trade*, *Verify*, *Win*. |
| **2. Repetitive 3-Card Feature Grids** | Present in Homepage value pillars | `P2` | **BANNED**. Differentiate sections by visual structure and interactive function. |
| **3. Arbitrary Background Gradients** | Occasional multi-color glow in hero | `P2` | **BANNED**. Reserve brand gradients exclusively for primary action buttons. |
| **4. Excessive Glassmorphism** | `backdrop-blur-md` on dark cards | `P2` | **BANNED**. Use solid, high-contrast surfaces (`#110a36`) with crisp borders. |
| **5. Emoji Bullet Lists** | Present in several descriptions | `P2` | **BANNED**. Use clean typography with proper indentation; reserve emojis for categories. |
| **6. Fake Social Activity** | Auto-generated bot prediction posts | `P1` | **BANNED**. Require explicit user consent and commentary before publishing posts. |
| **7. Artificial Urgency Tickers** | Static "Low Volatility" banner | `P2` | **BANNED**. Only render momentum metrics when backed by real data deltas. |
| **8. Meaningless Metric Tiles** | Unlabeled volume numbers (`12,400`) | `P1` | **BANNED**. Every number must possess an explicit unit label (`$48.2K Volume`). |
| **9. Synthetic Dummy Avatars** | Fictional handles (`@alpha_trader`) | `P2` | **BANNED**. Derive initials from real auth emails or allow custom profile selection. |
| **10. Decorative Blobs & Spheres** | Floating blurred radial circles | `P3` | **BANNED**. Zero non-functional decorative canvas blobs. |

---

# PART IX: Screen-by-Screen Redesign Scorecard

Scoring all 13 core surfaces on a **1–10 Scale** across 9 foundational design dimensions:

### Scoring Metric Guide
- `9–10`: Exceptional / Industry Gold Standard.
- `7–8`: Good / Functional with minor polish needs.
- `5–6`: Mediocre / Significant UX or visual friction.
- `1–4`: Deficient / Major barrier to conversion and trust.

### Master Scorecard Table

| Screen / Surface | UX Clarity | Visual Hierarchy | Trust & Proof | Brand Identity | Information Density | Content Quality | Interaction Quality | Mobile Quality | Overall Visual Score |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **1. Homepage (`/home`)** | 5 / 10 | 5 / 10 | 6 / 10 | 8 / 10 | 6 / 10 | 6 / 10 | 5 / 10 | 6 / 10 | **5.9 / 10** |
| **2. Markets Catalog (`/markets`)** | 7 / 10 | 6 / 10 | 7 / 10 | 8 / 10 | 7 / 10 | 7 / 10 | 6 / 10 | 6 / 10 | **6.8 / 10** |
| **3. Market Detail (`/markets/:id`)** | 6 / 10 | 6 / 10 | 7 / 10 | 8 / 10 | 8 / 10 | 7 / 10 | 5 / 10 | 5 / 10 | **6.5 / 10** |
| **4. Trending (`/trending`)** | 6 / 10 | 6 / 10 | 6 / 10 | 7 / 10 | 7 / 10 | 5 / 10 | 6 / 10 | 6 / 10 | **6.1 / 10** |
| **5. Social Feed (`/social`)** | 6 / 10 | 6 / 10 | 6 / 10 | 7 / 10 | 7 / 10 | 5 / 10 | 6 / 10 | 6 / 10 | **6.1 / 10** |
| **6. Groups (`/groups`)** | 5 / 10 | 5 / 10 | 5 / 10 | 6 / 10 | 6 / 10 | 5 / 10 | 4 / 10 | 5 / 10 | **5.1 / 10** |
| **7. Leaderboard (`/leaderboard`)** | 5 / 10 | 6 / 10 | 4 / 10 | 7 / 10 | 7 / 10 | 5 / 10 | 5 / 10 | 6 / 10 | **5.6 / 10** |
| **8. Portfolio (`/portfolio`)** | 7 / 10 | 7 / 10 | 8 / 10 | 8 / 10 | 8 / 10 | 6 / 10 | 5 / 10 | 6 / 10 | **6.9 / 10** |
| **9. Wallet (`/wallet`)** | 6 / 10 | 7 / 10 | 7 / 10 | 7 / 10 | 7 / 10 | 6 / 10 | 5 / 10 | 6 / 10 | **6.4 / 10** |
| **10. Activity (`/activity`)** | 7 / 10 | 7 / 10 | 8 / 10 | 7 / 10 | 7 / 10 | 6 / 10 | 6 / 10 | 7 / 10 | **6.9 / 10** |
| **11. Settings (`/settings`)** | 7 / 10 | 7 / 10 | 7 / 10 | 7 / 10 | 6 / 10 | 6 / 10 | 6 / 10 | 7 / 10 | **6.6 / 10** |
| **12. Auth Modal** | 6 / 10 | 7 / 10 | 7 / 10 | 7 / 10 | 8 / 10 | 6 / 10 | 6 / 10 | 7 / 10 | **6.8 / 10** |
| **13. Mobile Navigation** | 4 / 10 | 5 / 10 | 6 / 10 | 6 / 10 | 5 / 10 | 6 / 10 | 4 / 10 | 5 / 10 | **5.1 / 10** |

---

*Document established in `research/m9-ui-audit.md`.*
