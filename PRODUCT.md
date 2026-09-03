# OmniMarketX Product Specification

## 1. Product Overview
OmniMarketX is a web-based prediction market and social trading platform located at `https://www.omnimarketx.com`.

The platform combines binary prediction markets on real-world events (spanning sports, politics, crypto, gaming, economy, entertainment, and tech) with social community interaction, group discussions, and competitive leaderboard reward pools.

### Taglines & Brand Positioning
- **Primary Tagline**: *"The World’s Leading Social Prediction Market.™"*
- **Mission Statement**: *"Trade on real-world events with crypto, instant payouts, and zero fees."*
- **Four Core Value Pillars**:
  1. **Trade What Matters**: Turn predictions into real or practice opportunities.
  2. **Follow Top Predictors**: Track expert moves, learn strategies, and monitor performance.
  3. **Discuss & Share**: Debate hypotheses, share insights, and post with sentiment indicators.
  4. **Win Rewards**: Compete on leaderboards for monthly reward pools ($250,000 pool).

---

## 2. Core User Value Proposition
1. **Event Monetization**: Users express convictions on real-world outcomes by purchasing shares corresponding to binary outcomes (`YES` or `NO`).
2. **Risk-Free Learning**: A built-in Practice/Demo mode provides 10,000 virtual USDC to allow users to trade without financial exposure.
3. **Social Prediction Network**: Forecasts are publicly shared as social proof, enabling debate, followership, and community validation.
4. **Community Collaboration**: Dedicated interest-based groups facilitate shared research and discussion.

---

## 3. Primary User Types / Personas (Supported by Research)
- **Prediction Speculator**: Trades on high-conviction events across crypto, politics, entertainment, and sports using real capital.
- **Practice / Demo Trader**: Uses the 10,000 virtual USDC sandbox to learn market dynamics, test forecasting models, and generate verified demo predictions without financial risk.
- **Social Forecaster**: Shares market hypotheses, creates posts with `BULLISH` or `BEARISH` sentiment tags, engages in debates, and tracks follower reactions.
- **Group Participant**: Joins niche topical communities (e.g. *Entertainment predictions insights*) to discuss specific market categories.

---

## 4. Core Product Concepts
- **Market Question**: A clear, binary real-world proposition (e.g., *"Will BNB close above US$3,000 by 31 December 2026?"*).
- **Outcome Shares**: Binary contracts (`YES` and `NO`). Each share resolves to $1.00 (100¢) if the condition occurs, or $0.00 (0¢) if it does not.
- **Probability / Share Price**: Market pricing reflects implied probability in cents (e.g., 50¢ = 50% probability).
- **Trading Modes**:
  - **Real Trading**: Trading with deposited capital (USDC via on-ramps or crypto wallets).
  - **Demo Trading**: Practice trading with an allocated virtual balance of 10,000 USDC.
- **Demo Prediction**: A practice trade automatically formatted and shared as a verified social prediction badge (`🎮 Demo Prediction`).
- **Resolution Details**: The legal/operational rules, data source, and closing date defining how a market settles.

---

## 5. Prediction Market Model
- **Pricing Mechanics**:
  - The sum of `YES` and `NO` share prices approximates 100¢ ($1.00).
  - Observed baseline markets display 50¢ `YES` / 50¢ `NO` (50% probability) with 0% delta upon initial creation.
  - As trading occurs, prices fluctuate between 1¢ and 99¢ based on market sentiment and order volume.
- **Timeframes**:
  - Price trajectory charts support 4 historical ranges: **`1D`**, **`1W`**, **`1M`**, and **`ALL`**.
- **Settlement & Payout**:
  - Markets close on a predefined date (e.g. `Nov 8, 2026`).
  - An official resolution source verifies the outcome.
  - Holders of the correct share outcome receive $1.00 per share; holders of the incorrect outcome receive $0.00.

---

## 6. Market Discovery
The platform provides four primary discovery mechanisms:

### A. Homepage (`/home`)
- **Hero Topic Cards**: Floating interactive badges for `Sports`, `Politics`, `Crypto`, `Tech`, and `Economy`.
- **Category Filter Pills**: Horizontal selector (`All`, `🎮 Gaming`, `₿ Crypto`, `🗳 Politics`, `⚽ Sports`, `💰 Economy`, `🎬 Entertainment`, `🤖 Tech`).
- **🔥 Top Markets Carousel**: High-volume/featured markets displayed horizontally with `<` and `>` arrow navigation.
- **Market Movers Ticker**: Compact cards showing markets with recent momentum and percentage deltas (`↑ +0.00%`).

