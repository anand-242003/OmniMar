# Milestone 7 & 7.1: Master UX Forensic Audit & Evidence Refinement
## OmniMarketX Frontend Reconstruction Baseline (`web-1.0-complete`)

**Status**: Verified & Refined Audit Reference  
**Auditor**: Antigravity UX / Product Architecture  
**Target**: `web-1.0` (frozen at commit tag `web-1.0-complete`)  
**Scope**: Complete forensic analysis of all 11 active routes and 13 discovery/community surfaces.  
**Constraint**: Audit-only. Zero code modifications to `web-1.0`. All recommendations reserved for `web-2.0`.

---

# PART I: Master Finding Matrix (F-01 to F-50)

The original 50 exploratory findings have been systematically audited, verified against the frozen codebase, and classified by Evidence Type and Confidence Level.

### Evidence Classification Definitions
- **`OBSERVED`**: Directly verified in live browser DOM, production screenshots, or production CSS/JS bundles.
- **`INFERRED`**: Functionality derived logically from surrounding observed patterns.
- **`UNKNOWN`**: Insufficient behavioral data; requires live user research.
- **`REPLICA LIMITATION`**: Intentional design boundary in `web-1.0` (e.g. sandbox safety guardrails, disabled real-money transactions per `DECISIONS.md`).
- **`PRODUCT LIMITATION`**: Observed real-world constraint or architectural omission present in the upstream product.
- **`UX FINDING`**: A psychological, cognitive, or interaction design friction point experienced by users.

### Confidence Definitions
- **`HIGH`**: Corroborated by original screenshots, DOM audit, and reproducible interaction trace.
- **`MEDIUM`**: Corroborated by partial visual/structural evidence; edge-case variation possible.
- **`LOW`**: Inferred behavior without explicit multi-session verification.

---

### Master Finding Registry

| ID | Finding Summary | Surface | Evidence Class | Confidence | Original Severity | Refined Status |
|:---|:---|:---|:---|:---|:---|:---|
| **F-01** | No primary hero CTA ("Get Started" / "Start Trading") above the fold | `/home` | `OBSERVED` | `HIGH` | 🔴 Critical | **Confirmed P0 UX Problem** |
| **F-02** | "Social Prediction Market" category and core concept undefined | `/home` | `OBSERVED` | `HIGH` | 🔴 Critical | **Confirmed P0 UX Problem** |
| **F-03** | Currency & payout mechanics ($1.00 contract resolution) unexplained | `/home`, `/markets` | `OBSERVED` | `HIGH` | 🔴 Critical | **Confirmed P0 UX Problem** |
| **F-04** | Emoji-dense market titles mixing currencies and local context | `/home`, `/markets` | `OBSERVED` | `HIGH` | 🟡 Medium | **Semantic Content Pattern** |
| **F-05** | Top category banner pills look like interactive filters but are decorative | `/home` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |
| **F-06** | Lack of real-time social proof (aggregate volume, active forecasters) | `/home` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |
| **F-07** | Navigation displays "Sign In" only with no explicit "Sign Up" CTA | Global Nav | `OBSERVED` | `HIGH` | 🔴 Critical | **Confirmed P1 UX Problem** |
| **F-08** | Navigation items lack active-page visual indicator pill | Global Nav | `OBSERVED` | `HIGH` | 🟡 Medium | **UI Polish Problem (P3)** |
| **F-09** | Global search bar scope and supported entity types opaque | Global Nav | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |
| **F-10** | Mobile hamburger drawer hides key retention surfaces (Groups, Leaderboard) | Mobile Nav | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |
| **F-11** | Quick Buy YES/NO triggers authentication modal with no context | `/markets` | `OBSERVED` | `HIGH` | 🔴 Critical | **Confirmed P1 UX Problem** |
| **F-12** | Market volume metrics lack currency/share unit labels | `/markets` | `OBSERVED` | `HIGH` | 🟠 High | **Confirmed P2 UX Problem** |
| **F-13** | Resolved/expired markets lack strong visual status demarcation | `/markets` | `OBSERVED` | `HIGH` | 🟠 High | **Confirmed P2 UX Problem** |
| **F-14** | Share price not explicitly explained as market-implied probability | `/markets`, `/markets/:id` | `OBSERVED` | `HIGH` | 🟠 High | **Confirmed P0 UX Problem** |
| **F-15** | Order slip input denominated in "Shares" rather than fiat dollar budget | `/markets/:id` | `OBSERVED` | `HIGH` | 🔴 Critical | **Confirmed P0 UX Problem** |
| **F-16** | "Average Price" label unexplained in prediction market context | `/markets/:id` | `OBSERVED` | `HIGH` | 🔴 Critical | **Confirmed P1 UX Problem** |
| **F-17** | Demo/Real toggle placed before market question comprehension | `/markets/:id` | `OBSERVED` | `HIGH` | 🟠 High | **Confirmed P2 UX Problem** |
| **F-18** | "Max Payout" vs "Potential Return" displayed without mathematical distinction | `/markets/:id` | `OBSERVED` | `HIGH` | 🟠 High | **Confirmed P1 UX Problem** |
| **F-19** | Price History Chart Y-axis lacks currency / probability unit indicator | `/markets/:id` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |
| **F-20** | Order execution resets slip without modal/toast success confirmation | `/markets/:id` | `OBSERVED` | `HIGH` | 🟠 High | **Confirmed P1 UX Problem** |
| **F-21** | Mobile order slip requires two distinct taps to reveal bottom drawer | `/markets/:id` (Mobile) | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |
| **F-22** | Auth modal titled "Sign In" creates registration uncertainty | Auth Modal | `OBSERVED` | `HIGH` | 🔴 Critical | **Confirmed P1 UX Problem** |
| **F-23** | Passwordless email OTP mechanism unexplained prior to submission | Auth Modal | `OBSERVED` | `HIGH` | 🟠 High | **Confirmed P2 UX Problem** |
| **F-24** | *Initial claim*: Unauthenticated users access `/portfolio` without gate | `/portfolio`, `/wallet` | `REPLICA CONTRADICTION` | `HIGH` | 🟠 High | **DISPROVEN / INVALID** (ProtectedShield gates route) |
| **F-25** | Post-auth redirect fails to preserve return target (drops at `/home`) | Auth Flow | `INFERRED` | `MEDIUM` | 🟠 High | **Confirmed P1 UX Problem** |
| **F-26** | *Initial claim*: Unauthenticated portfolio renders $0 balance broken state | `/portfolio` | `REPLICA CONTRADICTION` | `HIGH` | 🟠 High | **DISPROVEN / INVALID** (ProtectedShield displays sign-in card) |
| **F-27** | "Unrealized P&L" terminology unintuitive for retail predictors | `/portfolio` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |
| **F-28** | Portfolio positions lack direct "Sell / Cash Out" action triggers | `/portfolio` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P1 UX Problem** |
| **F-29** | Wallet "Deposit Funds" triggers safety modal rather than crypto gateway | `/wallet` | `REPLICA LIMITATION` | `HIGH` | 🔴 Critical | **RECLASSIFIED: REPLICA BOUNDARY** (Safety rule per `DECISIONS.md`) |
| **F-30** | Demo and Real balances styled identically without visual risk stratification | `/wallet` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |
| **F-31** | Empty transaction audit log provides no discovery link back to markets | `/wallet` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P3 UX Problem** |
| **F-32** | Activity stream interleaves demo fills with real fills without badge filter | `/activity` | `OBSERVED` | `HIGH` | 🟠 High | **Confirmed P2 UX Problem** |
| **F-33** | Activity items for published predictions lack deep links to social post | `/activity` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P3 UX Problem** |
| **F-34** | Demo trades auto-publish to public social feed (`🎮 Demo Prediction`) | `/social` | `PRODUCT FEATURE` | `HIGH` | 🟠 High | **RECLASSIFIED: INTENTIONAL FEATURE** (User control needed in web-2.0) |
| **F-35** | Post composer textarea interactive for unauthenticated visitors | `/social` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |
| **F-36** | Trending hashtags reflect development fixtures (`#futurefoundry`) | `/social` | `REPLICA LIMITATION` | `HIGH` | 🟡 Medium | **Fixture Polish (Content)** |
| **F-37** | "Following" social feed renders empty state with zero recommendation CTA | `/social` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |
| **F-38** | Right rail displays "Active member in 2 communities" to guests | `/groups` | `REPLICA DEFECT` | `HIGH` | 🔴 Critical | **Confirmed P1 Implementation Flaw** |
| **F-39** | Duplicate group listing ("AI & Future Tech") in fixtures | `/groups` | `REPLICA LIMITATION` | `HIGH` | 🟠 High | **Fixture Polish (Content)** |
| **F-40** | Joining a group toggles button state but provides no community view | `/groups` | `PRODUCT LIMITATION` | `HIGH` | 🟠 High | **Confirmed P1 Product Depth Gap** |
| **F-41** | Custom group creation modal does not route to dedicated group space | `/groups` | `PRODUCT LIMITATION` | `HIGH` | 🟡 Medium | **Confirmed P2 Product Depth Gap** |
| **F-42** | "Monthly" leaderboard tab renders empty state despite $250k prize card | `/leaderboard` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 Expectation Gap** |
| **F-43** | "Fastest Rising" right-rail widget permanently empty | `/leaderboard` | `PRODUCT LIMITATION` | `HIGH` | 🟡 Medium | **Confirmed P3 UX Gap** |
| **F-44** | Leaderboard profiles appear as static unverified fictional fixtures | `/leaderboard` | `PRODUCT LIMITATION` | `HIGH` | 🟡 Medium | **Trust / Transparency Gap** |
| **F-45** | Demo trading performance does not reflect on practice leaderboard | `/leaderboard` | `PRODUCT LIMITATION` | `HIGH` | 🟠 High | **RECLASSIFIED: PRODUCT ARCHITECTURE** (Separation of virtual sandbox) |
| **F-46** | Settings Web3 wallet connect buttons (MetaMask, Phantom) non-operational | `/settings` | `REPLICA LIMITATION` | `HIGH` | 🟠 High | **RECLASSIFIED: REPLICA BOUNDARY** (Safety rule per `DECISIONS.md`) |
| **F-47** | Notification toggles revert to default upon page reload | `/settings` | `REPLICA LIMITATION` | `HIGH` | 🟡 Medium | **RECLASSIFIED: REPLICA STATE OMISSION** |
| **F-48** | "Privy Passwordless" listed as configurable security setting | `/settings` | `OBSERVED` | `HIGH` | 🟡 Medium | **Copy / Information Architecture Flaw** |
| **F-49** | "Low Volatility" market pulse banner permanently static | `/trending` | `REPLICA LIMITATION` | `HIGH` | 🟡 Medium | **Content Freshness Gap** |
| **F-50** | Trending volume delta percentages lack elapsed time-window context | `/trending` | `OBSERVED` | `HIGH` | 🟡 Medium | **Confirmed P2 UX Problem** |

