# Milestone 8 — Web-2.0 Information Architecture & Surface Taxonomy
## OmniMarketX Structural Blueprint

**Target**: `web-2.0` Information Architecture & Navigation Strategy  
**Baseline**: `research/m7-ux-audit.md`, `research/m8-prioritization.md`, `research/m8-user-journeys.md`  
**Status**: Authoritative IA Specification  
**Rules**: `web-1.0` is strictly frozen. IA design and mapping only.

---

## 1. User Jobs-to-Be-Done (JTBD) Mapping

Information architecture in `web-2.0` is structured strictly around the **9 Core User Jobs**, rather than technical routing conveniences:

| User Job-to-Be-Done | User Need / Intended Outcome | Target Surface(s) | Primary Information Artifacts |
|:---|:---|:---|:---|
| **1. Understand OmniMarketX** | Grasp binary event trading, payout mechanics, and safety rules without reading dense whitepapers. | `/home` (Hero Explainer), Global Modal (`How it Works`) | 3-step visual cards, interactive odds simulator, $1.00 resolution diagram. |
| **2. Discover Events** | Explore curated, culturally urgent, or high-volume prediction propositions across categories. | `/home`, `/markets`, `/trending` | Topic pills, volume sparklines, probability momentum tags (`RISING`), search overlay. |
| **3. Evaluate a Prediction** | Inspect historical odds, research resolution criteria, review public consensus, and assess risk. | `/markets/:id` | Resolution Details card, Recharts interactive timeline, probability callout, order book depth. |
| **4. Make a Prediction** | Allocate a fiat or virtual budget to back YES or NO with clear payout and profit visibility. | Sticky Trade Slip (Desktop), Persistent Bottom Sheet (Mobile) | Dollar-first input, quick-budget chips, payout calculations, mode toggle (`Demo`/`Real`). |
| **5. Monitor Predictions** | Track open positions, current market value, probability shifts, and execute early cash-outs. | `/portfolio` | Net portfolio valuation, active positions list, resolution countdowns, `[Cash Out]` trigger. |
| **6. Discuss Predictions** | Debate hypotheses, explain reasoning, and react to market sentiment. | `/social`, `/markets/:id#discussions`, `/groups/:id` | Sentiment-tagged posts (`BULLISH`/`BEARISH`), attached market embeds, reaction counts. |
| **7. Discover People & Groups** | Connect with top forecasters in specific niches (Crypto, AI, Politics, Sports). | `/groups`, `/groups/:id`, `/social` (Leaderboard Rail) | Group directory, category filters, member rosters, curated community market feeds. |
| **8. Understand Performance** | Review personal accuracy, inspect historical trade fills, and study the leaderboard. | `/activity`, `/leaderboard`, `/user/:id` | Chronological execution log, ROI ranking podiums, win rates, historical prediction receipts. |
| **9. Manage Account** | Deposit/withdraw funds, adjust display themes, manage notifications, and ensure security. | `/wallet`, `/settings`, User Flyout Menu | Dual balance cards, fiat/crypto deposit gateways, Dark/Light switcher, session controls. |

---

## 2. Desktop Navigation Architecture (1440px Viewport)

Desktop navigation must balance rapid exploration with clear account status and financial visibility.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [LOGO] OmniMarketX   Markets   Trending   Social   Groups   Leaderboard   │   [Search ( / )]   [$10,000 DEMO]   [AVATAR] │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### A. Primary Navigation Bar (Top Left)
- **Brand Identity**:
  - `OmniMarketX Logo`: Direct link to `/home` (or `/markets` if authenticated and preferred).
- **Core Global Links**:
  1. **`Markets`** (`/markets`): The comprehensive prediction catalog with category filtering and instant search.
  2. **`Trending`** (`/trending`): High-velocity markets, recent volume spikes, and macro volatility pulse.
  3. **`Social`** (`/social`): Community prediction feed, forecaster hypotheses, and sentiment debates.
  4. **`Groups`** (`/groups`): Dedicated topical communities with category hubs.
  5. **`Leaderboard`** (`/leaderboard`): Top ROI rankings, monthly competition pools, and the new Demo Arena.
