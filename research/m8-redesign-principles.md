# Milestone 8 — Web-2.0 Redesign Principles, Anti-Generic Rules & Quality Bar
## OmniMarketX Design System & Quality Foundation

**Target**: `web-2.0` Visual, Interaction & Content Design System  
**Baseline**: `research/m7-ux-audit.md` (M7.1), `research/m8-prioritization.md`, `research/m8-user-journeys.md`  
**Status**: Authoritative Design Standard  
**Rules**: `web-1.0` is strictly frozen. Design governance and quality criteria only.

---

## 1. Concrete Definition of "Beautiful OmniMarketX"

"Beauty" at OmniMarketX is treated as an objective engineering and product-quality requirement, not as subjective cosmetic decoration.

### The 10 Tenets of OmniMarketX Beauty
1. **Hierarchy Before Decoration**: The visual weight of any element must strictly correspond to its importance in the user's decision-making process. No element is styled to look "cool" if it distracts from the prediction question or payout calculation.
2. **Fewer, Stronger Elements**: Prefer one high-contrast, authoritative component over five competing badges, pill tags, and mini-meters.
3. **Intentional Whitespace**: Space is not empty void; it is a structural separator that gives complex probabilities room to breathe and reduces cognitive load.
4. **Typographic Authority**: Pair the geometric editorial clarity of **`Sora`** with the tabular precision of **`Geist Mono`**. Text contrast must be sharp, legible, and hierarchically disciplined.
5. **Meaningful Semantic Color**: Color is reserved almost exclusively for communicative signals (Emerald for YES / profit, Rose for NO / loss, Violet for Demo sandbox, Gold for reward ranks). Neutral surfaces must remain neutral.
6. **Restrained, Purposeful Gradients**: Brand gradients (`#f23064` via `#ff4f55` to `#ff6b1a`) are reserved for primary action commitments (e.g. `Place Prediction`) and active navigation pills. They are never splashed gratuitously across container backgrounds.
7. **Purposeful Micro-Motion**: Motion exists solely to confirm state changes, communicate physics (e.g. drawers sliding up), or reward execution. Zero ambient looping animations that waste GPU cycles.
8. **High-Signal Content**: Every market title, description, and resolution rule must read like credible Reuters or Bloomberg journalism. No synthetic marketing fluff.
9. **Zero Fake Urgency**: No flashing red banners, artificial countdown tickers, or manipulative casino sounds.
10. **Evidence Integrity**: Interface presentation must never assert activity, volume, or liquidity that does not exist in the underlying data layer.

---

## 2. The 19 Foundational Redesign Principles

### A. UX Principles
- **Dollar-First Sizing**: Users budget in currency, not in derivative contracts. The primary input must be dollars; shares are a secondary calculated attribute.
- **Continuous State Preservation**: An authentication requirement or route shift must never erase staged order inputs or navigation targets.
- **Two-Tap Mobile Parity**: Any action achievable in one click on desktop must require no more than two thumb taps on mobile.

### B. UI Principles
- **Component Consistency**: A market card on `/home` must obey the exact visual grammar and token hierarchy as a market card on `/markets` or embedded in `/social`.
- **Z-Index Discipline**: Floating support triggers and modal sheets must obey an absolute elevation hierarchy that guarantees zero interactive collisions.

### C. Visual Hierarchy Principles
- **Top-Down Decision Flow**: 1. What is the question? → 2. What are the odds? → 3. When does it settle? → 4. What is the stake? → 5. What is the payout? Any screen layout violating this sequence must be reordered.

### D. Typography Principles
- **Sans for Ideas, Monospace for Value**:
  - `Sora`: Headlines, market titles, commentary, navigation labels.
  - `Geist Mono`: Prices (`65¢`), share quantities (`38.4`), payouts (`$38.46`), timestamps (`14:02 UTC`), and mathematical breakdowns.

### E. Color Principles
- **The 80/15/5 Palette Rule**:
  - `80%` Deep Space Dark neutrals (`#090426` background, `#110a36` cards, `#1b1150` borders).
  - `15%` High-contrast text neutrals (Pure white `#ffffff` headings, `#94a3b8` slate subtitles).
  - `5%` High-intensity semantic accents (Emerald YES `#10b981`, Rose NO `#f43f5e`, Pink primary `#f23064`).

