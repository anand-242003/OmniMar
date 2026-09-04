import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots/web-2.0/home');

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
  console.log('VERIFYING MILESTONE 13 HOME PAGE & HERO');
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
    // 1. Open Root URL (1440x900)
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Test 1: Page Headline
    const headline = await page.$eval('h1', (el) => el.textContent.trim());
    assert(
      headline.includes('Trade on real-world outcomes'),
      `1. Verified dominant headline: "${headline}"`
    );

    // Test 1b: Primary and Secondary CTAs
    const hasPrimaryCTA = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('section[aria-label="Hero Introduction"] button')).find(b => b.textContent.includes('Explore Markets'));
      return Boolean(btn);
    });
    assert(hasPrimaryCTA, '1b. Verified dominant "Explore Markets" primary CTA');

    const hasSecondaryCTA = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('section[aria-label="Hero Introduction"] button')).find(b => b.textContent.includes('Try $10,000 Sandbox'));
      return Boolean(btn);
    });
    assert(hasSecondaryCTA, '1c. Verified "Try $10,000 Sandbox" secondary CTA');

    // Test 1c: 3D WebGL Canvas and Floating Market Callouts
    const hasCanvas = await page.evaluate(() => {
      const canvas = document.querySelector('section[aria-label="Hero Introduction"] canvas');
      return Boolean(canvas);
    });
    assert(hasCanvas, '1d. Verified 3D WebGL Prediction Globe canvas rendered successfully');

    const heroCardsCount = await page.$$eval('section[aria-label="Hero Introduction"] .absolute.rounded-2xl', (els) => els.length);
    assert(heroCardsCount >= 3, `1e. Verified floating market callout cards rendered (${heroCardsCount} callouts)`);

    // Screenshot 1440x900 Desktop Light
    const desktopScreenshotPath = path.join(SCREENSHOT_DIR, '01_1440x900_home_desktop.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${desktopScreenshotPath}`);

    // Test 2: 3-Step Educational Explainer
    const stepsCount = await page.$$eval('section[aria-labelledby="how-it-works-heading"] .grid > div', (els) => els.length);
    assert(stepsCount === 3, `2. Verified 3-step educational explainer present (${stepsCount} steps)`);

    // Test 3: Featured Market of the Day
    const featuredTitle = await page.$eval('#featured-market h3', (el) => el.textContent.trim());
    assert(
      featuredTitle.includes('Grand Theft Auto VI'),
      `3. Verified Featured Market renders dominant proposition: "${featuredTitle}"`
    );

    // Test 4: Featured Market Resolution Source
    const hasResolution = await page.evaluate(() => {
      return document.body.textContent.includes('Resolution source:') && !document.body.textContent.includes('Oracle:');
    });
    assert(hasResolution, '4. Verified resolution source is explicitly stated with ZERO "Oracle" references');

    // Test 5: High-Conviction Markets Grid
    const cardsCount = await page.$$eval('section[aria-labelledby="top-markets-heading"] .grid article', (els) => els.length);
    assert(cardsCount === 3, `5. Verified High-Conviction Markets grid populated (${cardsCount} cards)`);

    // Test 6: Navigation from CTA to /markets
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('Explore Markets')
      );
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 400));
    const isAtMarkets = await page.evaluate(() => window.location.pathname.startsWith('/markets'));
    assert(isAtMarkets, '7. Verified "Explore Markets" navigates cleanly to /markets');

    // Test 8: Logo navigates back to Home
    await page.click('button[aria-label="OmniMarketX Home"]');
    await new Promise((r) => setTimeout(r, 400));
    const isBackAtHome = await page.evaluate(() => window.location.pathname === '/' || window.location.pathname === '/home');
    assert(isBackAtHome, '8. Verified brand logo navigates back to Home (/)');

    // Test 9: Outcome CTA navigates to Market Detail
    const hasDetailLink = await page.evaluate(() => {
      const yesBtn = Array.from(document.querySelectorAll('#featured-market button')).find((b) =>
        b.textContent.includes('Back YES')
      );
      if (yesBtn) {
        yesBtn.click();
        return true;
      }
      return false;
    });
    assert(hasDetailLink, '9a. Verified "Back YES" button clicked on featured market');
    await new Promise((r) => setTimeout(r, 400));
    const isAtDetail = await page.evaluate(() => window.location.pathname.includes('will-gta-vi-release'));
    assert(isAtDetail, '9b. Verified clicking "Back YES" navigates cleanly to Market Detail');

    // Return to Home for Viewport Checks
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Test 10a: 1024x768 Small Desktop Viewport
    await page.setViewport({ width: 1024, height: 768 });
    await new Promise((r) => setTimeout(r, 300));
    const smallDesktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert(!smallDesktopOverflow, '10a. Verified 1024px small desktop layout has ZERO horizontal overflow');
    const smallDesktopScreenshotPath = path.join(SCREENSHOT_DIR, '04_1024x768_home_small_desktop.png');
    await page.screenshot({ path: smallDesktopScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${smallDesktopScreenshotPath}`);

    // Test 10b: 768px Tablet Viewport
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise((r) => setTimeout(r, 300));
    const tabletOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert(!tabletOverflow, '10b. Verified 768px tablet layout has ZERO horizontal overflow');

    const tabletScreenshotPath = path.join(SCREENSHOT_DIR, '03_768x1024_home_tablet.png');
    await page.screenshot({ path: tabletScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${tabletScreenshotPath}`);

    // Test 11: 375px Mobile Viewport
    await page.setViewport({ width: 375, height: 812 });
    await new Promise((r) => setTimeout(r, 300));
    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert(!mobileOverflow, '11. Verified 375px mobile layout has ZERO horizontal overflow');

    const mobileScreenshotPath = path.join(SCREENSHOT_DIR, '02_375x812_home_mobile.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${mobileScreenshotPath}`);

    // Test 12: Console Errors Check
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((err) => console.error(`  - ${err}`));
    }
    assert(consoleErrors.length === 0, '12. Verified ZERO console errors during entire Home journey');

    console.log('\n====================================================');
    console.log('MILESTONE 13 HOME VERIFICATION: ALL PASS');
    console.log('====================================================\n');
  } catch (err) {
    console.error('Verification failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
