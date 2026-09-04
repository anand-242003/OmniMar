# Milestone 8 — Web-2.0 Future User Journeys & Experience Architecture
## OmniMarketX Interaction Design Blueprint

**Target**: `web-2.0` End-to-End User Experience Strategy  
**Baseline**: `research/m7-ux-audit.md` and `research/m8-prioritization.md`  
**Status**: Authoritative Journey Blueprint  
**Rules**: `web-1.0` is strictly frozen. Strategy and journey design only.

---

## 1. The Future Experience Model: The 8-Stage Cycle

Rather than treating OmniMarketX as a disconnected collection of tabs, `web-2.0` organizes all product surfaces around a continuous, self-reinforcing **8-Stage Prediction Cycle**:

```
                              THE PREDICTION CYCLE
        ┌─────────────────────────────────────────────────────────────┐
        │                                                             │
        ▼                                                             │
   1. DISCOVER ──► 2. UNDERSTAND ──► 3. EVALUATE ──► 4. PREDICT       │
        ▲                                                │            │
        │                                                ▼            │
    8. LEARN   ◄──  7. DISCUSS   ◄──  6. MONITOR ◄── 5. CONFIRM       │
        │                                                             │
        └─────────────────────────────────────────────────────────────┘
```

### How Surfaces Contribute to the Cycle

| Stage | Core User Activity | Primary Surface | Information & Psychological Anchor |
|:---|:---|:---|:---|
| **1. DISCOVER** | Spotting high-conviction, culturally relevant events. | `/home`, `/markets`, `/trending` | Visual category cards, live volatility badges, trending debates. |
| **2. UNDERSTAND** | Grasping the exact question, resolution source, and closing time. | `/markets/:id` (Left column) | Plain-English proposition, official oracle citation, settlement timeline. |
| **3. EVALUATE** | Weighing market-implied probability against personal conviction. | `/markets/:id` (Chart) | Interactive price history, probability consensus percentage, volume depth. |
| **4. PREDICT** | Sizing risk and backing YES or NO with currency. | Trade Order Slip (Right rail / Drawer) | Dollar-first input, clear potential profit, transparent risk summary. |
| **5. CONFIRM** | Validating transaction execution and securing position proof. | Order Confirmation Modal / Toast | Instant execution receipt, shareable graphic, 1-click portfolio link. |
| **6. MONITOR** | Tracking live probability swings and position value changes. | `/portfolio` | Real-time position mark, settlement countdown, cash-out triggers. |
| **7. DISCUSS** | Debating hypotheses, explaining rationale, and sharing conviction. | `/social`, `/groups/:id` | Sentiment-tagged commentary, attached prediction slips, topic threads. |
| **8. LEARN** | Analyzing forecaster track records and improving strategy. | `/leaderboard`, `/user/:id` | Win rates, historical accuracy, copy-trade inspiration, reward pools. |

---

## 2. The First 60 Seconds: Frictionless Onboarding Timeline

The first minute dictates whether a mainstream user adopts OmniMarketX or bounces forever.

### Minute-by-Minute Experience Timeline

```
0s ─────── 10s ─────── 20s ─────── 35s ─────── 45s ─────── 60s
│           │           │           │           │           │
▼           ▼           ▼           ▼           ▼           ▼
Arrive      See 3-Step  Click YES   Type $20    1-Click     Celebrate
at /home    Explainer   on Top      into Slip   Instant     & View
            Banner      Market                  Sandbox     Receipt
```

- **00:00 – 00:10 (Arrive & Orient)**:
  - **What they see**: A bold, clean hero: *"Predict the Future. Trade What Matters."* Below the headline sits an interactive **3-Step How It Works Banner**:
    1. *Choose an Event* (e.g. Will Bitcoin cross $100K?)
    2. *Pick YES or NO* (Shares priced from 1¢ to 99¢ reflect implied odds)
    3. *Win $1.00 per Share* (Correct predictions settle at exactly $1.00)
  - **What they understand**: This is not complex crypto derivatives; it's a binary outcome prediction game with transparent math.
