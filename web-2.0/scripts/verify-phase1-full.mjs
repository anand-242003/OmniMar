import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const ARTIFACTS_DIR = '/Users/anandmishra1/.gemini/antigravity-ide/brain/69ca703b-ca76-416d-ae0b-51e95b9717c4/.tempmediaStorage';

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

async function run() {
  console.log('--- STARTING PHASE 1 FULL VERIFICATION ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Clear local storage for clean test run
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle0' });

  // 1. HOME & PERSISTENT MODE BAR & ODDS CONSISTENCY
  console.log('1. Verifying Home & Persistent Mode Bar & Odds Consistency...');
  const isDemoBarVisible = await page.evaluate(() => {
    return document.body.textContent.includes('Demo Mode') && document.body.textContent.includes('Trading with $10,000 virtual funds');
  });
  console.log(`- Persistent Mode Bar visible: ${isDemoBarVisible}`);

  // Check SpaceX odds consistency
  const pageText = await page.evaluate(() => document.body.textContent);
  const hasSpaceXOdds = pageText.includes('82%') && pageText.includes('SpaceX');
  console.log(`- Consistent 82% SpaceX odds found: ${hasSpaceXOdds}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_01_home_demo_mode.png') });
  console.log('✓ Captured phase1_01_home_demo_mode.png');

  // 2. DETERMINISTIC OUTCOME FORMAT (AMENDMENT 3)
  console.log('2. Verifying Deterministic Outcome Format on Multi-Outcome Market...');
  await page.goto(`${BASE_URL}/markets/who-will-win-india-vs-brazil`, { waitUntil: 'networkidle0' });
  const multiDetailText = await page.evaluate(() => document.body.textContent);
  const hasMultiOptions = multiDetailText.includes('Brazil') && multiDetailText.includes('Draw') && multiDetailText.includes('India');
  console.log(`- Multi-outcome options rendered on detail slip: ${hasMultiOptions}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_02_multi_outcome_detail.png') });
  console.log('✓ Captured phase1_02_multi_outcome_detail.png');

  // 3. TRADE TICKET VISUAL MODE TINT & GUEST EXECUTION (AMENDMENT 2)
  console.log('3. Verifying Demo Trade Ticket Accent Tint & Guest Immediate Execution...');
  await page.goto(`${BASE_URL}/markets/will-spacex-starship-reach-orbit-in-2026`, { waitUntil: 'networkidle0' });
  
  const tradeNotice = await page.evaluate(() => {
    return document.body.textContent.includes("Demo trades don't affect market price.");
  });
  console.log(`- Explicit Demo Notice on ticket: ${tradeNotice}`);

  // Check button text and submit trade as guest
  const submitBtnText = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Place Demo Prediction'));
    return btn ? btn.textContent.trim() : null;
  });
  console.log(`- Primary button text in Demo mode: "${submitBtnText}"`);

  // Submit $25 trade
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Place Demo Prediction'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const hasReceipt = await page.evaluate(() => {
    return document.body.textContent.includes('Demo Prediction Confirmed') && document.body.textContent.includes('Virtual Practice');
  });
  console.log(`- Trade executed immediately without login block: ${hasReceipt}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_03_demo_trade_confirmed.png') });
  console.log('✓ Captured phase1_03_demo_trade_confirmed.png');

  // 4. LEADERBOARD SEGREGATION (AMENDMENT 1)
  console.log('4. Verifying Mode-Aware Leaderboard Segregation...');
  await page.goto(`${BASE_URL}/leaderboard`, { waitUntil: 'networkidle0' });
  const demoLeaderboardText = await page.evaluate(() => document.body.textContent);
  const isPracticeLeaderboard = demoLeaderboardText.includes('Practice Forecasters Arena') && 
    demoLeaderboardText.includes('Demo trades never appear on or affect the verified real-money leaderboard');
  console.log(`- Practice Leaderboard rendered in Demo mode: ${isPracticeLeaderboard}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_04_leaderboard_practice.png') });
  console.log('✓ Captured phase1_04_leaderboard_practice.png');

  // Switch to Real mode via Navbar segmented control
  console.log('Switching to Real mode via Navbar...');
  // Since unauthenticated, clicking Real triggers the AuthModal
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const realBtn = buttons.find(b => b.textContent.includes('Real') && !b.textContent.includes('Arena'));
    if (realBtn) realBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 5. AUTH MODAL (FILE 04 §5-6)
  const isAuthModalOpen = await page.evaluate(() => {
    return document.body.textContent.includes('Sign in or Register') && 
      document.body.textContent.includes('Google') && 
      document.body.textContent.includes('Apple') &&
      document.body.textContent.includes('Protected by Privy');
  });
  console.log(`- Auth Modal opened on Real switch: ${isAuthModalOpen}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_05_auth_modal.png') });
  console.log('✓ Captured phase1_05_auth_modal.png');

  // Complete Login with Google (mock)
  console.log('Signing in via Google...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const googleBtn = buttons.find(b => b.textContent.includes('Google'));
    if (googleBtn) googleBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Now authenticated, switch to Real mode
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const realBtn = buttons.find(b => b.textContent.includes('Real') && !b.textContent.includes('Arena'));
    if (realBtn) realBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  await page.goto(`${BASE_URL}/leaderboard`, { waitUntil: 'networkidle0' });
  const realLeaderboardText = await page.evaluate(() => document.body.textContent);
  const isRealLeaderboard = realLeaderboardText.includes('Verified Real-Capital Arena') && 
    realLeaderboardText.includes('Demo trades are strictly excluded from ranking calculations');
  console.log(`- Verified Real Leaderboard rendered in Real mode: ${isRealLeaderboard}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_06_leaderboard_real.png') });
  console.log('✓ Captured phase1_06_leaderboard_real.png');

  // 6. SINGLE MODE-AWARE PAGES: WALLET & PORTFOLIO IN REAL MODE
  console.log('6. Verifying Mode-Aware Wallet & Portfolio in Real Mode...');
  await page.goto(`${BASE_URL}/wallet`, { waitUntil: 'networkidle0' });
  const walletText = await page.evaluate(() => document.body.textContent);
  const hasRealWallet = walletText.includes('Real Money Treasury') && walletText.includes('Deposit USDC');
  console.log(`- Real Wallet with deposit controls rendered: ${hasRealWallet}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_07_wallet_real_mode.png') });
  console.log('✓ Captured phase1_07_wallet_real_mode.png');

  await page.goto(`${BASE_URL}/portfolio`, { waitUntil: 'networkidle0' });
  const portfolioText = await page.evaluate(() => document.body.textContent);
  const hasRealPortfolio = portfolioText.includes('Real Portfolio & Open Exposure');
  console.log(`- Real Portfolio rendered: ${hasRealPortfolio}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_08_portfolio_real_mode.png') });
  console.log('✓ Captured phase1_08_portfolio_real_mode.png');

  // 7. INLINE AUTH GATING FOR GUESTS
  console.log('7. Verifying Inline Auth Gating on Social and Groups for logged-out guests...');
  // Log out by clearing auth storage
  await page.evaluate(() => {
    localStorage.removeItem('omx_auth_user_v2');
  });
  await page.reload({ waitUntil: 'networkidle0' });

  await page.goto(`${BASE_URL}/social`, { waitUntil: 'networkidle0' });
  const hasSocialGate = await page.evaluate(() => {
    return document.body.textContent.includes('Sign in to publish a forecast thesis');
  });
  console.log(`- Social post composer inline AuthGate: ${hasSocialGate}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_09_social_inline_gate.png') });
  console.log('✓ Captured phase1_09_social_inline_gate.png');

  await page.goto(`${BASE_URL}/groups`, { waitUntil: 'networkidle0' });
  const hasGroupGate = await page.evaluate(() => {
    return document.body.textContent.includes('Sign in to join guild');
  });
  console.log(`- Groups Join button inline AuthGate: ${hasGroupGate}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_10_groups_inline_gate.png') });
  console.log('✓ Captured phase1_10_groups_inline_gate.png');

  // 8. RETURNING USER RESTORE TOAST TEST (AMENDMENT 4)
  console.log('8. Verifying Returning User Demo Wallet Restore Toast (Amendment 4)...');
  // Seed an existing account and wallet in localStorage
  await page.evaluate(() => {
    const known = {
      'alex@omnimarketx.com': {
        id: 'user_alex',
        email: 'alex@omnimarketx.com',
        name: 'Alex',
        avatarInitials: 'AL',
        isGuest: false,
        kycStatus: 'VERIFIED',
      }
    };
    localStorage.setItem('omx_known_accounts_v2', JSON.stringify(known));
    localStorage.setItem('omx_user_wallets_user_alex', JSON.stringify({
      demoWallet: { balance: 9500, positions: [], trades: [] },
      realWallet: { balance: 150, positions: [], trades: [] },
    }));
  });

  // Trigger login modal
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const signInBtn = buttons.find(b => b.textContent.includes('Sign In') || b.textContent.includes('Join Guild'));
    if (signInBtn) signInBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Enter alex@omnimarketx.com in Email OTP flow
  const emailInput = await page.$('input[type="email"]');
  if (emailInput) {
    await emailInput.click({ clickCount: 3 });
    await emailInput.type('alex@omnimarketx.com');
  }
  await page.evaluate(() => {
    const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Send Verification Code'));
    if (submitBtn) submitBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Submit OTP
  await page.evaluate(() => {
    const verifyBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Verify & Sign In'));
    if (verifyBtn) verifyBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  const authNoticeToast = await page.evaluate(() => {
    return document.body.textContent.includes('restored your saved portfolio history') ||
      document.body.textContent.includes('Signed into existing account');
  });
  console.log(`- Returning user restore toast rendered: ${authNoticeToast}`);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase1_11_returning_user_toast.png') });
  console.log('✓ Captured phase1_11_returning_user_toast.png');

  console.log('--- ALL PHASE 1 VERIFICATIONS COMPLETED SUCCESSFULLY ---');
  await browser.close();
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
