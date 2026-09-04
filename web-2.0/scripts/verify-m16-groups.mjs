import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots/web-2.0/groups');

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
  console.log('VERIFYING MILESTONE 16 GROUPS PAGE');
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
    // 1. Open /groups
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/groups`, { waitUntil: 'networkidle0' });

    // Test 1: Page Headline
    const headline = await page.$eval('h1', (el) => el.textContent.trim());
    assert(
      headline.includes('Forecaster Guilds & Groups'),
      `1. Verified dominant headline: "${headline}"`
    );

    // Test 2: Initial Guilds Populated
    const initialGuildsCount = await page.$$eval('article', (els) => els.length);
    assert(initialGuildsCount === 6, `2. Verified initial directory populated with 6 guilds (${initialGuildsCount} guilds)`);

    // Test 3: Desktop Screenshot
    const desktopScreenshotPath = path.join(SCREENSHOT_DIR, '01_1440x900_groups_desktop.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${desktopScreenshotPath}`);

    // Test 4: Category Filtering
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.trim() === 'Macroeconomics'
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const macroGuildsCount = await page.$$eval('article', (els) => els.length);
    assert(macroGuildsCount === 1, `4a. Verified Macroeconomics category filters to 1 guild (${macroGuildsCount})`);

    // Restore "All"
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.trim() === 'All'
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 200));
    const restoredCount = await page.$$eval('article', (els) => els.length);
    assert(restoredCount === 6, `4b. Verified restoring "All" recovers 6 guilds (${restoredCount})`);

    // Test 5: Toggle Join Guild Action
    const joinBtn = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('article button')).find((b) =>
        b.textContent.includes('Join Guild')
      );
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    assert(joinBtn, '5a. Verified unjoined guild button clicked');
    await new Promise((r) => setTimeout(r, 200));

    const hasJoinedState = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('article button')).some((b) =>
        b.textContent.includes('Joined')
      );
    });
    assert(hasJoinedState, '5b. Verified guild button toggles to "Joined" state with checkmark');

    // Test 6: Featured Market Trade Link Navigates to Market Detail
    const hasMarketTrade = await page.evaluate(() => {
      const tradeBtn = Array.from(document.querySelectorAll('article button')).find((b) =>
        b.textContent.includes('Trade This Market')
      );
      if (tradeBtn) {
        tradeBtn.click();
        return true;
      }
      return false;
    });
    assert(hasMarketTrade, '6a. Verified "Trade This Market" action exists on featured guild card');
    await new Promise((r) => setTimeout(r, 400));
    const isAtDetail = await page.evaluate(() => window.location.pathname.startsWith('/markets/'));
    assert(isAtDetail, '6b. Verified clicking "Trade This Market" navigates to Market Detail');

    // Return to /groups for Viewport Checks
    await page.goto(`${BASE_URL}/groups`, { waitUntil: 'networkidle0' });

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

    const mobileScreenshotPath = path.join(SCREENSHOT_DIR, '02_375x812_groups_mobile.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${mobileScreenshotPath}`);

    // Test 9: Console Errors Check
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((err) => console.error(`  - ${err}`));
    }
    assert(consoleErrors.length === 0, '9. Verified ZERO console errors during entire Groups journey');

    console.log('\n====================================================');
    console.log('MILESTONE 16 GROUPS VERIFICATION: ALL PASS');
    console.log('====================================================\n');
  } catch (err) {
    console.error('Verification failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
