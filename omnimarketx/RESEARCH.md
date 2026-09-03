# OmniMarketX Research Synthesis & Master Index

## 1. Research Scope
- **Target Application**: OmniMarketX ([omnimarketx.com](https://www.omnimarketx.com))
- **Objective**: Structured, non-invasive reconnaissance of the public user interface, DOM architecture, CSS tokens, client bundle logic, API endpoints, authentication flows, and demo trading mechanics to prepare for a high-fidelity frontend reconstruction in `./web-1.0`.
- **Operating Constraints**: Strictly read-only research. No real-money transactions, deposits, or withdrawals.

---

## 2. Sources & Research Artifacts

### Detailed Research Documents
- [`research/account-flow.md`](file:///Users/anandmishra1/omnimarketx/research/account-flow.md): In-depth analysis of authentication architecture, Privy integration, and protected route access.
- [`research/demo-trading.md`](file:///Users/anandmishra1/omnimarketx/research/demo-trading.md): Practice trading environment, order slip anatomy, virtual balance allocation, and demo execution rules.
- [`research/onboarding.md`](file:///Users/anandmishra1/omnimarketx/research/onboarding.md): First-time visitor discovery hierarchy, value pillars, and resolution education.
- [`research/ux-findings.md`](file:///Users/anandmishra1/omnimarketx/research/ux-findings.md): UX friction points, severity ratings (P0–P3), and suggested enhancements.
- [`PRODUCT.md`](file:///Users/anandmishra1/omnimarketx/PRODUCT.md): Complete product specification and concepts.

### Visual & Technical Evidence
- **Screenshot Archive**: 30+ high-resolution screenshots saved under [`./screenshots/original/`](file:///Users/anandmishra1/omnimarketx/screenshots/original/) indexing all routes, modals, search results, and light/dark theme states.
- **Production CSS Tokens**: Direct extraction from `_next/static/chunks/0bih42lh0d_w7.css`.
- **Production JS Chunks**: Route mappings, endpoint manifests, and component class names extracted from client bundles.
- **Live API Responses**: Verified payloads from `https://api.omnimarketx.com/api/v1/` (`/categories`, `/markets/trending`, `/groups`, `/leaderboard`).

---

## 3. Discovered Routes & Surfaces [OBSERVED]

| Route | Classification | Primary Components & Function |
|---|---|---|
| `/` | Redirect | 307 redirect to `/home` |
| `/home` | Public | Hero banner, category pills, Top Markets horizontal carousel, Market Movers list, 4-column value proposition |
| `/markets` | Public | Full market catalog, search input (`/`), Grid/List view toggle, category pills, sort dropdown, right-rail quick filters |
| `/markets/:id` | Public | Market header, statistics, large probability callout, interactive Price History chart (1D, 1W, 1M, ALL), Resolution Details card, sticky Trade Order Slip |
| `/trending` | Public | Ranked leaderboard (1..10), volume sparklines, Live Market Pulse volatility gauge, Top Volume Movers |
| `/social` | Public | Feed tabs (For You, Following, Top, Latest), glowing story circles, create post box with market attachments, sentiment badges, hashtags rail |
| `/groups` | Public | Discover/My Groups/Popular tabs, search, `+ Create Group`, group cards, discussions rail |
| `/leaderboard` | Public | $250,000 monthly reward pool banner, Daily/Weekly/Monthly/All Time filters, podium & rank table, fastest rising rail |
| `/activity` | Protected | Unauthenticated: "Sign in required" shield. Authenticated: Trade and transaction history |
| `/portfolio` | Protected | Unauthenticated: "Sign in required" shield. Authenticated: Balance, open positions, P&L |
| `/wallet` | Protected | Unauthenticated: "Sign in required" shield. Authenticated: Balance, deposits, withdrawals, payout methods |
| `/settings` | Protected | Unauthenticated: "Sign in required" shield. Authenticated: Profile, notifications, security, preferences |

---

## 4. Discovered Product Areas [OBSERVED]
1. **Prediction Market Exchange**: Event-based binary outcome contracts (`YES`/`NO`) with prices between 1¢ and 99¢ representing market-implied probabilities.
2. **Practice / Demo Sandbox**: Risk-free environment pre-loaded with 10,000 virtual USDC.
3. **Social Prediction Network**: Community feed coupling market positions with commentary and `BULLISH`/`BEARISH` sentiment tags.
4. **Topic Groups**: Community spaces for collective research and discussion by category.
5. **Leaderboard & Competitions**: Competitive ROI rankings with monthly reward pool incentives.

---

## 5. Authentication Findings
- `[OBSERVED]`: Handled entirely via **Privy** (`@privy-io/react-auth`).
- `[OBSERVED]`: Single unified modal for both "Sign In" and "Sign Up" titled *"Log in or sign up"*.
- `[OBSERVED]`: Authentication methods:
  - **Email**: Single input field triggering a passwordless 6-digit One-Time Passcode (OTP) sent to the inbox. **No user password field exists**.
  - **Social SSO**: `Continue with Google`, `Continue with Apple`.
  - **Web3 Wallets**: `Continue with a wallet` (MetaMask, Coinbase Wallet, Phantom, Rainbow, Solflare, WalletConnect).
- `[OBSERVED]`: Accessing `/wallet`, `/portfolio`, `/settings`, `/activity`, or clicking the trade execution button displays an unauthenticated gate card.
- `[INFERRED]`: Frontend calls `POST /api/v1/auth/privy/sync` upon authentication to synchronize user identities and requests a Firebase custom token (`/auth/me/firebase-token`) for chat and notifications.

---

## 6. Demo Trading Findings
- `[OBSERVED]`: Located on Market Detail pages (`/markets/[id]`) via a `Real` vs `Demo` segmented toggle in the sticky order slip.
- `[OBSERVED]`: Activating `Demo` displays the notice:
  > *"DEMO TRADING MODE — TRADING WITH 10,000 USDC IN VIRTUAL FUNDS, NOT REAL MONEY"*
- `[OBSERVED]`: **Demo payment mechanism not observed**. There is no mock payment gateway, sandbox checkout, or virtual faucet. The 10,000 USDC virtual balance is pre-allocated.
- `[OBSERVED]`: Executed demo trades publish a verified social badge (`🎮 Demo Prediction — I predicted YES on [Market Title]`).
- `[OBSERVED]`: Executing a demo trade on live production requires an authenticated account; guest clicks trigger the Privy modal.

---

## 7. Onboarding Findings
- `[OBSERVED]`: Homepage hero directs users to *"Start Trading ->"* (`/markets`) or *"How it Works ->"*.
- `[OBSERVED]`: Structured discovery hierarchy: Hero -> Category Pills -> Top Markets Carousel -> Market Movers -> 4-Pillar Value Framework.
- `[OBSERVED]`: Every market provides a dedicated **Resolution Details** card outlining rules, official source, and settlement date.
- `[INFERRED]`: Onboarding is self-paced and passive; no mandatory multi-step blocking wizard exists on initial arrival.

---

## 8. Design System Tokens [OBSERVED]

### Typography
- **Primary Sans**: `"Sora", system-ui, -apple-system, sans-serif` (`--font-sora`)
- **Monospace/Numbers**: `"Geist Mono", monospace` (`--font-geist-mono`)

### Theme Palettes
| Token Name | Light Theme (`:root`) | Dark Theme (`[data-theme="dark"]`) |
|---|---|---|
| `--color-omx-bg` | `#f4f5f7` | `#090426` |
| `--color-omx-card` | `#ffffff` | `#110a36` |
| `--color-omx-elevated` | `#ffffff` | `#1b1150` |
| `--color-omx-muted` | `#f8fafc` | `#0f0828` |
| `--color-omx-hover` | `#fff1f2` | `rgba(242, 48, 100, 0.1)` |
| `--color-omx-sidebar` | `#ffffff` | `#110a36` |
| `--color-omx-text` | `#0f172a` | `#ffffff` |
| `--color-omx-text-secondary` | `#475569` | `#94a3b8` |
| `--color-omx-text-muted` | `#94a3b8` | `#64748b` |
| `--color-omx-border` | `#e2e8f0` | `rgba(255, 255, 255, 0.08)` |
| `--color-omx-border-strong` | `#cbd5e1` | `rgba(255, 255, 255, 0.14)` |
| `--color-omx-yes` | `#15803d` | `#16a34a` |
| `--color-omx-no` | `#e11d48` | `#dc2626` |

### Gradients & Radii
- **Brand Gradient**: `linear-gradient(135deg, #f23064 0%, #ff4f55 48%, #ff6b1a 100%)`
- **Deposit Gradient**: `linear-gradient(135deg, #d92588 0%, #5430d9 100%)`
- **Border Radii**: `sm: 8px`, `md: 12px`, `lg: 16px`, `xl: 20px`, `2xl: 24px`

---

## 9. Important Components & Behaviors [OBSERVED]
- **Global Sidebar**: ~240px width with glowing brand mark, 10 primary navigation links, active route highlight, and bottom theme toggle.
- **Top Header**: Search input with keyboard shortcut `/`, unauthenticated Sign In / Sign Up buttons, live search dropdown for `MARKETS` and `POSTS`.
- **Market Card**: Category tag, favorite star, question title, probability %, delta badge, horizontal progress fill, volume, trader count, YES/NO buttons.
- **Price History Chart**: Multi-timeframe line chart (`1D`, `1W`, `1M`, `ALL`) tracking price trajectories.
- **Live Market Pulse**: Radial half-donut gauge displaying platform volatility score (0–100).
- **Social Feed Card**: Author info, relative timestamp, sentiment pill (`BULLISH`/`BEARISH`), prediction badge, and engagement actions.

---

## 10. UX Findings & Suggested Improvements

- `[UX FINDING]` (P2): Both "Sign In" and "Sign Up" open the identical Privy dialog without contextual distinction.
  - `[SUGGESTED IMPROVEMENT]`: Clarify that entering an email handles both login and registration automatically.
- `[UX FINDING]` (P1): Demo trading execution requires external authentication, creating friction for evaluators.
  - `[SUGGESTED IMPROVEMENT]`: In the `./web-1.0` replica, implement an ephemeral 1-click guest practice trade mode.
- `[UX FINDING]` (P2): Newly created markets display flat 50% lines with 0 volume and 0 traders.
  - `[SUGGESTED IMPROVEMENT]`: Populate realistic mock data with historical price points and active trading depth.
- `[UX FINDING]` (P2): Protected routes render a blank page with an isolated lock shield card.
  - `[SUGGESTED IMPROVEMENT]`: Display a blurred teaser background showing sample portfolio metrics.
- `[UX FINDING]` (P3): Global search dropdown transparency creates visual noise on smaller viewports.
  - `[SUGGESTED IMPROVEMENT]`: Enforce solid card background (`bg-omx-card`) with backdrop blur.

---

## 11. Unknowns & Open Questions [UNKNOWN]
1. `[UNKNOWN]`: Initial username selection and profile onboarding steps immediately post-email OTP verification.
2. `[UNKNOWN]`: Real-money KYC verification workflow and specific fiat withdrawal dialogs.
3. `[UNKNOWN]`: Live WebSocket trade matching protocol payload format (`/api/v1/ws`).

---

## 12. Research Limitations
- **OTP Inbox Dependency**: Automated end-to-end account registration was blocked at the external 6-digit email OTP step due to absence of inbox credentials.
- **Safety Barrier**: Real-money purchases, deposits, and financial bindings were strictly prohibited and not initiated per safety guidelines.

---

## 13. Source of Truth
Observed browser behavior > screenshots > DOM/computed styles > production CSS > production JS > API observations > assumptions.
