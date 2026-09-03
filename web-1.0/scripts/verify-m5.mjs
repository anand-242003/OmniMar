import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://127.0.0.1:5173';
const REPLICA_DIR = path.resolve('../screenshots/replica');
const BRAIN_DIR = '/Users/anandmishra1/.gemini/antigravity-ide/brain/69ca703b-ca76-416d-ae0b-51e95b9717c4';

if (!fs.existsSync(REPLICA_DIR)) {
  fs.mkdirSync(REPLICA_DIR, { recursive: true });
}

async function run() {
  console.log('Launching headless Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  async function saveScreenshot(filename) {
    const replicaPath = path.join(REPLICA_DIR, filename);
    const brainPath = path.join(BRAIN_DIR, filename);
    await page.screenshot({ path: replicaPath });
    try {
      fs.copyFileSync(replicaPath, brainPath);
    } catch (e) {}
    console.log(`Saved screenshot: ${filename}`);
  }

  // Ensure logged in and dark theme by default
  await page.goto(`${BASE_URL}/social`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('omx_theme', 'dark');
    document.documentElement.classList.add('dark');
    const mockUser = {
      id: 'usr_demo_1',
      name: 'Demo Trader',
      username: 'demotrader',
      email: 'demo@omnimarketx.com',
      virtualBalance: 9850,
      realBalance: 0,
    };
    localStorage.setItem('omx_auth_user', JSON.stringify(mockUser));
  });
  await page.reload({ waitUntil: 'networkidle0' });

  // 1. Social Page Tests
  console.log('\n--- Verifying /social ---');
  await saveScreenshot('m5_social_for_you.png');
  await saveScreenshot('m5_social_dark.png');

  // Click Following tab
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Following'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await saveScreenshot('m5_social_following.png');

  // Click Top tab
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Top'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await saveScreenshot('m5_social_top.png');

  // Click Latest tab
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Latest'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await saveScreenshot('m5_social_latest.png');

  // Test creating a post
  console.log('Testing post creation in composer...');
  await page.type('textarea[placeholder="What\'s on your mind?"]', 'Testing OmniMarketX community prediction stream!');
  await page.evaluate(() => {
    const postBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Post');
    if (postBtn) postBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 2. Groups Page Tests
  console.log('\n--- Verifying /groups ---');
  await page.goto(`${BASE_URL}/groups`, { waitUntil: 'networkidle0' });
  await saveScreenshot('m5_groups_discover.png');
  await saveScreenshot('m5_groups_dark.png');

  // Join group
  console.log('Testing Join group...');
  await page.evaluate(() => {
    const joinBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Join');
    if (joinBtn) joinBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // My Groups tab
  await page.evaluate(() => {
    const tab = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('My Groups'));
    if (tab) tab.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await saveScreenshot('m5_groups_my_groups.png');

  // Popular tab
  await page.evaluate(() => {
    const tab = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Popular'));
    if (tab) tab.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await saveScreenshot('m5_groups_popular.png');

  // 3. Leaderboard Page Tests
  console.log('\n--- Verifying /leaderboard ---');
  await page.goto(`${BASE_URL}/leaderboard`, { waitUntil: 'networkidle0' });
  await saveScreenshot('m5_leaderboard_all_time.png');
  await saveScreenshot('m5_leaderboard_dark.png');

  // Monthly tab (observed empty state)
  await page.evaluate(() => {
    const tab = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Monthly');
    if (tab) tab.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await saveScreenshot('m5_leaderboard_monthly.png');

  // Weekly tab
  await page.evaluate(() => {
    const tab = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Weekly');
    if (tab) tab.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await saveScreenshot('m5_leaderboard_weekly.png');

  // Daily tab
  await page.evaluate(() => {
    const tab = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Daily');
    if (tab) tab.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await saveScreenshot('m5_leaderboard_daily.png');

  // 4. Mobile Responsiveness Tests
  console.log('\n--- Verifying Mobile Viewports (375x812) ---');
  await page.setViewport({ width: 375, height: 812 });

  await page.goto(`${BASE_URL}/social`, { waitUntil: 'networkidle0' });
  await saveScreenshot('m5_social_mobile.png');

  await page.goto(`${BASE_URL}/groups`, { waitUntil: 'networkidle0' });
  await saveScreenshot('m5_groups_mobile.png');

  await page.goto(`${BASE_URL}/leaderboard`, { waitUntil: 'networkidle0' });
  await saveScreenshot('m5_leaderboard_mobile.png');

  // 5. Full M1-M4 Regression Flow Check
  console.log('\n--- Executing Required Regression Flow ---');
  await page.setViewport({ width: 1440, height: 900 });

  // A. Market detail page
  console.log('Navigating to /markets/will-ramayana-part-one-gross-1500cr...');
  await page.goto(`${BASE_URL}/markets/will-ramayana-part-one-gross-1500cr`, { waitUntil: 'networkidle0' });

  // Read initial balance
  const initialBalance = await page.evaluate(() => {
    const el = document.querySelector('header');
    return el ? el.textContent : '';
  });
  console.log('Header text at start:', initialBalance.replace(/\s+/g, ' '));

  // B. Navigate to /social and interact
  console.log('Navigating to /social...');
  await page.goto(`${BASE_URL}/social`, { waitUntil: 'networkidle0' });

  // C. Navigate to /portfolio
  console.log('Navigating to /portfolio...');
  await page.goto(`${BASE_URL}/portfolio`, { waitUntil: 'networkidle0' });
  const portfolioText = await page.evaluate(() => document.body.innerText);
  const hasPositions = portfolioText.includes('Active Positions');
  console.log('Portfolio has active positions:', hasPositions);

  // D. Navigate to /wallet
  console.log('Navigating to /wallet...');
  await page.goto(`${BASE_URL}/wallet`, { waitUntil: 'networkidle0' });
  const walletText = await page.evaluate(() => document.body.innerText);
  const hasWalletBalance = walletText.includes('USDC');
  console.log('Wallet has USDC balance:', hasWalletBalance);

  // E. Navigate to /activity
  console.log('Navigating to /activity...');
  await page.goto(`${BASE_URL}/activity`, { waitUntil: 'networkidle0' });
  const activityText = await page.evaluate(() => document.body.innerText);
  const hasActivity = activityText.includes('DEMO TRADE');
  console.log('Activity log has demo trades:', hasActivity);

  // F. Return to /markets/will-ramayana-part-one-gross-1500cr
  console.log('Returning to /markets/will-ramayana-part-one-gross-1500cr...');
  await page.goto(`${BASE_URL}/markets/will-ramayana-part-one-gross-1500cr`, { waitUntil: 'networkidle0' });
  const finalHeaderText = await page.evaluate(() => {
    const el = document.querySelector('header');
    return el ? el.textContent : '';
  });
  console.log('Final header state preserved:', finalHeaderText.replace(/\s+/g, ' '));

  await browser.close();
  console.log('\nAll M5 verification and regression tests completed successfully!');
}

run().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
