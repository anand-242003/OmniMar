# OmniMarketX — Frontend & UI Redesign Playbook
**Goal:** Take this from "template MVP" to "looks like a funded, design-led company" for a Series/round-2 pitch. This is the full skill checklist + design system + execution plan a senior frontend/product-design hire would run.

---

## 0. First principle

A prediction market's entire product is *trust in a number*. The design's job is to make every number feel verified, live, and unambiguous — before it does anything decorative. Every visual decision below is filtered through: **does this make the odds easier to trust and act on, or is it decoration?**

---

## 1. Design system foundations (do this before touching any screen)

### 1.1 Color — build a real system, not "one accent everywhere"
- **Brand/primary accent**: pick one color *not* already carrying a market meaning. E.g., an indigo/violet or a deep amber — something distinct from red/green.
- **Semantic colors** (locked, never reused for anything else):
  - `--yes / positive`: e.g. `#0E9F6E` (green)
  - `--no / negative`: e.g. `#DC2626` (red) — used *only* for NO/bearish/down/loss, never for brand CTAs.
  - `--neutral / pending`: e.g. `#6B7280`
  - `--live`: e.g. a calm blue-green pulse dot, distinct from YES green.
- **Neutrals**: a proper 8–10 step grey ramp (not "one grey"), with a true near-black for headline text (not pure `#000`) and a true off-white background (not pure `#FFF`) — pick something with a hint of the brand hue for cohesion.
- **Contrast**: every text/background pair must clear WCAG AA (4.5:1 body, 3:1 large text). Run this through a contrast checker as part of CI, not eyeballing.
- Name the palette 4–6 hex values and document *why* each exists (this is what a design review looks for).

### 1.2 Typography
- Pick **one distinctive display/headline face** with real character (avoid the default system-UI/Inter-everywhere look) + **one workhorse body face** for data-density screens (tables, odds, numbers) — a numeric-friendly grotesk or a proper tabular-figure font so odds/percentages/dollar amounts align in columns.
- Define a real type scale (e.g., a 1.25–1.333 ratio), not ad hoc px sizes per component.
- Use **tabular figures (`font-variant-numeric: tabular-nums`)** for every price, percentage, and balance — critical for a trading product so numbers don't jitter/misalign as they update live.
- Line length ≤ 80 characters for body copy.
- Kill the ALL-CAPS eyebrow-label habit; if you need a category label, use real hierarchy (size/weight/color) instead of tracked caps on every card.

### 1.3 Spacing & grid
- One 8pt (or 4pt) spacing scale used everywhere — no arbitrary 13px/19px paddings.
- A real 12-column responsive grid with defined breakpoints (mobile / tablet / desktop / wide) — and every screen in this audit needs to actually be checked at each breakpoint, since none were shown.

### 1.4 Elevation & radius — break the "one card style fits all" habit
- Define **at least 2–3 tiers** of card treatment (e.g., "featured," "standard list item," "compact/table row") with different radius/shadow/weight so the page has real visual hierarchy instead of a wall of identical rounded rectangles.
- Shadows should be purposeful (indicate interactivity/elevation), not decorative on every static card.

### 1.5 Iconography & data-viz
- One consistent icon set/weight (currently mixed emoji-like glyphs + line icons).
- Build a proper **YES/NO stacked bar component** as a first-class design element (used dozens of times) — smooth transition between segments, accessible pattern/label redundancy beyond color, consistent number formatting.
- Standardize number formatting globally: pick one convention for currency/volume (`$18.5K` vs `$18,450` — choose one and apply a formatting utility everywhere, never both).

---

## 2. Motion & interaction craft

- **One signature moment, done well** — the rotating globe is a great instinct for a "real-world outcomes" product; it should be the *one* bold, orchestrated animation on the page (fix the rotation bug, add slow idle auto-rotate + drag-to-spin, snap-to-market pins on hover). Don't add fade-up entrances on every card/section on top of it — one strong motion idea beats ten generic ones.
- Respect `prefers-reduced-motion`: swap continuous rotation for a static frame or a slow single-cycle spin, never remove the feature entirely for everyone.
- Motion should answer user actions: odds updating should tick/flash briefly when a price moves (this also visually proves "live data," a core trust signal), modals should animate open/close, buy/sell confirmation should have a clear success state animation — not hover-only micro-interactions everywhere.
- Skeleton loaders for every async surface (market cards, leaderboard rows, social feed) — never a blank flash or spinner-only state for a data product.

---

## 3. Component-level redesign notes (mapped to the audit)