### F. Spacing Principles
- **4px / 8px Spatial Grid**: All padding, margins, and component gaps must strictly align to the 8pt token scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`). Ad-hoc pixel margins (e.g. `13px`, `27px`) are strictly forbidden.

### G. Information Density Principles
- **Progressive Disclosure**: High-level catalog cards show the core proposition and odds; detailed resolution rules, data sources, and order book depth are revealed upon entering the market detail desk.

### H. Charts & Data Visualization Principles
- **Axis Integrity**: Every price chart must feature explicit Y-axis unit labels (`¢` and `%`) and unambiguous date timestamps on the X-axis. Zero uncalibrated sparklines.

### I. Trading Interaction Principles
- **Symmetric Outcome Physics**: YES and NO must receive identical interactive weight. Selecting an outcome must provide instantaneous visual feedback (solid fill + glowing outline) before the order is submitted.

### J. Feedback & State Principles
- **The 100ms Acknowledgement**: Every button press must provide immediate visual acknowledgement within 100ms, followed by an explicit transactional confirmation receipt upon order execution.

### K. Onboarding Principles
- **Inline Learning**: Teach prediction mechanics contextually at the point of decision, never via multi-step blocking modal popups that users frantically close.

### L. Social Content Principles
- **Signal Over Volume**: Community commentary is valuable only when paired with market conviction. Prioritize posts that feature attached prediction cards and verified forecaster track records.

### M. Empty States Principles
- **Honest Invitation**: An empty state must never look like a broken void. It must state what is missing, why it is missing, and provide a single prominent button to populate it.

### N. Error Handling Principles
- **Non-Blaming Recovery**: Error notices must explain the physical constraint (e.g. *"Balance insufficient for a $50 stake"*) and provide a 1-click recovery button (e.g. *"[Adjust to Max Available ($32)]"*).

### O. Mobile Responsiveness Principles
- **Thumb-Zone Optimization**: All high-frequency action buttons (outcome toggles, order confirmations) must sit comfortably in the bottom 40% of the mobile viewport.

### P. Accessibility (a11y) Principles
- **WCAG AA Compliance**: Contrast ratios between text and card backgrounds must exceed `4.5:1`. Outcome pills must never rely solely on color (always pair green with "YES" text and red with "NO" text).

### Q. Content & Copywriting Principles
- **Plain-English Truth**: Eliminate derivative exchange jargon. Replace "Unrealized P&L" with "Current Return"; replace "Average Price" with "Cost per Share (Implied Chance)".

### R. Motion Principles
- **Natural Springs & Micro-Eases**: Sheet transitions use `cubic-bezier(0.16, 1, 0.3, 1)` with durations between `150ms` and `250ms`. No sluggish, exaggerated animations.

### S. Trust & Security Principles
- **Oracle Transparency**: Every market must explicitly cite its settlement authority (e.g. *"Resolved via Associated Press / Official Election Certification"*).

---

## 3. Anti-AI-Generic Design Rules

To ensure OmniMarketX feels like a distinctive, category-defining product rather than a generic template generated by an AI coding agent, all screens must adhere to these prohibitions:

```
                              THE REJECTION LIST
┌──────────────────────────────────────┬──────────────────────────────────────┐
│       AI-GENERIC PATTERNS            │      OMNIMARKETX CRAFT STANDARD      │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ ❌ "Unlock your prediction journey"  │ ✓ "Trade What Matters"               │
│ ❌ Purple/Cyan neon glow on cards    │ ✓ Slate borders with deep navy card  │
│ ❌ Floating 3D glassy spheres        │ ✓ Crisp Recharts probability lines   │
│ ❌ Emoji bulleted lists              │ ✓ Clean tabular data with Geist Mono │
│ ❌ Card grids with identical copy    │ ✓ Curated, real-world propositions   │
│ ❌ Fake testimonials & bot handles   │ ✓ Transparent, verified ROI metrics  │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

