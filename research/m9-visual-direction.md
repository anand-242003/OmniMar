# Milestone 9 — Web-2.0 Visual Design Direction & Craft Standard
## The Credible Forecaster's Arena: Design Specification for OmniMarketX

**Target**: `web-2.0` Design Direction, Visual Philosophy & Quality Bar  
**Baseline & Strategy**: `research/m7-ux-audit.md`, `research/m8-prioritization.md`, `research/m9-ui-audit.md`  
**Status**: Authoritative Design Direction  
**Rules**: `web-1.0` is strictly frozen. Design governance and visual specifications only.

---

## 1. Core Visual Positioning: "The Credible Forecaster's Arena"

OmniMarketX in `web-2.0` occupies a unique, highly defensible visual intersection:

```
                          VISUAL POSITIONING TRIANGLE
                               Prediction Market
                               (Polymarket, Kalshi)
                                      ▲
                                     / \
                                    /   \
                                   /     \
                                  /  OMX  \
                                 /  web2.0 \
                                /           \
                               ▼─────────────▼
                         Premium Fintech     Social Network
                         (Robinhood, Stripe) (Farcaster, X)
```

- **Prediction Market Rigor**: Binary contract clarity, verified oracle settlements, probabilistic transparency.
- **Premium Fintech Craft**: Clean tabular data, disciplined typography, tactile inputs, unambiguous financial accounting.
- **Social Network Vitality**: Community debate feeds, forecaster track records, verified sentiment tags, peer competition.

### What OmniMarketX IS:
- **Intelligent**: Treats the user as an analytical adult seeking truth and financial reward.
- **Cockpit-Grade**: Instruments, charts, and odds pills stand out with razor-sharp contrast against deep surfaces.
- **Restrained**: Whitespace and composition carry visual weight; color is strictly communicative.
- **Tactile**: Buttons, pills, and inputs feel engineered and solid, providing immediate mechanical feedback.

### What OmniMarketX is NOT:
- **NOT a Crypto Casino**: Zero spinning wheels, flashy neon rainbows, cartoon mascots, or meme coins.
- **NOT an AI Template**: Zero floating glass spheres, decorative purple blobs, or generic startup marketing buzzwords.
- **NOT a Bloomberg Terminal**: Avoids overwhelming multi-window density and Wall Street jargon that alienates retail forecasters.

---

## 2. Typographic Craft & Dual-Font Discipline

The partnership of **`Sora`** (geometric sans) and **`Geist Mono`** (monospace tabular) is the primary typographic signature of OmniMarketX.

```
                              TYPOGRAPHIC ROLES
┌──────────────────────────────────────┬──────────────────────────────────────┐
│        SORA (Geometric Sans)         │       GEIST MONO (Tabular Mono)      │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ • Market questions & propositions    │ • Probability percentages (65%)      │
│ • Surface titles & section headers   │ • Contract share prices (65¢)        │
│ • Community commentary & post text   │ • Dollar budgets & payouts ($38.46)  │
│ • Navigation links & category tags   │ • Order book quantities & timestamps │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

### Typographic Rules & Discipline
1. **Never Mix Fonts on Values**: Any element communicating currency, probabilities, share counts, or timestamps must be set in `Geist Mono`.
2. **Elimination of Sub-12px Text**: No label may be smaller than `12px` (`0.75rem`). Sub-12px text (`10px`, `11px`) creates severe eye fatigue on mobile and fails accessibility.
3. **Strict Uppercase Budget**: Uppercase styling is permitted *only* on Category Tags (`ENTERTAINMENT`), System Status Badges (`ACTIVE`, `RESOLVED`), and Sentiment Badges (`BULLISH`, `BEARISH`). All metric titles, table headers, and navigation links must use clean Title Case or Sentence Case.
4. **Line-Length Discipline**: Market questions must be capped at `65 characters` per line on desktop to ensure instantaneous reading comprehension.

---

## 3. Color Strategy & Semantic Contrast (The 80/15/5 Rule)

OmniMarketX enforces strict chromatic discipline:

```
                            COLOR ALLOCATION
