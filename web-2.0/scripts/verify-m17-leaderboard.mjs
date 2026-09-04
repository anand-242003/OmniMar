import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots/web-2.0/leaderboard');

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
  console.log('VERIFYING MILESTONE 17 LEADERBOARD PAGE');
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
    // 1. Open /leaderboard
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/leaderboard`, { waitUntil: 'networkidle0' });

    // Test 1: Page Headline
    const headline = await page.$eval('h1', (el) => el.textContent.trim());
    assert(
      headline.includes('Forecaster Arena & Rankings'),
      `1. Verified dominant headline: "${headline}"`
    );

    // Test 2: Top 3 Podium Cards
    const podiumCardsCount = await page.$$eval('section[aria-label="Top 3 forecasters podium"] article', (els) => els.length);
    assert(podiumCardsCount === 3, `2. Verified top 3 podium articles rendered (${podiumCardsCount} podium cards)`);

    // Test 3: Desktop Screenshot
    const desktopScreenshotPath = path.join(SCREENSHOT_DIR, '01_1440x900_leaderboard_desktop.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${desktopScreenshotPath}`);

    // Test 4: Rankings Table Rows
    const tableRowsCount = await page.$$eval('tbody tr', (els) => els.length);
    assert(tableRowsCount === 7, `4. Verified rankings table rendered with 7 forecaster rows (${tableRowsCount} rows)`);

    // Test 5: Timeframe Button Switching
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.trim() === 'All-Time'
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 200));
    const isAllTimeActive = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.trim() === 'All-Time'
      );
      return btn && btn.className.includes('bg-omx-brand');
    });
    assert(isAllTimeActive, '5. Verified timeframe switching updates active state');

    // Test 6: Call To Action Navigation
    const ctaBtn = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('Find Prediction Markets')
      );
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    assert(ctaBtn, '6a. Verified "Find Prediction Markets" action exists in personal standing banner');
    await new Promise((r) => setTimeout(r, 400));
    const isAtMarkets = await page.evaluate(() => window.location.pathname.startsWith('/markets'));
    assert(isAtMarkets, '6b. Verified clicking CTA navigates to /markets');

    // Return to /leaderboard for Viewport Checks
    await page.goto(`${BASE_URL}/leaderboard`, { waitUntil: 'networkidle0' });

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

    const mobileScreenshotPath = path.join(SCREENSHOT_DIR, '02_375x812_leaderboard_mobile.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${mobileScreenshotPath}`);

    // Test 9: Console Errors Check
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((err) => console.error(`  - ${err}`));
    }
    assert(consoleErrors.length === 0, '9. Verified ZERO console errors during entire Leaderboard journey');

    console.log('\n====================================================');
    console.log('MILESTONE 17 LEADERBOARD VERIFICATION: ALL PASS');
    console.log('====================================================\n');
  } catch (err) {
    console.error('Verification failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
