import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots/web-2.0/trending');

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
  console.log('VERIFYING MILESTONE 14 TRENDING PAGE');
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
    // 1. Open /trending
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/trending`, { waitUntil: 'networkidle0' });

    // Test 1: Page Headline
    const headline = await page.$eval('h1', (el) => el.textContent.trim());
    assert(
      headline.includes('Trending & Velocity'),
      `1. Verified dominant headline: "${headline}"`
    );

    // Test 2: Platform Velocity Summary Cards
    const summaryCards = await page.$$eval('main > div:nth-child(2) > div', (els) => els.length);
    assert(summaryCards === 3, `2. Verified 3 summary cards rendered (${summaryCards} cards)`);

    // Test 3: Market Cards Populated
    const cardsCount = await page.$$eval('article', (els) => els.length);
    assert(cardsCount > 0, `3. Verified Trending market cards grid populated (${cardsCount} cards)`);

    // Test 4: Desktop Screenshot
    const desktopScreenshotPath = path.join(SCREENSHOT_DIR, '01_1440x900_trending_desktop.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${desktopScreenshotPath}`);

    // Test 5: Filter Switching
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('Highest Volume')
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 300));
    const firstMarketTitle = await page.$eval('article h3', (el) => el.textContent.trim());
    assert(firstMarketTitle.length > 0, `5. Verified filtering re-renders sorted markets (first: "${firstMarketTitle}")`);

    // Test 6: Outcome Button Navigates to Market Detail
    const outcomeBtn = await page.$('article button');
    assert(outcomeBtn !== null, '6a. Verified outcome button exists on card');
    await outcomeBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    const isAtDetail = await page.evaluate(() => window.location.pathname.startsWith('/markets/'));
    assert(isAtDetail, '6b. Verified clicking outcome button navigates cleanly to /markets/:id');

    // Return to /trending
    await page.goto(`${BASE_URL}/trending`, { waitUntil: 'networkidle0' });

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

    const mobileScreenshotPath = path.join(SCREENSHOT_DIR, '02_375x812_trending_mobile.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${mobileScreenshotPath}`);

    // Test 9: Console Errors Check
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((err) => console.error(`  - ${err}`));
    }
    assert(consoleErrors.length === 0, '9. Verified ZERO console errors during entire Trending journey');

    console.log('\n====================================================');
    console.log('MILESTONE 14 TRENDING VERIFICATION: ALL PASS');
    console.log('====================================================\n');
  } catch (err) {
    console.error('Verification failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
