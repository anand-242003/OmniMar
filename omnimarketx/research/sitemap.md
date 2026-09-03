# OmniMarketX Sitemap & Information Architecture

## 1. Route Hierarchy

```
/ (Root)
│
├── 307 Redirect ──> /home (Public Homepage)
│
├── /markets (Public Market Discovery Catalog)
│   └── /markets/:id (Public Market Detail & Trading)
│
├── /trending (Public High-Volume & Volatility Dashboard)
│
├── /social (Public Social Feed & Post Creation)
│
├── /groups (Public Community Directory & Discussions)
│
├── /leaderboard (Public Forecaster Rankings & Prize Pool)
│
├── /activity (Protected Trading History)
│
├── /portfolio (Protected Positions & P&L)
│
├── /wallet (Protected Balances & Transactions)
│
└── /settings (Protected Account & Preferences)
```

---

## 2. Modal & Dialog Hierarchy

1. **Authentication Dialog (`AuthModal`)**:
   - Title: *"Log in or sign up"*
   - Subtitle: *"Choose a sign in method"*
   - Supported triggers: Header buttons, Trade order slip, Protected route gates
   - Views:
     - Main: Email input, Google OAuth, Apple OAuth, Wallet connect
     - Wallet selector: MetaMask, Coinbase Wallet, Phantom, Rainbow, Solflare, WalletConnect
2. **Global Search Autocomplete Dropdown (`SearchModal` / `SearchDropdown`)**:
   - Trigger: Header search input (shortcut `/`)
   - Results:
     - Section 1: `MARKETS` (matching market cards)
     - Section 2: `POSTS` (matching social posts and demo predictions)
3. **Group Creation Dialog (`CreateGroupModal`)**:
   - Trigger: `+ Create Group` button on `/groups`
   - Fields: Group name, description, category selector, visibility (`PUBLIC`/`PRIVATE`)
4. **Post Attachment Pickers**:
   - Market picker modal (select prediction market to attach to post)
   - Image upload dialog
   - Poll creation dialog

---

## 3. Layout Structure

### Global App Shell (`AppLayout`)
- **Left Navigation Rail (Desktop ~240px)**:
  - Brand logo link to `/home`
  - 10 Navigation items with active state pill highlight
  - Theme Switcher dropdown (`Light` / `Dark`) at bottom
- **Top Header Bar**:
  - Global Search input (`/`)
  - Unauthenticated: `Sign In` text link + `Sign Up` gradient button
  - Authenticated: Balance badge + Profile avatar
- **Main Viewport Area**:
  - Center fluid content column
- **Contextual Right Rail (Desktop only, ~340px)**:
  - `/markets/:id`: Sticky Trade Order Slip
  - `/trending`: Live Market Pulse gauge & Top Volume Movers
  - `/social`: Trending Hashtags
  - `/groups`: Top Groups This Week & Active Discussions
- **Floating Overlays**:
  - Right edge: Vertical `Feedback` tab
  - Bottom right: Floating `Hi. Need any help?` chat widget
