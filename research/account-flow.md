# OmniMarketX Authentication & Account Access Flow Analysis

## Overview
This document records the exact observed behavior and technical architecture of OmniMarketX's authentication, sign up, and account access flows based on live inspection of `https://www.omnimarketx.com`.

---

## 1. Authentication Architecture (OBSERVED)

### Identity Provider: Privy
- **Provider**: Privy (`Protected by privy`, SDK: `@privy-io/react-auth` / `@privy-io/js-sdk-core`).
- **Modal Trigger**: Triggered by clicking either:
  1. Top-right header **Sign In** button
  2. Top-right header **Sign Up** button
  3. Market detail trade panel **Sign Up to Trade** or **Sign In** buttons
  4. Protected route empty states (`/wallet`, `/portfolio`, `/settings`, `/activity`) **Sign In** buttons
- **Unified Flow**: There is no separate signup page or distinct signup form. Both "Sign In" and "Sign Up" open the exact same Privy modal titled **"Log in or sign up"** with the subtitle **"Choose a sign in method"**.

### Supported Authentication Methods (OBSERVED)
1. **Email Input**:
   - Single input field with placeholder `your-email@example.com`.
   - Primary action button: `Submit`.
   - **Mechanism**: Passwordless Email OTP. Upon submitting an email address, Privy sends a 6-digit verification code to the user's inbox (`/api/v1/passwordless/init`). No user password is required or accepted.
2. **Social Single Sign-On (OAuth)**:
   - `Continue with Google`
   - `Continue with Apple`
3. **Web3 Wallet Connection**:
   - Button: `Continue with a wallet`
   - Supported wallets: MetaMask, Coinbase Wallet, Rainbow, Phantom, Solflare, WalletConnect (`@walletconnect/modal`), and Solana/EVM wallets.
   - SIWE (Sign-In with Ethereum) & SIWS (Sign-In with Solana) challenge verification.

### Backend Account Synchronization (OBSERVED via bundle inspection)
- Once authenticated via Privy, the frontend calls:
  - `POST /api/v1/auth/privy/sync`: Synchronizes Privy user identity with OmniMarketX database.
  - `GET /api/v1/auth/me`: Fetches internal OmniMarketX user profile.
  - `GET /api/v1/auth/me/firebase-token`: Generates Firebase custom token for push notifications and chat.
  - `GET /api/v1/auth/me/ws-ticket`: Generates WebSocket authentication ticket for live market data feed.

---

## 2. Password Requirements & Form Validation (OBSERVED & INFERRED)

- **Password Requirements**:
  - `[OBSERVED]`: No password fields exist on the platform. The platform relies exclusively on passwordless email OTP, OAuth (Google/Apple), and cryptographic wallet signatures.
  - `[INFERRED]`: Account security is delegated entirely to the external identity providers and user email security.
- **Validation**:
  - Standard email format validation (`^[^\s@]+@[^\s@]+\.[^\s@]+$`).
  - Empty submission is disabled/blocked by Privy SDK.
  - Rate limiting enforced on OTP resends.

---

## 3. Unauthenticated User Experience & Gatekeeping (OBSERVED)

### Protected Routes
When an unauthenticated user accesses protected sections:
1. `/wallet`:
   - Displays a centered dark card with a shield icon.
   - Text: `Sign in required`
   - Subtitle: `Sign in to deposit, withdraw, and manage your balance.`
   - CTA: `Sign In` button.
2. `/portfolio`:
   - Displays shield icon.
   - Text: `Sign in required`
   - Subtitle: `Sign in to view your positions and trade history.`
   - CTA: `Sign In` button.
3. `/settings`:
   - Displays shield icon.
   - Text: `Sign in required`
   - Subtitle: `Sign in to manage your account, security, and preferences.`
   - CTA: `Sign In` button.
4. `/activity`:
   - Displays shield icon.
   - Text: `Sign in required`
   - Subtitle: `Sign in to view your trading activity.`
   - CTA: `Sign In` button.

---

## 4. Unknowns and Limitations (UNKNOWN)

1. `[UNKNOWN]`: First-time user onboarding tour or welcome modal post-email verification, as completing live OTP requires active inbox access.
2. `[UNKNOWN]`: Custom username selection flow during first-time Privy account creation (inferred to be prompted during `/auth/privy/sync` or initial profile setup).
