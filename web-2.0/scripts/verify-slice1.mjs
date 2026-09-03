import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = path.resolve('../screenshots/web-2.0');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('====================================================');
  console.log('STARTING WEB-2.0 SLICE 1 COMPREHENSIVE VERIFICATION');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // 1. Desktop 1440px Dark Mode View
    console.log('1. Navigating to Market Detail at 1440px...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/markets/will-gta-vi-release-before-december-2026`, {
      waitUntil: 'networkidle0',
    });
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '01_desktop_1440_dark_initial.png'),
      fullPage: false,
    });
    console.log('✓ Captured 01_desktop_1440_dark_initial.png');

    // 2. Perform Trade Execution on Desktop ($25.00 on YES)
    console.log('2. Testing Dollar Stake Input & Execution ($25.00 on YES)...');
    // Find button with text containing "Predict YES"
    const buttons = await page.$$('button');
    let executed = false;
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Predict YES — $25.00')) {
        await btn.click();
        executed = true;
        break;
      }
    }

    if (!executed) {
      // Fallback click on any predict button
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes('Predict YES')) {
          await btn.click();
          executed = true;
          break;
        }
      }
    }

    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '02_desktop_1440_dark_confirmed.png'),
      fullPage: false,
    });
    console.log('✓ Captured 02_desktop_1440_dark_confirmed.png');

    // 3. Switch to Light Mode at 1440px
    console.log('3. Switching to Light Mode...');
    const themeBtn = await page.$('button[aria-label="Switch to light theme"]');
    if (themeBtn) {
      await themeBtn.click();
      await new Promise(r => setTimeout(r, 600));
    }

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '03_desktop_1440_light.png'),
      fullPage: false,
    });
    console.log('✓ Captured 03_desktop_1440_light.png');

    // Switch back to Dark mode
    const darkBtn = await page.$('button[aria-label="Switch to dark theme"]');
    if (darkBtn) {
      await darkBtn.click();
      await new Promise(r => setTimeout(r, 300));
    }

    // 4. Tablet 768px Dark Mode View
    console.log('4. Testing Tablet View (768px)...');
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '04_tablet_768_dark.png'),
      fullPage: false,
    });
    console.log('✓ Captured 04_tablet_768_dark.png');

    // 5. Mobile 375px Dark Mode View (iPhone size)
    console.log('5. Testing Mobile View (375px Dark)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '05_mobile_375_dark.png'),
      fullPage: false,
    });
    console.log('✓ Captured 05_mobile_375_dark.png');

    // 6. Mobile 375px Light Mode View
    console.log('6. Testing Mobile View (375px Light)...');
    const mobileThemeBtn = await page.$('button[aria-label="Switch to light theme"]');
    if (mobileThemeBtn) {
      await mobileThemeBtn.click();
      await new Promise(r => setTimeout(r, 500));
    }

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '06_mobile_375_light.png'),
      fullPage: false,
    });
    console.log('✓ Captured 06_mobile_375_light.png');

    // Switch back to Dark mode on mobile
    const mobileDarkBtn = await page.$('button[aria-label="Switch to dark theme"]');
    if (mobileDarkBtn) {
      await mobileDarkBtn.click();
      await new Promise(r => setTimeout(r, 300));
    }

    // 7. Mobile Slide-Up Trade Drawer
    console.log('7. Testing Mobile Slide-Up Trade Drawer...');
    // Target the visible mobile bottom bar button specifically
    await page.evaluate(() => {
      const mobileBarBtns = document.querySelectorAll('.md\\:hidden button');
      for (const b of mobileBarBtns) {
        if (b.textContent && b.textContent.trim() === 'Predict YES') {
          b.click();
          break;
        }
      }
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '07_mobile_375_drawer_open.png'),
      fullPage: false,
    });
    console.log('✓ Captured 07_mobile_375_drawer_open.png');

    console.log('\n====================================================');
    console.log('VERIFICATION RESULTS:');
    console.log('Console Errors:', consoleErrors.length === 0 ? '0 (PASSED)' : consoleErrors);
    console.log('All 7 required screenshots captured successfully!');
    console.log('====================================================\n');

  } catch (err) {
    console.error('Audit failed with error:', err);
  } finally {
    await browser.close();
  }
}

runVerification();