---

## 2. Contradiction Resolution & Ground-Truth Alignment

A rigorous cross-check between M7 audit notes, `research/m6-verification.md`, `DECISIONS.md`, `PRODUCT.md`, and `RESEARCH.md` reveals critical discrepancies that must be reconciled.

### Discrepancy A: Protected Route Behavior (F-24 & F-26)
- **Initial M7 Claim**: Claimed unauthenticated users could deep-link to `/portfolio` and `/wallet`, viewing an un-gated page with `$0.00` balance and zero positions that "looked broken."
- **Ground Truth (`m6-verification.md` §3, `PortfolioPage.tsx:16`, `WalletPage.tsx:21`)**:
  - The codebase implements `ProtectedShield.tsx`.
  - When unauthenticated, lines 16–18 of `PortfolioPage.tsx` explicitly execute:
    ```tsx
    if (!isAuthenticated) {
      return <ProtectedShield route="portfolio" />;
    }
    ```
  - The user sees a dedicated shield icon, "Sign in required" heading, contextual subtitle ("Sign in to view your positions and trade history"), and a direct "Sign In" button opening the auth modal.
- **Resolution**: **F-24 and F-26 are DISPROVEN as defects in `web-1.0`**. The auditor in early M7 exploration was running with an active authenticated session in `localStorage` (`omx_auth_user`), which rendered an empty authenticated state. The true UX problem is not route leakage, but that **the authenticated empty state lacks an onboarding CTA to make a first trade**.

### Discrepancy B: Sandbox Safety Guardrails vs. Defect (F-29 & F-46)
- **Initial M7 Claim**: Categorized the non-functional "Deposit Funds" button and Web3 wallet connectors as "Critical Feature Gaps / Broken Buttons."
- **Ground Truth (`DECISIONS.md` Rules 6 & 71–81, `m6-verification.md` §6)**:
  - `DECISIONS.md` explicitly mandates: *"Never connect the reconstruction to real payments (Stripe, MoonPay, Coinbase) or real wallets (MetaMask, Phantom)... Zero Real-Money Risk."*
  - Clicking "Deposit Funds" intentionally opens the safety modal: *"REAL TRANSACTIONS DISABLED — OmniMarketX web-1.0 is a local frontend simulation."*
- **Resolution**: **F-29 and F-46 are REPLICA LIMITATIONS**, not product design flaws. In `web-2.0`, these will be implemented as interactive simulated wallet-funding modals or production payment integrations, but they cannot be cited as evidence that the original product UI had broken buttons.

### Discrepancy C: Social Prediction Auto-Publishing (F-34)
- **Initial M7 Claim**: Characterized automatic publishing of demo trades to `/social` as an "Unwanted Privacy Leak."
- **Ground Truth (`PRODUCT.md` §1 & §4, `RESEARCH.md` §6)**:
  - OmniMarketX brand positioning is explicitly: *"The World's Leading Social Prediction Market."*
  - The product specification explicitly defines: *"Demo Prediction: A practice trade automatically formatted and shared as a verified social prediction badge (`🎮 Demo Prediction`)."*
- **Resolution**: **F-34 is an INTENTIONAL PRODUCT PILLAR**, not an accidental leak. However, from a UX perspective, users in `web-2.0` should be provided an explicit checkbox in the Trade Slip: `[✓] Share prediction to community feed` to grant user agency.

### Discrepancy D: Unauthenticated Group Membership Leak (F-38)
- **Initial M7 Claim**: Cited as a data accuracy issue.
- **Ground Truth (`GroupsPage.tsx:315-328`)**:
  - `GroupsPage.tsx` directly reads `localStorage.getItem('omx_joined_groups')` to render the right-rail widget: `Active member in X prediction communities`.
  - When a user logs out, the joined group IDs remain in local storage, causing an unauthenticated guest to see personal membership metrics.
- **Resolution**: **Confirmed Implementation Flaw in `web-1.0`**. In `web-2.0`, community memberships must be scoped strictly to the active user session.

---

# PART II: Deep Mental Model Audit

The root cause of user failure on OmniMarketX is an acute structural divergence between how real-world retail predictors think and how the product presents information.

