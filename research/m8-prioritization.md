# Milestone 8 — Web-2.0 Prioritization & Product Backlog Framework
## OmniMarketX Redesign Strategy Blueprint

**Target**: `web-2.0` Design & Architectural Planning  
**Baseline & Evidence Source**: `research/m7-ux-audit.md` (specifically M7.1 Refinement)  
**Status**: Authoritative Strategy Document  
**Rules**: `web-1.0` is strictly frozen. No code changes. Strategy and planning only.

---

## 1. Prioritization Framework & Mathematical Formula

Prioritization across all `web-2.0` opportunities is grounded in the validated M7.1 scoring model:

$$\text{Priority Score} = \text{User Impact (1--5)} \times \text{Frequency (1--5)} \times \text{Strategic Importance (1--5)} \times \text{Confidence (0.5--1.0)}$$

### Scoring Metric Definitions
- **User Impact (1–5)**:
  - `5`: Blocker / Total Abandonment (User cannot complete trade or misunderstands money).
  - `4`: High Friction (User succeeds only with confusion, hesitation, or external assistance).
  - `3`: Moderate Disorientation (User takes wrong sub-path or misinterprets secondary information).
  - `2`: Minor Hesitation (Awkward copy, small visual inconsistency, or unhelpful layout).
  - `1`: Cosmetic imperfection without workflow impedance.
- **Frequency (1–5)**:
  - `5`: Encountered on every user session (Home, Market Cards, Trade Slip).
  - `4`: Encountered in 70%+ of active journeys (Markets catalog, Portfolio, Auth modal).
  - `3`: Common journey step (Social feed, Groups, Leaderboard).
  - `2`: Specific workflow (Settings, Wallet withdraw, custom group creation).
  - `1`: Rare edge route or unauthenticated corner case.
- **Strategic Importance (1–5)**:
  - `5`: Core Monetization & Prediction Loop (Conversion, Trade Execution, Payout Understanding).
  - `4`: Key Retention & Activation Driver (Onboarding, Portfolio Tracking, Auth Continuity).
  - `3`: Secondary Engagement Pillar (Social debates, community groups, competitive leaderboard).
  - `2`: Auxiliary utility (Settings toggles, theme switcher, search autocomplete).
  - `1`: Low-leverage nice-to-have.
- **Confidence (0.5–1.0)**:
  - `1.0`: `OBSERVED` directly in live DOM, production bundles, and verified browser execution logs.
  - `0.8`: `INFERRED` with high structural backing from adjacent patterns.
  - `0.6`: `PRODUCT LIMITATION` with partial evidence; edge cases possible.
  - `0.5`: `UNKNOWN` / Speculative hypothesis requiring live user testing.

### Priority Tier Bands
- **`P0 (Critical / Existential Blockers)`**: Score **$\ge 90.0$** — Must be resolved before any public launch or marketing spend.
- **`P1 (High / Core Experience Leaks)`**: Score **$60.0 - 89.9$** — Must be resolved in the primary `web-2.0` release.
- **`P2 (Medium / Polish & Depth Gaps)`**: Score **$30.0 - 59.9$** — Scheduled for secondary `web-2.0` iterations.
- **`P3 (Low / Long-tail Enhancements)`**: Score **$< 30.0$** — Backlog queue or deliberate deferrals.

---

## 2. Master Opportunity Registry & Action Mapping

Every identified product opportunity is explicitly mapped to one of seven strategic actions:
1. **`FIX`**: Direct correction of an implementation defect or broken state.
2. **`PRESERVE`**: Protect a high-performing existing pattern from unnecessary change.
3. **`CLARIFY`**: Improve user comprehension through copy, tooltips, or visual labels without changing underlying mechanics.
4. **`SIMPLIFY`**: Strip away unnecessary fields, steps, or visual clutter.
5. **`REDESIGN`**: Fundamental re-architecting of the interface, hierarchy, or mental model.
6. **`INVESTIGATE`**: Requires user testing or technical spikes before committing to design.
7. **`DEFER`**: Intentionally postponed to post-v2 phases.

### Master Prioritization Registry Table

