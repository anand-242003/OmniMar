# Surface Brief: Markets Catalog & Discovery (`/markets`)
<!-- impeccable:surface-brief 1 -->

## 1. Job and Audience
- **Primary Job**: Quickly discover a prediction market that is relevant enough to investigate and potentially trade, without cognitive fatigue or gambling visual noise.
- **Arriving Personas**:
  - *Alex (Speculator)*: High-velocity scanning, liquidity sorting (`24h Volume`), instant keyboard search (`/`), fast access to Market Detail.
  - *Jordan (Curious Generalist)*: Category discovery, plain-English question titles, verified resolution source proof.
  - *Casey (Mobile Distracted)*: Thumb-zone swipeable categories, compact single-column cards, zero horizontal drift.

## 2. Outcome and Proof
- **Primary Task**: Browse, filter, search, compare odds, and select an outcome.
- **Experience Funnel**:
  ```
  DISCOVER  ──►  SCAN  ──►  COMPARE  ──►  UNDERSTAND  ──►  SELECT  ──►  TRADE
  Category /    Question    Probability    Resolution      YES 65¢ /    Normal
  Search Bar    & Volume    & Odds Bar     Source & Date   NO 35¢       Detail Page
  ```
- **Success Criteria**: Sub-2-second market evaluation; unambiguous probability and pricing; zero confusion between market price and implied probability.
- **Product Truth**:
  - Dollar-first volume and liquidity metrics (`$48.2K 24h vol`, not raw integer counts).
  - Explicit probability + share price binding: `▲ YES 65¢ (~65%)` and `▼ NO 35¢ (~35%)`.
  - Transparent settlement criteria and named resolution source on every card.

## 3. Selected Direction
- **Visual Authority**: "The Credible Forecaster's Arena" (Deep Space Navy `#090426`, Sora headings, Geist Mono metrics, Solid Emerald `#10b981` / Rose `#f43f5e`, 80/15/5 color ratio).
- **Structural Thesis**:
  - Canonical responsive card grid: 3 columns on desktop (1440px), 2 columns on tablet (768px), and 1-column stack on mobile (375px). No Grid/List view toggle.
  - Unified search & filter strip with `/` shortcut and Lucide category pills (`Film`, `Landmark`, `Cpu`, `Trophy`, `Sparkles`).
  - Symmetrical quick outcome pills on each card: clicking `▲ YES 65¢` or `▼ NO 35¢` navigates cleanly to the normal Market Detail page without modifying or requiring query parameter pre-staging on the frozen slice.
- **Focal Moment**: Hovering/scanning a card reveals clear probability divergence via a crisp dual emerald/rose progress track.

## 4. Scope and Boundaries
- **In Scope**:
  - Full `/markets` catalog route in `web-2.0`.
  - Canonical 3-column desktop / 2-column tablet / 1-column mobile card layout.
  - Category filtering across 6 curated primary categories.
  - Instant client-side multi-field search across title, category, and resolution source (`/` shortcut, no debounce).
  - Sorting: `Trending (Activity)`, `24h Volume (Liquidity)`, `Closing Soon`, `Newest`, `High Probability`.
  - Definitive `MarketCard` component adhering to M10 specification.
  - Active, Resolved, Low-Liquidity, and Empty Search states.
- **Out of Scope (Untouched)**:
  - Frozen `web-1.0` remains 100% untouched.
  - Frozen `web-2.0-m11-market-detail` remains 100% frozen (no outcome pre-staging or query param changes required).
  - Unrelated routes (`/social`, `/groups`, `/leaderboard`, `/portfolio`) remain deferred to subsequent slices.
- **Anti-Goals**:
  - NO Grid/List view toggle.
  - NO outcome pre-staging or query-parameter routing coupling.
  - NO "Oracle" terminology (strictly "Resolution source").
  - NO fake tickers or simulated bot trading.
  - NO casino badges, emojis, or neon glow effects.
  - NO duplicate top-level `Trending` tabs (Trending is a sort mode).

## 5. States and Ranges
- **Active State**: Live consensus odds, volume metrics, and navigation links.
- **Resolved State**: Card opacity dims to 0.85; odds bar replaced by `RESOLVED: YES ($1.00 Payout)`; buttons route to settlement details.
- **Low Liquidity**: Displays honest status: `New Market · 50% baseline · Be the first to predict`.
- **Empty Search**: Clean empty state with `[ Clear Filters ]` button.

## 6. Interaction and Layout
- **Desktop (1440px)**: 3-column card grid (380px cards, 24px gutters).
- **Tablet (768px)**: 2-column card grid with horizontally scrollable category pills.
- **Mobile (375px–430px)**: 1-column card stack; touch-first category chips; $\ge 44\text{px}$ touch targets.
- **Search Ergonomics**: Instant client-side filtering without debounce; keyboard activation via `/`; `Esc` clears search.

## 7. Constraints
- Framework: Vite + React 19 + TypeScript + Tailwind CSS in `web-2.0`.
- Accessibility: WCAG 2.1 AA compliant; directional glyphs (`▲`/`▼`) alongside color; full keyboard navigation.
