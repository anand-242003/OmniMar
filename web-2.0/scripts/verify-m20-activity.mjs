import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots/web-2.0/activity');

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
  console.log('VERIFYING MILESTONE 20 ACTIVITY PAGE');
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
    // 1. Open /activity
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/activity`, { waitUntil: 'networkidle0' });

    // Test 1: Page Headline
    const headline = await page.$eval('h1', (el) => el.textContent.trim());
    assert(
      headline.includes('Activity & Audit Trail'),
      `1. Verified dominant headline: "${headline}"`
    );

    // Test 2: Initial Activity Items Populated
    const initialItemsCount = await page.$$eval('article', (els) => els.length);
    assert(initialItemsCount >= 4, `2. Verified initial feed populated with activity items (${initialItemsCount} items)`);

    // Test 3: Desktop Screenshot
    const desktopScreenshotPath = path.join(SCREENSHOT_DIR, '01_1440x900_activity_desktop.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${desktopScreenshotPath}`);

    // Test 4: Filter by Guild Actions
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('Guild Actions')
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const guildItemsCount = await page.$$eval('article', (els) => els.length);
    assert(guildItemsCount === 1, `4a. Verified Guild Actions filter isolated guild events (${guildItemsCount})`);

    // Restore "All Activity"
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('All Activity')
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const restoredItemsCount = await page.$$eval('article', (els) => els.length);
    assert(restoredItemsCount === initialItemsCount, `4b. Verified All Activity restored full feed (${restoredItemsCount})`);

    // Test 5: Contextual Navigation
    const hasViewMarket = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('article button')).find((b) =>
        b.textContent.includes('View Market')
      );
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    assert(hasViewMarket, '5a. Verified "View Market" action exists on trade activity');
    await new Promise((r) => setTimeout(r, 400));
    const isAtDetail = await page.evaluate(() => window.location.pathname.startsWith('/markets/'));
    assert(isAtDetail, '5b. Verified clicking "View Market" navigates to Market Detail');

    // Return to /activity for Viewport Checks
    await page.goto(`${BASE_URL}/activity`, { waitUntil: 'networkidle0' });

    // Test 6: 768px Tablet Viewport
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise((r) => setTimeout(r, 300));
    const tabletOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert(!tabletOverflow, '6. Verified 768px tablet layout has ZERO horizontal overflow');

    // Test 7: 375px Mobile Viewport
    await page.setViewport({ width: 375, height: 812 });
    await new Promise((r) => setTimeout(r, 300));
    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert(!mobileOverflow, '7. Verified 375px mobile layout has ZERO horizontal overflow');

    const mobileScreenshotPath = path.join(SCREENSHOT_DIR, '02_375x812_activity_mobile.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${mobileScreenshotPath}`);

    // Test 8: Console Errors Check
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((err) => console.error(`  - ${err}`));
    }
    assert(consoleErrors.length === 0, '8. Verified ZERO console errors during entire Activity journey');

    console.log('\n====================================================');
    console.log('MILESTONE 20 ACTIVITY VERIFICATION: ALL PASS');
    console.log('====================================================\n');
  } catch (err) {
    console.error('Verification failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