| Component | Fix |
|---|---|
| **Header/nav** | Group into 3 visually separated clusters (Nav / Wallet-state / Account) with real spacing or a subtle divider; label the reset icon with a tooltip + confirm dialog. |
| **Hero** | Rebalance composition — either shrink dead space or add a secondary proof element (live ticker of real trades) at the bottom-left; reduce to one primary CTA once a sandbox session exists. |
| **Market card** | Never truncate the resolution source — this is the trust anchor of the whole product. Give it its own always-visible line, even if it means a slightly taller card. Standardize title across every surface via a single CMS/data field. |
| **Odds bar** | Smooth gradient transition, consistent height/label placement, tabular-nums percentages. |
| **Sign-in modal** | Add proper focus trap, `aria-modal`, escape-to-close, and dim only the interactive layer (not double-scrim on top of browser chrome). Add a second, lower-friction path (e.g., passkey/social) since email-only raises drop-off. |
| **Groups gating** | One consistent lock pattern site-wide: locked card → single "Join to unlock" affordance, no mixed patterns. |
| **Leaderboard "Your Standing"** | Spell out what the avatar initials mean or replace with a real (even placeholder) name; make the qualification path (5 resolved predictions) a visible progress bar, not just a sentence. |
| **Category chips** | One taxonomy, one casing convention, reused verbatim everywhere (Home, Markets, Trending, Groups, Social). |

---

## 4. The "VC round-2 polish" checklist

Investors evaluating a consumer/fintech product in a follow-on round are pattern-matching on *craft as a proxy for execution ability*. Concretely, before a pitch:

- [ ] **Consistency audit passed** — no two surfaces disagree on the same data point (ties directly to Bug Audit §1).
- [ ] **One distinctive visual signature** the product owns (a chart style, the globe, a specific odds-bar shape) that a screenshot alone identifies as "this app," not "a prediction market template."
- [ ] **Real empty/loading/error states** designed and shown in the deck, not just happy path.
- [ ] **Dark mode actually implemented** (toggle exists in the header but was never demonstrated) — either finish it or remove the affordance.
- [ ] **Mobile walkthrough** — at least the core buy/sell flow shown responsive; most usage of consumer fintech products is mobile-first.
- [ ] **Accessibility pass**: contrast, focus states, reduced motion, non-color-dependent status indicators.
- [ ] **Performance**: rotating 3D globe implemented efficiently (instancing/low-poly, capped devicePixelRatio, paused when off-screen) — nothing kills a live demo faster than a janky hero.
- [ ] **Micro-copy pass**: every button verb matches the resulting state ("Publish" → "Published," not "Submit" → "Posted"), no unexplained internal jargon shown to users (see "DF" issue).
- [ ] **Trust signals foregrounded, not just claimed**: "Verifiable Resolution" is currently a text block; show a *real* resolved-market example with citation link, not just a shield icon and a paragraph.

---

## 5. Full frontend skill inventory (what to actually hire/upskill for)

A team that wants this to look "round 2 ready" needs coverage across these disciplines — treat this as a hiring/skills checklist:

1. **Design systems engineering** — token architecture (color/type/space/radius/motion), component API design, Storybook or equivalent living documentation.
2. **Interaction design** — motion choreography, micro-interaction timing/easing, gesture support (drag-to-rotate globe, swipe on mobile cards).
3. **Data visualization** — odds bars, sparkline price history, volume charts, leaderboard rank-change indicators — done as reusable, accessible primitives, not one-off SVGs per screen.
4. **Information architecture** — single source of truth for market taxonomy, naming, and copy so the same market never has three titles again.
5. **Accessibility engineering (a11y)** — WCAG AA minimum, semantic HTML, ARIA for modals/toasts/live-updating regions (`aria-live` for odds changes), full keyboard operability.
6. **Performance engineering** — WebGL/canvas budget for the hero, code-splitting, image/asset optimization, perceived-performance via skeletons and optimistic UI on trades.
7. **Responsive/adaptive layout engineering** — true mobile-first breakpoints, not just a squished desktop layout.
8. **Content design / UX writing** — the voice-and-tone pass described above; button verbs, error copy, empty states.
9. **Design QA / visual regression testing** — automated screenshot diffing (e.g., Chromatic/Percy-style) so the data-mismatch bugs (B1–B3) and visual drift can't ship silently again.
10. **Design-to-dev handoff discipline** — Figma tokens wired directly to code tokens (no manual re-guessing of hex values / spacing by engineers), enforced via lint rules (no raw hex/px in component code).

---

## 6. Suggested next step

Run a two-pass redesign process on the highest-leverage screen first (the **Market Card**, since it's reused ~15+ times across every surface in this audit):

1. **Plan pass** — lock the token system in §1, sketch 2–3 card-tier concepts in low-fidelity (ASCII/wireframe is fine) before any code.
2. **Build pass** — implement the Market Card as a single reusable component with props for tier (featured/standard/compact), wire every surface (Home, Markets, Trending, Groups, Social) to consume the *same* component and the *same* data source, eliminating Bugs B1–B3, B10 by construction.
3. **Critique pass** — screenshot the result across breakpoints and states (loading/empty/error/live-updating) and check it against §4's checklist before moving to the next screen.

Once the Market Card is right, the rest of the redesign is largely reusing the same system — which is exactly the kind of leverage/velocity story that reads well in a round-2 pitch.