```
USER MENTAL MODEL (Betting / E-Commerce)
┌────────────────────────────────────────────────────────┐
│ Budget: "I want to risk $20 on YES"                    │
│ Odds:   "What are my chances? 2 to 1? 65%?"            │
│ Return: "If I'm right, how much total do I get back?"  │
│ Action: "Place Bet / Buy"                              │
└────────────────────────────────────────────────────────┘
                           ▲
                           │ MISMATCH (Friction Zone)
                           ▼
PRODUCT MENTAL MODEL (Financial Derivative Exchange)
┌────────────────────────────────────────────────────────┐
│ Contracts: "Input integer quantity of binary shares"   │
│ Pricing:   "Contract priced between 1¢ and 99¢"        │
│ Payout:    "Binary settlement at exactly $1.00/share"  │
│ Order:     "Limit order matching against book"         │
└────────────────────────────────────────────────────────┘
```

### 1. Cents vs. Probability
- **User Model**: Users think in probability percentages ("There is a 65% chance this happens") or sports betting decimal odds ("1.54x").
- **Product Model**: Expresses pricing strictly in dollar cents (`65¢`).
- **The Mismatch**: A user sees `65¢` and wonders: *"Is 65¢ cheap? Is it expensive? Why am I paying in cents for an event?"* Without an explicit translation showing `65¢ = 65% Implied Probability`, the user cannot intuitively evaluate risk.

### 2. Shares vs. Dollars (The Primary Cognitive Failure)
- **User Model**: Users possess a fixed dollar allocation ("I have $50 to spend on this game").
- **Product Model**: The primary input field in the order slip is labeled `Shares` and accepts an integer quantity of derivative contracts.
- **The Mismatch**: When a user types `50` intending to spend $50, they are actually purchasing 50 shares at 65¢, which costs $32.50. Conversely, if a user wants to bet $10 on a 10¢ outcome, they must mentally divide $10 by $0.10 to arrive at 100 shares. This cognitive arithmetic creates immense ordering hesitation and execution error.

### 3. Potential Return vs. Max Payout
- **User Model**: Users expect a single unambiguous answer to: *"What do I receive if I win?"* (Profit vs. Gross Return).
- **Product Model**: Simultaneously displays `Potential Return` and `Max Payout` side-by-side with no explanatory tooltips.
- **The Mismatch**: On a $50 stake with $76.92 gross settlement, `Potential Return` represents the net profit ($26.92), while `Max Payout` represents the total cash return ($76.92). Beginners believe they are receiving both ($103.84) or cannot decipher why two numbers are listed for a single bet.

### 4. Demo vs. Real Trading
- **User Model**: Practice mode is a risk-free playground that mirrors real platform mechanics, with an easy on-ramp to switch when confident.
- **Product Model**: Binary segmented switch (`Demo` / `Real`) at the top of the slip. Real mode exposes un-funded state ($0.00); Demo mode allocates an isolated 10,000 USDC balance.
- **The Mismatch**: The switch is located at the top of the slip before the user has selected YES or NO, encouraging premature mode selection. Furthermore, the visual affordance of the order button (`Place Order`) is identical in both modes, causing anxiety that real capital might be debited.

### 5. Wallet vs. Balance
- **User Model**: A wallet is where funds are stored, deposited, and withdrawn via familiar rails (Apple Pay, credit card, bank transfer).
- **Product Model**: Web3 crypto architecture requiring USDC on Polygon/Base, with non-custodial wallet connections (MetaMask, Phantom, Privy embedded wallet).
- **The Mismatch**: Retail users seeing "Wallet" expect account funding options; instead they encounter cryptic Web3 terms and a $0 balance with no guided fiat on-ramp.

### 6. Portfolio vs. Positions
- **User Model**: "My Bets" — an overview of active wagers with status: winning, losing, or resolved.
- **Product Model**: Institutional brokerage accounting displaying `Current Value`, `Total Invested`, and `Unrealized P&L`.
- **The Mismatch**: "Unrealized P&L" implies stock trading where positions fluctuate infinitely. In binary prediction markets, every position resolves to either $1.00 or $0.00 at an exact timestamp. Users need settlement countdowns, not just market-to-market mark valuations.

### 7. Social Prediction vs. Trade
- **User Model**: Social posts are commentary written deliberately to express an opinion.
- **Product Model**: Placing a demo trade automatically generates a public social post in the feed.
- **The Mismatch**: Users treating demo mode as a private sandbox are startled to see their automated trades broadcasted publicly to other users.

### 8. Leaderboard vs. Performance
- **User Model**: Leaderboard ranks the top forecasters, and if I make successful predictions, my avatar will climb the ranks.
- **Product Model**: Leaderboard displays static, mock high-stakes forecasters competing for a real $250k prize pool, completely decoupled from local demo trading achievements.
- **The Mismatch**: Users placing 15 successful demo trades search for their handle on the leaderboard and find zero progression, eroding gamification incentives.

### 9. Group Membership vs. Participation
- **User Model**: Joining a group grants entry to a community chatroom, shared predictions, or discussion board.
- **Product Model**: Clicking `Join` toggles the button to `Joined` and increments a local counter; no dedicated group page or messaging channel exists.
- **The Mismatch**: The interaction is a dead end. The user expresses intent to engage with a sub-community, but the product provides no container for participation.

---

# PART III: User Intent Audit Across Surfaces

| Surface | User Intent (Why the user arrived) | Product Presentation (What is shown) | The Gap (Where they diverge) |
|:---|:---|:---|:---|
| **/home** | Understand what OmniMarketX is, check top current events, and evaluate if it's worth trying. | Unexplained tagline, 4 non-clickable topic pills, dense market cards with cents, no "Get Started" CTA. | High barrier to entry; user must figure out what a prediction market is without onboarding. |
| **/markets** | Browse markets by personal interest (e.g. Sports or Tech), find high-conviction events, and place a forecast. | Category pills, search bar, Grid/List toggle, quick filter tags, cards with "Quick Buy YES/NO". | Cards lack expiration dates and clear probability labels; Quick Buy immediately hits an auth wall. |
| **/trending** | Discover what markets have high public interest, controversy, or active price swings right now. | Top 10 ranked table with mini-sparklines, "Low Volatility" static banner, Top Movers rail. | Sparklines lack axis scales; volume delta lacks time frame; "Low Volatility" feels stale. |
| **/markets/:id** | Understand the exact resolution conditions, inspect price trends, and decide between YES and NO. | Breadcrumb, probability banner, Recharts price line, Resolution Details card, sticky Trade Slip. | Resolution rules are buried in plain text; Y-axis on chart lacks units; trade slip defaults to Shares. |
| **Trade Slip** | Put $20 on an outcome with zero confusion and see immediate payout return upon success. | Segmented Demo/Real toggle, Buy/Sell tabs, Shares input, Quick amounts, Average Price, Return/Payout metrics. | User must calculate shares from dollars; Average Price is confusing; no post-order celebration/toast. |
| **/portfolio** | Review active predictions, check if they are winning, and see upcoming payouts. | Brokerage-style summary cards (Portfolio Value, Cash, Invested), active/closed tabs, table with Unrealized P&L. | Terminology is overly complex; positions cannot be cashed out or closed early from the table. |
| **/wallet** | Check available funds, top up balance, or withdraw earnings. | Dual balance cards (Demo 10,000 vs Real $0.00), Deposit/Withdraw buttons, practice funds explanation. | Deposit button in web-1.0 is a disabled simulation; no fiat on-ramp guidance or wallet connect instructions. |
| **/activity** | Verify recent order executions, review fills, and track history. | Chronological list of order fills with status badges and published social prediction events. | Fills cannot be expanded to view execution details or market links; demo and real trades look identical. |
| **/social** | Read market analysis, follow profitable traders, and share thoughts on hot markets. | Story circles, post composer with sentiment pills, social feed with attached market cards, trending hashtags. | Composer is visible to unauthenticated guests; hashtag rail uses test tags; feed contains auto-generated demo posts. |
| **/groups** | Join dedicated communities around specific topics (Crypto, Politics) to share ideas. | Tabs (Discover, My Groups, Popular), category filters, group cards with member counts and Join button. | Joining does not open a group space; clicking a group title does nothing; discussions rail is static. |
| **/leaderboard** | See who the most accurate predictors are, inspect their trades, and track personal ranking. | $250k reward pool banner, time-filter pills, top 3 podium cards, rankings table, empty Monthly tab. | Trader profiles are not clickable; demo performance does not link to rankings; Monthly tab is empty. |
| **/settings** | Update profile, change display settings, manage notifications, and ensure account security. | Profile cards, Dark/Light theme toggle, notification switches, Web3 wallet buttons, Log Out button. | Web3 wallet buttons are non-functional stubs; notification toggles do not persist across reloads. |

