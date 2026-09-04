# Real vs. Demo Account Architecture & Auth Flow — Redesign Spec
**Directly answers:** "there is no portfolio section separately in demo, I click sandbox and it just opens something" + "there is no sign in/sign up authentication in this."

Below is how to actually structure this so Demo and Real are two clean, unmistakable modes of one account, not two half-built features — plus the auth flow to gate it.

---

## 1. The core idea: one account, two wallets, one mode switch

Don't build "Sandbox" as a separate flow bolted onto the side of the app (which is what's happening now — clicking it just "opens" something ad hoc). Build it as **a mode the entire app is aware of at all times.**

```
User
 ├── Identity (one login: email/Google/Apple/wallet)
 ├── real_wallet     → balance, positions, orders, tx history   (starts at $0)
 └── demo_wallet      → balance, positions, orders, tx history   (starts at $10,000, resettable)
```

Every page that shows money-related data (Wallet, Portfolio, Activity, Leaderboard eligibility, trade tickets) reads from **whichever wallet the mode switch is currently pointed at.** You do not build two separate "Portfolio" features — you build **one Portfolio component that is mode-aware**, exactly like the real production site does for its Wallet page, just extended consistently everywhere:

| Nav item | Demo mode shows | Real mode shows |
|---|---|---|
| **Wallet** | Demo balance ($10,000 start), demo deposit/reset controls, demo tx history | Real balance, real deposit/withdraw, real tx history, KYC status |
| **Portfolio** | Open demo positions, demo P&L | Open real positions, real P&L |
| **Activity** | Demo trades/volume/markets moved | Real trades/volume/markets moved |
| **Leaderboard** | A separate "Practice" leaderboard (bragging rights only) OR excluded entirely — never mixed with real-money rankings | Real, verified leaderboard |

This single change fixes your exact complaint: **there is now always a Portfolio, always a Wallet — they just show different numbers depending on the mode you're in.** Nothing needs a special "open the sandbox" click path anymore.

## 2. Fix the "odds disagree between modes" bug at the data layer

This was the worst bug found in the live-site audit (`03-Live-Site-First-Time-User-Bug-Audit.md`, §1). The fix is a data-modeling decision, made explicit and enforced:

- **The market catalog (questions, categories, resolution sources, and — critically — the live odds) is ONE shared table**, identical for every user regardless of mode.
- **Only the *trade* and *position* records are mode-scoped** (`real_orders` vs `demo_orders`), each pointing at the same shared `market_id`.
- Consequence: odds should be computed either (a) purely from real-money order flow (recommended — keeps the core value prop "verifiable real-world consensus" honest), with demo trades **never** moving the public price, or (b) from a blended pool if you want demo activity to visibly move prices for engagement — but pick one and document it, and never let the *same question* silently show two different numbers depending on account mode. If odds are real-order-flow-only, put a small label directly on demo trade tickets: *"Demo trades don't affect market price."* That one sentence removes the confusion entirely.

## 3. Make the mode switch impossible to lose track of

Right now it's a tiny "Real / Demo" pill plus a dismissible banner — not enough for a product moving real money. Concretely:

- **Persistent, non-dismissible visual state** while in Demo mode: a thin colored bar pinned to the very top of the viewport (not inside scrollable content) that stays for the entire session — e.g. `Demo Mode — Trading with $10,000 virtual funds` with a one-tap "Switch to Real" action. It can be *slim*, but it should not be closeable, only switchable.
- **A distinct accent tint** applied app-wide while in Demo mode — e.g., the primary balance card and the trade-ticket buttons pick up a consistent "practice" color (amber/violet) instead of the real-money brand color, so a screenshot alone tells you which mode it's in.
- The mode switch itself should be a **two-state segmented control** ("Real | Demo"), not a menu — always visible in the header, same position on every page, same component everywhere (currently it renders slightly differently depending on page/session).

## 4. Guest / first-time-user flow (no login required to explore)

Match the good instinct already in the product ("$10,000 instant guest access") but make it structurally sound:

1. **Anonymous visitor lands → automatically dropped into Demo mode with a temporary $10,000 balance**, no signup required. They can browse every market and place demo trades immediately. This maximizes time-to-value.
2. The moment they try to do something that needs a persistent identity — **save their demo progress across sessions/devices, post to Social, join a Group, switch to Real mode, or deposit money** — that action opens the sign-in modal *in place* (no page navigation, no dead end), pre-filled with context: *"Sign in to save your $X demo balance and continue."*
3. After sign-in, their **anonymous demo session merges into their new account** — never discard progress a guest already made; that's a drop-off killer.
4. Real mode is **always gated behind full authentication** (and, when you're ready, KYC) — never anonymous.

## 5. The auth flow itself — what to actually build

Your replica currently has none of this; the production site's version is genuinely well done and worth copying the shape of:

- **One modal, three+ entry methods, ranked by friction:**
  1. Google (one-tap, and remember/label it "Recent" if they've used it before)
  2. Apple
  3. Email (magic-link or OTP — never a raw password field for a consumer product like this)
  4. "Continue with a wallet" (crypto-native users)
- **A trust line at the bottom** naming the auth provider ("Protected by [provider]") — small detail, but it signals this isn't a home-rolled, insecure login, which matters for a money product.
- Use a managed auth provider rather than hand-rolling this (Privy, Clerk, Auth0, Supabase Auth, or NextAuth are all reasonable choices depending on your stack) — sign-in/sign-up security is not where you want custom code for a fintech-adjacent product.
- **Sign Up and Sign In are the same modal**, not two separate flows — new-vs-returning is resolved automatically by whether the identifier (email/Google/Apple account) already exists. Don't make a user choose which one applies to them.

## 6. One consistent "gated" pattern, used everywhere

Replace the two different patterns found in the audit (full-page "Sign in required" screen vs. sidebar-widget "Authentication required" strip vs. a fully-interactive-but-broken compose box) with **one component with two variants**:

- **`<AuthGate variant="page">`** — for destinations that are entirely useless when logged out (Wallet, Portfolio, Activity, Settings): full-page centered state, icon, one sentence specific to that page's value ("See your win rate and rank," "Manage deposits and withdrawals"), one Sign In button.
- **`<AuthGate variant="inline">`** — for actions embedded in an otherwise-browsable page (posting, commenting, joining a group, placing a real trade): the *control itself* renders visually disabled (dimmed, small lock icon) rather than fully interactive; clicking or focusing it opens the sign-in modal directly, with no dead-end submit-and-fail.

This single component, used consistently, is both less code and a better user experience than what exists today.

## 7. Redesign checklist (what "done" looks like)

- [ ] One account, two wallets (`real`, `demo`), same schema, mode-scoped via a single column/flag.
- [ ] Odds/market data shared across modes; demo trades explicitly don't move public price (or clearly documented if they do).
- [ ] Mode switch is a persistent, non-dismissible, app-wide visual state — not just a header pill.
- [ ] Guest can trade Demo instantly, no signup; signup only required to persist/post/go Real.
- [ ] Anonymous demo progress merges into the account on sign-up rather than being discarded.
- [ ] One auth modal (Google / Apple / Email OTP / Wallet) via a managed provider, doubling as both Sign In and Sign Up.
- [ ] One `<AuthGate>` component (page + inline variants) replacing all three inconsistent gating patterns currently in use.
- [ ] Portfolio, Wallet, and Activity are single, mode-aware pages — never a separate "open the sandbox" side flow again.