- **00:10 – 00:25 (Discover High-Conviction Market)**:
  - **What they see**: The "Market of the Day" hero card featuring a culturally resonant event (*"Will GTA VI release before Dec 2026?"*).
  - **What they understand**: Current odds: `YES 65¢ (65% chance)` / `NO 35¢ (35% chance)`.
  - **What they click**: The prominent green `YES 65¢` button on the card.
- **00:25 – 00:40 (Evaluate & Budget)**:
  - **What opens**: The streamlined Order Slip slides into focus.
  - **What they see**: An input box defaulted to `$ Dollars` with quick chips (`$10`, `$25`, `$50`, `$100`).
  - **What they type / click**: They tap `$25`.
  - **What the slip calculates instantly**:
    - *Cost*: `$25.00`
    - *Shares*: `38.4 shares`
    - *If YES wins*: **`$38.46 Total Payout`** (+$13.46 Net Profit).
  - **What they learn**: If they are right, they make money immediately upon resolution.
- **00:40 – 00:55 (Execute Prediction without Auth Interruption)**:
  - **The Action**: User clicks the vibrant gradient button: **`Place Demo Prediction ($25)`**.
  - **Zero Auth Wall**: As a first-time guest, the platform executes the trade instantly against their pre-funded **$10,000 Virtual Sandbox Balance**. No email prompt, no wallet popup, no password.
- **00:55 – 01:00 (Celebrate & Save)**:
  - **What happens**: A celebratory confirmation sheet appears:
    - *"🎉 Prediction Placed! You hold 38.4 YES shares in GTA VI."*
    - Soft call to action: *"Create a free account to save your $10,000 balance and track your win."*
    - Two buttons: `[Save My Predictions]` and `[Explore More Markets]`.

### Proposed Design Performance Targets
- **Time to Comprehension**: $< 10\text{ seconds}$ (validated via 5-second headline test).
- **Time to First Market Interaction**: $< 20\text{ seconds}$ (first click on a YES/NO pill).
- **Time to First Prediction**: $< 50\text{ seconds}$ (end-to-end guest trade execution).

---

## 3. Deep Analysis of Core User Journeys

---

### Journey A: First-Time Visitor → Understands Product → Explores → Makes First Prediction

- **User Goal**: Check out what OmniMarketX is, understand the concept without feeling dumb, and place a low-friction test prediction.
- **User Questions**:
  - *"Is this legal betting or a stock market?"*
  - *"Do I have to connect a crypto wallet right now?"*
  - *"What does 65¢ mean? What do I get if I'm right?"*
- **Current Friction in web-1.0**:
  - No hero CTA; non-clickable category chips.
  - Market cards display raw cents without probability explanations.
  - Clicking Quick Buy immediately hits an abrupt Privy modal.
- **Future Experience (web-2.0)**:
  - Top banner explains binary $1.00 payout in one sentence.
  - Cards show dual labels: `YES 65¢ (65% chance)`.
  - Trade slip defaults to `$ Amount`.
  - Guest sandbox mode allows instant trade execution before requiring registration.
- **Screens Involved**: `/home` → `/markets/:id` → Order Slip → Success Modal.
- **Key Interaction**: Clicking quick-amount chip (`$25`) and tapping `Place Demo Prediction`.
- **Information Required**: Market question, closing date, resolution source, cost, and potential net profit.
- **Emotional State**: Curious → Slightly Skeptical → Relieved (easy math) → Empowered (placed first trade).
- **Possible Failure Points**: User types "10" into shares instead of dollars; user fears real money is being charged.
- **Recovery Path**: Clear toggle switch between `$ Dollars` and `Shares`; persistent `🎮 PRACTICE MODE — ZERO RISK` visual badge.
- **Success Condition**: User executes a demo trade within 60 seconds and views their active holding.

---

### Journey B: Visitor → Quick Buy → Authentication → Returns to Target → Completes Prediction

- **User Goal**: Spontaneously back an outcome directly from the catalog and register smoothly without losing their place.
- **User Questions**:
  - *"Why is it asking for my email right now?"*
  - *"Will it remember what I just clicked?"*
  - *"Do I have to create a password?"*
- **Current Friction in web-1.0**:
  - Clicking Quick Buy opens a modal titled "Sign In" (suggesting returning users only).
  - After completing email verification, the app redirects to `/home`, losing the market context.