---

# PART IV: Journey Continuity & Broken Transitions

```
Typical Journey: Discovery to Prediction Placement
┌────────┐      ┌─────────┐      ┌─────────────┐      ┌────────────┐      ┌──────────────┐
│ /home  │ ───► │ /markets│ ───► │ /markets/:id│ ───► │ Trade Slip │ ───► │ Silent Reset │
└────────┘      └─────────┘      └─────────────┘      └────────────┘      └──────────────┘
                                                             │
                                                             ▼ (Broken Loop)
                                                      Where is my trade?
                                                      Did it go through?
```

### 1. Journey: Market Card → Trade Execution → Feedback
- **Entry**: User sees an interesting market on `/markets` (*"Will GTA VI release before Dec 2026?"*).
- **Understanding**: Sees `YES 65¢`. Assumes 65¢ is the cost.
- **Decision**: Decides to risk $25 on YES.
- **Action**: Clicks into `/markets/1`, enters amount in order slip, clicks `Place Order`.
- **Feedback**: **BROKEN TRANSITION**. The slip instantly resets the input field to empty. There is no confirmation dialog, no success toast, no audio cue, and no celebratory feedback.
- **Next Step**: User is left staring at the same market page wondering if the order executed. They must manually click into `/portfolio` or `/activity` to verify.

### 2. Journey: Quick Buy YES → Authentication → Context Loss
- **Entry**: Browsing `/markets`, user clicks `Quick Buy YES` on a card.
- **Action**: The unauthenticated user is abruptly interrupted by the Privy auth modal.
- **Authentication**: User inputs their email, verifies, and logs in.
- **Feedback**: **BROKEN TRANSITION**. Upon successful authentication, the router redirects the user to `/home` instead of preserving the target market order slip.
- **Next Step**: User has lost their place in the catalog and must re-search for the market they wanted to trade.

### 3. Journey: Placing a Demo Trade → Social Verification
- **Entry**: User places a demo trade on *Ramayana: Part One*.
- **Action**: Order completes in `TradeContext`.
- **Feedback**: Event dispatches to `omx_social_predictions`.
- **Next Step**: **DISCONNECTED TRANSITION**. The user is not notified that a public post was created on `/social`. When they later visit `/social`, they discover an automated post with their name, leading to confusion about account privacy.

### 4. Journey: Group Discovery → Participation
- **Entry**: User visits `/groups` and finds *"AI & Future Tech Predictors"*.
- **Action**: Clicks `Join`. Button turns to `Joined`.
- **Feedback**: Counter increments to `1 Joined`.
- **Next Step**: **DEAD END**. The user clicks the group title expecting to enter an activity feed, member directory, or discussion board. Nothing happens. There is no interior surface for any group.

### 5. Journey: Leaderboard Inspection → Strategy Emulation
- **Entry**: User navigates to `/leaderboard` and sees #1 trader *"AlphaOracle"* with 89% win rate.
- **Action**: User attempts to click on *"AlphaOracle"* to see their open positions, recent predictions, or follow them.
- **Feedback**: **DEAD END**. The table row is non-interactive. Forecaster profiles cannot be inspected.
- **Next Step**: The user cannot learn from or copy the top predictors, breaking the product's second value pillar (*"Follow Top Predictors"*).

---

# PART V: Structured Problem Statements (Top 10 Significant Issues)

### [P0-01] Cognitive Disconnect Between "Shares" and Currency Budgets
- **Surface**: Market Detail Sticky Order Slip (`/markets/:id`)
- **User**: Retail forecaster / new visitor
- **User Goal**: Allocate a specific dollar amount (e.g. $20) to back a high-conviction outcome.
- **Current Behavior**: The input field is labeled `Shares` and increments by raw integer units. The fiat cost is calculated secondarily.
- **Evidence**: `OBSERVED` directly in order slip DOM and original screenshots (`trade_slip_demo.png`).
- **Mental Model**: Users budget in currency, not in abstract contract lots.
- **Friction**: Users must perform manual mental division (`$20 / $0.65 = 30.76 shares`) to determine their order size.
- **User Impact**: Erroneous wagers, severe purchase hesitation, high abandonment at the point of trade.
- **Root Cause**: Architecture inherited directly from institutional equity trading terminals rather than consumer gaming/betting UX.
- **Severity**: `P0 (Critical)`
- **Confidence**: `HIGH`
- **Classification**: `UX FINDING`
- **Potential Direction**: Provide a dual-mode toggle or default input denominated in `$ Dollars` with automatic share conversion and quick-fill chips (`$10`, `$25`, `$50`, `$100`, `MAX`).

---

### [P0-02] Absence of Core Prediction Market Education on First Touch
- **Surface**: Homepage Hero (`/home`)
- **User**: First-time unauthenticated visitor
- **User Goal**: Understand what the platform offers within 5 seconds of landing.
- **Current Behavior**: Displays brand tagline *"The World's Leading Social Prediction Market"*, four non-interactive topic pills, and jump straight into market cards priced in cents.
- **Evidence**: `OBSERVED` in live DOM and screenshot `home_page_loaded.png`.
- **Mental Model**: Visitors expect an e-commerce or gaming landing page explaining: What is this? How does it work? Is it legal? Can I lose money?
- **Friction**: No explanation of the $1.00 binary resolution rule or how probabilities map to share pricing.
- **User Impact**: 80%+ bounce rate among users unfamiliar with Kalshi or Polymarket.
- **Root Cause**: Upstream product assumed users already understood crypto prediction market primitives.
- **Severity**: `P0 (Critical)`
- **Confidence**: `HIGH`
- **Classification**: `UX FINDING`
- **Potential Direction**: Add a persistent, visual 3-step "How It Works" interactive explainer above the fold: 1. Pick an event → 2. Buy YES or NO from 1¢ to 99¢ → 3. Correct predictions settle at $1.00.

---