1. **No Generic Startup Copy**: Ban phrases like *"Supercharge your predictions"*, *"The future of forecasting is here"*, or *"Unleash your insights"*. Use concrete verbs: *Predict*, *Trade*, *Verify*, *Win*.
2. **No Repetitive Card Structures**: Avoid endless identical 3-column cards with an emoji on top, bold title, and two lines of lorem ipsum. Vary density by content type.
3. **No Excessive Rounded Containers**: Avoid `rounded-3xl` or pill containers on large structural cards. Keep structural radiuses restrained (`12px` to `16px`).
4. **No Arbitrary Glassmorphism**: Forbid semi-transparent cards with `backdrop-blur-md` on content surfaces where text readability drops below standard contrast.
5. **No Decorative Emojis Without Semantic Meaning**: Never prepend emojis to standard navigation items or table headers merely to add color.
6. **No Fake Urgency or Artificial Metrics**: Forbid artificial countdown timers that reset on page reload or fake "5 people viewing this" badges.
7. **No Meaningless Metric Tiles**: Do not create dashboard tiles showing numbers that do not correspond to actionable user data (e.g. *"Global Platform Liquidity: 99.8%"*).
8. **No Visual Sameness**: Differentiate discovery surfaces (vibrant, story-led) from trading surfaces (calm, precise, terminal-grade).

---

## 4. Evidence-Integrity Principle

> ### Core Mandate:
> **"Never allow product messaging to contradict visible evidence."**

When an interface makes claims that are contradicted by the data rendered on the same screen, user trust drops to zero:
- **Rule 1**: If volume is $0, the market card must read *"New Market"*, **never** *"Hot"* or *"Trending"*.
- **Rule 2**: If an order is executed in the demo sandbox, transaction receipts must read *"Simulated Order — Practice Balance"*, **never** display mock blockchain transaction hashes or fake gas fees.
- **Rule 3**: If a leaderboard timeframe has no settled rankings, the surface must display an honest settlement countdown (*"Monthly competition settles in 12 days"*), **never** display an empty table below a *"$250,000 Awarded"* marketing card.
- **Rule 4**: If the platform is running in local simulation mode, the wallet must clearly explain the sandbox environment, **never** present broken "Deposit" buttons that silently fail.

---

## 5. Web-2.0 Strategic Content & Emoji Framework

### A. Strategic Content Actions

| Content Domain | Target Term / Asset | Strategic Action | Future Web-2.0 Copy Standard |
|:---|:---|:---|:---|
| **Market Titles** | Cultural / Regional propositions | `KEEP` | Maintain clear, verifiable binary questions (e.g. *Will BNB close above US$3,000 by 31 Dec 2026?*). |
| **Order Terminology** | "Shares" | `REWRITE` | Change primary label to **`$ Amount`**; show shares secondarily as **`(38.4 contracts)`**. |
| **Order Terminology** | "Average Price" | `REWRITE` | Change label to **`Cost per Share (Implied Chance: 65%)`**. |
| **Order Terminology** | "Unrealized P&L" | `REWRITE` | Change label to **`Current Profit / Return`**. |
| **Order Payouts** | "Potential Return" vs "Max Payout" | `CLARIFY` | Standardize to: **`Total Stake: $20`** \| **`Net Profit: +$10.77`** \| **`Total Payout: $30.77`**. |
| **Auth Modals** | "Sign In" title | `REWRITE` | Change modal heading to: **`Log in or Create Account`** with subtitle: *"Instant passwordless email sign in."* |
| **Vendor Jargon** | "Privy Passwordless" in Settings | `REMOVE` | Replace with consumer copy: *"Authenticated via Secure Email Code"*. |
| **Infrastructure** | Mock hexadecimal hashes | `REMOVE` | Replace with human-readable order references: `#OMX-9281`. |
| **Hashtags** | Pre-launch test tags (`#futurefoundry`) | `REMOVE` | Replace with authentic market tags (`#uselections`, `#cryptomarkets`, `#boxoffice`). |
| **Leaderboard Copy** | Unverified fictional handles | `REWRITE` | Label clearly during sandbox phases: *"Top Practice Forecasters (Weekly Demo Arena)"*. |