| ID | Problem / Opportunity | Affected User | Evidence Class | Imp | Freq | Strat | Conf | Score | Tier | Action | Classification | Dependency | Validation Method |
|:---|:---|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|:---|
| **INIT-01** | Order slip input denominated in "Shares" rather than dollar budgets (P0-01) | Retail forecaster, First-time visitor | `OBSERVED` | 5 | 5 | 5 | 1.0 | **125.0** | `P0` | `REDESIGN` | UX / UI | TradeContext Order Math | Usability test: Task completion time to allocate $25 |
| **INIT-02** | Absence of basic prediction-market education/onboarding on homepage (P0-02) | New unauthenticated visitor | `OBSERVED` | 5 | 5 | 5 | 1.0 | **125.0** | `P0` | `REDESIGN` | UX / Content | None | First-touch comprehension survey (5-sec test) |
| **INIT-03** | "Average Price" label obscures binary $1.00 settlement mechanics (P0-03) | First-time predictor, Retail trader | `OBSERVED` | 5 | 4 | 5 | 1.0 | **100.0** | `P0` | `CLARIFY` | Content / UX | None | Post-trade survey: "What will you win if YES happens?" |
| **INIT-04** | Quick Buy YES/NO triggers auth wall with zero onboarding or context preservation (P1-04) | Unauthenticated catalog browser | `OBSERVED` | 4 | 5 | 5 | 1.0 | **100.0** | `P0` | `REDESIGN` | UX / Technical | RouterContext Return URL | Drop-off rate during Quick Buy auth transitions |
| **INIT-05** | Order execution resets slip silently without confirmation or portfolio routing (P1-05) | Active predictor, Demo trader | `OBSERVED` | 4 | 5 | 4 | 1.0 | **80.0** | `P1` | `FIX` | UX / UI | TradeContext Event Hook | Double-order click rate; post-trade portfolio navigation rate |
| **INIT-06** | Share prices not explicitly explained as market-implied probabilities (F-14) | Sports bettor, General retail user | `OBSERVED` | 4 | 5 | 4 | 1.0 | **80.0** | `P1` | `CLARIFY` | Content / UI | Market Card Tokens | User accuracy in converting cents to odds |
| **INIT-07** | Global navigation displays "Sign In" only with no "Sign Up" or "Get Started" CTA (F-07) | First-time visitor | `OBSERVED` | 4 | 5 | 4 | 1.0 | **80.0** | `P1` | `SIMPLIFY` | UX / Content | AuthContext Modal State | New user registration conversion from top nav |
| **INIT-08** | Post-auth redirect loses target context and drops user at `/home` (F-25) | Authenticated user via deep-link | `INFERRED` | 4 | 4 | 5 | 0.9 | **72.0** | `P1` | `FIX` | Technical / UX | RouterContext Auth Hook | Post-auth journey continuity rate |
| **INIT-09** | Portfolio is strictly read-only with no direct "Sell / Cash Out" triggers (P2-09) | Active position holder | `OBSERVED` | 4 | 4 | 4 | 1.0 | **64.0** | `P1` | `REDESIGN` | Product / UX | TradeContext Sell Math | Frequency of secondary market exits from portfolio |
| **INIT-10** | Groups directory terminates in dead end with zero community sub-surfaces (P1-06) | Social predictor, Community user | `PRODUCT LIMITATION` | 4 | 3 | 4 | 1.0 | **48.0** | `P1` | `REDESIGN` | Product / UI | Groups Schema / Routing | 7-day retention of users who join a group |
| **INIT-11** | Unauthenticated groups sidebar leaks past session join state (P1-07) | Guest on shared/public device | `REPLICA DEFECT` | 4 | 3 | 4 | 1.0 | **48.0** | `P1` | `FIX` | Technical / UX | AuthContext Guard | Zero state leak verification across logout cycles |
| **INIT-12** | "Max Payout" vs "Potential Return" displayed without mathematical distinction (F-18) | Forecaster reviewing slip | `OBSERVED` | 3 | 5 | 3 | 1.0 | **45.0** | `P2` | `CLARIFY` | Content / UI | None | User comprehension testing of gross vs net return |
| **INIT-13** | Resolved/closed markets visually indistinguishable from active markets (F-13) | Catalog browser, Search user | `OBSERVED` | 3 | 4 | 3 | 1.0 | **36.0** | `P2` | `FIX` | UI / Content | Market Status Schema | Accidental clicks on closed markets |
| **INIT-14** | Non-interactive hero category pills induce silent click failure (P2-10) | Homepage explorer | `OBSERVED` | 3 | 4 | 3 | 1.0 | **36.0** | `P2` | `FIX` | UX / UI | RouterContext | Click-through rate from hero topic chips to catalog |
| **INIT-15** | Leaderboard detached from personal demo trading performance (P2-08) | Competitive demo forecaster | `PRODUCT LIMITATION` | 3 | 3 | 4 | 1.0 | **36.0** | `P2` | `REDESIGN` | Product / UX | Leaderboard Data Model | Engagement in demo arena competitions |
| **INIT-16** | Mobile order slip requires two distinct taps to open bottom drawer (F-21) | Mobile predictor (375px) | `OBSERVED` | 3 | 4 | 3 | 1.0 | **36.0** | `P2` | `SIMPLIFY` | UI / Mobile | Responsive Drawer | Mobile time-to-order-submission |
| **INIT-17** | Demo and Real balances styled identically without visual risk hierarchy (F-30) | Funded / Sandbox trader | `OBSERVED` | 3 | 4 | 3 | 1.0 | **36.0** | `P2` | `CLARIFY` | UI / Visual | Wallet Color Tokens | User awareness of active financial risk mode |
| **INIT-18** | Demo trades auto-publish to social feed without user consent toggle (F-34) | Privacy-conscious user | `PRODUCT FEATURE` | 3 | 4 | 3 | 1.0 | **36.0** | `P2` | `SIMPLIFY` | UX / Product | TradeContext Slip State | User opt-out rate on social prediction broadcast |
| **INIT-19** | Support/chat floating widget collides with mobile trade slip and right rail | Mobile and Desktop users | `OBSERVED` | 3 | 4 | 3 | 0.9 | **32.4** | `P2` | `FIX` | UI / Layout | Global Shell z-index | Zero visual overlap in responsive viewports |
| **INIT-20** | Global search bar scope and entity filtering opaque (F-09) | Power searcher | `OBSERVED` | 2 | 4 | 3 | 1.0 | **24.0** | `P2` | `CLARIFY` | UI / Content | Search Autocomplete Component | Search conversion rate to market pages |
| **INIT-21** | Price History Chart Y-axis lacks units or percentage scale (F-19) | Analytical forecaster | `OBSERVED` | 2 | 4 | 3 | 1.0 | **24.0** | `P2` | `CLARIFY` | UI / Visual | Recharts Component | Chart reading accuracy in user interviews |
| **INIT-22** | Infrastructure/vendor jargon ("Privy", mock transaction hashes) exposed in UI | Mainstream consumer | `OBSERVED` | 2 | 3 | 3 | 1.0 | **18.0** | `P3` | `CLARIFY` | Content | Settings / Activity Copy | Brand trust & security perception score |
| **INIT-23** | Notification permissions prompted prematurely before value is established | New user | `OBSERVED` | 3 | 2 | 3 | 0.9 | **16.2** | `P3` | `SIMPLIFY` | UX / Flow | Onboarding Tour | Notification opt-in acceptance rate |
| **INIT-24** | Duplicated sorting and filtering controls on Markets catalog | Desktop catalog user | `OBSERVED` | 2 | 3 | 2 | 1.0 | **12.0** | `P3` | `SIMPLIFY` | UI / Layout | MarketsPage Toolbar | Usability rating for catalog filtering |
| **INIT-25** | Right rail displays repetitive Trending content across different routes | Power user exploring tabs | `OBSERVED` | 2 | 3 | 2 | 1.0 | **12.0** | `P3` | `REDESIGN` | Content / IA | Right Rail Shell Component | Right rail click-through rate |