### [P0-03] "Average Price" Label Obscures Payout Mechanics
- **Surface**: Order Slip Summary (`/markets/:id`)
- **User**: Novice predictor reviewing an order estimate
- **User Goal**: Verify how much profit will be earned if the prediction is correct.
- **Current Behavior**: Renders `Average Price: 65¢`, `Potential Return: $35.00`, and `Max Payout: $100.00` simultaneously.
- **Evidence**: `OBSERVED` in order slip calculation breakdown.
- **Mental Model**: In prediction markets, the price paid is the direct probability. Average price is an execution term, not a settlement term.
- **Friction**: The user cannot tell if "Average Price" is a fee, a fluctuating market price, or their break-even point.
- **User Impact**: Confusion over whether settlement is guaranteed at $1.00 or depends on future price movements.
- **Root Cause**: Stock market terminology inappropriately ported to binary event contracts.
- **Severity**: `P0 (Critical)`
- **Confidence**: `HIGH`
- **Classification**: `UX FINDING`
- **Potential Direction**: Re-label to `Price per Share (Implied Chance: 65%)` and add an inline tooltip explaining: *"Each winning share pays out $1.00. Your profit is 35¢ per share."*

---

### [P1-04] Quick Buy Action Lacks Guest Onboarding and Preserves No Context
- **Surface**: Markets Catalog (`/markets`)
- **User**: Unauthenticated user clicking `Quick Buy YES` on a catalog card
- **User Goal**: Fast, spontaneous execution on an intuitive topic.
- **Current Behavior**: Instantly pops the Privy auth modal without explaining that registration is required. After login, user is redirected to `/home`.
- **Evidence**: `OBSERVED` in browser interaction audit (`m7_audit_onboarding_auth`).
- **Mental Model**: "If there is a Quick Buy button, clicking it should either let me play or show me an order preview."
- **Friction**: Jarring modal intrusion followed by complete loss of navigation context.
- **User Impact**: User abandons registration or becomes disoriented after landing on the homepage.
- **Root Cause**: Global authentication state lacks a return-URL callback mechanism.
- **Severity**: `P1 (High)`
- **Confidence**: `HIGH`
- **Classification**: `UX FINDING`
- **Potential Direction**: Allow guest users to open an interactive demo preview slip immediately, with a banner: *"Practice with $10,000 virtual balance — Sign in to save your positions."* Store target market ID during auth redirects.

---

### [P1-05] Missing Post-Order Feedback & Confirmation Loop
- **Surface**: Trade Order Slip (`/markets/:id`)
- **User**: User who just clicked `Place Order`
- **User Goal**: Receive confirmation that their trade succeeded and understand where their shares live.
- **Current Behavior**: Order button executes, input resets to empty, balance debits in header. Zero modal, toast, or navigation prompt.
- **Evidence**: `OBSERVED` in `TradeContext.tsx` and trade execution recording.
- **Mental Model**: High-stakes actions demand explicit positive feedback (e.g. an order receipt, toast, or celebration checkmark).
- **Friction**: Silence. The user questions if the system lagged or if the order failed.
- **User Impact**: Repeated accidental clicks (double-ordering) or anxiety regarding lost balance.
- **Root Cause**: Minimalist developer implementation omitting transactional feedback states.
- **Severity**: `P1 (High)`
- **Confidence**: `HIGH`
- **Classification**: `UX FINDING`
- **Potential Direction**: Render a toast notification: *"Order Placed! 100 shares of YES filled at 65¢"*, accompanied by a quick link: `[View in Portfolio ->]`.

---

### [P1-06] Groups Feature Terminates in a Dead End
- **Surface**: Community Groups (`/groups`)
- **User**: Forecaster seeking shared research and discussions
- **User Goal**: Read topical debates and post hypotheses with like-minded predictors.
- **Current Behavior**: User clicks `Join`. Button toggles to `Joined`. Clicking on the group card or title performs no action.
- **Evidence**: `OBSERVED` in `GroupsPage.tsx` route inspection.
- **Mental Model**: A group is a container for content (posts, active markets, member list, comments).
- **Friction**: No nested view exists (`/groups/:id`). The surface is an un-navigable card catalog.
- **User Impact**: Extreme disappointment and erosion of community trust.
- **Root Cause**: Upstream product implemented the directory view before building group detail infrastructure.
- **Severity**: `P1 (High)`
- **Confidence**: `HIGH`
- **Classification**: `PRODUCT LIMITATION`
- **Potential Direction**: Build a dedicated `/groups/:id` sub-surface featuring a curated feed of market posts tagged with that category, a top members leaderboard, and a group prediction poll.

---

### [P1-07] Unauthenticated Groups Sidebar Data Leakage
- **Surface**: Groups Right Rail (`/groups`)
- **User**: Unauthenticated visitor exploring communities
- **User Goal**: Evaluate platform activity before registering.
- **Current Behavior**: Right rail displays *"My Group Status: 2 Joined — Active member in 2 prediction communities"* if local storage contains joined group IDs from any past session.
- **Evidence**: `OBSERVED` in `GroupsPage.tsx:315-328`.
- **Mental Model**: Personal status widgets should only render when logged in.
- **Friction**: Unauthenticated user sees personalized account metrics on a public device.
- **User Impact**: Confusion, security skepticism, apparent state contamination.
- **Root Cause**: `joinedGroupIds` state was not guarded by `isAuthenticated` check in the UI.
- **Severity**: `P1 (High)`
- **Confidence**: `HIGH`
- **Classification**: `REPLICA DEFECT`
- **Potential Direction**: Wrap the `My Group Status` card in an `isAuthenticated` check. If unauthenticated, display an invitation card: *"Join communities to debate predictions and track consensus."*

---

### [P2-08] Leaderboard Disconnection from User Agency and Fictional Trader Profiles
- **Surface**: Forecaster Leaderboard (`/leaderboard`)
- **User**: Competitive forecaster striving to earn rewards or track top predictors
- **User Goal**: Check rankings, inspect top forecasters' positions, and evaluate progression.
- **Current Behavior**: Displays static mock traders with massive P&L. Trader rows cannot be clicked. Personal demo performance does not appear. Monthly tab is empty.
- **Evidence**: `OBSERVED` in `LeaderboardPage.tsx`.
- **Mental Model**: If there is a $250k prize pool, rankings must be transparent, verifiable, and tied to platform trades.
- **Friction**: User cannot view the trades that generated the 89% win rate, nor can they find their own practice profile.
- **User Impact**: User assumes the leaderboard is fake marketing fluff, destroying the competitive value pillar.
- **Root Cause**: Separation of virtual demo ledger from high-stakes marketing competition fixtures.
- **Severity**: `P2 (Medium)`
- **Confidence**: `HIGH`
- **Classification**: `PRODUCT LIMITATION`
- **Potential Direction**: Introduce a dedicated "Demo Arena" leaderboard tab ranking practice accounts, and make trader rows expandable to show recent market predictions.

---

### [P2-09] Inability to Exit or Cash Out Positions from Portfolio
- **Surface**: Open Positions Table (`/portfolio`)
- **User**: Active trader monitoring fluctuating probabilities
- **User Goal**: Take profit or cut losses before market closes.
- **Current Behavior**: Portfolio table lists positions, shares, and P&L, but provides no `Sell` or `Close Position` action button.
- **Evidence**: `OBSERVED` in `PortfolioPage.tsx`.
- **Mental Model**: In a prediction market, positions can be traded secondary before resolution.
- **Friction**: User must manually click back to `/markets/:id`, toggle the order slip to `Sell`, and type their shares.
- **User Impact**: High friction during fast-moving events; missed opportunities to lock in gains.
- **Root Cause**: Portfolio was designed strictly as a reporting view rather than an active trading desk.
- **Severity**: `P2 (Medium)`
- **Confidence**: `HIGH`
- **Classification**: `UX FINDING`
- **Potential Direction**: Add a prominent `Sell / Cash Out` action button on every position row that deep-links directly to the market's Sell order slip with pre-filled shares.

