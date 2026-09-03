# OmniMarketX Reconstruction Decisions

## Project Goal
Reconstruct the CURRENT OmniMarketX experience as faithfully as practical in `./web-1.0`.

---

## Version Boundaries

### web-1.0
- **Current-State High-Fidelity Reconstruction**:
  - Focuses strictly on reproducing observed functionality, typography, layout, themes (Light/Dark), components, and flows.
  - No redesigning, re-theming, or speculative feature additions.

### web-2.0
- **Future UX/UI Redesign**:
  - Reserved for addressing UX findings, friction points, enhanced onboarding tours, teaser dashboards, and interface modernization.
  - Do NOT mix web-1.0 and web-2.0 work.

---

## Implementation Rules

1. **Reproduce Observed Behavior**: `web-1.0` must accurately reproduce the visual design, interactions, and structure observed on `https://www.omnimarketx.com`.
2. **Do Not Redesign**: Preserve original layouts, padding, card styling, button placements, and visual hierarchy.
3. **Do Not Add Speculative Features**: Avoid adding unobserved functionality or hypothetical backend states.
4. **Deterministic Local Fixtures**: Use local mock datasets matching the live `api.omnimarketx.com` structure.
5. **Runtime Decoupling**: Do not depend on live OmniMarketX production APIs at runtime.
6. **Zero Real-Money Risk**: Never connect to real payment gateways, live bank accounts, or real cryptocurrency funds.
7. **Simulated Authentication**: Local simulation of Privy login states (guest mode, email submission, and one-click demo profile).
8. **Simulated Demo Trading**: Local state management of virtual balances (10,000 USDC), order placement, and position tracking.
9. **Simulated Social Engine**: Local state for publishing posts, filtering feeds, and toggling likes/reposts.
10. **Preserve Terminology**: Use exact terms observed (`Prediction Market`, `Outcome`, `Probability`, `Share`, `Demo Prediction`, `Resolution Details`, `Market Movers`, `Live Market Pulse`).

---

## Evidence Classification

- **`OBSERVED`** → Implement directly.
- **`INFERRED`** → Document and only implement when necessary to make the observed surface functional.
- **`UNKNOWN`** → Do not invent or assume.
- **`UX FINDING`** → Reserve for future redesign (`web-2.0`).
- **`SUGGESTED IMPROVEMENT`** → Reserve for future redesign (`web-2.0`).

---

## Technology Stack

- **Framework**: Vite + React 18 / 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom `omx-*` design tokens matching extracted CSS variables
- **Icons**: Lucide React
- **Charts**: Recharts (Price History line chart, mini sparklines, radial gauge)
- **State Management**: React Context / Hooks with local persistence (`localStorage`)

---

## Data Layer & Fixtures

Use deterministic local fixtures structured under `src/data/`:
- `src/data/markets.ts`: Live-observed markets (19 prediction markets across all categories with historical price points).
- `src/data/categories.ts`: 7 observed categories with exact icons and color hex codes.
- `src/data/posts.ts`: Realistic community posts with sentiment badges and demo prediction cards.
- `src/data/users.ts`: Mock profiles for top forecasters and active posters.
- `src/data/groups.ts`: Community groups with member counts and category tags.
- `src/data/leaderboard.ts`: Top ROI forecasters and monthly reward pool ($250k).
- `src/data/activity.ts`: Transaction history for trades, payouts, and settlements.
- `src/data/portfolio.ts`: Open positions, shares held, average prices, and unrealized P&L.

---

## Safety & Security

Never connect the reconstruction to:
- Real payments (Stripe, MoonPay, Coinbase)
- Real wallets (MetaMask, Phantom)
- Real trading engines
- Production authentication systems
- Production user accounts
- Production financial APIs

---

## Design System Fidelity

- `web-1.0` strictly follows the observed OmniMarketX design system:
  - Font families: `Sora` (sans) and `Geist Mono` (monospace).
  - Light mode: `#f4f5f7` background, pure white cards, `#0f172a` text.
  - Dark mode: `#090426` background, `#110a36` cards, `#1b1150` elevated surfaces, pure white text.
  - Brand Gradients: Pink/orange/red primary brand gradient and magenta/purple deposit gradient.
  - Radii: `8px`, `12px`, `16px`, `20px`, `24px`.
- Redesign work and speculative polish will happen later in `web-2.0`.
- Impeccable or arbitrary CSS tweaks must not be used to alter the observed `web-1.0` baseline.

---

## Verification Strategy

Every major implementation milestone must be verified in the browser:
- Compare original screenshots in `./screenshots/original/` against replica screenshots in `./screenshots/replica/`.
- Verify across:
  - Desktop (1440px)
  - Tablet (768px)
  - Mobile (375px)
  - Light Mode
  - Dark Mode
  - Major interactions (Theme switch, Search autocomplete, Demo trade slip, Social post creation, Category filtering)
  - Authenticated vs. Unauthenticated views
  - Empty, loading, and populated states