- **Future Experience (web-2.0)**:
  - Clicking `Quick Buy YES` on `/markets` immediately stages the order slip in a flyout drawer.
  - If unauthenticated and exceeding guest limits, the modal clearly states: *"Save your prediction on [Market Title] — Enter email for instant sign in"*.
  - Upon submitting OTP, the router seamlessly restores the staged order slip on the exact market with the amount pre-filled.
- **Screens Involved**: `/markets` → Staged Order Drawer → Contextual Auth Modal → Staged Order Drawer (Authenticated).
- **Key Interaction**: Single-click OTP submission followed by immediate 1-tap order confirmation.
- **Information Required**: Market title, selected outcome (`YES`), pre-filled stake, clear explanation of passwordless email code.
- **Emotional State**: Impatient → Reassured (market was remembered) → Satisfied.
- **Possible Failure Points**: Auth takes >30 seconds; email OTP delayed; user closes modal.
- **Recovery Path**: Prominent "Resend code in 20s" link; modal close button keeps the order slip open in guest mode.
- **Success Condition**: User lands right back on the target market order slip with zero manual re-navigation.

---

### Journey C: First Prediction → Confirmation → Portfolio → Activity → Social Discussion

- **User Goal**: Verify that their prediction was recorded, track its live performance, and share their reasoning with others.
- **User Questions**:
  - *"Where did my shares go?"*
  - *"How do I track if I'm winning?"*
  - *"Can I tell other people why I predicted YES?"*
- **Current Friction in web-1.0**:
  - Trade slip resets silently with no feedback.
  - User has to hunt for `/portfolio` in the nav.
  - Trades auto-post to `/social` with generic text without user commentary.
- **Future Experience (web-2.0)**:
  - Placing an order triggers a celebratory confirmation modal:
    - Highlights: *38.4 YES Shares in GTA VI @ 65¢*.
    - Optional commentary field: *"Why did you make this prediction? (Share to feed)"*.
    - Direct buttons: `[View in Portfolio]` and `[Join Discussion]`.
  - In `/portfolio`, the position glows as "New", showing current probability, cost basis, and payout on resolution.
  - In `/social`, the user's post appears with their personal commentary and an interactive market badge.
- **Screens Involved**: Order Slip → Confirmation Modal → `/portfolio` → `/social`.
- **Key Interaction**: Typing an optional 1-sentence hypothesis in the confirmation modal and clicking `Post & View Portfolio`.
- **Information Required**: Shares owned, cost basis, current market price, potential payout, timestamp.
- **Emotional State**: Anticipatory → Confident → Expressive & Connected.
- **Possible Failure Points**: User thinks portfolio is empty because of tab lag; commentary field feels mandatory.
- **Recovery Path**: Commentary field is explicitly labeled *(Optional)*; portfolio renders instantly via optimistic UI updates.
- **Success Condition**: User sees their position tracked in Portfolio and their reasoning debated on Social.

---

### Journey D: Returning User → Discovers Market → Evaluates Probability → Predicts → Monitors

- **User Goal**: Efficiently scan new markets, find high-probability or mispriced opportunities, execute quickly, and manage existing positions.
- **User Questions**:
  - *"What moved overnight?"*
  - *"Has new news broke on my open positions?"*
  - *"Should I cash out early to lock in gains?"*
- **Current Friction in web-1.0**:
  - Homepage is cluttered with static, repetitive tickers.
  - Portfolio cannot exit or sell positions directly.
- **Future Experience (web-2.0)**:
  - Header displays a compact **Daily Briefing**: 1-line update on active holdings (*"GTA VI YES probability rose +8% today"*).
  - Markets catalog provides quick filters: `RISING FAST`, `HIGH LIQUIDITY`, `CLOSING IN 24H`.
  - Detailed resolution chart offers `1D`, `1W`, `1M`, and `ALL` with volume bars and news markers.
  - `/portfolio` position rows feature a direct `[Sell / Cash Out]` button with live market bid pricing.