### B. The 5-Tier Emoji Classification Standard
OmniMarketX does not ban emojis; it enforces strict functional discipline:

```
                            EMOJI TAXONOMY
┌──────────────────────────────┬──────────────────────────────┐
│ 1. FUNCTIONAL                │ 2. SEMANTIC                  │
│ Actionable system indicators │ Category & regional anchors  │
│ (● BULLISH, ● BEARISH, 🎮)   │ (⚽ Sports, ₿ Crypto, 🇮🇳 Flag)│
├──────────────────────────────┼──────────────────────────────┤
│ 3. DECORATIVE                │ 4. NOISY                     │
│ Contextual polish (🎉, 🏆)    │ Redundant icons (🚀, 🔥 on 0)|
├──────────────────────────────┴──────────────────────────────┤
│ 5. ARTIFICIAL / SYNTHETIC                                   │
│ Hallucinated status markers (🤖 on standard search bars)     │
└─────────────────────────────────────────────────────────────┘
```

1. **`FUNCTIONAL` (Must Keep)**: Emojis that communicate core system states.
   - `● BULLISH` (Emerald circle) and `● BEARISH` (Rose circle) sentiment badges.
   - `🎮 Demo Prediction`: Verified badge distinguishing virtual practice orders from real capital.
2. **`SEMANTIC` (Keep with Purpose)**: Emojis providing immediate category recognition in compact spaces.
   - Category anchors: `⚽ Sports`, `₿ Crypto`, `🗳️ Politics`, `🎮 Gaming`, `🎬 Entertainment`.
   - Regional flags: `🇮🇳 India`, `🇺🇸 USA` providing immediate geographic context for localized elections or box office events.
3. **`DECORATIVE` (Use Sparingly)**: Emojis used once to celebrate significant milestones.
   - `🎉 Prediction Placed!` on the post-order confirmation receipt.
   - `🏆 $250k Monthly Rewards` on the leaderboard header.
4. **`NOISY` (Strictly Remove)**: Redundant decorative emojis placed on zero-data elements.
   - Removing `🔥 Hot` from markets with 0 volume.
   - Removing `🚀 To the moon` from marketing copy.
5. **`ARTIFICIAL / SYNTHETIC` (Strictly Forbid)**: Emojis placed arbitrarily by AI generators to decorate mundane labels (e.g. `🔍 Search`, `⚙️ Settings`, `✉️ Email`).

---

## 6. Visual Strategy & Aesthetic Philosophy

### Visual Personality: "The Credible Forecaster's Arena"
OmniMarketX must feel like an elite, high-intelligence trading room crossed with a modern social network:
- **Dark Mode Philosophy**: Built on deep space navy (`#090426`) with midnight-purple card elevations (`#110a36`), providing high contrast that makes emerald YES and rose NO pills illuminate like cockpit instruments.
- **Light Mode Philosophy**: Crisp editorial slate (`#f8fafc` background with pure white cards `#ffffff` and deep slate text `#0f172a`), maintaining institutional credibility without looking clinical.
- **Data Visualization Philosophy**: Recharts graphs must feature crisp SVG paths with subtle gradient fills under the active curve. Tooltips must snap magnetically to the cursor with high-contrast coordinate boxes showing probability and timestamp.
- **Trading Panel Philosophy**: The sticky Order Slip is the holy ground of the app. It must feel solid, tactile, and mathematically transparent. Inputs have subtle focus rings (`#f23064`); buttons provide tactile active depression (`active:scale-[0.98]`).

---

## 7. The Strong "KEEP" List (What We Will NOT Redesign)

Protecting verified, high-performing foundational assets established in `web-1.0`:

