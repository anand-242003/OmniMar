import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), '../screenshots/web-2.0/markets-light');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runLightModeVerification() {
  console.log('====================================================');
  console.log('VERIFYING M12 LIGHT MODE PRIMARY PRESENTATION');
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
    // 1. Initial Load in fresh context (simulate first-time visitor with no prior localStorage)
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/markets`, { waitUntil: 'networkidle0' });
    
    // Clear any leftover saved dark theme from prior test runs to test true first-visit default
    await page.evaluate(() => {
      localStorage.removeItem('omx_theme_v2');
    });
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    // Test 1: Verify Light Mode is the Default Presentation
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    assert(initialTheme === 'light', `1. Verified Light Mode is default primary presentation (data-theme: "${initialTheme}")`);

    // Test 2: Verify Canvas and Card Visual Backgrounds in Light Mode
    const visualCheck = await page.evaluate(() => {
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const card = document.querySelector('article');
      const cardBg = card ? window.getComputedStyle(card).backgroundColor : '';
      const textPrimary = card ? window.getComputedStyle(card.querySelector('h3')).color : '';
      return { bodyBg, cardBg, textPrimary };
    });
    console.log(`Visual tokens in Light Mode: Canvas=${visualCheck.bodyBg}, Card=${visualCheck.cardBg}, Text=${visualCheck.textPrimary}`);
    assert(visualCheck.cardBg.includes('255, 255, 255') || visualCheck.cardBg === 'rgb(255, 255, 255)', '2. Verified cards render pure white background in Light Mode');

    // Screenshot 1: 1440x900 Light
    const path1440 = path.join(SCREENSHOT_DIR, '01_1440x900_light_catalog.png');
    await page.screenshot({ path: path1440, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${path1440}`);
    assert(fs.existsSync(path1440), '3. Generated screenshot at 1440x900 light');

    // Screenshot 2: 768x1024 Light (Tablet)
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise((r) => setTimeout(r, 300));
    const path768 = path.join(SCREENSHOT_DIR, '02_768x1024_light_catalog.png');
    await page.screenshot({ path: path768, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${path768}`);
    assert(fs.existsSync(path768), '4. Generated screenshot at 768x1024 light');

    const tabletDocWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    assert(tabletDocWidth <= 768, `5. Verified zero horizontal overflow on 768px tablet in light mode (${tabletDocWidth}px)`);

    // Screenshot 3: 375x812 Light (Mobile)
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await new Promise((r) => setTimeout(r, 300));
    const path375 = path.join(SCREENSHOT_DIR, '03_375x812_light_catalog.png');
    await page.screenshot({ path: path375, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${path375}`);
    assert(fs.existsSync(path375), '6. Generated screenshot at 375x812 light');

    const mobileDocWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    assert(mobileDocWidth <= 375, `7. Verified zero horizontal overflow on 375px mobile in light mode (${mobileDocWidth}px)`);

    // Test 4: Verify Dark Mode Still Technically Works as an Alternate Theme
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluate(() => {
      const themeBtn = document.querySelector('button[aria-label*="theme"]');
      if (themeBtn) themeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    const toggledDarkTheme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    assert(toggledDarkTheme === 'dark', '8. Verified Dark Mode toggles cleanly as alternate theme');

    const pathDark = path.join(SCREENSHOT_DIR, '04_1440x900_dark_alternate_catalog.png');
    await page.screenshot({ path: pathDark, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${pathDark}`);

    // Restore Light Theme
    await page.evaluate(() => {
      const themeBtn = document.querySelector('button[aria-label*="theme"]');
      if (themeBtn) themeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const restoredLightTheme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    assert(restoredLightTheme === 'light', '9. Verified Light Mode restored cleanly');

    // Test 5: Console Errors
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    assert(consoleErrors.length === 0, '10. Verified ZERO console errors during light mode testing');

  } catch (err) {
    console.error('Light mode verification error:', err);
    failed++;
  } finally {
    await browser.close();
  }

  console.log('\n====================================================');
  console.log(`LIGHT MODE VERIFICATION SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runLightModeVerification().catch((err) => {
  console.error(err);
  process.exit(1);
});