---

## 3. Evaluation of Additional Visual & Rendered-Product Evidence

During the screenshot-based UX audit, 11 specific observations were flagged. Each item is independently audited and classified below:

### 1. Support/Chat Widget Overlap & Collision
- **Evidence Classification**: `OBSERVED` (High Confidence).
- **Audit Findings**: Third-party floating support triggers (`z-index: 50`) anchor to the bottom-right viewport at `bottom: 16px; right: 16px`. On mobile (375px), this directly obstructs the sticky Trade Drawer CTA and overrides the bottom navigation safe-area. On desktop (1440px), it floats over the sticky Order Slip submit button.
- **Strategic Response**: `FIX`. Move support triggers into the global header help menu or elevate the bottom-right padding/margin dynamically when the order slip is open.

### 2. Cold-Start Market States vs. Mature Success Language
- **Evidence Classification**: `PRODUCT LIMITATION` (High Confidence).
- **Audit Findings**: The interface shows cards with `0 Volume`, `0 Traders`, flat 50% horizontal price charts, and an empty Monthly leaderboard, while simultaneously asserting banners like *"Trending Markets"*, *"Real-time Rankings"*, and *"$250,000 Monthly Rewards"*. This creates an immediate cognitive clash that degrades credibility.
- **Strategic Response**: `REDESIGN` (State-Aware Messaging). Implement conditional state messaging (see Section 4). When liquidity is low, replace "Trending" with *"New Market — Be the First to Predict"*.

