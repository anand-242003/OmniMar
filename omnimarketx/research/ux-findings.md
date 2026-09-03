# OmniMarketX UX Findings & Friction Observations

## Overview
This document logs all observed user experience friction points, ambiguities, and potential improvements identified during structured platform exploration and authentication testing.

---

## 1. Top UX Friction Observations

### Issue 1: Authentication Modal Ambiguity ("Sign In" vs "Sign Up")
- **Severity**: P2 (Medium)
- **Problem**: Both the header "Sign In" and "Sign Up" buttons open the exact same modal dialog without any pre-selected state or contextual difference.
- **Observed Behavior**: Clicking either button renders the Privy modal titled "Log in or sign up". Users expecting a dedicated signup registration form with explicit field guidance may experience initial confusion.
- **Expected Behavior**: A clearer distinction or tabbed interface indicating that the same single-step email OTP or OAuth flow handles both login and registration automatically.
- **Why It Matters**: Reduces friction for web2 users unfamiliar with modern passwordless/Privy identity architectures.
- **Suggested Improvement**: Add a short subtitle: "No password needed — enter your email to sign in or create an account automatically."

---

### Issue 2: Immediate Demo Trading Gatekeeping Behind Authentication
- **Severity**: P1 (High)
- **Problem**: Users wishing to try the "Demo Trading" mode cannot simulate a trade without first completing account authentication.
- **Observed Behavior**: Clicking the `Demo` toggle in the order slip shows the virtual balance banner (10,000 USDC), but the action button displays "Sign in to start trading / Sign Up to Trade".
- **Expected Behavior**: Allow a 1-click sandbox guest mode where new users can click "Practice Trade" and immediately see virtual shares added to an ephemeral session, then prompt for signup to save progress.
- **Why It Matters**: Increases conversion and allows immediate evaluation of the platform's core mechanics without registration friction.
- **Suggested Improvement**: Provide an instant "Try 1-Click Guest Demo" mode in the replica.

---

### Issue 3: Inactive Market Cards Without Historical Depth
- **Severity**: P2 (Medium)
- **Problem**: Several market cards display flat 50% probability with 0 volume and 0 traders.
- **Observed Behavior**: The price history chart shows flat horizontal lines at 50% across 1D/1W/1M ranges for newly created or low-liquidity markets.
- **Expected Behavior**: Subtle sparklines or active trade indications to differentiate established markets from cold-start markets.
- **Why It Matters**: Visual liveliness and credibility are critical for prediction market engagement.
- **Suggested Improvement**: Ensure replica mock dataset includes dynamic, lively price movements, volume distributions, and realistic order book depth.

---

### Issue 4: Protected Pages Lack Rich Preview Teasers
- **Severity**: P2 (Medium)
- **Problem**: Navigating to `/wallet`, `/portfolio`, or `/activity` when logged out displays a generic "Sign in required" shield card.
- **Observed Behavior**: Blank page with a single centered card.
- **Expected Behavior**: A blurred or sample mockup background showing what the portfolio dashboard looks like (e.g. sample ROI charts, position summaries), demonstrating the value of signing in.
- **Why It Matters**: Teaser states have significantly higher conversion rates than empty lock screens.
- **Suggested Improvement**: In `./web-1.0`, provide both the realistic unauthenticated view and an interactive "Demo Mode" toggle that populates realistic sample portfolio holdings.

---

### Issue 5: Search Results Dropdown Overlay
- **Severity**: P3 (Low)
- **Problem**: The global search bar dropdown overlays content on smaller desktop screens without a dedicated backdrop backdrop-blur, making it slightly hard to read against high-contrast market titles.
- **Observed Behavior**: Autocomplete panel renders with semi-transparent background.
- **Expected Behavior**: High-opacity backdrop with clear section dividers between `MARKETS` and `POSTS`.
- **Why It Matters**: Readability and keyboard navigation polish.
- **Suggested Improvement**: Enforce solid card background (`bg-omx-card` / `bg-[#110a36]`) with subtle shadow and border.

---

## 2. Top 3 Signup / Onboarding Issues
1. **No Passwordless Flow Explanation**: First-time users are not informed before entering their email that they will receive an OTP instead of entering a password.
2. **Missing Welcome Wizard**: After authentication, the user is redirected straight to the homepage without a personalized onboarding prompt or guided tour of the practice trading feature.
3. **No Direct Wallet Discovery**: Web3 wallet options require clicking "Continue with a wallet" to reveal supported chains and providers.

---

## 3. Top 3 Trading / Demo Issues
1. **Demo Trading Gated**: Cannot place a practice trade in guest mode before registering.
2. **Demo Payment Mechanism Not Observed**: Virtual funds cannot be manually topped up or reset via a simulated faucet/deposit interface.
3. **Order Slip Mobile Collapsing**: On narrow viewports, the order slip floats at the bottom or hides behind drawer tabs, requiring multiple taps to review order estimates.
