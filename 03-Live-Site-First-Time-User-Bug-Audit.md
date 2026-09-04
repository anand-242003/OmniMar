# OmniMarketX (Live Site) — First-Time-User Journey & Bug Audit
**Source:** omnimarketx.com production screenshots (logged-in as "Anand Mahesh Mishra" + logged-out guest passes)
**Method:** Walked the site exactly as a brand-new, unauthenticated visitor would — Home → Markets → Trending → Social → Groups → every protected page → sign-in → back through logged-in Demo and Real modes.

This is a *different and more serious* class of finding than the first replica audit, because this is the real product real users and real investors will see. Ranked by how much damage each does to a first 60 seconds on the site.

---

## 1. The single biggest problem: Demo and Real silently disagree with each other

This is the crux of what you asked about, so it's first.

- Logged in, **Demo mode on**: "Will Avengers: Doomsday earn at least $1 billion..." shows **89% YES**, with **Vol $0 · 0 traders**.
- Same market, **guest / Real-mode view**: the identical question shows **50% YES**, again **Vol $0 · 0 traders**.
- The "🇮🇳 vs 🇧🇷" cricket/football market is even worse: in one view it's rendered as a **binary YES/NO card** ("71% ... Brazil"), in another view the *same card* is rendered as a **3-way outcome list** (Brazil 33% / Draw 33% / India 33%) with a completely different footer button ("View Options" vs "YES/NO").

**Why this matters more than a normal visual bug:** the product's entire pitch is "verifiable, real-world odds." If the same question shows a different confident percentage depending on which account mode you happen to be in, a user's very first takeaway is *"the numbers on this site aren't real."* That's not a cosmetic fix — it's a data-architecture fix (see the companion file, `04-Real-vs-Demo-Account-Redesign-and-Auth-Flow.md`, section 2).

A second version of the same problem: **odds are shown as confident percentages (89%, 71%, 46%) even when the card itself says `Vol $0 · 0 traders`.** If nobody has traded, there is no real market-implied probability yet — showing 89% next to "0 traders" actively teaches the user not to trust the number.

## 2. First impression: the platform looks empty, not "the world's leading social prediction market"

The hero banner literally says *"The World's Leading Social Prediction Market.™"* Directly below it:
- Every "Top Market" and "Trending Market" card shows **$0–$1 volume, 0–1 traders, and a flat 50%/50¢** split.
- The **Live Market Pulse gauge** on Trending is permanently pinned at **"Low Volatility — 0/100."**
- **Leaderboard** ("Compete with the best predictors," $250,000 in monthly rewards advertised) shows **"No ranked traders yet"** and **"Fastest Rising: No data yet."**
- **Groups** shows **"No featured groups right now"** and exactly **1 group total** with 35 members.
- **Activity**, even logged in, shows **0 Live Trades / $0 Volume Moved / 0 Markets Moved / 0 Active Traders / "No activity yet."**

None of these are bugs individually — they're honest empty states. But stacked together, across every single surface, in the same session where the hero claims global leadership and advertises a $250K reward pool, the dissonance is the story a new visitor (or an investor doing diligence) walks away with. **This needs either seeded/curated demo activity for first-run visitors, or the marketing copy needs to be honest about being early** — right now it's whichever one is less damaging, and currently it's neither.

## 3. Two different "you're not signed in" patterns, used inconsistently

- Navigate **directly to a protected page** (Wallet, Activity, Portfolio, Settings) while logged out → a clean, centered, full-page state: shield icon, "Sign in required," one sentence of context, one "Sign In" button. This is well designed and consistent across all four pages.
- Browse **Home, Social, or Groups** while logged out → the *sidebar widgets* (Trending Now, hashtag list, Top Forecasters, Groups list) are quietly replaced by a small red "⚠ Authentication required" strip, while the *main content column stays fully visible and interactive.*
- On **Social specifically**, the post composer ("What's on your mind?" + Market/Image/Poll attachments + a **Post** button) renders fully interactive for a logged-out guest. Nothing about it looks disabled. A guest can type a full post, attach a market, and press Post — and it will presumably fail, with no indication *why* until they try.

**Fix:** one reusable gate component, used everywhere. For read surfaces (browsing markets, feed, leaderboard), let guests read freely — that's good, keep it. For any *write* action (post, comment, join, trade, deposit), the control itself should look disabled/locked (dim + a small lock icon) and clicking it should open the sign-in modal in place, not let the user complete an action that then silently fails.