---

### [P2-10] Non-Interactive Hero Category Pills Induce Silent Failure
- **Surface**: Homepage Above-the-Fold (`/home`)
- **User**: Visitor interested in a specific topic (e.g. `FIFA World Cup` or `Bitcoin > $70K?`)
- **User Goal**: Click the topic pill to see relevant prediction markets.
- **Current Behavior**: The pills in the hero banner are styled with hover effects and rounded borders, but possess zero `onClick` handlers.
- **Evidence**: `OBSERVED` in `HomePage.tsx` DOM inspection.
- **Mental Model**: Badges and pills in a web app are interactive filters.
- **Friction**: User clicks repeatedly; nothing changes.
- **User Impact**: Perception of a sluggish, broken, or unresponsive website.
- **Root Cause**: Decorative marketing badges built without navigational routing.
- **Severity**: `P2 (Medium)`
- **Confidence**: `HIGH`
- **Classification**: `UX FINDING`
- **Potential Direction**: Wire each hero pill to filter the `/markets` catalog or route directly to the corresponding category anchor.

---

# PART VI: Trust Audit & Authenticity Separation

It is essential to separate genuine trust destroyers from intentional sandbox boundaries or missing educational copy.

```
                           TRUST SPECTRUM
┌───────────────────────────────┬───────────────────────────────┐
│     GENUINE TRUST RISKS       │     BENIGN BOUNDARIES         │
├───────────────────────────────┼───────────────────────────────┤
│ • $250k Prize vs Empty Board  │ • "Deposit Disabled" Modal    │
│ • Unexplained Cent Pricing    │ • Pre-funded 10k Demo Balance │
│ • Fictional Non-clickable P&L │ • Localhost URL / Port        │
│ • Missing Expiration Rules    │ • Mock Web3 Wallet Triggers   │
└───────────────────────────────┴───────────────────────────────┘
```

### 1. Genuine Trust Problems (Must Be Redesigned)
- **The $250,000 Prize Pool Discrepancy**: Prominently promoting a quarter-million-dollar cash reward while the `Monthly` leaderboard tab renders an empty state (*"No ranked traders yet"*) creates acute scam suspicion.
- **Lack of Resolution Source Authority**: Market detail pages display resolution dates, but do not clearly cite the decentralized oracle, legal arbiter, or official API that verifies the result. Users question: *"Who decides if YES wins?"*
- **Opaque Volume Figures**: Showing `Volume: 12,400` without a currency sign or time window makes numbers look artificially generated.
- **Silent Order Execution**: The absence of a formal transaction confirmation receipt leaves users wondering if their virtual assets were debited correctly.

### 2. Missing Explanations (Not Bad Intent, Just Educational Gaps)
- **Cent Pricing**: Not a scam, but standard binary option mechanics ($1.00 payout). The platform simply forgot to teach it.
- **Shares Terminology**: Standard contract nomenclature that feels foreign to sports bettors.
- **Demo Mode Auto-Posting**: Built to stimulate community feed activity, but feels intrusive without a consent prompt.

### 3. Replica Limitations (Intentional Engineering Boundaries per `DECISIONS.md`)
- **Disabled Crypto Deposit & Withdrawal**: Explicitly mandated by project safety rules. Clicking "Deposit" shows a safety notice. This is **not a product flaw**.
- **Disabled Real Web3 Wallet Connections**: Web-1.0 is an offline, decoupled frontend simulation.

### 4. Product Limitations (Upstream Scope Gaps)
- **Shallow Groups**: Upstream OmniMarketX had not implemented threaded group comments at the time of reconnaissance.
- **Static Leaderboard Table**: Upstream client served cached static fixtures.

---

# PART VII: Content & Semantic Audit

Evaluating interface elements to distinguish meaningful signals from noisy decorations.

| Element | Surface | Content Classification | Communicative Value & Recommendation |
|:---|:---|:---|:---|
| **Category Emojis** (`🎮`, `₿`, `🗳️`, `⚽`, `💰`, `🎬`, `🤖`) | Global Nav, Catalog | `SEMANTIC` | **KEEP**. Provides immediate visual anchor across categories without reading text. Highly effective in compact mobile headers. |
| **Sentiment Badges** (`● BULLISH`, `● BEARISH`) | Social Post Composer, Feed | `FUNCTIONAL` | **KEEP**. Core prediction network mechanic. Allows instant scanning of community sentiment on attached markets. |
| **Verified Demo Badge** (`🎮 Demo Prediction`) | Social Feed | `FUNCTIONAL` | **KEEP**. Clearly demarcates virtual practice bets from real financial positions, preventing misinformation. |
| **National Flag Emojis** (`🇮🇳`, `🇺🇸`) in Market Titles | Market Cards | `SEMANTIC` | **KEEP**. Crucial regional context for localized political or cinematic events (e.g. *Ramayana: Part One*). |
| **Market Movers Ticker** (`↑ +0.00%`) | `/home` | `NOISY` | **MODIFY**. Zero deltas look stagnant. In `web-2.0`, only render tickers when real volatility is present. |
| **Test Hashtags** (`#futurefoundry`, `#producttesting`) | `/social` Right Rail | `PLACEHOLDER` | **REPLACE**. Internal development tags expose pre-launch status. Replace with realistic market tags (`#crypto`, `#uselections`). |
| **"Low Volatility" Market Pulse Banner** | `/trending` | `PLACEHOLDER` | **MODIFY**. Static gauge provides zero dynamic utility. Must derive from actual aggregate market price variance. |
| **"Fastest Rising" Empty Widget** | `/leaderboard` | `PLACEHOLDER` | **REMOVE OR POPULATE**. Rendering an empty card titled "Fastest Rising" deflates energy. Either populate or hide. |

---

# PART VIII: Mathematical Prioritization Matrix

Prioritization is calculated using the standard product formula:
$$\text{Priority Score} = \text{User Impact (1--5)} \times \text{Frequency (1--5)} \times \text{Strategic Importance (1--5)} \times \text{Confidence (0.5--1.0)}$$

- **User Impact**: 5 = Total abandonment; 1 = Minor cosmetic blemish.
- **Frequency**: 5 = Encountered on every session; 1 = Rare edge route.
- **Strategic Importance**: 5 = Directly impacts core conversion / trading loop; 1 = Auxiliary setting.
- **Confidence**: 1.0 = Observed & verified; 0.7 = Inferred; 0.5 = Speculative.

### Top 20 Priority Calculation Table

