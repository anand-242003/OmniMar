# OmniMarketX — Style & UX Standards
*Authoritative reference for every surface, present and future. Supersedes ad-hoc decisions made per-component.*

---

## 1. Design Philosophy

**"The Credible Forecaster's Arena."** Every decision should be testable against:

> Does this make the user's financial and probabilistic reasoning clearer, or does it
> just make the screen feel more finished?

**Non-negotiable anti-patterns:**
- Gradient backgrounds without a specific communicative purpose
- Glow/neon effects of any kind
- Decorative 3D, particles, or motion that doesn't represent real data
- Fake social proof, fabricated counters, or unverifiable claims
- Emoji used as the *only* signal for category, status, or meaning
- Superlative copy applied to empty or near-empty states
- Any new pattern that a designer couldn't defend in one sentence tied to user comprehension

---

## 2. Color — Roles, Not Just Hex Values

| Role | Must be distinct from | Why |
|---|---|---|
| YES / bullish / profit | NO/bearish, brand, real-capital | Reused colors erase meaning |
| NO / bearish / loss | YES/bullish, brand primary | Brand-as-CTA must never look like "loss" |
| Brand primary (CTA) | NO/loss hue family | Pink/red brand button must not sit in loss hue band |
| Real-money indicator | YES/profit green | Distinct stakes level, not a rebrand of "profit" |
| Demo/sandbox indicator | Real-money indicator | Must be unmistakable at a glance, not just by label |
| Warning/status | All of the above | Reserved for time-sensitive or risk states only |

**Color-blindness rule:** YES/NO must never rely on color alone. Pair with glyph, label, or pattern.

**Token architecture:** primitive → semantic → component. Never hand-edit a semantic token's hex in a component.

**80/15/5 discipline:** any screen where >5% of visible area is high-signal accent color should be re-examined.

---

## 3. Typography

- **Sora** — everything a human reads as language
- **Geist Mono** — everything that is a number a user must trust precisely

**Hard floor:** nothing below 12px, anywhere, for any reason.

**Number consistency rule:** the same financial figure must be styled identically (same weight, tabular alignment) everywhere it appears. Variation between screens is a bug.

---

## 4. Terminology — One Word Per Concept, Everywhere

| Concept | Canonical term | Never use |
|---|---|---|
| Contract cost per share | "Price" | "Cost," "Rate" |
| Implied likelihood | "Probability" | "Odds" (unless explicit betting-odds framing) |
| What settles the market | "Resolution source" | "Oracle," "Judge," "Authority" |
| Practice funds | "Demo" / "Sandbox" | Mixing both terms on the same surface |
| Real user funds | "Real" | "Live" (ambiguous with "live market") |
| Money in unresolved positions | "At risk" / "Exposure" | "Invested" |

New concepts must be named here first, before appearing in component code.

---

## 5. States Must Look Different, Not Just Say Different Things

1. **Loading** — skeleton or spinner, never a blank canvas
2. **Genuinely empty** — reframe as opportunity; no unqualified superlative claims
3. **Populated** — the default, fully-designed state
4. **Error** — visually distinct from empty; explains what went wrong and what to do
5. **Demo vs. Real** — border color + background tint + persistent badge; not just label text

**Evidence-integrity rule:** copy may never claim more than what is visibly true on that same screen.

---

## 6. Layout & Spacing

8pt base grid, 4px sub-grid for compact controls only. No ad-hoc pixel values.

**z-index stack:** nav < content < sticky bars < drawers < modals < toasts. Audit every new floating element against this before shipping.

**Touch targets:** 44×44px minimum on every interactive element, every viewport.

---

## 7. Motion

Motion must do one of:
- Confirm a state change already communicated in text
- Orient the user during navigation
- Show continuity between two related states

If it does none of these, don't animate it. `prefers-reduced-motion` respected everywhere.

---

## 8. Cross-Surface Consistency Checklist

Before any milestone is called done:

- [ ] Same financial figure renders identically in every place it appears
- [ ] Same term used for the same concept on every surface (Section 4)
- [ ] Demo/Real distinction is visually — not just textually — consistent everywhere
- [ ] No floating element overlaps a primary CTA at any tested viewport
- [ ] Empty/low-data states don't sit beneath copy claiming activity that isn't there
- [ ] A user action's consequence is visible on every surface that should reflect it
- [ ] Context survives interruption (auth, page reload, navigation)

---

## 9. Self-Audit Integrity Rule

Any automated design critique must:
- Run against real rendered screenshots, not source code alone
- Report a range of severities — a pass returning "0 violations" on every surface is likely measuring agreement with its own prior output
- Flag anti-pattern ties explicitly
- Never be the sole gate before freeze; a second pass against screenshots is required

---

*Any deviation is either (a) a bug to fix, or (b) grounds to revise this document — never grounds to quietly ship an exception.*