### 3. Demo Trades Trigger Immediate Social Post Noise
- **Evidence Classification**: `PRODUCT FEATURE` (High Confidence).
- **Audit Findings**: In `web-1.0`, every demo order automatically appends a post: `🎮 Demo Prediction — I predicted YES on...`. While built to stimulate community interaction, this fills the social feed with low-signal automated bots rather than thoughtful analysis.
- **Strategic Response**: `SIMPLIFY`. Introduce a default-on (or user-configurable) checkbox in the order slip: `[✓] Share prediction to community feed`, and allow users to attach a 1-sentence rationale before posting.

### 4. Infrastructure & Vendor Terminology in User UI
- **Evidence Classification**: `PRODUCT LIMITATION` (High Confidence).
- **Audit Findings**: The settings page explicitly labels security as *"Privy Passwordless"*, and activity entries display cryptographic-looking transaction identifiers for demo orders. Mainstream retail predictors do not know what "Privy" is and feel intimidated by pseudorandom hash strings.
- **Strategic Response**: `CLARIFY`. Replace vendor names with consumer-friendly copy: *"Email One-Time Code"* and replace mock hashes with clean order IDs: `#OMX-9281`.

### 5. Premature Notification Permission Prompts
- **Evidence Classification**: `UX FINDING` (High Confidence).
- **Audit Findings**: Requesting browser notifications or modal notification permissions immediately on landing triggers automatic user rejection (90%+ dismissal rate).
- **Strategic Response**: `SIMPLIFY`. Defer notification prompts until the moment of value realization: *immediately after the user places their first prediction* (e.g. *"Want an alert when this market resolves on Nov 8?"*).

### 6. Grammar, Pluralization, and Language Inconsistencies
- **Evidence Classification**: `PRODUCT LIMITATION` (High Confidence).
- **Audit Findings**: Text strings show pluralization glitches such as `"0 traders"`, `"1 joined prediction communities"`, and mixed sentence/title case across card headers.
- **Strategic Response**: `FIX`. Implement a centralized localization/strings dictionary with proper pluralization rules (`n === 1 ? 'community' : 'communities'`).

### 7. Duplicated Sorting and Filtering Controls on Markets
- **Evidence Classification**: `UX FINDING` (High Confidence).
- **Audit Findings**: `/markets` features horizontal category pills, a toolbar sort dropdown (`Volume`, `Newest`, `Probability`), and a right-rail quick filter box (`HIGH VOLUME`, `RISING`, `FALLING`, `NEW`). Having two competing filter widgets within 200px of each other confuses user focus.
- **Strategic Response**: `SIMPLIFY`. Consolidate all filtering into a unified top toolbar with primary categories and secondary filter chips.