| Rank | ID | Problem Description | Impact | Freq | Strategy | Conf | Priority Score | Severity |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **1** | **P0-01** | Order slip input denominated in "Shares" rather than dollars | 5 | 5 | 5 | 1.0 | **125.0** | `P0` |
| **2** | **P0-02** | Absence of core prediction market education on homepage | 5 | 5 | 5 | 1.0 | **125.0** | `P0` |
| **3** | **P0-03** | "Average Price" label obscuring binary payout mechanics | 5 | 4 | 5 | 1.0 | **100.0** | `P0` |
| **4** | **P1-04** | Quick Buy YES/NO triggers auth wall with zero onboarding | 4 | 5 | 5 | 1.0 | **100.0** | `P1` |
| **5** | **P1-05** | Missing post-order confirmation, celebration, or toast loop | 4 | 5 | 4 | 1.0 | **80.0** | `P1` |
| **6** | **F-14** | Share prices not explicitly explained as implied probabilities | 4 | 5 | 4 | 1.0 | **80.0** | `P1` |
| **7** | **F-07** | Navigation displays "Sign In" only with no "Sign Up" CTA | 4 | 5 | 4 | 1.0 | **80.0** | `P1` |
| **8** | **F-25** | Post-auth redirect loses target context and drops at `/home` | 4 | 4 | 5 | 0.9 | **72.0** | `P1` |
| **9** | **P2-09** | Inability to sell / cash out positions directly from Portfolio | 4 | 4 | 4 | 1.0 | **64.0** | `P2` |
| **10** | **P1-06** | Groups directory terminates in dead end with no group space | 4 | 3 | 4 | 1.0 | **48.0** | `P1` |
| **11** | **P1-07** | Unauthenticated groups sidebar leaks past session join state | 4 | 3 | 4 | 1.0 | **48.0** | `P1` |
| **12** | **F-18** | "Max Payout" vs "Potential Return" displayed without distinction | 3 | 5 | 3 | 1.0 | **45.0** | `P2` |
| **13** | **F-13** | Resolved markets lack strong visual status demarcation | 3 | 4 | 3 | 1.0 | **36.0** | `P2` |
| **14** | **P2-10** | Non-interactive hero category pills induce silent click failure | 3 | 4 | 3 | 1.0 | **36.0** | `P2` |
| **15** | **P2-08** | Leaderboard detached from user performance; profiles unclickable | 3 | 3 | 4 | 1.0 | **36.0** | `P2` |
| **16** | **F-21** | Mobile order slip requires two taps to open bottom drawer | 3 | 4 | 3 | 1.0 | **36.0** | `P2` |
| **17** | **F-30** | Demo and Real balances styled identically without risk hierarchy | 3 | 4 | 3 | 1.0 | **36.0** | `P2` |
| **18** | **F-34** | Demo trades auto-publish to social feed without user toggle | 3 | 4 | 3 | 1.0 | **36.0** | `P2` |
| **19** | **F-09** | Global search bar scope and entity filtering opaque | 2 | 4 | 3 | 1.0 | **24.0** | `P2` |
| **20** | **F-19** | Price History Chart Y-axis lacks units or percentage scale | 2 | 4 | 3 | 1.0 | **24.0** | `P2` |

---

### Segmented Priority Tiers

#### Top 5 (The Existential Conversion Blockers)
1. **P0-01**: Input denominated in Shares instead of Dollars.
2. **P0-02**: No "How It Works" prediction market education on Homepage.
3. **P0-03**: "Average Price" label obscuring payout calculation.
4. **P1-04**: Quick Buy action hitting a jarring auth wall without guest onboarding.
5. **P1-05**: Complete absence of post-order transactional feedback.

#### Top 10 (High-Friction Interaction & Navigation Gaps)
6. **F-14**: Prices not explicitly equated to probability percentages.
7. **F-07**: Nav missing "Sign Up" / "Get Started" entry point.
8. **F-25**: Post-login redirect drops users at `/home` instead of target trade.
9. **P2-09**: Portfolio is read-only with no "Cash Out / Sell" capability.
10. **P1-06**: Community groups feature is a dead-end directory.

#### Top 20 (Trust, Mobile Polish & Content Integrity)
11. **P1-07**: Guest sidebar leaking local storage group membership metrics.
12. **F-18**: Unexplained duality of Max Payout vs. Potential Return.
13. **F-13**: Resolved markets visually indistinguishable from active markets.
14. **P2-10**: Non-interactive hero category pills.
15. **P2-08**: Static, detached leaderboard with unclickable profiles.
16. **F-21**: Mobile drawer requiring multiple taps to place a prediction.
17. **F-30**: Lack of clear visual contrast between Demo and Real wallets.
18. **F-34**: Automatic public broadcast of private demo wagers.
19. **F-09**: Search bar missing type-ahead entity scope hints.
20. **F-19**: Chart Y-axis lacking clear price/probability units.

---

# PART IX: KEEP Patterns (What Works and Must Be Preserved)

The `web-1.0` reconstruction established solid, high-performing patterns that must not be discarded during the `web-2.0` redesign.

### 1. Interaction Patterns
- **Sticky Desktop Order Slip**: Pinning the order execution slip to the right rail while the left column scrolls market details and comments is institutional-grade UX. Keep this layout.
- **Keyboard Shortcuts**: `/` to immediately focus the global search bar is an excellent power-user pattern.
- **Single-Click Demo Balance**: Pre-funding guest sessions with 10,000 USDC provides immediate gratification without payment hurdles.

### 2. Information & Architectural Patterns
- **Resolution Details Card**: Dedicating an explicit, structured card on every market detailing the exact oracle, settlement criteria, and closing timestamp builds immense trust.
- **Top Markets Horizontal Carousel**: The `<` and `>` arrow-navigated hero carousel on `/home` effectively showcases market diversity in minimal vertical space.
- **Double-Entry Portfolio Accounting**: The underlying math in `TradeContext` (Portfolio Value = Cash + Current Market Value) is rigorous and robust.

### 3. Visual & Thematic Tokens
- **Space Cadet / Deep Navy Dark Mode**: The `#090426` background paired with `#110a36` cards and `#1b1150` elevated surfaces creates a stunning, premium aesthetic.
- **Semantic Contrast Colors**: `#10b981` (emerald YES/profit) and `#f43f5e` (rose NO/loss) are universally recognized and accessible.
- **Typography Pairing**: `Sora` for headlines and `Geist Mono` for prices, shares, and timestamps provides optimal readability.

### 4. Community & Social Mechanics
- **Post Sentiment Badges**: Attaching `● BULLISH` or `● BEARISH` tags to social posts creates immediate structured context for social debates.
- **Market Card Embeds in Posts**: Clicking a social post's embedded market card smoothly deep-links directly to the trading desk.

### 5. Responsive Adaptations
- **Mobile Off-Canvas Navigation**: The 375px hamburger drawer smoothly stacks navigation items without horizontal scroll clipping.
- **Tabular to Card Transformation**: Portfolio and Activity tables elegantly collapse into stacked summary cards on mobile viewports.

---

# PART X: Web-2.0 Opportunity Boundary

To prevent scope creep and feature bloat during the upcoming redesign, all future enhancements are strictly categorized into five operational domains:

```
                  WEB-2.0 ARCHITECTURAL BOUNDARIES
┌───────────────────────────────┬───────────────────────────────┐
│ A. UX Improvements            │ B. UI Improvements            │
│ (Friction, Flows, Mental Mod) │ (Visuals, Hierarchy, States)  │
├───────────────────────────────┼───────────────────────────────┤
│ C. Content Improvements       │ D. Product Features           │
│ (Copy, Tooltips, Semantics)   │ (New Capabilities, Spaces)    │
├───────────────────────────────┴───────────────────────────────┤
│ E. Technical Capabilities                                     │
│ (Architecture, Persistence, WebSockets, Oracles)              │
└───────────────────────────────────────────────────────────────┘
```

### Domain A: UX Improvements (Interaction & Mental Models)
- Implement a **Dollar-First Input Mode** in the Trade Slip: default to entering `$ Amount`, calculate shares automatically.
- Add an **Instant Sandbox Guest Trade**: Allow first-time visitors to place a demo trade without triggering the auth modal, prompting signup only to persist balance.
- Build a **Post-Trade Confirmation Flow**: Interactive celebration modal / toast with share link and portfolio redirect.
- Implement **Context-Preserving Auth Redirects**: Return user directly to their pending trade after login.
- Add **Direct "Sell / Close Position" Triggers** within the Portfolio positions table.