### B. Markets Catalog (`/markets`)
- **Header & Search**: Search bar (`Search markets...`, shortcut `/`) and Grid/List view toggle buttons.
- **Category Filter Row**: Instant category filtering.
- **Sort Toolbar**: Sort by `Volume`, `Newest`, or `Probability`.
- **Right Rail Quick Filters**: Filter tags for `HIGH VOLUME`, `RISING`, `FALLING`, `NEW`, `CLOSING SOON`, and `FAVORITES`.

### C. Trending Page (`/trending`)
- **Ranked Leaderboard**: Ranked list (1 to 10) displaying rank badge, category icon, market title, volume, active traders, mini SVG sparkline, and quick `YES` / `NO` buttons.
- **Live Market Pulse**: Right-rail radial half-donut gauge (0–100 scale) displaying platform-wide volatility.
- **Top Volume Movers**: Ranked summary of markets with highest recent volume.

### D. Global Search Autocomplete
- Global search input in the top header.
- Dropdown overlay categorizes instant results into:
  - **`MARKETS`**: Title, icon, and category.
  - **`POSTS`**: User avatar initials, name, and post snippet.

---

## 7. Market Detail Experience (`/markets/[id]`)
- **Breadcrumbs**: Hierarchical navigation (`Home > Markets > [Category] > [Market Title]`).
- **Market Header**: Category tag, title, share link button, and favorite star toggle.
- **Key Statistics Row**: Volume (e.g. `$0`), Active Traders (e.g. `0 traders`), and Closing Date (e.g. `Nov 8, 2026`).
- **Probability Display**: Prominent percentage (e.g. `50%`) with visual legend (`● YES 50¢`, `● NO 50¢`).
- **Interactive Price History Chart**: Line chart displaying historical price paths for YES and NO across `1D`, `1W`, `1M`, and `ALL` ranges.
- **Market Details Card**: Explicit text describing resolution rules, official data source, category ID, creation timestamp, and closing timestamp.
- **Right Rail Order Slip**: Sticky panel for trade execution.

---

## 8. Trading & Demo Trading Workflow

### Order Slip Structure
1. **Mode Switcher**: Segmented toggle between **`Real`** and **`Demo`**.
2. **Order Type**: Tabs for **`Buy`** (default) and **`Sell`**.
3. **Outcome Selection**:
   - `YES [price]¢` button (green outline/fill).
   - `NO [price]¢` button (red outline/fill).
4. **Amount Input**:
   - Numeric input field for dollar/share amount.
   - Quick preset amount chips (`$10`, `$50`, `$100`, `Max`).
5. **Calculations Display**:
   - Average Price
   - Total Shares
   - Potential Return (e.g., `+100.0%`)
   - Max Payout
6. **Execution Gate**:
   - When authenticated: `Buy YES Shares` / `Buy NO Shares`.
   - When unauthenticated: `Sign Up to Trade` button with secondary `Sign In` link. Clicking either triggers the Privy authentication modal.

### Demo Mode Rules
- Toggling `Demo` displays the notice:
  > *"DEMO TRADING MODE — TRADING WITH 10,000 USDC IN VIRTUAL FUNDS, NOT REAL MONEY"*
- Demo trades are safely isolated from real funds.
- Demo trades are broadcast to the social feed as `🎮 Demo Prediction`.
- **Demo payment mechanism not observed**: There is no virtual deposit checkout or faucet UI; the 10,000 USDC virtual balance is pre-allocated.

---

## 9. Portfolio (`/portfolio`)
- **Access**: Protected route requiring user authentication.
- **Unauthenticated View**: Dark card with a lock shield icon, title *"Sign in required"*, subtitle *"Sign in to view your positions and trade history"*, and a *"Sign In"* CTA button.
- **Authenticated Features** `[INFERRED from bundle]`:
  - Total Portfolio Value
  - Available Cash Balance
  - Invested Balance
  - Unrealized Profit/Loss (P&L)
  - Active Positions Table: Market question, outcome held (`YES`/`NO`), share count, average purchase price, current market price, total value, and P&L.

---

## 10. Wallet (`/wallet`)
- **Access**: Protected route requiring user authentication.
- **Unauthenticated View**: Centered lock card *"Sign in required — Sign in to deposit, withdraw, and manage your balance."*
- **Observed Infrastructure** `[OBSERVED in bundle/API]`:
  - Balances endpoint (`/api/v1/wallet/balance`).
  - Deposit intent management (`/wallet/deposit-intents`, `/wallet/deposit-intents/privy`).
  - Fiat on-ramps: Stripe checkout (`/wallet/stripe-deposit/checkout`, `/api/v1/onramp/stripe`).
  - Crypto on-ramps: Coinbase on-ramp (`/api/v1/funding/coinbase_on_ramp`), MoonPay (`/api/v1/plugins/moonpay_on_ramp`), and direct wallet deposit addresses.
  - Payout & withdrawal management (`/wallet/withdraw`, `/wallet/payout-accounts`).

---

