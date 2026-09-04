import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots/web-2.0/social');

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
  console.log('VERIFYING MILESTONE 15 SOCIAL PAGE');
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
    // 1. Open /social
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/social`, { waitUntil: 'networkidle0' });

    // Test 1: Page Headline
    const headline = await page.$eval('h1', (el) => el.textContent.trim());
    assert(
      headline.includes('Community & Pulse'),
      `1. Verified dominant headline: "${headline}"`
    );

    // Test 2: Initial Posts Populated
    const initialPostsCount = await page.$$eval('article', (els) => els.length);
    assert(initialPostsCount === 4, `2. Verified initial feed populated with 4 posts (${initialPostsCount} posts)`);

    // Test 3: Desktop Screenshot
    const desktopScreenshotPath = path.join(SCREENSHOT_DIR, '01_1440x900_social_desktop.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${desktopScreenshotPath}`);

    // Test 4: Compose and Submit New Thesis
    await page.type('textarea', 'My empirical analysis suggests strong likelihood for early commercial launch.');
    await page.select('select[aria-label="Attach a prediction market"]', 'will-gta-vi-release-before-december-2026');
    await page.click('form button[type="submit"]');
    await new Promise((r) => setTimeout(r, 400));

    const updatedPostsCount = await page.$$eval('article', (els) => els.length);
    assert(
      updatedPostsCount === 5,
      `4. Verified publishing new thesis prepends to feed (count: ${updatedPostsCount})`
    );

    // Test 5: Toggle Like Interaction
    const likeBtn = await page.$('article:first-of-type button[aria-label="Like post"]');
    assert(likeBtn !== null, '5a. Verified like button found with aria-label');
    await likeBtn.click();
    await new Promise((r) => setTimeout(r, 200));

    const likeCount = await page.$eval('article:first-of-type button[aria-label="Unlike post"]', (el) => el.textContent.trim());
    assert(likeCount.includes('1'), `5b. Verified like interaction toggles count (current: "${likeCount}")`);

    // Test 6: Attached Market Navigation to Detail
    const hasInvestigate = await page.evaluate(() => {
      const marketBtn = Array.from(document.querySelectorAll('article:first-of-type button')).find((b) =>
        b.textContent.includes('Investigate Market')
      );
      if (marketBtn) {
        marketBtn.click();
        return true;
      }
      return false;
    });
    assert(hasInvestigate, '6a. Verified attached market embed exists with investigate action');
    await new Promise((r) => setTimeout(r, 400));
    const isAtDetail = await page.evaluate(() => window.location.pathname.includes('will-gta-vi-release'));
    assert(isAtDetail, '6b. Verified clicking "Investigate Market" navigates to Market Detail');

    // Return to /social for Viewport Checks
    await page.goto(`${BASE_URL}/social`, { waitUntil: 'networkidle0' });

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

    const mobileScreenshotPath = path.join(SCREENSHOT_DIR, '02_375x812_social_mobile.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${mobileScreenshotPath}`);

    // Test 9: Console Errors Check
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((err) => console.error(`  - ${err}`));
    }
    assert(consoleErrors.length === 0, '9. Verified ZERO console errors during entire Social journey');

    console.log('\n====================================================');
    console.log('MILESTONE 15 SOCIAL VERIFICATION: ALL PASS');
    console.log('====================================================\n');
  } catch (err) {
    console.error('Verification failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
