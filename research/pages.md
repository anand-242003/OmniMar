# OmniMarketX Page Specifications

Detailed functional and visual specifications for all 10 primary product surfaces observed on `https://www.omnimarketx.com`.

---

## 1. Homepage (`/home`)
- **Header Breadcrumb / Status**: None.
- **Hero Section**:
  - Main headline: *"The World’s Leading Social Prediction Market.™"*
  - Subtitle: *"Trade on real-world events with crypto, instant payouts, and zero fees."*
  - CTA 1: `Start Trading ->` (Navigates to `/markets`)
  - CTA 2: `How it Works ->`
  - Visuals: Central glowing globe surrounded by 5 topic cards (`Sports`, `Politics`, `Crypto`, `Tech`, `Economy`).
  - Right rail trust badges: *"Real-time Markets"*, *"Secure & Transparent"*, *"Community Driven"*, *"Win Real Rewards"*.
- **Category Filter Pills**:
  - Horizontal list: `All`, `🎮 Gaming`, `₿ Crypto`, `🗳 Politics`, `⚽ Sports`, `💰 Economy`, `🎬 Entertainment`, `🤖 Tech`.
- **Top Markets Carousel**:
  - Section Header: `🔥 Top Markets` with `View All` link to `/markets`.
  - Horizontal scroll container with `<` and `>` circular buttons.
  - Market Cards: Category tag, title, 50% probability baseline, volume, YES/NO buttons.
- **Market Movers Ticker**:
  - Section Header: `Market Movers` with `View All`.
  - Compact horizontal cards with icon, question title, and green pill `↑ +0.00%`.
- **Value Proposition Banner**:
  - 4-column cards with avatar photos:
    1. *Trade What Matters* ("Turn your predictions into real opportunities.")
    2. *Follow Top Predictors* ("Follow experts, track their moves and learn.")
    3. *Discuss & Share* ("Debate, share insights and grow together.")
    4. *Win Rewards* ("Compete on leaderboards and earn rewards.")

---

## 2. Markets Catalog (`/markets`)
- **Page Header**:
  - Breadcrumb: `Browse`
  - Title: `Markets`
  - Subtitle: `Explore all prediction markets. Trade on what you know.`
- **Inline Search Bar**: `Search markets...` with keyboard hint `/`.
- **View Toggle**: Grid icon vs. List icon.
- **Category Filter Row**: Full horizontal pill selector.
- **Market Count & Sort Bar**:
  - Left: Market count (e.g., `19 markets`).
  - Right: `Sort: Volume | Newest | Probability`.
- **Market Grid**:
  - Responsive cards (3 columns on wide desktop, 2 on tablet, 1 on mobile).
  - Star favorite icon, category badge, market title, large probability %, delta %, progress fill line, volume & traders count, `YES XX¢` / `NO XX¢` action buttons.
- **Right Rail (Desktop)**:
  - Card 1: `Quick Filters` (`HIGH VOLUME`, `RISING`, `FALLING`, `NEW`, `CLOSING SOON`, `FAVORITES`).
  - Card 2: `Sort` options with checkmark indicator.

---

## 3. Market Detail (`/markets/:id`)
- **Breadcrumbs**: `Home > Markets > [Category] > [Market Title]`.
- **Header**: Category tag, title, share link button, favorite star toggle.
- **Stats Row**: 3 key metrics cards:
  - `Volume`: Total volume traded (e.g. `$0` or `$15,420`).
  - `Traders`: Number of active participants.
  - `Closes`: Expiration/settlement date (e.g. `Nov 8, 2026`).
- **Probability Overview**: Prominent percentage (e.g. `50%`) with outcome legend (`● YES 50¢`, `● NO 50¢`).
- **Price History Line Chart**:
  - Interactive SVG line chart with dual series (YES line and NO line).
  - Timeframe selector: `1D`, `1W`, `1M`, `ALL`.
- **Resolution Details Card**:
  - Section title: `Market Details`.
  - Criteria: Text describing conditions for YES resolution.
  - Source: Official resolving authority.
  - Timestamps: Created date, Closes date.