- **Active Route Indicator**: Every primary link features a crisp, glowing bottom gradient bar (`#f23064` to `#ff4f55`) when active, ending the visual disorientation documented in `F-08`.

### B. Secondary Utilities & Account Zone (Top Right)
- **Global Search Input**:
  - Compact search bar with `/` keyboard shortcut badge.
  - Expandable autocomplete overlay categorizing instant results into `MARKETS`, `TOPICS`, and `FORECASTERS`.
- **Mode & Balance Capsule**:
  - **Demo State**: Violet pill reading `🎮 $10,000.00 DEMO` (clicking opens a quick-reset/faucet dropdown).
  - **Real State**: Emerald pill reading `💎 $250.00 USDC` (clicking opens the quick-deposit drawer).
- **User Profile Capsule**:
  - Displays user avatar initials (`DE`) with online status dot.
  - **Dropdown Menu**:
    - `Portfolio` (`/portfolio`): Direct link with active positions counter.
    - `Wallet` (`/wallet`): Balance management and deposit/withdrawal history.
    - `Activity` (`/activity`): Personal trade fills and prediction audit log.
    - `Settings` (`/settings`): Theme, notifications, profile preferences.
    - `Log Out`: Clean session termination.
- **Unauthenticated State**:
  - Displays a clean secondary `Sign In` text link alongside a prominent gradient CTA button: **`Get Started`** (opening the unified auth modal in registration mode).

---

## 3. Mobile Navigation Architecture (375px Viewport)

### The Problem in web-1.0
On mobile screens, `Groups` and `Leaderboard` were completely buried inside an off-canvas hamburger drawer. Users exploring on mobile treated the product as a two-screen app (`/home` and `/markets`), missing the entire social and competitive retention loop (`F-10`).

### The Web-2.0 Solution: The Persistent 5-Tab Bottom Bar

```
┌─────────────────────────────────────────────────────────┐
│                      VIEWPORT CONTENT                   │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ⚡ GTA VI: 65% YES           [YES 65¢] | [NO 35¢]    │ │ ◄── Sticky Trade Bar (on Market Detail)
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│   [📊]       [🔥]         [💬]        [👥]        [💼]   │
│  Markets   Trending     Social      Groups    Portfolio │ ◄── Bottom Tab Bar (Global)
└─────────────────────────────────────────────────────────┘
```

1. **Tab 1: `Markets`** (`/markets`): Catalog, categories, search.
2. **Tab 2: `Trending`** (`/trending`): Velocity movers, hot debates.
3. **Tab 3: `Social`** (`/social`): Community feed, prediction posts.
4. **Tab 4: `Groups`** (`/groups`): Community hubs, topic channels (elevated from the hidden drawer).
5. **Tab 5: `Portfolio`** (`/portfolio`): Active wagers, open returns, cash balance.

### Mobile Top Utility Header
- **Left**: Compact OmniMarketX icon.
- **Center**: Search icon trigger (expands full-screen search sheet).
- **Right**: Mode badge (`🎮 $10k`) + Avatar icon (opens simplified settings and wallet sheet).

---

## 4. Detailed Surface Information Architecture

---

### Surface 1: Homepage (`/home`)