- **Screens Involved**: `/home` (Authenticated Dashboard) → `/markets/:id` → `/portfolio`.
- **Key Interaction**: Clicking `[Cash Out]` on a winning position to lock in virtual or real profits before market settlement.
- **Information Required**: Unrealized profit, probability delta, time to market close, secondary market bid price.
- **Emotional State**: Focused → Analytical → Decisive → In Control.
- **Possible Failure Points**: Market has wide bid-ask spread; cash-out value is less than expected.
- **Recovery Path**: Transparent cash-out confirmation modal detailing exact proceeds and remaining shares.
- **Success Condition**: Returning user monitors open wagers, executes an exit on one, and places a new prediction within 2 minutes.

---

### Journey E: Social User → Discovers Prediction in Feed → Understands Context → Predicts

- **User Goal**: Browse the community feed, find a compelling debate between knowledgeable forecasters, and take the opposing or agreeing side.
- **User Questions**:
  - *"Why is @CryptoWhale predicting NO on this?"*
  - *"What are the arguments on both sides?"*
  - *"Can I trade directly from this post?"*
- **Current Friction in web-1.0**:
  - Social feed contains low-signal auto-generated bot posts.
  - Embedded market cards link to the market page but lack in-feed probability and quick action triggers.
- **Future Experience (web-2.0)**:
  - Social posts prominently display the author's verified track record (*"Top 5% Predictor · 74% Win Rate"*).
  - Posts include a rich interactive Market Preview Widget displaying:
    - Market title and closing date.
    - Mini probability bar: `65% YES` | `35% NO`.
    - Direct in-feed action buttons: `[Agree YES 65¢]` and `[Bet NO 35¢]`.
  - Clicking `[Bet NO 35¢]` expands an inline micro-trade slip directly below the post.
- **Screens Involved**: `/social` → In-feed Micro-Slip → Order Toast.
- **Key Interaction**: Clicking `[Agree]` or `[Bet Opposing]` directly within the social stream.
- **Information Required**: Author credibility, reasoning text, current odds, market question, quick stake options.
- **Emotional State**: Engaged → Challenged → Competitive → Validated.
- **Possible Failure Points**: User wants full resolution rules before betting; in-feed slip feels cramped.
- **Recovery Path**: Clean link: `[View Full Market Details & Rules ->]` opens detail modal or dedicated route.
- **Success Condition**: User converts from passive social reader to active market participant in 2 taps.

---

### Journey F: Mobile User → Discovers Market → Evaluates → Trades → Receives Confirmation

- **User Goal**: Check markets on a smartphone (375px viewport), make a prediction while on the go, with zero horizontal scroll clipping or cumbersome modal layers.
- **User Questions**:
  - *"Where is the buy button on this tiny screen?"*
  - *"Did the order drawer hide my market question?"*
- **Current Friction in web-1.0**:
  - Order slip is buried inside a 2-tap bottom drawer that conceals the market title and resolution chart.
  - Floating support widget collides with mobile trade CTA.
- **Future Experience (web-2.0)**:
  - Market detail on mobile features a **Persistent Sticky Bottom Bar**:
    - Left side: Live probability pill (`65% YES`).
    - Right side: Split action pill (`[YES 65¢] | [NO 35¢]`).
  - Tapping either outcome slides up a clean, half-height bottom sheet:
    - Pre-focused on `$ Amount` with thumb-friendly quick chips (`$10`, `$25`, `$50`).
    - Bottom button spans full width: `Confirm YES Prediction ($25)`.
  - Support widgets are hidden or docked in the top navigation bar.
- **Screens Involved**: Mobile `/markets/:id` → Sticky Bottom Bar → Slide-up Half Sheet → Mobile Toast.
- **Key Interaction**: Single tap on sticky outcome button followed by thumb tap on `$25` and confirm.
- **Information Required**: Outcome prices, dollar budget input, potential payout, swipe-down dismiss handle.
- **Emotional State**: On-the-go → Agile → Satisfied by smooth haptic-style micro-interactions.
- **Possible Failure Points**: Keyboard pushes action button off screen; accidental dismiss.
- **Recovery Path**: Sheet adapts height to virtual keyboard (`interactive-widget=resizes-content`); input maintains focus.
- **Success Condition**: Frictionless mobile execution completed with one hand in under 15 seconds.

