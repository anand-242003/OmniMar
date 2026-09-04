# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Prediction Speculator**: Trades on high-conviction real-world events across crypto, politics, macroeconomics, tech, and entertainment using real capital.
2. **Practice / Sandbox Forecaster**: Uses the 10,000 virtual USDC sandbox to learn binary market mechanics, test predictive hypotheses, and build a verified forecasting track record with zero financial exposure.
3. **Social Forecaster & Analyst**: Publishes structured market rationales, engages in community debates with `BULLISH` / `BEARISH` sentiment tags, and competes for social followership and leaderboard standings.
4. **Group Researcher**: Collaborates within topic-specific communities (e.g., Macro policy, Entertainment release tracking) to pool research and debate settlement probabilities.

## Product Purpose

OmniMarketX exists to democratize event forecasting by merging binary prediction-market financial rigor with the transparency, debate, and discovery of a modern social network. Success means:
- A user can evaluate an event's implied probability in under 5 seconds.
- Anyone can place an exploratory practice prediction in under 3 clicks without mandatory wallet setup.
- Risk and return are 100% mathematically transparent before commitment.
- Community discourse elevates genuine analytical insight over speculative noise.

## Positioning

**"The Credible Forecaster's Arena"** — Prediction Market Rigor + Premium Fintech Craft + Social Vitality.
Unlike crypto-casino prediction platforms that overwhelm users with micro-fractional contract math, neon gamification, and opaque liquidity fees, OmniMarketX provides:
- **Dollar-First Order Sizing**: Users trade in standard currency ($25.00) while shares and payouts are computed automatically.
- **Calm, Transparent Financial Truth**: Complete upside and downside disclosure with fixed-price quotes and 0% execution slippage.
- **Immediate Sandbox Activation**: Instant guest access with double-entry portfolio accounting and passwordless session persistence.

## Operating Context

- **Devices**: Responsive web applications optimized across Desktop (1440px+ multi-column trading terminal), Tablet (768px single-column research flow), and Mobile (375px–430px slide-up trading desk with zero double-bottom chrome).
- **Environment**: Real-time pricing fluctuations, breaking news releases, and official oracle settlement events.
- **Trading Currency**: USDC (denominated in dollars $ and cents ¢).
- **Settlement Baseline**: Binary $1.00 settlement ($1.00 per share for correct outcome, $0.00 for incorrect outcome).

## Capabilities and Constraints

### Confirmed Capabilities
- **Binary Outcome Markets**: Every event offers discrete `YES` and `NO` contracts where `Price (¢) = Implied Probability (%)`.
- **Dollar-First Trading Desk**: Retail users input dollar amounts; contract share count and exact payout math are derived in real time.
- **Double-Entry Portfolio Accounting**: Fully reconciled ledger tracking balance, shares held, average cost, unrealized P&L, and 1-click cash-out proceeds (with standard 2% exit liquidity fee).
- **Consensus Probability Charts**: Line charts displaying probability trajectories with honest 0–100% scaling and explicit 50% toss-up baselines.
- **Social Predictions**: Automated generation of verified prediction events (`🎮 Demo Prediction`) broadcast to feeds with bullish/bearish sentiments.
- **Guest-First Sandbox**: Instant $10,000.00 virtual capital with local storage persistence and passwordless email upgrade.

### Confirmed Technical Constraints
- **Frozen Baseline**: `web-1.0` remains permanently frozen at git tag `web-1.0-complete`.
- **Active Architecture**: `web-2.0/` is an independent, clean-room Vite + React 19 + TypeScript + Tailwind CSS application running on port 5174.
- **Authentication**: External dependency on Privy for production Web3/OAuth; simulated guest-first state for sandbox prototyping.

## Brand Commitments

- **Name**: OmniMarketX (token prefix `omx-`).
- **Typography**: `Sora` (headings, branding, primary actions) paired with `Geist Mono` (prices, odds, financial figures, accounting metrics) and `Inter` (body copy).
- **Color Standard**: 80/15/5 ratio.
  - 80% Canvas: Deep Space Navy (`#090426`) in dark mode; Cool Slate (`#f8fafc`) in light mode.
  - 15% Structure: Midnight Card (`#110a36`), Hairline Borders (`#261958` / `#cbd5e1`), Slate-Indigo Sandbox (`#6366f1`).
  - 5% Focal Accent: Solid Emerald (`#10b981`) for YES / Gains; Solid Rose (`#f43f5e`) for NO / Losses; Brand Gradient (`#f23064` to `#ff6b1a`) strictly reserved for primary identity anchors.
- **Aesthetic Bans**: Absolute prohibition against neon glows, party emojis (`🎉`), gambling confetti, bouncing casino checkmarks, under-curve chart area gradients, and diffuse purple background blobs.

## Evidence on Hand

- **Screenshots**: Production visual goldens captured in `screenshots/web-2.0/refined/` (Desktop 1440 dark/light, Tablet 768 dark, Mobile 375 dark/light, Mobile Drawer open, Mobile Confirmation).
- **Automated Validation**: 20-point test runner (`web-2.0/scripts/test-validation-suite.mjs`) and 13-point refinement runner (`web-2.0/scripts/verify-refinements.mjs`) passing with 0 console errors.
- **Design Specifications**: Authoritative specifications recorded in `research/m10-design-tokens.md`, `research/m10-component-specifications.md`, `research/m10-screen-blueprints.md`, and `research/m10.1-design-critique.md`.
- **Frozen Reference**: Verified replica of legacy platform frozen under `web-1.0/`.

## Product Principles

1. **Honest Scale Over Dramatic Curves**: Charts and metrics must represent real-world probability truthfully. Avoid artificial auto-scaling that turns trivial 2% fluctuations into misleading cliffs.
2. **Dollar-First, Shares-Second**: Beginners think in capital risked and dollars returned; fractional share units are secondary supporting calculations.
3. **Surgical Subtraction Over Decorative Addition**: Beauty is achieved through typography, spacing, semantic color, and rhythm—never by adding unnecessary cards, borders, badges, or animated radar dots.
4. **Complete Risk Transparency**: Always communicate both outcomes before commitment: what the user stands to gain if correct, and the exact $0.00 loss if incorrect.
5. **One Surface, One Primary Intent**: Eliminate redundant competing buttons. On mobile trading surfaces, suppress global app chrome to maximize reading space and execution focus.

## Accessibility & Inclusion

- **Color Independence**: Every outcome pair enforces directional glyphs (`▲ YES` / `▼ NO`) in addition to green/red colors, ensuring 100% legibility for deuteranopia and protanopia color-blindness.
- **Touch Geometry**: All interactive targets strictly enforce $\ge 44\text{px} \times 44\text{px}$ touch bounding boxes on mobile viewports.
- **Typography Floor**: Zero sub-12px micro-text. Captions and metadata remain strictly at or above `12px Medium` (`0.75rem`).
- **WCAG AA Compliance**: High-contrast text ratios ($\ge 4.5:1$ for body, $\ge 3:1$ for large headings) verified across both Dark and Light themes.