```
┌────────────────────────────────────────────────────────────────────────┐
│ HERO: "Predict the Future. Trade What Matters."                        │
│ [How It Works: 1. Pick Event ──► 2. Buy YES/NO ──► 3. Win $1.00]      │
├────────────────────────────────────────────────────────────────────────┤
│ FEATURED STORY / MARKET OF THE DAY (Interactive Dual Probability Bar)  │
├────────────────────────────────────────────────────────────────────────┤
│ CATEGORY SELECTOR (All | 🎮 Gaming | ₿ Crypto | 🗳 Politics | ...)    │
├────────────────────────────────────────────────────────────────────────┤
│ TOP MARKETS CAROUSEL (High Volume, Arrow-Navigated)                    │
├────────────────────────────────────────────────────────────────────────┤
│ 2-COLUMN DISCOVERY GRID:                                               │
│ Left: Breaking Movers (Real Volatility)  Right: Hot Community Debates  │
├────────────────────────────────────────────────────────────────────────┤
│ SOCIAL PROOF / VALUE FOOTER: $4.2M Verified Volume · Instant Payouts   │
└────────────────────────────────────────────────────────────────────────┘
```

- **Primary Job**: Educate the visitor within 10 seconds and guide them to a high-conviction market.
- **Key Changes from web-1.0**:
  - Elimination of non-interactive decorative hero pills (`F-05`).
  - Addition of the persistent **3-Step "How It Works" Visual Explainer Banner** (`INIT-02`).
  - Inclusion of verified platform volume and activity metrics to establish social proof (`F-06`).

---

### Surface 2: Markets Catalog (`/markets`)

```
┌────────────────────────────────────────────────────────────────────────┐
│ UNIFIED TOOLBAR: [Search markets ( / )] [Categories ▼] [Sort: Vol ▼]   │
├────────────────────────────────────────────────────────────────────────┤
│ QUICK FILTER CHIPS: [🔥 High Volume] [⚡ Rising] [🕒 Closing Soon]      │
├────────────────────────────────────────────────────────────────────────┤
│ MARKET CARDS GRID (3 Columns Desktop / 1 Column Mobile)                │
│ - Title & Category Tag                                                 │
│ - Closing Date & Resolution Source                                     │
│ - Large Probability Bar (e.g. 65% YES)                                 │
│ - Action Buttons: [Buy YES 65¢ (65%)] [Buy NO 35¢ (35%)]               │
│ - Status Badge (ACTIVE | RESOLVED)                                     │
├────────────────────────────────────────────────────────────────────────┤
│ RIGHT RAIL (Desktop): Active User Holdings & Market Watchlist          │
└────────────────────────────────────────────────────────────────────────┘
```

- **Primary Job**: Rapidly filter, search, and evaluate events.
- **Key Changes from web-1.0**:
  - Consolidation of competing sort/filter bars into a single unified toolbar (`INIT-24`).
  - Cards explicitly show both cents and implied probability percentages (`INIT-06`).
  - Expired markets clearly demarcated with `RESOLVED` stamps and muted opacity (`INIT-13`).
  - Right rail replaced with personal watchlist and active holdings rather than redundant trending lists (`INIT-25`).

---

### Surface 3: Market Detail & Trade Desk (`/markets/:id`)

```
┌──────────────────────────────────────────────────┬─────────────────────┐
│ BREADCRUMBS: Home > Markets > Gaming > GTA VI    │ STICKY ORDER SLIP   │
├──────────────────────────────────────────────────┤ ┌─────────────────┐ │
│ MARKET HEADER: Title, Favorite Star, Share Link  │ │ [Real] | [Demo] │ │
│ Statistics: Vol $48.2K · 1.2K Traders · Nov 2026 │ ├─────────────────┤ │
├──────────────────────────────────────────────────┤ │ Outcome:        │ │
│ PROBABILITY CALLOUT: 65% YES (65¢) | 35% NO (35¢)│ │ [ YES ]  [ NO ] │ │
├──────────────────────────────────────────────────┤ ├─────────────────┤ │
│ INTERACTIVE CHART: 1D | 1W | 1M | ALL            │ │ Budget ($):     │ │
│ - Line with historical probability & price tags  │ │ [$25] $10 $50   │ │
│ - Y-axis clearly labeled: Probability (%) & ¢    │ ├─────────────────┤ │
├──────────────────────────────────────────────────┤ │ Math Summary:   │ │
│ RESOLUTION RULES CARD:                           │ │ Stake:   $25.00 │ │
│ - Exact settlement condition                     │ │ Shares:    38.4 │ │
│ - Verified Oracle / Data Source                  │ │ Payout:  $38.46 │ │
│ - Closing Date & Time (UTC)                      │ │ Profit: +$13.46 │ │
├──────────────────────────────────────────────────┤ ├─────────────────┤ │
│ COMMUNITY DEBATE & COMMENTS FEED                 │ │ [✓] Share post  │ │
│ - Forecaster comments with BULLISH/BEARISH tags  │ ├─────────────────┤ │
│ - Market-specific sentiment poll                 │ │ [Place Order]   │ │
└──────────────────────────────────────────────────┴─┴─────────────────┴─┘
```

