# OmniMarketX Component Inventory

Catalog of reusable UI components observed across OmniMarketX.

---

## 1. Shell & Navigation Components

### `AppLayout`
- Top-level wrapper managing fixed left sidebar, top header, scrollable main body, and contextual right rail.

### `Sidebar`
- Desktop fixed navigation rail (~240px width).
- Top: OmniMarketX brand mark and title.
- Navigation links: `Home`, `Wallet`, `Markets`, `Trending`, `Activity`, `Leaderboard`, `Social`, `Groups`, `Portfolio`, `Settings`.
- Active state: Pill container with brand gradient / glowing highlight.
- Bottom: `ThemeSwitcher` dropdown selector.

### `Header`
- Sticky top bar.
- Global search input field with keyboard shortcut indicator `/`.
- Unauthenticated state: `Sign In` text link and `Sign Up` gradient CTA button.
- Authenticated state: User wallet balance badge and profile avatar dropdown.

### `ThemeSwitcher`
- Dropdown select or button at sidebar footer.
- Supports `Light` and `Dark` modes.
- Switches `data-theme` attribute on root element.

---

## 2. Market Components

### `MarketCard`
- Standard discovery card used in grids and carousels.
- Anatomy:
  - Top row: Category tag badge (e.g. `⚽ SPORTS`, `🎮 GAMING`), star favorite toggle.
  - Title row: Category icon + bold market question text.
  - Metrics row: Implied probability percentage (e.g. `50%`), delta pill (`↑ 0%`).
  - Visual indicator: Horizontal colored progress fill bar.
  - Meta row: Volume (`Vol $1`) and trader count (`1 traders`).
  - Action buttons: Quick trade chips (`YES 50¢`, `NO 50¢`).

### `MarketCardSkeleton`
- Loading placeholder matching `MarketCard` dimensions with pulsing animation.

### `HorizontalScroll` / `MarketCarousel`
- Horizontal slider container with left `<` and right `>` navigation arrow buttons.

### `SectionHeader`
- Header bar featuring bold section title (e.g. `🔥 Top Markets`, `Market Movers`) and a `View All` navigation link.

### `PriceHistoryChart`
- SVG line chart powered by Recharts.
- Shows historical trajectories for `YES` (green) and `NO` (red) share prices.
- Supports timeframe buttons: `1D`, `1W`, `1M`, `ALL`.

### `TradeOrderSlip`
- Sticky right-rail execution widget on `/markets/:id`.
- Controls:
  - `Real` vs `Demo` segmented toggle.
  - `Buy` vs `Sell` tabs.
  - `YES` vs `NO` outcome buttons.
  - Amount input + quick preset chips (`$10`, `$50`, `$100`, `Max`).
  - Payout & return summary calculations.
  - Primary execution CTA (`Sign Up to Trade` / `Buy Shares`).

---

## 3. Social & Group Components

### `CreatePostBox`
- Post composition card at top of `/social`.
- User avatar, text input area, and attachment action toolbar (`Market`, `Image`, `Poll`, `Post`).

### `SocialPostCard`
- Community post card.
- User avatar, name, handle, relative timestamp.
- Sentiment pill: `BULLISH` (green) or `BEARISH` (red).
- Content: Post text, optional attached `MarketCard` preview.
- Footer actions: Like (heart), Comment (bubble), Repost (arrows), Bookmark, Share.

### `StoryCircle`
- Circular avatar ring component for stories bar with brand gradient outline.

### `GroupCard`
- Community card on `/groups`.
- Group avatar, title, description, category badge, member count, and `Join` / `Joined` button.

---

## 4. Analytical & Dashboard Components

### `RadialGauge` (`LiveMarketPulse`)
- Semi-circular radial gauge (0 to 100) displaying platform-wide volatility.
- Volatility text status badge (*"Low Volatility"*).

### `Sparkline`
- Compact inline SVG line chart without axes used in `/trending` table rows.

### `PodiumCard`
- Ranked card for 1st, 2nd, and 3rd place forecasters on the `/leaderboard`.

---

## 5. Modals & Overlays

### `AuthModal`
- Pixel-faithful Privy authentication dialog.
- Email input with Submit button.
- Social OAuth buttons (`Google`, `Apple`).
- Web3 wallet connect option (`MetaMask`, `Phantom`, `Coinbase Wallet`, `WalletConnect`).

### `SearchDropdown`
- Floating panel under search input displaying categorized results for `MARKETS` and `POSTS`.

### `ProtectedGateCard`
- Reusable unauthenticated shield card with lock icon, explanatory message, and `Sign In` button.
