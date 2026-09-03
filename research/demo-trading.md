# OmniMarketX Practice / Demo Trading & Virtual Balance Analysis

## 1. Practice / Demo Environment Location & Entry (OBSERVED)

### Entry Points
- **Market Detail Page (`/markets/[id]`)**:
  - Located in the right-hand sticky trading drawer / order slip.
  - Controls:
    - Top segmented control: `Real` vs `Demo`.
    - Order type: `Buy` vs `Sell`.
    - Outcome selector: `YES [price]¢` vs `NO [price]¢`.
- **Demo Mode Banner**:
  - Toggling `Demo` displays the notice:
    > `"DEMO TRADING MODE — TRADING WITH 10,000 USDC IN VIRTUAL FUNDS, NOT REAL MONEY"`

---

## 2. Demo Payment & Virtual Balance Mechanism (OBSERVED, INFERRED & UNKNOWN)

### Is Virtual Balance Provided Automatically?
- `[OBSERVED]`: The UI indicates a default virtual balance allocation of **10,000 USDC** in virtual funds.
- `[INFERRED]`: Virtual balance is credited automatically to user profiles upon account synchronization (`/api/v1/auth/privy/sync`), without requiring any payment or credit card entry.

### Is There a Demo Deposit Mechanism?
- `[OBSERVED]`: On the unauthenticated `/wallet` route, the interface requires authentication to view balance management.
- `[OBSERVED]`: Network bundle inspection reveals endpoints for `/wallet/balance` and real-money onramps (`/wallet/stripe-deposit/checkout`, `/api/v1/onramp/stripe`, `/api/v1/funding/coinbase_on_ramp`, `/api/v1/plugins/moonpay_on_ramp`).
- `[OBSERVED]`: **"Demo payment mechanism not observed."** The demo environment does not use a mock payment gateway or credit card checkout flow; instead, virtual funds are directly assigned and managed in the demo trading slip.

---

## 3. Practice Trade Workflow & Order Execution (OBSERVED & INFERRED)

### Trade Order Slip Anatomy
1. **Mode Switcher**: Segmented toggle between `Real` and `Demo`.
2. **Tab Switcher**: `Buy` (default) vs `Sell`.
3. **Outcome Selection**:
   - `YES` button: displaying current price (e.g., `50¢`).
   - `NO` button: displaying current price (e.g., `50¢`).
4. **Amount Input**:
   - Input for USD/USDC amount or share quantity.
   - Quick amount chips (e.g., `$10`, `$50`, `$100`, `Max`).
5. **Trade Calculation & Estimates**:
   - Avg Price
   - Shares to receive
   - Potential Return (e.g., `+100.0%`)
   - Max Payout
6. **Execution Button**:
   - When authenticated: `Buy YES Shares` / `Buy NO Shares`.
   - When unauthenticated: `Sign Up to Trade` / `Sign In`.

### Demo Trade Feedback & Community Integration (OBSERVED)
- Executed demo trades publish a prediction event to the social feed and search index:
  > `"🎮 Demo Prediction — I predicted YES on [Market Title]"`
- This allows demo traders to participate in social discourse, build a public track record, and compete on the leaderboard without real financial exposure.

---

## 4. Safety & Real-Money Guardrails (OBSERVED)

- **Clear Labeling**: The interface never uses ambiguous terms like "free deposit" for real money. Real money transactions are strictly segregated behind KYC / on-ramp providers (MoonPay, Stripe, Coinbase).
- **Zero Real-Money Risk in Demo Mode**: The demo mode does not ask for bank details, credit card numbers, or crypto private keys.