| Category | Specific Asset / Pattern | Strategic Reason to Preserve |
|:---|:---|:---|
| **KEEP EXACTLY** | **Deep Navy Color Foundation (`#090426`)** | Distinctive brand equity; optimal contrast for probability instruments. |
| **KEEP EXACTLY** | **Typography Pairing (`Sora` + `Geist Mono`)** | Perfect balance between editorial headlines and tabular financial precision. |
| **KEEP EXACTLY** | **Double-Entry Portfolio Accounting Math** | `TradeContext` calculations (Portfolio Value = Cash + Market Value) are mathematically sound. |
| **KEEP EXACTLY** | **Desktop 2-Column Split Layout on `/markets/:id`** | Sticky right-rail slip paired with left-scrollable details is institutional standard. |
| **KEEP EXACTLY** | **Sentiment Badges (`BULLISH` / `BEARISH`)** | Core social prediction interaction; immediately recognizable and effective. |
| **KEEP CONCEPT, REDESIGN EXECUTION** | **10,000 Virtual USDC Demo Sandbox** | Keep the risk-free $10k concept, but give it distinct visual risk branding. |
| **KEEP CONCEPT, REDESIGN EXECUTION** | **Mobile Bottom Drawer** | Keep the bottom sheet concept, but convert it from a hidden 2-tap drawer into an omnipresent sticky bar. |
| **KEEP CONCEPT, REDESIGN EXECUTION** | **Groups Directory** | Keep the category directory, but build real interior `/groups/:id` community sub-surfaces. |
| **REMOVE** | **Non-interactive hero category pills** | Misleading affordance; replaced by interactive 3-step banner. |
| **REMOVE** | **Vendor terminology ("Privy") & mock hashes** | Confusing infrastructure jargon; replaced by consumer copy. |

---

## 8. Web-2.0 Design Quality Bar: 20 Acceptance Criteria

Every screen designed or implemented in `web-2.0` must pass these 20 objective evaluation questions before being approved:

1. **First-Touch Comprehension**: Can a first-time visitor understand the core proposition and payout rule within 5 seconds of landing on this screen?
2. **Decision Hierarchy**: Does the visual hierarchy guide the user from *Question* → *Odds* → *Timeline* → *Stake* → *Payout* without visual back-tracking?
3. **Primary Action Obviousness**: Is the single most important action on the page visually unambiguous and impossible to miss?
4. **Probability Transparency**: Is every share price accompanied by its explicit market-implied probability percentage (e.g. `65¢ (65%)`)?
5. **Dollar-First Budgeting**: Can the user input their wager in standard currency ($) without performing manual share division?
6. **Payout Math Certainty**: Does the order summary clearly distinguish between *Your Stake*, *Net Profit*, and *Total Payout*?
7. **Transactional Feedback**: Does every execution or state transition provide an immediate visual acknowledgement and confirmation receipt?
8. **Evidence Integrity**: Does every claim of "Trending", "High Volume", or "Rewards" match the actual data rendered on screen?
9. **State Distinguishability**: Is the active mode (`Demo Sandbox` vs. `Real Capital`) unmistakably distinct at a single glance?
10. **Empty State Guidance**: Does every empty state explain why it is empty and provide a 1-click pathway to populate it?
11. **Context Preservation**: If authentication is triggered, will the system return the user directly to this exact screen and action upon login?
12. **Anti-AI-Generic Compliance**: Is this screen free of generic startup buzzwords, arbitrary gradients, floating glass spheres, and decorative emojis?
13. **Typographic Discipline**: Are numbers, prices, and shares strictly formatted in `Geist Mono` while headings use `Sora`?
14. **Two-Tap Mobile Parity**: Can this action be completed on a 375px mobile screen in two thumb taps or fewer?
15. **Viewport Clearance**: Are all primary CTAs completely free of visual collision with support widgets, navigation tabs, or bottom bars?
16. **Color Semantics**: Is color reserved strictly for actionable meaning (Emerald = YES, Rose = NO, Violet = Sandbox)?
17. **WCAG AA Accessibility**: Do all text elements meet the `4.5:1` contrast threshold against their card backgrounds?
18. **Resolution Clarity**: Does this market explicitly state the official source or oracle that will decide the outcome?
19. **Secondary Market Freedom**: Can positions displayed in the portfolio be cashed out or exited before resolution?
20. **Brand Distinctiveness**: Does this screen feel authentically like *OmniMarketX* rather than a cloned crypto template?

---

*Document established in `research/m8-redesign-principles.md`.*