### 8. Repetitive Right-Rail Content Across Diverse Surfaces
- **Evidence Classification**: `PRODUCT LIMITATION` (High Confidence).
- **Audit Findings**: `/markets`, `/trending`, `/social`, and `/leaderboard` all display nearly identical "Trending Now" or "Top Groups" widgets in their right columns.
- **Strategic Response**: `REDESIGN`. Make right rails contextually specific:
  - `/markets`: Portfolio quick-glance & recent fills.
  - `/social`: Hot debates & active prediction polls.
  - `/leaderboard`: Weekly podium rules & personal ranking delta.

### 9. Profile Identity Presentation Oddities
- **Evidence Classification**: `REPLICA LIMITATION` (High Confidence).
- **Audit Findings**: Profile avatars default to arbitrary two-letter initials with synthetic gradient backgrounds (`DE`, `AS`, `SK`) and fictional handles (`@alpha_trader`), disconnected from user-provided email identities.
- **Strategic Response**: `CLARIFY`. Derive initials directly from the user's authenticated email or allow 1-click custom handle/avatar selection during onboarding.

### 10. Redundant Homepage Visual Elements
- **Evidence Classification**: `UX FINDING` (High Confidence).
- **Audit Findings**: `/home` renders the market title in the hero carousel, repeats it 300px lower in the "Top Markets" grid, and repeats it again in the "Market Movers" sidebar ticker.
- **Strategic Response**: `SIMPLIFY`. Differentiate homepage sections by purpose: Hero = Featured Story of the Day; Grid = Category Browsing; Ticker = Real Volatility Movers only.

### 11. Pro Subscription Surface Competing with Core Onboarding
- **Evidence Classification**: `PRODUCT LIMITATION` (Medium Confidence).
- **Audit Findings**: Banners or badges advertising a "Pro" subscription or premium analytics appear before a visitor has even placed a single prediction.
- **Strategic Response**: `DEFER`. Suppress Pro/Monetization upsells until a user has completed at least 3 active predictions and experienced core product value.

---

## 4. Product State Communication Framework

A foundational discovery of M7.1 is that OmniMarketX frequently suffers from **Product State Miscommunication**: mature, high-activity marketing language is paired with empty or low-liquidity states, causing acute user skepticism.

### The 9 Canonical Product States

```
                           STATE ARCHITECTURE
┌────────────────────────────────────────────────────────────────────────┐
│ 1. LOADING       2. EMPTY          3. LOW ACTIVITY    4. ACTIVE        │
│ Skeleton pulses  Clear invitation  Seed/Call to act   Real liquidity   │
├────────────────────────────────────────────────────────────────────────┤
│ 5. DEMO SANDBOX  6. REAL CAPITAL   7. SUCCESS         8. ERROR         │
│ Playful practice Amber/Gold risk   Celebration receipt Clear recovery  │
├────────────────────────────────────────────────────────────────────────┤
│ 9. UNAVAILABLE / RESOLVED                                              │
│ Locked, clear outcome, historical archive                              │
└────────────────────────────────────────────────────────────────────────┘
```

| Canonical State | Visual Semantics | Required Copy Standard | Strict Prohibition |
|:---|:---|:---|:---|
| **1. LOADING** | Subdued, high-contrast skeleton blocks matching exact component layout. | Zero spinner text; clean pulse. | Never show generic full-screen blocking spinners. |
| **2. EMPTY** | Neutral icon, clear explanation of why it is empty, single primary action CTA. | *"No active positions yet. Explore trending markets to make your first prediction."* | Never show blank white/navy voids or raw `"0"` metrics. |
| **3. LOW ACTIVITY** | Calm, honest cold-start indicators; invite user participation. | *"Newly listed market. Be the first to take a stand on YES or NO."* | **Never claim "Trending" or "High Volume" when volume is zero.** |
| **4. ACTIVE** | Green/Rose price deltas, live tick updates, active volume numbers. | *"1,240 traders active · $48.2K volume 24h"* | Never round numbers to make them look artificially inflated. |
| **5. DEMO SANDBOX** | Violet/Indigo accent badge (`🎮 DEMO MODE`), dashed borders, prominent virtual tag. | *"Practicing with 10,000 Virtual USDC — Zero financial risk"* | Never make demo orders look like binding financial trades. |
| **6. REAL CAPITAL** | Emerald/Gold accents, solid security badges, explicit confirmation modals. | *"Real Trading Mode · Balance: $250.00 USDC"* | Never allow a user to trade real money without clear risk review. |
| **7. SUCCESS** | Animated checkmark, celebration accent, instant transaction summary card. | *"Prediction Placed! 50 shares of YES @ 65¢. Potential Payout: $50.00"* | Never reset an input form silently without a success state. |
| **8. ERROR** | Rose outline, clear non-technical explanation, explicit recovery button. | *"Insufficient balance ($12.50 available). Reduce amount or top up."* | Never show raw stack traces or cryptic HTTP status codes. |
| **9. RESOLVED** | Monochromatic slate card, bold stamp (`RESOLVED: YES`), settlement payout note. | *"Resolved on Nov 8. YES holders paid out $1.00/share."* | Never display interactive Buy/Sell slips on closed markets. |

