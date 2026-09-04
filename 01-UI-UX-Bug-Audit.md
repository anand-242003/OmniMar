# OmniMarketX — UI/UX & Bug Audit
**Reviewed by:** Expert UI/Frontend Evaluation Pass
**Scope:** 9 screenshots — Home (hero, how-it-works, featured market, high-conviction markets, trust section), Sign-in modal, Markets, Trending, Social, Groups, Leaderboard
**Verdict up front:** Functionally coherent MVP, but visually and structurally it reads as a templated/generated build. It will not survive investor or user scrutiny past a first glance. Below is every issue found, split into **Bugs (data/logic breaks)** and **UI/UX issues (design & usability)**, ranked by severity.

---

## 1. BUGS — things that are objectively broken

### 🔴 Critical — data integrity / trust-breaking
These are the most dangerous class of bug for a *prediction market* product, because the entire value proposition is "trustworthy, verifiable odds." Any mismatch destroys credibility instantly.

| # | Bug | Evidence |
|---|-----|----------|
| B1 | **Same market shows different odds in different places.** "Will SpaceX successfully catch a Starship..." shows **YES 42% / NO 58%** on the homepage globe card, but **YES 82% / NO 18%** on the High-Conviction Markets section and Trending page. A 40-point swing on the identical market is not a UI nit — it's a data-binding bug (likely two components reading from stale/mock vs. live state). | Img 1 vs Img 4/6 |
| B2 | **Fed rate cut market odds disagree.** Homepage teaser card: **YES 72% / NO 28%**. High-Conviction Markets & Trending: **YES 78% / NO 22%**. Social page thesis card shows a *third* number: "Posted 68% YES · Current 72% YES." Three different "current" values for one market. | Img 1, Img 4/6, Img 7 |
| B3 | **Platform-wide market count is inconsistent.** Markets page header: "Showing **8** markets" (and category chips sum to 8). Trending page stat tile: "Active Forecasters ... Across **6** verified global markets." | Img 5 vs Img 6 |
| B4 | **Wallet balance is pre-decremented for a brand-new/guest session.** Marketing copy says "Practice with **$10,000** demo USDC," but the header balance already reads **$9,925.00** before the user has taken any visible action. Looks like leftover/mock state leaking into a "fresh" session, or missing balance-reset on new guest. |Img 1, all screens |
| B5 | **Guest already shows a "Joined" state on Groups** ("Macro & Central Bank Forecasters" → green "✓ Joined") while every other group correctly gates content behind "Join to read discussion." Either the join-gate is broken, or session/auth state isn't actually anonymous. | Img 8 |

### 🟠 High — interaction/engine bugs
| # | Bug | Evidence |
|---|-----|----------|
| B6 | **Hero globe is static, not rotating.** This is clearly intended to be an animated/interactive 3D globe (dotted sphere + pinned market markers), but it renders as a frozen frame. Likely causes to check, in order: (a) `prefers-reduced-motion` media query unintentionally short-circuiting the animation loop for *all* users instead of just opting them into a reduced variant, (b) the animation `requestAnimationFrame` loop never starts because the WebGL/Canvas/Three.js context mounts after the loop is scheduled (race condition), (c) the loop is throttled to 0 FPS because the tab/element is treated as "off-screen" by an IntersectionObserver bug, (d) the rotation is driven by scroll-linked JS and there's no scroll-independent idle animation. | Img 1 |
| B7 | **Sign-in modal darkens/dims the *entire* page including chrome outside the viewport-safe area**, and the underlying page content is still fully interactive-looking (buttons visibly rendered, not disabled-state) behind the scrim — risk of focus trap not being implemented (keyboard/tab order should be locked to modal only). Needs verification of `aria-modal`, focus trap, and `Escape`-to-close. | Img 2 |
| B8 | **No error/empty/loading states visible anywhere in the flow** — every screenshot shows the "happy path" fully populated. For a data product with live odds, there is no evidence of a loading skeleton, a stale-data indicator, a "market paused" state, or a network-error state. This needs to exist before this is fundable; investors will ask "what happens when the feed drops." | All |
| B9 | **Reset icon (↺) next to Sandbox balance has no visible label, tooltip, or confirmation step.** If it resets a user's whole demo portfolio, a single misclick with no "Are you sure?" is a real bug waiting to erode trust/data. | All screens (top nav) |