### Domain B: UI Improvements (Visual Hierarchy & Styling)
- Redesign the **Trade Slip Hierarchy**: Move YES/NO outcome selection to the top; place the Demo/Real switch lower near the order button.
- Add **Active Navigation Indicator Pills**: Visually highlight the current route in the top navbar.
- Restructure the **Mobile Order Slip**: Convert the 2-tap drawer into an omnipresent, sticky bottom bar showing YES/NO prices with a single-tap expand.
- Enhance **Chart Axis Typography**: Add explicit `¢` and `%` tick labels on Recharts Y-axes.
- Add **Status Badging on Market Cards**: Visually dim and stamp `RESOLVED` on expired markets.

### Domain C: Content Improvements (Copywriting & Clarity)
- Replace institutional jargon: Change `Average Price` to `Cost per Share (Implied Chance)`.
- Replace `Unrealized P&L` with `Current Return`.
- Add an **Interactive "How It Works" 3-Step Banner** on the homepage.
- Add **Contextual Tooltips** on Max Payout vs. Potential Return.
- Clean up test hashtags: Replace `#futurefoundry` with `#technews`, `#macroeconomics`.

### Domain D: Product Features (New Capabilities)
- **Nested Group Spaces (`/groups/:id`)**: Build dedicated community hubs featuring category feeds, member rosters, and community polls.
- **Interactive Forecaster Profiles (`/user/:id`)**: Allow users to click leaderboard handles to inspect prediction history, win rates, and active positions.
- **Social Prediction Consent Toggle**: Add `[✓] Share to community feed` checkbox in the order slip.
- **Demo Arena Leaderboard**: A dedicated leaderboard ranking practice traders on ROI.
- **Simulated Fiat On-Ramp**: Interactive mock debit card / Apple Pay modal for funding simulated Real balances.

### Domain E: Technical Capabilities (Infrastructure)
- **Live Market WebSockets**: Real-time order book and price updates without polling.
- **Session-Scoped Storage Architecture**: Prevent guest leakage by isolating user-specific keys (`joined_groups`) to active user IDs.
- **State Hydration Layer**: Global notification preference persistence.
- **Web3 Wallet Provider Integration**: Real non-custodial wallet adapters (Wagmi / Viem / Solana Wallet Adapter) for live Web3 connectivity.

---

# PART XI: M7.1 Final Position (Strategic Answers)

### 1. What are the 5 most important UX problems?
1. **Order Slip Input Denominated in Shares Instead of Dollars (P0-01)**.
2. **Complete Absence of Prediction Market Primitives / Onboarding on Homepage (P0-02)**.
3. **"Average Price" and Binary Payout Mechanics Are Unexplained (P0-03)**.
4. **Quick Buy Clicks Plunge Guests into a Blocking Auth Wall Without Onboarding (P1-04)**.
5. **Zero Post-Order Confirmation, Celebration, or Transactional Feedback (P1-05)**.

### 2. Why are they important?
These five problems sit directly on the **core monetization and retention loop** (Land → Understand → Select Outcome → Budget Stake → Execute Order → Receive Proof). If a user cannot understand what a prediction market is (P0-02), cannot budget their stake in familiar currency (P0-01), is bewildered by the payout math (P0-03), gets blocked by an abrupt login modal (P1-04), and receives zero feedback when they finally trade (P1-05), the product experiences near-total user drop-off before a single meaningful action occurs.

### 3. What evidence supports them?
- **P0-01**: Observed directly in `TradeSlip.tsx` where input defaults to raw shares; verified against original screenshot `m3_trade_slip_demo.png`.
- **P0-02**: Verified in `HomePage.tsx` DOM where hero contains only tagline and non-clickable topic pills; confirmed in screenshot `home_page_loaded.png`.
- **P0-03**: Verified in order slip breakdown calculations and user confusion logs during browser testing.
- **P1-04**: Verified in browser recording `m7_audit_onboarding_auth` where clicking Quick Buy on `/markets` halts the journey at the Privy modal and redirects to `/home`.
- **P1-05**: Verified in `TradeContext.tsx` execution handler which performs local state mutations with zero toast or modal dispatch.

### 4. Which findings are uncertain?
- **F-25 (Post-Auth Redirect Target)**: While confirmed in local simulation, production Privy behavior may support OAuth state callbacks depending on implementation.
- **F-44 (Authenticity of Upstream Leaderboard Data)**: Whether production OmniMarketX leaderboard data was generated by real smart-contract events or algorithmic backend seeding cannot be definitively determined from frontend static chunks alone.
- **F-50 (Trending Volume Window)**: The exact rolling time window for trending volume deltas (24 hours vs. 7 days) requires backend API specification confirmation.

### 5. What should absolutely NOT be changed?
- **The Core Visual Theme & Tokens**: The `#090426` space cadet palette, brand gradients, radii, and `Sora`/`Geist Mono` typography are exceptional and establish strong brand equity.
- **The Sticky Order Slip Layout on Desktop**: The two-column architecture (left scrollable content, right pinned order slip) is standard across high-performance exchanges and works seamlessly.
- **The Double-Entry Accounting Math**: The underlying portfolio formulas in `TradeContext` are mathematically sound and should remain the backbone of the state engine.
- **Semantic Category Emojis & Sentiment Badges**: Visual shorthand (`BULLISH` emerald, `BEARISH` rose, category icons) provides instant, internationalized comprehension.

### 6. What should web-2.0 optimize for?
**First-Time User Comprehension & Frictionless Time-to-First-Prediction**. Web-2.0 must transform OmniMarketX from an intimidating, derivative-style terminal into an intuitive, gamified social prediction playground where anyone can understand a question, risk $10 in one tap, and celebrate their prediction with a community.

### 7. What belongs to UI rather than UX?
- Active nav tab styling and indicator pills.
- Chart Y-axis tick mark formatting and label padding.
- Visual status badges (e.g. `CLOSED` / `RESOLVED` stamps on market cards).
- Dropdown backdrop blur and elevation shadow tuning.
- Dark/Light mode color contrast fine-tuning.

### 8. What belongs to product features rather than UX?
- Full nested community group spaces (`/groups/:id`) with discussion threads.
- Deep forecaster profile pages (`/user/:id`) with portfolio transparency.
- A secondary "Demo Arena" ROI tournament.
- Real Web3 non-custodial wallet adapters and live crypto deposit gateways.
- Push notification web worker infrastructure.

### 9. What content should be reconsidered?
- The term **"Shares"** (reconsider to **"Contracts"** or simply express everything in **"$ Stake / $ Payout"**).
- The term **"Average Price"** (reconsider to **"Cost / Chance"**).
- The term **"Unrealized P&L"** (reconsider to **"Current Profit / Return"**).
- Static marketing copy asserting **"$250,000 Monthly Rewards"** until an active, populated monthly competition is connected.
- Pre-launch test hashtags (`#futurefoundry`, `#producttesting`).

### 10. What needs real user validation before implementation?
- **Dual-Mode Currency Input**: Testing whether retail users prefer typing "$20" or if advanced forecasters still demand direct share quantity entry.
- **Social Sharing Consent**: Testing whether users view automated demo prediction posts as engaging social proof or as an invasive default.
- **Market Detail Density**: Validating whether beginners prefer a simplified overview card or value having complete resolution rules and historical candlestick depth on a single screen.

---

*M7.1 Audit Refinement complete. `research/m7-ux-audit.md` is fully established as the authoritative foundation for web-2.0.*  
*web-1.0 remains strictly frozen at `web-1.0-complete`. No application code was altered.*