┌─────────────────────────────────────────────────────────────┬───────────┬─────┐
│ 80% Canvas Neutrals (#090426, #110a36, #1b1150)             │ 15% Text  │ 5%  │
│ Deep, non-fatiguing space navy foundation                   │ Neutrals  │ Color
└─────────────────────────────────────────────────────────────┴───────────┴─────┘
                                                                            ▲
                                            Emerald YES / Rose NO / Pink CTA ─┘
```

### The Web-2.0 Color Architecture

| Token Name | Dark Mode Value | Light Mode Value | Functional Purpose |
|:---|:---:|:---:|:---|
| `--color-canvas` | `#090426` | `#f8fafc` | Global background canvas. |
| `--color-surface` | `#110a36` | `#ffffff` | Primary container cards, order slips, tables. |
| `--color-surface-elevated`| `#1b1150` | `#f1f5f9` | Modals, flyout menus, tooltips. |
| `--color-border` | `rgba(255,255,255,0.12)` | `#e2e8f0` | 1px structural container boundaries. |
| `--color-text-primary` | `#ffffff` | `#0f172a` | High-contrast market titles, values, headings. |
| `--color-text-secondary` | `#94a3b8` | `#475569` | Explanations, oracle citations, table headers. |
| `--color-text-muted` | `#64748b` | `#94a3b8` | Timestamps, secondary units, unselected pills. |
| `--color-outcome-yes` | `#10b981` | `#059669` | YES outcome pills, positive return, bullish sentiment. |
| `--color-outcome-no` | `#f43f5e` | `#e11d48` | NO outcome pills, negative return, bearish sentiment. |
| `--color-brand-primary` | `#f23064` | `#e11d48` | Primary CTA buttons, active route indicators. |
| `--color-brand-gradient`| `#f23064` $\to$ `#ff6b1a` | `#e11d48` $\to$ `#ea580c` | High-conviction execution triggers only. |
| `--color-demo-sandbox` | `#8b5cf6` | `#7c3aed` | Virtual sandbox mode badges, practice receipts. |

---

## 4. Surface & Elevation Strategy: "Crisp Separation"

Rather than relying on heavy, muddy drop-shadows that make dark interfaces look hazy, OmniMarketX establishes depth through **surface layering and border contrast**:

```
LEVEL 0 (Canvas)    #090426  (Deepest space foundation)
LEVEL 1 (Card)      #110a36  + 1px border rgba(255,255,255,0.12)
LEVEL 2 (Order Slip)#160e44  + 1px border rgba(255,255,255,0.16) + 12px blur
LEVEL 3 (Overlay)   #1b1150  + 1px border rgba(255,255,255,0.24) + shadow-2xl
```

- **Zero Heavy Shadows**: Avoid generic `shadow-2xl` on stationary cards. Reserve elevation drop-shadows exclusively for floating modals, tooltips, and flyout menus.
- **Crisp Hairline Dividers**: Use `1px` borders with low-opacity white (`rgba(255, 255, 255, 0.08)`) to structure card interiors without adding visual weight.

---

## 5. Component Philosophies

### A. Market Card Philosophy
- **Scannable in 1.5 Seconds**: A user scrolling through 20 markets must be able to absorb the proposition, the probability consensus, and the settlement date instantly.
- **Dual Odds Display**: Always render probability and share price simultaneously: **`YES 65¢ (65%)`** | **`NO 35¢ (35%)`**.
- **Tactile Symmetrical Buttons**: YES and NO buttons inside the card must possess equal visual footprint and tactile depression on click.

### B. Trading Desk (Order Slip) Philosophy
- **The Holy Ground of Conversion**: The order slip must look and feel like an engineered instrument.
- **Dollar-First Sizing**: Default the input to currency (`$25.00`); compute contract shares automatically in secondary muted text.
- **Math Transparency**: Display three unmistakable figures before commitment:
  1. *Total Stake ($25.00)*
  2. *Net Profit (+$13.46)*
  3. *Total Payout ($38.46)*

### C. Chart Visualization Philosophy
- **Truthful Data Curves**: Recharts line paths must use clean SVG geometry (`strokeWidth: 2px`).
- **Explicit Y-Axis Labels**: Vertical axis must show explicit percentage and cent intervals (e.g. `20%`, `40%`, `60%`, `80%`).
- **Magnetic Snap Tooltips**: Hovering anywhere on the chart must snap a vertical cursor line with a floating coordinate card showing: Date, Time, Probability, and YES/NO price.

### D. Navigation Philosophy
- **Elimination of Navigation Blindness**: The active page link must feature a glowing bottom gradient indicator.
- **Mobile Thumb Priority**: A persistent 5-tab bottom navigation bar on mobile ensures `Groups` and `Portfolio` are never hidden.

### E. Social Community Philosophy
- **Signal Over Noise**: Filter out low-value auto-generated demo posts. Elevate posts that feature verified forecaster track records, attached market predictions, and rich commentary.

---

## 6. Motion & Animation Craft (The 100ms Standard)

Motion is never decorative at OmniMarketX; it is an informational feedback mechanism.

```
                              MOTION SCALE
┌──────────────────────────────────────┬──────────────────────────────────────┐
│ MOMENT                               │ MOTION SPECIFICATION                 │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ Button Tap / Depression              │ scale(0.98), 80ms ease-out           │
│ Outcome Selection Pill Toggle        │ border-color transition, 100ms ease  │
│ Mobile Bottom Sheet Entry            │ translateY(0), 200ms spring curve    │
│ Order Execution Celebration          │ scale(1.05) bounce, 250ms spring     │
│ Toast Notification Arrival           │ slideDown(-12px to 0), 180ms ease    │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

- **Spring Curves**: All transitions utilize natural physical curves: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Zero Distracting Looping Animations**: Prohibit pulsing glowing borders or rotating banners that distract user focus during trading analysis.

---

## 7. Strategic Redesign Improvements (The Top 10 Lists)

### Top 10 Visual Improvements
1. **Dual Probability & Price Badging**: Pair cents with percentage odds everywhere: `65¢ (65% chance)`.
2. **Card Border Contrast Elevation**: Increase dark mode card borders from `0.08` to `0.12` opacity for sharp separation.
3. **Disciplined 6-Tier Typographic Scale**: Standardize typography; eliminate unreadable sub-12px micro-labels.
4. **Recharts Y-Axis Precision**: Add explicit percentage and cent tick marks with 1px dotted horizontal gridlines.
5. **Mobile Persistent 5-Tab Bottom Bar**: Elevate `Groups` and `Portfolio` from hidden drawers into a global bottom tab bar.
6. **Active Navigation Glow**: Add glowing gradient indicator pills on top nav links to eliminate route disorientation.
7. **Support Widget Clearance**: Relocate floating support triggers to eliminate visual collision with order slips.
8. **Visual Risk Demarcation**: Apply Violet/Dashed styling to Demo Sandbox and Emerald/Solid styling to Real Capital.
9. **Unified Catalog Toolbar**: Merge competing search, sort, and category controls into a single intuitive toolbar.
10. **State-Honest Market Status Stamps**: Clearly dim and stamp `RESOLVED` on expired markets to eliminate stale card clicks.

### Top 10 Interaction / UI Improvements
1. **Dollar-First Order Budget Input**: Default order input to currency ($) with automated share calculation.
2. **Instant 1-Click Guest Sandbox Trade**: Allow unauthenticated visitors to test trade without an immediate auth wall.
3. **Context-Preserving Auth Return**: Save target market intent so login redirects restore the pending prediction slip.
4. **Post-Order Celebration Receipt**: Close the execution loop with an animated confirmation card and portfolio link.
5. **Direct Portfolio Cash-Out**: Empower users to exit positions or take profits directly from `/portfolio`.
6. **Sticky 1-Tap Mobile Trade Bar**: Replace the 2-tap drawer with a persistent sticky bottom bar showing live odds.
7. **In-Feed Social Prediction Trading**: Allow users to back or oppose hypotheses directly inside the social feed.
8. **Dedicated Group Hubs (`/groups/:id`)**: Build interior community surfaces with topic feeds and member rosters.
9. **Interactive Forecaster Profile Cards**: Enable clicking leaderboard handles to inspect track records and open wagers.
10. **Tactile Touch Targets (44px+)**: Elevate all mobile buttons, chips, and toggles to Apple HIG accessibility standards.

### Top 10 Content Improvements
1. **Binary $1.00 Settlement Micro-Copy**: Introduce inline explainers across all cards: *"Pays $1.00 if event occurs."*
2. **Plain-English Terminology Replacement**: Replace "Average Price" with "Cost / Chance"; replace "Unrealized P&L" with "Current Return".
3. **Clear Stake vs. Net Profit Breakdown**: Standardize order summaries to: *Stake* | *Net Profit* | *Total Payout*.
4. **Removal of Vendor & Infrastructure Jargon**: Eliminate all references to "Privy" and mock hexadecimal hashes.
5. **Purge of Pre-Launch Fixture Tags**: Replace `#futurefoundry` with authentic categories (`#elections`, `#ai`, `#macro`).
6. **Homepage 3-Step Educational Banner**: Explain the core prediction loop in 3 visual steps above the fold.
7. **Settlement Oracle Transparency**: Clearly state the official data source verifying each market outcome.
8. **Dynamic String Pluralization**: Eliminate awkward grammar glitches like `"0 traders"` or `"1 joined communities"`.
9. **Honest Empty State Messaging**: Replace blank tables with encouraging invitations and countdowns.
10. **Contextual Tooltip Explanations**: Add question-mark tooltips explaining market-implied probabilities.

### Top 10 Things to Remove
1. **Remove Non-Interactive Hero Category Pills**: Eliminate deceptive decorative chips on the homepage hero (`F-05`).
2. **Remove Unexplained "Shares" Default Input**: Eliminate contract share quantity as the primary input mode (`P0-01`).
3. **Remove Silent Slip Form Resets**: Eliminate instant resets without post-trade confirmation receipts (`P1-05`).
4. **Remove Automated Bot Demo Posts**: Stop auto-broadcasting practice trades without user commentary (`F-34`).
5. **Remove Infrastructure Jargon in UI**: Eliminate "Privy Passwordless" labels from Settings and Activity.
6. **Remove Mock Hexadecimal Transaction Hashes**: Replace with consumer-friendly order numbers (`#OMX-9281`).
7. **Remove Duplicate Markets Toolbars**: Eliminate competing sort dropdowns and right-rail quick filter boxes.
8. **Remove Redundant Right-Rail Trending Lists**: Eliminate identical trending widgets pasted across 4 different routes.
9. **Remove Premature Notification Permission Prompts**: Defer push prompts until after a user places a prediction.
10. **Remove Fake Empty Leaderboard Tables**: Stop displaying empty tables beneath a "$250k Awarded" marketing banner.

### Top 10 Things to Preserve
1. **Preserve Deep Space Navy Canvas (`#090426`)**: The core brand equity foundation with optimal contrast.
2. **Preserve `Sora` + `Geist Mono` Typography**: Perfect pairing between editorial clarity and tabular financial data.
3. **Preserve Double-Entry Accounting Engine**: The underlying math in `TradeContext` is mathematically sound.
4. **Preserve Desktop 2-Column Split Layout**: Sticky right-rail order slip paired with left-scrollable content.
5. **Preserve Semantic Outcome Colors**: Emerald `#10b981` (YES) and Rose `#f43f5e` (NO).
6. **Preserve Post Sentiment Badges**: `● BULLISH` and `● BEARISH` tags on community posts.
7. **Preserve 10,000 Virtual USDC Sandbox**: The risk-free virtual balance concept that powers practice mode.
8. **Preserve Lucide React Iconography (1.75px)**: Modern, clean, and harmoniously matched with `Sora`.
9. **Preserve Resolution Details Architecture**: Dedicated cards detailing oracle rules, settlement dates, and sources.
10. **Preserve Keyboard Shortcut `/` for Search**: High-utility power-user interaction pattern.

---

## 8. Web-2.0 Visual Quality Bar (25 Concrete Acceptance Criteria)

Before any screen or component in `web-2.0` is approved, it must pass these 25 objective quality checks:

1. **5-Second Value Clarity**: Does an unauthenticated visitor understand what the platform is within 5 seconds?
2. **Visible Probability Consensus**: Is every market share price paired with its explicit probability percentage (e.g. `65¢ (65%)`)?
3. **Dollar-First Stake Entry**: Can a user enter a dollar budget ($25) without performing manual share division?
4. **Net Profit Transparency**: Does the order summary clearly distinguish between *Your Stake*, *Net Profit*, and *Total Payout*?
5. **Tactile Outcome Physics**: Do YES and NO pills provide instantaneous visual depression and glowing selection feedback?
6. **Closed Transaction Feedback Loop**: Does every placed order render an immediate celebration receipt with a portfolio link?
7. **Zero Auth Context Loss**: Does logging in mid-journey return the user directly to their staged prediction slip?
8. **Evidence-Integrity Mandate**: Does every visible claim of "Trending" or "High Volume" match the data rendered on screen?
9. **Visual Risk Stratification**: Is Demo Sandbox mode unmistakably distinct from Real Capital mode at a glance?
10. **100% Mobile Thumb Reachability**: Can every primary wager and confirmation be executed with one thumb on a 375px screen?
11. **Persistent Mobile Bottom Bar**: Are `Markets`, `Trending`, `Social`, `Groups`, and `Portfolio` accessible on mobile in 1 tap?
12. **Zero Viewport Collisions**: Are all buttons and inputs free from visual collision with support chat widgets?
13. **Sub-12px Text Elimination**: Are all visible labels, timestamps, and captions sized at `12px` or greater?
14. **Geist Mono Numerical Discipline**: Are all prices, shares, odds, and dollar values formatted strictly in `Geist Mono`?
15. **Sora Editorial Authority**: Are all market questions, headlines, and descriptions formatted in `Sora`?
16. **WCAG AA Contrast Compliance**: Does all text achieve at least `4.5:1` contrast against its card surface?
17. **Non-Color Dependent Outcomes**: Is color never the sole differentiator for YES/NO (always pair green/red with text)?
18. **Explicit Chart Axis Units**: Does the price history chart feature clear `¢` and `%` tick labels on the Y-axis?
19. **Direct Portfolio Cash-Out**: Can positions in the portfolio be closed or cashed out early with a single action?
20. **Authentic Community Content**: Is the social feed free of low-signal automated bot posts and pre-launch hashtags?
21. **True Community Hubs**: Does clicking a group open a dedicated space (`/groups/:id`) with discussion threads?
22. **Interactive Leaderboard Profiles**: Can forecaster handles on the leaderboard be clicked to inspect track records?
23. **Anti-AI-Generic Compliance**: Is the screen free of generic startup buzzwords, floating blobs, and arbitrary glass?
24. **Honest Empty State Guidance**: Does every empty state explain why it is empty and provide a 1-click pathway to populate it?
25. **Distinctive Brand Identity**: Does the surface look and feel authentically like *OmniMarketX*?

---

*Document established in `research/m9-visual-direction.md`.*