- **Right Rail (Trade Order Slip)**:
  - `Real` vs `Demo` toggle.
  - `Buy` vs `Sell` tabs.
  - `YES` vs `NO` outcome buttons.
  - Share/Dollar input with quick amount chips.
  - Calculations: Avg Price, Shares, Potential Return, Max Payout.
  - Execution button: `Buy YES Shares` / `Sign Up to Trade`.

---

## 4. Trending Page (`/trending`)
- **Header**: `Trending` / `Real-time ranking of the most active markets.`
- **Category Filter Row**: Horizontal pills.
- **Top Trending Markets Table / Cards**:
  - Ranked rows (1 to 10): Rank number, category icon, title, category tag + volume, SVG sparkline, probability %, delta %, and quick `YES` / `NO` trade buttons.
- **Right Rail**:
  - `Live Market Pulse`: Half-donut radial meter (0–100) with volatility rating (*Low Volatility*).
  - `Top Volume Movers`: Mini list of top traded markets.

---

## 5. Social Feed (`/social`)
- **Header**: `Social` / `What predictors are saying and betting on right now.`
- **Tabs**: `For You`, `Following`, `Top`, `Latest`.
- **Stories Bar**: Circular avatar ring bar (`Your Story +`, followed by active user stories).
- **Create Post Box**:
  - User avatar + *"What's on your mind?"* text area.
  - Action buttons: `Market` (attach market card), `Image`, `Poll`, and `Post` submit button.
- **Post Stream**:
  - Cards with user avatar, name, handle, timestamp, and optional `BULLISH` (green) or `BEARISH` (red) sentiment badge.
  - Special `🎮 Demo Prediction` event cards showing predicted positions.
  - Engagement row: Like (heart), Comment (speech bubble), Repost (arrows), Bookmark, Share.
- **Right Rail**: `Trending Hashtags` list (`#omnimarketx`, `#futurefoundry`, etc.).

---

## 6. Groups (`/groups`)
- **Header**: `Groups` / `Join communities, share insights and grow together.`
- **Tabs**: `Discover`, `My Groups`, `Popular`.
- **Action Bar**: Search input and `+ Create Group` button.
- **Group Cards Grid**:
  - Avatar, Title, Description, Category badge, Member count, and `Join` button.
- **Right Rail**:
  - `Top Groups This Week`
  - `Active Discussions`

---

## 7. Leaderboard (`/leaderboard`)
- **Header**: `Leaderboard` / `Compete with the best predictors on OmniMarket X`.
- **Reward Card**: Top right badge with trophy icon, *"Monthly rewards"*, and **`$250,000`** pool.
- **Timeframe Selector**: `Daily`, `Weekly`, `Monthly`, `All Time`.
- **Category Filter Row**: Pill selector.
- **Sort Dropdown**: `Highest ROI` or custom filters.
- **Rankings**:
  - Podium display for 1st, 2nd, and 3rd place forecasters.
  - Ranked table for remaining users with Avatar, Name, P&L, Win Rate, and Total Trades.
- **Right Rail**: `Fastest Rising` and `Trending Now`.

---

## 8. Protected Pages (`/activity`, `/portfolio`, `/wallet`, `/settings`)
- **Unauthenticated View**:
  - Centered dark card featuring a lock shield icon.
  - Heading: `Sign in required`.
  - Subtitle explaining the gated feature:
    - `/portfolio`: *"Sign in to view your positions and trade history."*
    - `/wallet`: *"Sign in to deposit, withdraw, and manage your balance."*
    - `/activity`: *"Sign in to view your trading activity."*
    - `/settings`: *"Sign in to manage your account, security, and preferences."*
  - Action button: Primary `Sign In` button.
- **Authenticated View (Simulated in web-1.0)**:
  - `/portfolio`: Net portfolio value, cash balance, invested amount, P&L, and open positions table.
  - `/wallet`: Balances card (Real vs. Demo), mock deposit & withdrawal modals, transaction history.
  - `/activity`: Chronological log of orders, fills, and payouts.
  - `/settings`: Profile details, notification toggles, theme selector, security options.