- **Primary Job**: Deliver complete resolution certainty and frictionless trade execution.
- **Key Changes from web-1.0**:
  - Re-architecture of the Trade Slip hierarchy (`UI-01`): Outcome selection first, then dollar budget input, followed by clear stake vs. net profit vs. gross payout breakdown.
  - Addition of explicit units on chart axes (`INIT-21`).
  - Integration of in-market sentiment debates below the resolution card.

---

### Surface 4: Portfolio Dashboard (`/portfolio`)

```
┌────────────────────────────────────────────────────────────────────────┐
│ BROKERAGE SUMMARY:                                                     │
│ [Portfolio Value: $10,142.50]  [Cash: $9,850.00]  [Invested: $292.50]  │
│ [Total Return: +$142.50 (+1.42%)]                                      │
├────────────────────────────────────────────────────────────────────────┤
│ TABS: [Active Predictions (4)]  [Settled / History (12)]               │
├────────────────────────────────────────────────────────────────────────┤
│ ACTIVE POSITIONS TABLE:                                                │
│ Market | Pick | Shares | Avg Cost | Cur. Price | Projected Win | Action│
│ ───────┼──────┼────────┼──────────┼────────────┼───────────────┼────── │
│ GTA VI | YES  | 100.0  | 65¢      | 72¢ (+10%) | $100.00       | [Exit]│
│ BTC 70k| NO   | 50.0   | 40¢      | 32¢ (-20%) | $50.00        | [Exit]│
├────────────────────────────────────────────────────────────────────────┤
│ SETTLEMENT RADAR: Next closing market count-down bar                   │
└────────────────────────────────────────────────────────────────────────┘
```

- **Primary Job**: Track performance, calculate expected settlement payouts, and exit positions early.
- **Key Changes from web-1.0**:
  - Addition of direct **`[Exit / Cash Out]`** action buttons on every active position row (`INIT-09`).
  - Plain-English labeling replacing "Unrealized P&L" with "Total Return" and "Projected Win" (`CNT-02`).
  - Introduction of a "Settlement Radar" showing upcoming resolution milestones.

---

### Surface 5: Community Groups Hub (`/groups` & `/groups/:id`)

```
┌───────────────────────────────────────────────┐ ┌────────────────────────────────────────┐
│ DIRECTORY (/groups):                          │ │ GROUP SPACE (/groups/:id):             │
│ - Discover, My Groups, Popular Tabs           │ │ - Cover Header: "AI Forecasters Hub"   │
│ - Category Filter Pills                       │ │ - Membership Bar: 1,420 Members · Join │
│ - Search Input                                │ │ - Curated Group Market Feed            │
│ - Group Cards: Avatar, Title, Count, [Join]   │ │ - Community Debate Thread              │
│ - Right Rail: Top Groups & Active Discussions │ │ - Group Forecaster Leaderboard         │
└───────────────────────────────────────────────┘ └────────────────────────────────────────┘
```