### 🟡 Medium — copy/logic inconsistencies
| # | Bug | Evidence |
|---|-----|----------|
| B10 | Same market has two different **question phrasings** depending on surface: homepage says "Fed rate cut at September FOMC?", Markets/Trending say "Will the US Federal Reserve cut the benchmark interest rate by at least 25 bps…", Social says "Will the Federal Reserve cut the federal funds target rate at the September 2026 FOMC meeting?" — three different canonical titles for what should be one market record. | Img 1, 4/6, 7 |
| B11 | "Try $10,000 Sandbox" CTA is shown on the hero even though the user is **already in an active $9,925 sandbox** per the header — the CTA should be contextual ("Continue in Sandbox," "Add funds," or hidden) once a session exists. | Img 1 |
| B12 | Featured Market "24h Vol: $18,450" does not reconcile with the Markets-page card for the same GTA VI market, which shows different underlying prediction-count/volume conventions elsewhere (no per-market volume shown consistently across surfaces to cross-check, but the formatting/precision is inconsistent — some volumes show `$18,450`, others `$42.1K`). Standardize one number format everywhere. | Img 3 vs Img 4/5 |

---

## 2. UI / UX ISSUES — design, hierarchy, and usability

### A. Visual identity reads as templated / "AI-generated defaults"
This product currently exhibits nearly every recognizable pattern of a generic, ungrounded UI build, rather than a designed product with a point of view:
- **ALL-CAPS tracked eyebrow labels above everything**: "MACRO & POLICY," "TECHNOLOGY," "DIGITAL ASSETS," "ENTERTAINMENT" — decorative category chrome that doesn't encode real hierarchy, just repeated on every card.
- **Middle-dot-joined meta strings** everywhere: "The Credible Forecaster's Arena · Binary Probability Engine," "Macro & Politics · Closes Jun 30, 2026," "Technology & AI · 512 members."
- **The identical SaaS-card kit** — every single surface (market cards, group cards, hypothesis cards, leaderboard cards) uses the same rounded-corner, same-radius, same soft drop-shadow card, regardless of content type or importance. Nothing is visually differentiated by weight.
- **Numbered 01/02/03 "How it works" markers** with icon-in-box treatment — acceptable here since it *is* a real sequence, but paired with the rest of the generic kit it reads as template chrome rather than an intentional device.
- **Arrow-suffixed CTAs everywhere**: "Explore Markets →," "View all 8 markets →," "View Full Leaderboard →," "Find Prediction Markets →." Overused to the point of losing meaning.
- **Uniform grey/near-black text tinting** and a single accent (coral/red #E8455E-ish) doing triple duty as brand color, primary CTA, *and* the "NO / bearish / down" semantic color — a serious semantic collision (see A1 below).
- **Generic dotted-sphere hero graphic** floating gray market cards around it — decorative rather than informative; doesn't do any real work explaining what the product does faster than the headline already does.

**Net effect:** this currently looks like dozens of other AI-scaffolded fintech/prediction-market templates. For a "round 2 VC pitch," visual distinctiveness and craft signal matter — investors pattern-match instantly on "does this look like a real design team touched it."

### B. Color & semantic issues
- **A1 — Brand color = negative color.** The primary brand/CTA color (coral-red) is the *same* hue used for "NO," "bearish," "down," "62% NO," etc. This creates ambiguity: is a red button always negative, or is it just "the brand color today"? Financial/trading products should reserve red strictly for loss/down/no, and use a distinct, non-overlapping brand accent for primary actions.
- **A2 — Green/red as the *only* signal for YES/NO.** ~8% of men have red-green color vision deficiency. Percentage text and ▲/▼ glyphs help, but the glyphs are small and low-contrast against their tinted pill backgrounds. Needs a redundant, non-color cue (e.g., consistent iconography, position convention, or pattern fill) at a glance-able size.
- **A3 — Grey body copy on white** throughout (hero subhead, card descriptions) looks like it sits close to the WCAG AA 4.5:1 contrast floor for normal-size text; should be audited with a contrast checker and darkened if it fails.

### C. Layout & hierarchy
- **B1 — Hero has a large dead-space gap** at the bottom-left of the fold (Image 1: after the trust line "Practice with $10,000 demo USDC..." there's a large empty area before the page continues) while the right side is crowded with 4 overlapping floating cards. The composition is unbalanced left-to-right.
- **B2 — Floating market card top-left ("MACRO & POLICY") is clipped by the viewport edge** at wider/narrower breakpoints risk — it's positioned right at the boundary of the hero graphic with no visible margin buffer.
- **B3 — Header information density is high and unstructured**: logo, 5 nav items, wallet-mode pill + balance + reset icon, theme toggle, and a guest/account button are all crammed into one row with inconsistent spacing between groups. There's no visual grouping (e.g., a divider) between "navigation," "wallet state," and "account."
- **B4 — Redundant dual CTA on hero** ("Explore Markets" + "Try $10,000 Sandbox") when the user is, per the header, already *in* the sandbox — this is asking the user to start something they've already started.
- **B5 — "Your Standing" module on Leaderboard uses raw initials "DF"** with no explanation of what they stand for (presumably "Demo Forecaster" or similar) — unexplained internal jargon exposed directly to the user.
- **B6 — Progress bars (YES/NO split bar) have a hard vertical seam** between the two colors instead of any transition, and are unlabeled with axis/legend outside the immediate number pairs, making them harder to scan across a page of many cards at once.
- **B7 — Locked/gated content pattern is inconsistent**: on Groups, some cards show a lock icon with "Join to read discussion" as a full-width disabled-looking button in the card header, while others show a separate inline "Join to read 3 member analyses" locked panel *and* a top-right "Join to read discussion" button — two different gating patterns for the same feature.

### D. Content & copy
- **C1 — Category labels, resolution sources, and volume stats are truncated with ellipses** on nearly every market card ("Will SpaceX successfully catch a Starship upper stage with the Mechazilla launch tow…", "Resolution: Official SpaceX mission webcast and FAA Comm…") — for a product whose entire pitch is *transparent, verifiable resolution criteria*, truncating the resolution source is actively counterproductive. This is the one piece of copy that should never be cut off.
- **C2 — Inconsistent capitalization/style across category chips**: "Macro & Politics" vs "MACRO & POLICY" vs "Macro & Central Bank Forecasters" — three different labels for what appears to be one taxonomy.
- **C3 — CTA verbs are inconsistent**: "Back YES 65¢," "▲ YES 78¢," "Continue with Email," "Start Practicing Now →," "Find Prediction Markets →" — a mix of naming conventions for what are conceptually similar "commit to an action" buttons.

### E. Accessibility & robustness (unverifiable from screenshots, but flagged as must-check)
- No visible focus states / keyboard navigation evidence.
- No visible `prefers-reduced-motion` fallback confirmation for the hero globe (tie-in to Bug B6).
- No responsive/mobile screenshots provided — layout has not been shown to hold up below desktop width; the dense header (5 nav items + 3 right-side clusters) is a strong risk area for small screens.
- Modal (Image 2) needs confirmation of proper `role="dialog"`, `aria-modal="true"`, labelled heading, and trapped focus.

---

## 3. Priority Fix List (if you can only do 10 things before a demo)

1. **Fix B1/B2/B3/B10** — unify market data into a single source of truth so odds/titles/volumes never disagree across surfaces. This is the single biggest credibility risk for a *prediction market* product.
2. **Fix the globe rotation (B6)** — verify the animation loop actually starts and respects `prefers-reduced-motion` correctly rather than blocking all motion.
3. **Split brand-red from negative-red (A1)** — pick a distinct primary/brand accent that isn't also "NO/down."
4. **Un-truncate resolution sources (C1)** — critical to the core trust pitch.
5. **Reconcile guest/session state (B4, B5)** — a "fresh" guest shouldn't start $75 down or already "Joined" a group.
6. **Add loading/empty/error states (B8)** for at least the market cards and leaderboard.
7. **Confirm/fix modal focus trap and scrim behavior (B7).**
8. **De-duplicate the hero CTA (B4 layout item).**
9. **Reduce the SaaS-card sameness** — give at least 2 tiers of visual weight (featured vs. list item) so the page has a real hierarchy.
10. **Contrast-audit all grey text (A3)** against WCAG AA.
