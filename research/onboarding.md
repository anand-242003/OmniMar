# OmniMarketX First-Time User Experience & Onboarding Analysis

## 1. What does the product tell the user to do first? (OBSERVED)

### Homepage Hero Call-to-Action
- **Primary Hero Banner**:
  - Heading: `"The World’s Leading Social Prediction Market.™"`
  - Subheading: `"Trade on real-world events with crypto, instant payouts, and zero fees."`
  - Two prominent CTA buttons:
    1. `Start Trading ->` (Links directly to `/markets`)
    2. `How it Works ->` (Smooth scrolls to platform feature overview or documentation modal)
- **Visual Topic Anchors**:
  - A dynamic glowing globe surrounded by 5 predictive market category cards (`⚽ Sports`, `🗳 Politics`, `₿ Crypto`, `🤖 Tech`, `💰 Economy`).
  - 4 trust badges on the right rail:
    - `"Real-time Markets"`
    - `"Secure & Transparent"`
    - `"Community Driven"`
    - `"Win Real Rewards"`

### Discovery Hierarchy
Immediately below the hero, the interface directs user attention to:
1. **Category Filter Pills**: Quick category switching without page reloads.
2. **"🔥 Top Markets" Carousel**: Highest interest markets displayed with 50% probability baseline, volume, and instant YES/NO trade buttons.
3. **"Market Movers" Row**: Compact ticker of high-momentum markets.
4. **4-Pillar Value Proposition**:
   - `Trade What Matters`: "Turn your predictions into real opportunities."
   - `Follow Top Predictors`: "Follow experts, track their moves and learn."
   - `Discuss & Share`: "Debate, share insights and grow together."
   - `Win Rewards`: "Compete on leaderboards and earn rewards."

---

## 2. Is Practice / Demo Trading Clearly Explained? (OBSERVED & INFERRED)

- `[OBSERVED]`: On the market detail page (`/markets/[id]`), the order slip features an explicit segmented toggle: **`Real` | `Demo`**.
- `[OBSERVED]`: When toggled to **`Demo`**, a high-visibility persistent notice is displayed:
  > **"DEMO TRADING MODE — TRADING WITH 10,000 USDC IN VIRTUAL FUNDS, NOT REAL MONEY"**
- `[OBSERVED]`: In search results and social feed, demo trades by community members are explicitly badged:
  > `"🎮 Demo Prediction — I predicted YES on [Market Title]"`
- `[INFERRED]`: Practice trading is built-in as a primary platform feature, allocating 10,000 virtual USDC upon account creation so users can experience trading without financial risk.

---

## 3. Is Virtual Money Clearly Distinguished from Real Money? (OBSERVED)

- **Yes, unambiguously distinguished**:
  - `Real` vs `Demo` toggle has distinct visual active states.
  - The banner explicitly mentions `10,000 USDC IN VIRTUAL FUNDS, NOT REAL MONEY`.
  - Social activity feeds use a gaming controller icon (`🎮`) and the label `Demo Prediction` to demarcate practice trades from real capital trades.

---

## 4. Is There Onboarding or Education? (OBSERVED & INFERRED)

- `[OBSERVED]`:
  - The homepage features a "How it Works" button in the hero section.
  - Value cards explain the lifecycle: Trade -> Follow -> Discuss -> Win.
  - Each market detail page contains a dedicated **"Resolution Details"** card outlining exactly how outcomes are decided, the primary source, and the resolution date.
  - Floating "Feedback" tab and "Hi. Need any help?" chat support widget provide real-time assistance.
- `[INFERRED]`: There is no aggressive forced product tour or blocking wizard; user onboarding is self-paced and discovery-driven.

---

## 5. Can the User Understand the Core Product Without Outside Help? (OBSERVED)

- **High Usability & Clarity**:
  - Binary YES/NO market questions are intuitively phrased (e.g., "Will BNB close above US$3,000 by 31 December 2026?").
  - Clear probability percentages (e.g. 50%) and share pricing in cents (50¢ / 50¢).
  - Clear potential return indicators.
  - Streamlined social feed integrating market predictions with discussions.