## 4. The demo/real mode toggle is too quiet for a money product

- The only persistent indicator that you're trading with fake money is a small pill in the top-right that just says **"Demo"** next to "Real" — no color difference in the app shell, no icon, no tooltip.
- The orange **"DEMO TRADING MODE — TRADING WITH 10,000 USDC IN VIRTUAL FUNDS, NOT REAL MONEY"** banner is dismissible with an ✕ and, once closed, there's no equivalent persistent reminder anywhere else on the page.
- This is a real trust/safety issue, not a nitpick: a user should never be able to lose track of whether the number on their screen represents real dollars. Fintech products (brokerages, crypto exchanges) that support paper-trading modes universally keep a *persistent, non-dismissible, high-contrast* visual difference (a colored border around the whole viewport, a permanent header stripe, or a background tint) for as long as you're in the simulated mode — not just a one-time toast.

## 5. Content curation risk on the public, logged-out feed

The very first "attached market" example visible to a brand-new, unauthenticated visitor scrolling the public Social "For You" feed is: *"Will Donald Trump be assassinated before August 31, 2026?"* — sitting under a casual "hell No 💀" comment.

Political-violence prediction markets exist elsewhere in the industry and aren't inherently out of bounds for the category — but for a **first-run, logged-out, unauthenticated feed** (i.e. the exact page a prospective investor or new user sees before they've customized anything), this is a brand-safety and content-moderation problem, not a taste problem. A "For You" feed with no personalization signal yet should not default to raw-latest/unfiltered; it needs a curated, vetted first-run set for anonymous sessions.

## 6. Localization is leaking into the default global view

The default "All Markets" grid (no filter applied) mixes fully untranslated Chinese-language questions ("习近平是否会在2026年12月31日前正式..."), a Malaysian-context politics market, and a Hong Kong boxing match — all in the same unfiltered list an English-speaking first-time visitor sees, with no visible language/region selector or toggle anywhere on the page. This reads as broken/untranslated rather than intentionally global. Needs either (a) a locale filter that defaults to the visitor's browser locale, or (b) translated titles with a small flag/region tag that's consistent (right now the flag emoji is used inconsistently — sometimes prefixing the title, sometimes not at all).

## 7. Smaller inconsistencies worth cleaning up
- Badge spacing is inconsistent: `↑0%` vs `↑ 0%` (with a space) appears interchangeably on what should be the same shared component — a sign two different components are rendering what should be one.
- "OmniMarket Pro — $14.99/month" is pinned persistently in the sidebar directly under a **$0.00 real balance**, before the user has made a single trade. Selling a paid upgrade before any usage/value has been demonstrated is premature sequencing — gate this behind a milestone (first trade, first win, hitting a feature limit) instead of a permanent nav-rail ad.
- Every "Sign in required" empty state uses identical copy structure and only swaps one sentence — a missed craft opportunity (see the companion redesign file) to make each page's value proposition specific ("See your win rate and rank" vs. "Manage 2FA and notifications").

---

## 8. What a first-time user actually experiences, end to end

Walking it exactly as a cold visitor:

1. Land on Home, logged out → hero looks credible, markets look dead (data density problem, §2).
2. Click into Markets → real content appears (19 markets, real filters, real multi-outcome cards) — this is actually the strongest page on the site.
3. Click Social → feed loads, but the top post/attached market is a sensitive political-violence market (§5), and the compose box invites an action that will fail (§3).
4. Click Wallet/Activity/Portfolio/Settings → hits a well-designed, consistent "Sign in required" wall (the one genuinely well-executed pattern on the site).
5. Click Sign In → excellent, professional multi-provider modal (Google/email/Apple/wallet, "Protected by Privy") — this is the best single screen in the whole audit, no notes.
6. After signing in → lands back in Demo mode by default with a $10,000 virtual balance and a dismissible banner (§4) — but the *odds on markets they already looked at while logged out have now changed* (§1), with zero explanation.
7. Tries to find "my demo positions" → there's a single global "Portfolio" nav item, but no page in this entire audit shows a Demo-specific portfolio/positions view — only the Real-money Wallet page ($0.00 balance, deposit/withdraw, real transaction history) was ever shown. **This is exactly the gap you flagged**, and it's addressed head-on in the companion redesign file.

This journey map is the thing to fix first — not any individual screen.