- **Primary Job**: Provide specialized topical homes for collaborative forecasting.
- **Key Changes from web-1.0**:
  - Creation of dedicated **Group Hub Pages (`/groups/:id`)** to resolve the dead-end directory flaw (`INIT-10`).
  - Session-scoped join status eliminating public guest data leaks (`INIT-11`).
  - Group-curated market lists allowing communities to debate and predict together.

---

### Surface 6: Competitive Leaderboard (`/leaderboard`)

```
┌────────────────────────────────────────────────────────────────────────┐
│ HEADER: Compete with the Top Forecasters                               │
│ REWARDS HERO CARD: $250,000 Monthly Cash Pool · 12 Days Remaining      │
├────────────────────────────────────────────────────────────────────────┤
│ COMPETITION TABS: [Real Capital Arena]  [🎮 Demo Sandbox Arena] (NEW) │
├────────────────────────────────────────────────────────────────────────┤
│ TIMEFRAME PILLS: [Daily]  [Weekly]  [Monthly]  [All-Time]              │
├────────────────────────────────────────────────────────────────────────┤
│ TOP 3 PODIUM DISPLAY (Gold #1, Silver #2, Bronze #3 with Badges)       │
├────────────────────────────────────────────────────────────────────────┤
│ RANKINGS TABLE (Interactive Rows Linking to /user/:id):                │
│ Rank | Forecaster | P&L / ROI % | Win Rate % | Predictions | Follow    │
├────────────────────────────────────────────────────────────────────────┤
│ EMPTY STATE HANDLING: Honest countdown: "Competition settles in X days"│
└────────────────────────────────────────────────────────────────────────┘
```

- **Primary Job**: Incentivize accuracy, provide transparent rankings, and offer forecaster emulation.
- **Key Changes from web-1.0**:
  - Introduction of the **Demo Arena** tab, connecting practice trading to competitive progression (`INIT-15`).
  - Clickable forecaster rows deep-linking to user profile cards (`PRD-02`).
  - Elimination of the stark contradiction between the $250k rewards banner and the empty monthly table via honest settlement countdowns.

---

## 5. Master URL Routing & Screen Taxonomy Matrix

| URL Route | Access Policy | Primary Layout | Page Component | Sub-Views / Drawer States |
|:---|:---|:---|:---|:---|
| `/home` | Public | Full-width Hero + Grid | `HomePage` | Explainer Modal, Search Sheet |
| `/markets` | Public | Catalog + Right Watchlist | `MarketsPage` | Quick Filter Drawer, Grid/List |
| `/markets/:id` | Public | 2-Column Split (Left Content / Right Sticky Slip) | `MarketDetailPage` | Mobile Trade Sheet, Share Dialog |
| `/trending` | Public | Ranked List + Macro Rail | `TrendingPage` | Sparkline Zoom, Volatility Modal |
| `/social` | Public | Feed Stream + Right Rail | `SocialPage` | Post Composer Modal, Image Viewer |
| `/groups` | Public | Directory Grid + Right Rail | `GroupsPage` | Create Group Modal |
| `/groups/:id` | Public | Channel Header + Group Feed | `GroupDetailPage` *[NEW]* | Member Roster, Topic Chat |
| `/leaderboard` | Public | Podium + Rankings Table | `LeaderboardPage` | Demo Arena vs Real Arena |
| `/user/:id` | Public | Profile Header + History | `UserProfilePage` *[NEW]* | Track Record, Active Holds |
| `/portfolio` | Protected (Shield) | Brokerage Cards + Table | `PortfolioPage` | Cash-Out Modal, Order Fills |
| `/wallet` | Protected (Shield) | Dual Balance Cards + Log | `WalletPage` | Simulated Deposit Drawer |
| `/activity` | Protected (Shield) | Chronological Stream | `ActivityPage` | Transaction Receipt Sheet |
| `/settings` | Protected (Shield) | Form Sections + Switches | `SettingsPage` | Theme, Notifications, Session |

---

*Document established in `research/m8-information-architecture.md`.*
