import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots/web-2.0/wallet');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    process.exit(1);
  }
  console.log(`[PASS] ${message}`);
}

async function runVerification() {
  console.log('====================================================');
  console.log('VERIFYING MILESTONE 19 WALLET PAGE');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // 1. Open /wallet
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/wallet`, { waitUntil: 'networkidle0' });

    // Test 1: Page Headline
    const headline = await page.$eval('h1', (el) => el.textContent.trim());
    assert(
      headline.includes('Sandbox Balance & Treasury'),
      `1. Verified dominant headline: "${headline}"`
    );

    // Test 2: Hero Section Rendered
    const heroExists = await page.$('section[aria-label="Sandbox Treasury Hero"]');
    assert(heroExists !== null, '2. Verified primary Sandbox Treasury hero rendered');

    // Test 3: Faucet Top-up Interaction
    const initialBalanceText = await page.$eval('section[aria-label="Sandbox Treasury Hero"] .font-mono', (el) => el.textContent.trim());
    console.log(`[INFO] Initial balance: "${initialBalanceText}"`);

    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('+$1,000.00 Faucet')
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    const updatedBalanceText = await page.$eval('section[aria-label="Sandbox Treasury Hero"] .font-mono', (el) => el.textContent.trim());
    console.log(`[INFO] Updated balance: "${updatedBalanceText}"`);
    assert(
      updatedBalanceText !== initialBalanceText,
      `3. Verified Faucet Top-up updated virtual balance (${updatedBalanceText})`
    );

    // Test 4: Reset Button Interaction
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('Reset to $10K')
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    const resetBalanceText = await page.$eval('section[aria-label="Sandbox Treasury Hero"] .font-mono', (el) => el.textContent.trim());
    assert(
      resetBalanceText.includes('10,000.00'),
      `4. Verified Reset to $10K restored default balance (${resetBalanceText})`
    );

    // Test 5: Desktop Screenshot
    const desktopScreenshotPath = path.join(SCREENSHOT_DIR, '01_1440x900_wallet_desktop.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${desktopScreenshotPath}`);

    // Test 6: View Portfolio Navigation
    const portfolioBtn = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('View Portfolio')
      );
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    assert(portfolioBtn, '6a. Verified "View Portfolio" action found in Wallet');
    await new Promise((r) => setTimeout(r, 400));
    const isAtPortfolio = await page.evaluate(() => window.location.pathname.startsWith('/portfolio'));
    assert(isAtPortfolio, '6b. Verified clicking "View Portfolio" navigates to /portfolio');

    // Return to /wallet for Viewport Checks
    await page.goto(`${BASE_URL}/wallet`, { waitUntil: 'networkidle0' });

    // Test 7: 768px Tablet Viewport
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise((r) => setTimeout(r, 300));
    const tabletOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert(!tabletOverflow, '7. Verified 768px tablet layout has ZERO horizontal overflow');

    // Test 8: 375px Mobile Viewport
    await page.setViewport({ width: 375, height: 812 });
    await new Promise((r) => setTimeout(r, 300));
    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert(!mobileOverflow, '8. Verified 375px mobile layout has ZERO horizontal overflow');

    const mobileScreenshotPath = path.join(SCREENSHOT_DIR, '02_375x812_wallet_mobile.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${mobileScreenshotPath}`);

    // Test 9: Console Errors Check
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((err) => console.error(`  - ${err}`));
    }
    assert(consoleErrors.length === 0, '9. Verified ZERO console errors during entire Wallet journey');

    console.log('\n====================================================');
    console.log('MILESTONE 19 WALLET VERIFICATION: ALL PASS');
    console.log('====================================================\n');
  } catch (err) {
    console.error('Verification failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