### Core Architectural Principle: Evidence-Integrity
> **"Never allow product messaging to contradict visible evidence."**
> - If volume is $0, copy must state *"New Market"*, never *"Hot / Trending"*.
> - If a trade is executed in the demo sandbox, transaction receipts must state *"Simulated Order"*, never cryptographic blockchain hashes.
> - If a leaderboard period has no participants, copy must state *"Competition starting soon"*, never display an empty table below a *"$250,000 Awarded"* headline.

---

## 5. Web-2.0 Structured Backlog

### A. UX Initiatives (Interaction, Flows & Mental Models)
- **`UX-01` [P0] Dollar-First Order Entry**: Default order slip input to `$ Dollar Amount` with automatic share quantity calculation; provide secondary toggle for advanced share trading.
- **`UX-02` [P0] Instant Guest Sandbox Execution**: Allow unauthenticated visitors to place a 1-click practice trade immediately; prompt account creation only to save and track positions.
- **`UX-03` [P0] Context-Preserving Return URLs**: Ensure any authentication trigger (Quick Buy, Follow, Join) saves route intent and returns user directly to execution upon login.
- **`UX-04` [P1] Post-Order Confirmation Modal & Toast**: Render immediate transaction receipts with social share triggers and 1-click navigation to portfolio.
- **`UX-05` [P1] Direct Portfolio Position Exit**: Add a direct `[Sell / Cash Out]` action button on every position row in `/portfolio`.
- **`UX-06` [P2] Sticky Mobile Trade Bar**: Replace the 2-tap mobile drawer with a sticky 1-tap persistent bottom bar showing YES/NO prices.
- **`UX-07` [P2] Social Sharing Consent Prompt**: Add an inline checkbox in the order slip: `[✓] Share prediction to community feed`.

### B. UI & Design System Initiatives (Visuals, Layout & Hierarchy)
- **`UI-01` [P0] Trade Slip Information Re-Architecture**: Reorder slip vertically: Outcome Selection (`YES/NO`) → Budget Input (`$ Amount`) → Payout Breakdown → Mode Badge → Place Order CTA.
- **`UI-02` [P1] Homepage Hero Redesign**: Remove non-clickable decorative chips; implement an interactive 3-step visual explainer banner and a high-conviction "Market of the Day".
- **`UI-03` [P1] Active Route Navigation Indicators**: Add glowing gradient indicator pills on top navigation links to eliminate user disorientation.
- **`UI-04` [P2] Support Widget Viewport Collision Fix**: Elevate support trigger z-index rules and add responsive margins to eliminate overlap with trading slips.
- **`UI-05` [P2] Consolidated Catalog Toolbar**: Merge `/markets` category pills, sort dropdowns, and quick filters into a clean single-row filter bar.
- **`UI-06` [P2] Recharts Axis Precision**: Add explicit `¢`, `%`, and date timestamps to the market price history chart.
- **`UI-07` [P2] Visual Risk Demarcation**: Apply a distinct purple/neon theme to Demo sandbox surfaces and a refined emerald/gold theme to Real capital surfaces.