## 11. Social Features (`/social`)
- **Feed Navigation Tabs**:
  - `For You`: Algorithmic/recommended community posts.
  - `Following`: Posts exclusively from followed predictors.
  - `Top`: Highest engaged posts.
  - `Latest`: Reverse chronological stream.
- **Stories Bar**: Horizontal avatar circle bar starting with `"Your Story"` (`+` icon), followed by user avatars with glowing magenta/orange gradient rings.
- **Create Post Card**:
  - User avatar and *"What's on your mind?"* text input.
  - Action buttons:
    - `Market`: Attach a specific prediction market card to the post.
    - `Image`: Upload image media.
    - `Poll`: Create a community poll.
    - `Post`: Submit button.
- **Post Card Elements**:
  - Author avatar, full name, username handle, and relative timestamp.
  - Sentiment Tag: Optional colored badge displaying **`BULLISH`** (green) or **`BEARISH`** (red).
  - Prediction Event: Distinct badge for trades (`🎮 Demo Prediction — I predicted YES on [Market Title]`).
  - Interaction Toolbar: Like button (with count), Comments button (with count), Repost button, Bookmark button, and Share button.
- **Right Rail**: Trending Hashtags list (`#omnimarketx`, `#futurefoundry`, `#producttesting`, `#predictionmark`, `#fintech`, etc.).

---

## 12. Groups (`/groups`)
- **Tabs**: `Discover`, `My Groups`, `Popular`.
- **Search & Creation**: Search input for group names and a `+ Create Group` button.
- **Group Cards**:
  - Group avatar image.
  - Title (e.g., *"Entertainment predictions insights"*).
  - Description (e.g., *"Talking about entertainment markets"*).
  - Category tag badge (e.g., `🎬 Entertainment`).
  - Member count (e.g., `29 members`).
  - Primary `Join` button.
- **Right Rail**: Summary cards for `Top Groups This Week` and `Active Discussions`.

---

## 13. Leaderboard (`/leaderboard`)
- **Reward Callout Card**: Top right card displaying a trophy icon, the label *"Monthly rewards"*, and the prize pool amount: **`$250,000`**.
- **Timeframe Selector**: Segmented tabs for **`Daily`**, **`Weekly`**, **`Monthly`**, and **`All Time`**.
- **Category Filter Pills**: Filter leaderboards by market category.
- **Sort Dropdown**: Sort by `Highest ROI` or custom filters.
- **Rankings Display**:
  - Podium display for Top 3 forecasters (1st, 2nd, 3rd) with avatar, username, total profit, and win rate.
  - Ranked table for remaining forecasters.
- **Right Rail**: `Fastest Rising` traders and `Trending Now` predictors.

---

## 14. Activity (`/activity`)
- **Access**: Protected route requiring user authentication.
- **Unauthenticated View**: Centered lock card *"Sign in required — Sign in to view your trading activity."*
- **Authenticated Function** `[INFERRED]`: Chronological log of orders placed, shares bought/sold, deposits, withdrawals, and market resolution payouts.

---

## 15. Settings (`/settings`)
- **Access**: Protected route requiring user authentication.
- **Unauthenticated View**: Centered lock card *"Sign in required — Sign in to manage your account, security, and preferences."*
- **Authenticated Function** `[INFERRED from bundle]`:
  - Profile information (username, avatar, bio).
  - Notification preferences (market resolutions, social mentions, trade fills).
  - Appearance preferences (Theme switcher: Light / Dark).
  - Security, passkeys, and connected wallets/accounts (`/api/v1/users/me`).

---

## 16. Authentication Architecture
- **Identity Provider**: Privy (`Protected by privy`).
- **Trigger**: Clicked via top-right header `Sign In`, `Sign Up`, or any protected action/route CTA.
- **Unified Dialog**: A single modal titled **"Log in or sign up"** with the subtitle **"Choose a sign in method"**.
- **Methods**:
  1. **Email**: Single input (`your-email@example.com`) + `Submit` button. Triggers a passwordless 6-digit verification code (OTP) sent to the user's inbox. No user password field exists.
  2. **Social SSO**: `Continue with Google` and `Continue with Apple`.
  3. **Web3 Wallets**: `Continue with a wallet` (MetaMask, Coinbase Wallet, Phantom, Rainbow, Solflare, WalletConnect).
- **Backend Sync**: Upon authentication, the client calls `POST /api/v1/auth/privy/sync` to create or update the user record in the OmniMarketX database.

---

## 17. Protected Routes
The following routes are gated behind authentication:
- `/wallet`
- `/portfolio`
- `/activity`
- `/settings`
- Trade execution button on `/markets/[id]`

All public routes (`/home`, `/markets`, `/trending`, `/social`, `/groups`, `/leaderboard`) remain fully browsable without logging in.

---

## 18. Major User Journeys

