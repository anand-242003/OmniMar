import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots/web-2.0/settings');

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
  console.log('VERIFYING MILESTONE 21 SETTINGS PAGE');
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
    // 1. Open /settings
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/settings`, { waitUntil: 'networkidle0' });

    // Test 1: Page Headline
    const headline = await page.$eval('h1', (el) => el.textContent.trim());
    assert(
      headline.includes('Preferences & Settings'),
      `1. Verified dominant headline: "${headline}"`
    );

    // Test 2: Theme Switching Interaction (Dark Mode)
    await page.evaluate(() => {
      const darkBtn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('Dark Theme')
      );
      if (darkBtn) darkBtn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const isDarkTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') === 'dark');
    assert(isDarkTheme, '2. Verified selecting Dark Theme switches document attribute to dark');

    // Test 3: Theme Switching Interaction (Light Mode)
    await page.evaluate(() => {
      const lightBtn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('Light Theme')
      );
      if (lightBtn) lightBtn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    const isLightTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') === 'light');
    assert(isLightTheme, '3. Verified selecting Light Theme switches document attribute back to light');

    // Test 4: Desktop Screenshot
    const desktopScreenshotPath = path.join(SCREENSHOT_DIR, '01_1440x900_settings_desktop.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${desktopScreenshotPath}`);

    // Test 5: Notification Checkboxes
    const initialChecked = await page.$eval('input[aria-label="Toggle market resolution notifications"]', (el) => el.checked);
    await page.click('input[aria-label="Toggle market resolution notifications"]');
    await new Promise((r) => setTimeout(r, 100));
    const toggledChecked = await page.$eval('input[aria-label="Toggle market resolution notifications"]', (el) => el.checked);
    assert(initialChecked !== toggledChecked, '5. Verified notification toggle responds cleanly');

    // Test 6: Reset Local Cache
    await page.evaluate(() => {
      const resetBtn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent.includes('Reset Local Cache')
      );
      if (resetBtn) resetBtn.click();
    });
    await new Promise((r) => setTimeout(r, 200));

    // Check Toast displayed
    const toastExists = await page.evaluate(() => {
      return document.body.textContent.includes('Local simulation cache and positions have been reset');
    });
    assert(toastExists, '6. Verified Reset Local Cache displays confirmation feedback toast');

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

    const mobileScreenshotPath = path.join(SCREENSHOT_DIR, '02_375x812_settings_mobile.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`[SCREENSHOT] Saved ${mobileScreenshotPath}`);

    // Test 9: Console Errors Check
    console.log(`\nConsole Errors Detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((err) => console.error(`  - ${err}`));
    }
    assert(consoleErrors.length === 0, '9. Verified ZERO console errors during entire Settings journey');

    console.log('\n====================================================');
    console.log('MILESTONE 21 SETTINGS VERIFICATION: ALL PASS');
    console.log('====================================================\n');
  } catch (err) {
    console.error('Verification failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