### C. Content & Copywriting Initiatives (Clarity, Trust & Semantics)
- **`CNT-01` [P0] Binary Settlement Micro-Copy**: Introduce inline explainers across all cards: *"Each share pays $1.00 if event occurs."*
- **`CNT-02` [P0] Terminology Replacement**: Replace `Average Price` with `Price / Implied Probability`; replace `Unrealized P&L` with `Current Return`.
- **`CNT-03` [P1] Payout vs. Return Clarity**: Standardize labels to `Total Stake: $20.00` | `Net Profit: $10.77` | `Total Payout: $30.77`.
- **`CNT-04` [P1] Removal of Vendor Jargon**: Eliminate all references to "Privy" and mock hexadecimal hashes across Settings and Activity.
- **`CNT-05` [P2] Elimination of Pre-Launch Test Content**: Replace `#futurefoundry`, `#producttesting`, and dummy usernames with realistic geopolitical, tech, and cultural market fixtures.
- **`CNT-06` [P2] Grammatical & Pluralization Polish**: Implement dynamic string pluralization across all community counters.

### D. Product Feature Initiatives (New Capabilities & Spaces)
- **`PRD-01` [P1] Dedicated Group Hubs (`/groups/:id`)**: Build interior group sub-pages featuring category discussions, member rosters, and curated market lists.
- **`PRD-02` [P1] Interactive Forecaster Profiles (`/user/:id`)**: Enable clicking leaderboard handles to view trading track records, win rates, and recent sentiment posts.
- **`PRD-03` [P2] Demo Arena Leaderboard Tab**: Implement a dedicated practice leaderboard ranking virtual ROI, allowing demo traders to compete for badges.
- **`PRD-04` [P2] Simulated Wallet Deposit Drawer**: Provide an interactive mock debit card / Apple Pay funding simulator to satisfy the "Deposit" workflow without real financial risk.

### E. Technical & Architectural Initiatives (State, Storage & Performance)
- **`TECH-01` [P0] Return-URL Router State**: Extend `RouterContext` to preserve query params and post-auth redirect targets.
- **`TECH-02` [P1] Session-Scoped Storage Isolation**: Refactor `localStorage` keys so guest sessions never read or display prior user data (fixing `F-38`).
- **`TECH-03` [P1] Settings State Hydration**: Persist notification switches and display preferences in a clean `omx_user_settings` storage key.
- **`TECH-04` [P2] State-Aware Market Engine**: Compute market volatility dynamically rather than serving static "Low Volatility" banners.

---

## 6. Ranked Top 10 Web-2.0 Strategic Initiatives

Reflecting the actual end-to-end user journey (Land → Understand → Select → Budget → Trade → Confirm → Track):

1. **`INIT-01` Dollar-First Budget Input (`UX-01`)**: Eliminates the mental calculation barrier by letting users enter currency rather than abstract shares.
2. **`INIT-02` Homepage 3-Step Educational Onboarding (`UI-02` & `CNT-01`)**: Teaches the binary prediction model within the first 5 seconds of arrival.
3. **`INIT-03` Payout & Price Formula Clarity (`CNT-02` & `CNT-03`)**: Replaces confusing financial jargon ("Average Price") with clear odds and profit payouts.
4. **`INIT-04` Frictionless Quick Buy with Context Preservation (`UX-02` & `UX-03`)**: Allows 1-click guest sandbox trading without hitting an abrupt auth wall.
5. **`INIT-05` Post-Order Celebration & Confirmation Receipt (`UX-04`)**: Closes the transaction loop with explicit confirmation, receipt details, and portfolio links.
6. **`INIT-06` Direct Portfolio Position Cash Out (`UX-05`)**: Empowers traders to take profits or cut losses directly from their dashboard.
7. **`INIT-07` Consolidated Catalog Discovery Toolbar (`UI-05`)**: Unifies redundant filters and search into a clean, intuitive discovery desk.
8. **`INIT-08` Deep Community Group Sub-Surfaces (`PRD-01`)**: Transforms groups from a dead-end directory into active discussion hubs.
9. **`INIT-09` State-Aware Product Messaging & Integrity (`UI-02` & `CNT-05`)**: Aligns visual copy with reality, eliminating fake mature-market claims on cold-start screens.
10. **`INIT-10` Responsive 1-Tap Mobile Trade Architecture (`UX-06`)**: Makes predicting on mobile viewports fast, fluid, and thumb-friendly.

---

*Document established in `research/m8-prioritization.md`.*
