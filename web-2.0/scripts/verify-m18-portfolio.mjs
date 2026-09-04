import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots/web-2.0/portfolio');

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
  console.log('VERIFYING MILESTONE 18 PORTFOLIO PAGE');
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
    // 1. Open /portfolio
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/portfolio`, { waitUntil: 'networkidle0' });

    // Test 1: Page Headline
    const headline = await page.$eval('h1', (el) => el.textContent.trim());
    assert(
      headline.includes('Portfolio & Open Exposure'),
      `1. Verified dominant headline: "${headline}"`
    );

    // Test 2: 4 Summary Metric Cards
    const summaryCardsCount = await page.$$eval('section[aria-label="Portfolio valuation summary"] > div > div', (els) => els.length);
    assert(summaryCardsCount === 4, `2. Verified 4 summary metrics cards rendered (${summaryCardsCount} cards)`);

    // Test 3: Seed Practice Position
    const seedBtn = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('Seed Sample Practice Position')
      );
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    assert(seedBtn, '3a. Verified "Seed Sample Practice Position" action clicked');
    await new Promise((r) => setTimeout(r, 400));

    // Test 4: Position Created in Table
    const tableRowsCount = await page.$$eval('tbody tr', (els) => els.length);
    assert(tableRowsCount >= 1, `4. Verified position rendered in table (${tableRowsCount} open position)`);

    // Test 5: Desktop Screenshot with Active Position
    const desktopScreenshotPath = path.join(SCREENSHOT_DIR, '01_1440x900_portfolio_desktop.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${desktopScreenshotPath}`);

    // Test 6: Cash Out Interaction
    const cashOutBtn = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('tbody button')).find((b) =>
        b.textContent.includes('Cash Out')
      );
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    assert(cashOutBtn, '6a. Verified "Cash Out" action executed on active position');
    await new Promise((r) => setTimeout(r, 400));

    // After cash out, table rows should be 0 and empty state displayed
    const postCashOutRows = await page.$$eval('tbody tr', (els) => els.length);
    assert(postCashOutRows === 0, '6b. Verified position cashed out and removed from open positions');

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

    const mobileScreenshotPath = path.join(SCREENSHOT_DIR, '02_375x812_portfolio_mobile.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${mobileScreenshotPath}`);

    // Test 9: Console Errors Check
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((err) => console.error(`  - ${err}`));
    }
    assert(consoleErrors.length === 0, '9. Verified ZERO console errors during entire Portfolio journey');

    console.log('\n====================================================');
    console.log('MILESTONE 18 PORTFOLIO VERIFICATION: ALL PASS');
    console.log('====================================================\n');
  } catch (err) {
    console.error('Verification failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