---

## 4. Convergence of User & Product Mental Models

The fundamental design mandate of `web-2.0` is to eliminate the cognitive chasm where user intuition clashes with financial exchange mechanics.

```
                           MENTAL MODEL CONVERGENCE
┌─────────────────────────────────┐               ┌─────────────────────────────────┐
│        USER MENTAL MODEL        │               │       PRODUCT MENTAL MODEL      │
│  "I have $20. What do I win?"   │               │   "Buy N derivative contracts"  │
└─────────────────────────────────┘               └─────────────────────────────────┘
                 │                                                 │
                 └───────────────────────┬─────────────────────────┘
                                         ▼
                         WEB-2.0 CONVERGED EXPERIENCE
       ┌─────────────────────────────────────────────────────────────────┐
       │ 1. Primary input is Dollars ($20).                              │
       │ 2. Contract math is automated under the hood (30.7 shares).     │
       │ 3. Payout is explicitly stated: "$20.00 Stake pays $30.77".    │
       │ 4. Probability is explicit: "65¢ share = 65% Implied Chance".   │
       │ 5. Practice sandbox is isolated with zero financial ambiguity.  │
       └─────────────────────────────────────────────────────────────────┘
```

### Convergence Matrix across Key Concepts

| Axis | What the User Thinks | What the System Actually Does | The Web-2.0 Converged Solution |
|:---|:---|:---|:---|
| **Cents vs. Probability** | *"65¢ is a price, like buying an item at a grocery store."* | 65¢ represents the market clearing price of a binary contract paying $1.00 (65% probability). | Display both side-by-side everywhere: **`65¢ (65% chance)`**. Use tooltips: *"Priced between 1¢ and 99¢ based on community consensus."* |
| **Shares vs. Dollars** | *"I want to bet $50 on YES."* | Order book matches integer quantities of contract shares at limit prices. | Default the input field to **`$ Amount`**. Automatically compute shares in smaller muted text: `(Buys 76.9 shares @ 65¢)`. Provide a "Shares" toggle for advanced users. |
| **Payout vs. Return** | *"What is my total cash payout versus my profit?"* | `Potential Return` is profit; `Max Payout` is gross settlement including capital. | Use clear, standard consumer terminology: **`Your Stake: $50.00`** \| **`Net Profit: +$26.92`** \| **`Total Payout: $76.92`**. |
| **Demo vs. Real** | *"Is this real crypto or practice points?"* | Demo uses a local virtual ledger (10,000 USDC); Real connects to Web3 wallets or on-ramps. | Apply distinct visual themes: **Deep Violet with Dashed Borders & Game Icon** for Demo; **Rich Emerald with Solid Security Shield** for Real. |
| **Wallet vs. Balance** | *"Where do I enter my credit card or bank details?"* | Web3 non-custodial wallet infrastructure holding USDC on Polygon/Base. | Provide a familiar consumer on-ramp modal: *"Top up with Card, Apple Pay, or Crypto Wallet"*, hiding raw smart-contract complexity. |
| **Portfolio vs. Positions** | *"My Bets — which ones are winning?"* | Equity derivative accounting calculating daily unrealized mark-to-market P&L. | Re-label to **`Current Value`** and **`Projected Payout`**. Add settlement countdown badges: `Resolves in 4 days`. |
| **Social vs. Trade** | *"Social is where I talk to friends privately or publicly."* | Executing a demo trade creates an event in the public feed. | Add explicit agency: an inline checkbox **`[✓] Share prediction to community feed`** with optional commentary. |
| **Leaderboard vs. Performance** | *"If I make winning predictions, I will rank up."* | Upstream leaderboard tracks high-stakes cash reward pools decoupled from demo balances. | Introduce a dedicated **`Demo Arena`** leaderboard tab celebrating virtual prediction win rates and streaks. |
| **Group Membership vs. Space** | *"Joining a community lets me chat with other forecasters."* | Clicking join increments a counter; no sub-surface existed in `web-1.0`. | Clicking any group opens a dedicated **Group Hub (`/groups/:id`)** with category debates, active markets, and member rosters. |

---

*Document established in `research/m8-user-journeys.md`.*
