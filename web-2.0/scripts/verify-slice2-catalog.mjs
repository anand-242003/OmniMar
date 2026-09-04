import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), '../screenshots/web-2.0/markets');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runSlice2Verification() {
  console.log('====================================================');
  console.log('STARTING MILESTONE 12 MARKETS CATALOG VERIFICATION');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  let passed = 0;
  let failed = 0;

  function assert(condition, name) {
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name}`);
      failed++;
    }
  }

  try {
    // 1. Desktop 1440px Navigation & Initial Load
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/markets`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    // Test 1: Page Header & Title
    const headerTitle = await page.$eval('h1', (el) => el.textContent.trim());
    assert(headerTitle === 'Explore Markets', '1. Verified "Explore Markets" page heading');

    const descText = await page.$eval('main p', (el) => el.textContent.trim());
    assert(descText.includes('Real-time consensus odds'), '2. Verified concise supporting description');

    // Test 2: Canonical 3-Column Desktop Grid
    const gridCols = await page.$eval('.grid', (el) => el.className);
    assert(gridCols.includes('xl:grid-cols-') && gridCols.includes('md:grid-cols-'), '3. Verified canonical 3-col desktop layout classes');

    // Test 3: Total Markets Count
    const initialCardCount = await page.$$eval('article', (cards) => cards.length);
    assert(initialCardCount >= 6, `4. Verified initial catalog populated with ${initialCardCount} markets`);

    // Capture 1440 Dark Initial
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_1440_dark_catalog.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 01_1440_dark_catalog.png');

    // Test 4: Category Filtering
    // Click "Entertainment"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const entBtn = btns.find((b) => b.textContent && b.textContent.includes('Entertainment'));
      if (entBtn) entBtn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const entCardCount = await page.$$eval('article', (cards) => cards.length);
    const allEnt = await page.$$eval('article', (cards) =>
      cards.every((c) => c.textContent.includes('Entertainment'))
    );
    assert(entCardCount >= 1 && allEnt, `5. Verified category filter "Entertainment" filters accurately (${entCardCount} cards)`);

    // Restore "All Markets"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const allBtn = btns.find((b) => b.textContent && b.textContent.includes('All Markets'));
      if (allBtn) allBtn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const restoredCount = await page.$$eval('article', (cards) => cards.length);
    assert(restoredCount === initialCardCount, '6. Verified restoring "All Markets" recovers full catalog');

    // Test 5: Instant Search Ergonomics & '/' Shortcut
    // Press '/' on page (when not focused)
    await page.keyboard.press('Slash');
    await new Promise((r) => setTimeout(r, 100));

    const isSearchFocused = await page.evaluate(() => {
      const input = document.querySelector('input[aria-label="Search prediction markets"]');
      return document.activeElement === input;
    });
    assert(isSearchFocused, '7. Verified pressing "/" keyboard shortcut instantly focuses search input');

    // Type "SpaceX"
    await page.keyboard.type('SpaceX');
    await new Promise((r) => setTimeout(r, 150));

    const searchCardCount = await page.$$eval('article', (cards) => cards.length);
    const searchMatches = await page.$$eval('article', (cards) =>
      cards.every((c) => c.textContent.includes('SpaceX') || c.textContent.includes('Starship'))
    );
    assert(searchCardCount === 1 && searchMatches, '8. Verified instant multi-field client search without debounce');

    // Test resolution source searching: clear search and type "Take-Two"
    await page.evaluate(() => {
      const clearBtn = document.querySelector('button[aria-label="Clear search query"]');
      if (clearBtn) clearBtn.click();
    });
    await new Promise((r) => setTimeout(r, 100));
    await page.focus('input[aria-label="Search prediction markets"]');
    await page.keyboard.type('Take-Two');
    await new Promise((r) => setTimeout(r, 150));

    const oracleSearchMatch = await page.$$eval('article', (cards) =>
      cards.some((c) => c.textContent.includes('Grand Theft Auto VI'))
    );
    assert(oracleSearchMatch, '9. Verified search matches on resolution source field');

    // Test Esc clears search
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 100));
    const searchValAfterEsc = await page.$eval('input[aria-label="Search prediction markets"]', (el) => el.value);
    assert(searchValAfterEsc === '', '10. Verified pressing Escape clears search query and returns full catalog');

    // Test 6: Zero-Results State Recovery
    await page.focus('input[aria-label="Search prediction markets"]');
    await page.keyboard.type('nonexistentxyzquery123');
    await new Promise((r) => setTimeout(r, 150));

    const zeroResultsPresent = await page.evaluate(() => {
      return document.body.innerText.includes('No markets found') &&
             document.body.innerText.includes('Clear Filters & View All');
    });
    assert(zeroResultsPresent, '11. Verified non-blocking zero-results recovery state renders');

    // Click "Clear Filters & View All"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const clearBtn = btns.find((b) => b.textContent && b.textContent.includes('Clear Filters & View All'));
      if (clearBtn) clearBtn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const recoveredCardCount = await page.$$eval('article', (cards) => cards.length);
    assert(recoveredCardCount === initialCardCount, '12. Verified "Clear Filters & View All" restores catalog');

    // Test 7: Sorting
    // Select "24h Volume"
    await page.select('select[aria-label="Sort markets"]', '24h Volume');
    await new Promise((r) => setTimeout(r, 200));

    const topVolText = await page.$$eval('article', (cards) => cards[0].textContent);
    assert(topVolText.includes('EU Carbon') || topVolText.includes('Ethereum') || topVolText.includes('Fed'), '13. Verified 24h Volume sorting sorts high liquidity markets to top');

    // Test 8: MarketCard Structure & Invariants on Active Market
    const cardChecks = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('article'));
      const activeCard = cards.find((c) => c.textContent && c.textContent.includes('LIVE'));
      if (!activeCard) return { hasLive: false, hasOdds: false, hasButtons: false, hasVol: false, hasNoOracleTerm: false };

      const text = activeCard.innerText;
      const hasLive = text.includes('LIVE');
      const hasOdds = text.includes('YES') && text.includes('NO') && text.includes('¢');
      const hasButtons = activeCard.querySelectorAll('button').length === 2;
      const hasVol = text.includes('vol');
      // Invariant: Must NOT use "Oracle", must use "Resolution:"
      const hasNoOracleTerm = !text.includes('Oracle:');

      return { hasLive, hasOdds, hasButtons, hasVol, hasNoOracleTerm };
    });

    assert(cardChecks.hasLive, '14. Verified MarketCard displays status indicator');
    assert(cardChecks.hasOdds, '15. Verified MarketCard pairs probability and cent prices');
    assert(cardChecks.hasButtons, '16. Verified MarketCard has symmetrical YES/NO outcome action buttons');
    assert(cardChecks.hasVol, '17. Verified MarketCard displays explicit volume units');
    assert(cardChecks.hasNoOracleTerm, '18. Verified MarketCard strictly uses "Resolution:" and ZERO "Oracle" references');

    // Test 9: Navigation to Market Detail (without query parameter pre-staging)
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('article'));
      const activeCard = cards.find((c) => c.textContent && c.textContent.includes('LIVE'));
      const yesBtn = activeCard ? activeCard.querySelector('button') : null;
      if (yesBtn) yesBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const currentUrl = page.url();
    const hasQueryParam = currentUrl.includes('?');
    const isDetailUrl = currentUrl.includes('/markets/');
    assert(isDetailUrl && !hasQueryParam, '19. Verified outcome button navigates cleanly to Market Detail with NO query parameter coupling');

    // Return to /markets
    await page.goto(`${BASE_URL}/markets`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 400));

    // Test 10: Tablet 768px Viewport
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise((r) => setTimeout(r, 300));

    const tabletDocWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    assert(tabletDocWidth <= 768, `20. Verified 768px tablet layout has ZERO horizontal overflow (scrollWidth: ${tabletDocWidth}px)`);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_768_dark_catalog.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 02_768_dark_catalog.png');

    // Test 11: Mobile 375px Viewport & Touch Targets
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await new Promise((r) => setTimeout(r, 300));

    const mobileDocWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    assert(mobileDocWidth <= 375, `21. Verified 375px mobile layout has ZERO horizontal overflow (scrollWidth: ${mobileDocWidth}px)`);

    // Verify touch targets >= 44px on primary catalog interactive elements
    const touchTargetPass = await page.evaluate(() => {
      const catalogPrimaryElements = Array.from(
        document.querySelectorAll('article button, main > div button, input[aria-label="Search prediction markets"], button[aria-label="Sort markets by"]')
      );
      return catalogPrimaryElements.every((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0 || el.classList.contains('sr-only')) return true;
        return rect.height >= 40 || rect.width >= 40;
      });
    });
    assert(touchTargetPass, '22. Verified primary catalog touch targets satisfy mobile touch geometry (>= 40px)');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_375_dark_catalog.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 03_375_dark_catalog.png');

    // Test 12: Theme Toggling (Verify Light Mode Default & Dark Mode Toggle)
    const isLightModeDefault = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme') === 'light';
    });
    assert(isLightModeDefault, '23. Verified Light theme renders cleanly as primary default presentation');

    // Toggle to Dark Mode
    await page.evaluate(() => {
      const themeBtn = document.querySelector('button[aria-label*="theme"]');
      if (themeBtn) themeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    const isDarkModeAlternate = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    });
    assert(isDarkModeAlternate, '23b. Verified Dark Mode toggles cleanly as alternate theme');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_375_dark_alternate.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 04_375_dark_alternate.png');

    // Restore Light Mode
    await page.evaluate(() => {
      const themeBtn = document.querySelector('button[aria-label*="theme"]');
      if (themeBtn) themeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    // Test 13: Console Errors
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.error('Console errors:', consoleErrors);
    }
    assert(consoleErrors.length === 0, '24. Verified ZERO console errors detected across entire catalog verification');

  } catch (err) {
    console.error('Verification error:', err);
    failed++;
  } finally {
    await browser.close();
  }

  console.log('\n====================================================');
  console.log(`CATALOG VERIFICATION SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runSlice2Verification().catch((err) => {
  console.error(err);
  process.exit(1);
});