### Journey 1: Market Discovery to Practice Trading
1. Visitor arrives at `/home` or `/markets`.
2. Filters by category (`🎮 Gaming`) or enters search query (`GTA VI`).
3. Clicks market card to open Market Detail page (`/markets/[id]`).
4. Reads market title, probability, and Resolution Details card.
5. In the right order slip, toggles **`Demo`** mode.
6. Selects **`YES`** or **`NO`**, enters amount (e.g. `$50`), and reviews potential payout.
7. Clicks `Sign Up to Trade` -> Privy modal opens -> User completes email OTP or wallet sign-in -> Practice trade is executed -> Position appears in `/portfolio` -> Trade is shared to `/social` as `🎮 Demo Prediction`.

### Journey 2: Social Discussion to Market Execution
1. User visits `/social` feed.
2. Browses community posts under `For You` or `Latest`.
3. Observes a post with a `BEARISH` sentiment tag and an attached prediction market card.
4. Clicks the attached market card to inspect the live order book and price history.
5. Participates in the discussion or places a counter-position.

### Journey 3: Community Group Collaboration
1. User navigates to `/groups`.
2. Searches for a topic or clicks *Discover*.
3. Opens a group (e.g., *Entertainment predictions insights*).
4. Clicks `Join` to become a member and access active group discussions.

---

## 19. Navigation & Information Architecture

### Layout Shell
- **Left Navigation Sidebar (Desktop, ~240px)**:
  - Top: OmniMarketX logo (glowing orange/pink `M` mark + text) linking to `/home`.
  - Navigation links:
    - 🏠 `Home` (`/home`)
    - 💳 `Wallet` (`/wallet`)
    - 📊 `Markets` (`/markets`)
    - ⚡ `Trending` (`/trending`)
    - 📈 `Activity` (`/activity`)
    - 🏆 `Leaderboard` (`/leaderboard`)
    - 🌐 `Social` (`/social`)
    - 👥 `Groups` (`/groups`)
    - 💼 `Portfolio` (`/portfolio`)
    - ⚙️ `Settings` (`/settings`)
  - Bottom: Theme Selector dropdown (Sun/Moon icon, `Light` / `Dark` options).
- **Top Header**:
  - Global search bar with autocomplete dropdown and `/` keyboard shortcut.
  - Unauthenticated: `Sign In` text link and gradient `Sign Up` button.
  - Authenticated `[INFERRED]`: User balance pill and profile avatar menu.
- **Contextual Right Rail (Desktop)**:
  - Sticky sidebars providing market order slips, trending volatility gauges, trending hashtags, or active group discussions.
- **Persistent Floating Widgets**:
  - Right edge: Vertical purple `Feedback` button.
  - Bottom right: Zendesk chat bubble with dismissible tooltip (*"Hi. Need any help?"*).

---

## 20. Important Product Terminology
- **OmniMarketX / OMX**: The platform name and design token prefix.
- **Prediction Market**: An exchange-traded market created for speculating on event outcomes.
- **Outcome**: The specific result being purchased (`YES` or `NO`).
- **Probability**: The percentage likelihood implied by the current share price (e.g. 50¢ = 50%).
- **Share**: A unit of ownership in an outcome that settles at 100¢ ($1.00) if correct.
- **Real Trading**: Trading with actual monetary deposits (USDC).
- **Demo Trading / Practice Trading**: Simulated risk-free trading using virtual funds.
- **Virtual Funds**: Practice capital allocated as 10,000 USDC.
- **Demo Prediction**: A verified badge for practice trades shared on social feeds (`🎮 Demo Prediction`).
- **Resolution Details**: The settlement criteria, data source, and rules governing market resolution.
- **Market Movers**: Markets experiencing notable volume shifts or momentum.
- **Live Market Pulse**: A radial gauge measuring aggregate platform volatility.

---

## 21. Known Constraints
- **Authentication**: External dependency on Privy; relies on passwordless email OTP, Google/Apple OAuth, or Web3 wallet signatures.
- **Gated Demo Execution**: On the live website, practice trade execution is tied to an authenticated user ID.
- **No In-App Demo Faucet**: Virtual funds cannot be manually reset or re-deposited from a demo banking UI.
- **Liquidity in Early Markets**: Several newly created markets display 50% baseline probability with 0 volume and flat price history charts until user activity occurs.

---

## 22. Explicitly Unknown Behavior
1. `[UNKNOWN]`: Custom username selection and avatar onboarding sequence immediately following first-time email OTP verification.
2. `[UNKNOWN]`: Real-money KYC verification flows and specific fiat withdrawal provider modals.
3. `[UNKNOWN]`: Exact WebSocket payload format used by the live real-time price matching engine (`/api/v1/ws`).

---

## Source of Truth
Observed browser behavior > screenshots > DOM/computed styles > production CSS > production JS > API observations > assumptions.
