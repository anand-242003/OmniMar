import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const SCREENSHOT_DIR = '/Users/anandmishra1/omnimarketx/screenshots/web-2.0/refined';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runRefinementVerification() {
  console.log('====================================================');
  console.log('STARTING MILESTONE 11.1 SURGICAL REFINEMENT AUDIT');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Desktop 1440 Dark Initial
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/markets/will-gta-vi-release-before-december-2026`, {
      waitUntil: 'networkidle0',
    });
    await new Promise(r => setTimeout(r, 600));

    // Refinement 01: Verify WEB-2.0 internal badge is REMOVED
    const navText = await page.$eval('header', el => el.innerText);
    assert(!navText.includes('WEB-2.0'), '1. Verified internal WEB-2.0 badge is completely REMOVED from navbar');

    // Refinement 02: Verify Compact Odds Display in Header
    const oddsButtonExists = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.some(b => b.textContent && b.textContent.includes('▲ YES') && b.textContent.includes('65¢'));
    });
    assert(oddsButtonExists, '2. Verified compact odds display in header with implied probability');

    // Refinement 03: Verify static status indicator (no animate-pulse)
    const hasPulsingDot = await page.evaluate(() => {
      return document.querySelector('.animate-pulse') !== null;
    });
    assert(!hasPulsingDot, '3. Verified active prediction dot is static (NO animate-pulse radar animation)');

    // Refinement 04: Verify cold-start Buy/Sell toggle is REMOVED
    const tradeSlipText = await page.evaluate(() => {
      const slip = document.querySelector('aside');
      return slip ? slip.innerText : '';
    });
    assert(!tradeSlipText.includes('Buy') && !tradeSlipText.includes('Sell'), '4. Verified cold-start Buy/Sell toggle is REMOVED from order slip');

    // Refinement 05: Verify explicit outcome hierarchy in trade slip
    assert(tradeSlipText.includes('Choose Your Prediction') && tradeSlipText.includes('~65% implied probability'), '5. Verified explicit probability vs price hierarchy in slip');

    // Refinement 06: Complete risk communication (downside row)
    assert(tradeSlipText.includes('If YES does not resolve true') && tradeSlipText.includes('$0.00 payout (-$25.00 loss)'), '6. Verified explicit downside risk communication in breakdown');

    // Refinement 07 & 08: Resolution source language and NO truncation on desktop
    const resolutionSourceText = await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('span')).find(s => s.textContent && s.textContent.includes('Resolution source:'));
      return el ? el.parentElement.innerText : '';
    });
    assert(resolutionSourceText.includes('Resolution source:') && resolutionSourceText.includes('Take-Two') && !resolutionSourceText.includes('...'), '7 & 8. Verified consumer "Resolution source" and NO truncation on desktop');

    // Refinement 09: Technical jargon removed
    assert(!tradeSlipText.includes('No execution slippage') && tradeSlipText.includes('Price locked at 65¢'), '9. Verified technical jargon replaced with clean consumer language');

    // Refinement 14: Category icon (Film icon, NO emoji)
    const categoryText = await page.evaluate(() => {
      const badge = document.querySelector('span:has(svg)');
      return badge ? badge.innerText : '';
    });
    assert(!categoryText.includes('🎬'), '14. Verified consumer emoji removed from category label');

    // Capture 1440 Dark Screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_1440_dark_initial.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 01_1440_dark_initial.png');

    // Capture 1440 Light Screenshot
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_1440_light_initial.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 02_1440_light_initial.png');

    // Restore Dark theme
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 300));

    // Staging outcome from header odds display
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const noHeaderBtn = btns.find(b => b.textContent && b.textContent.includes('▼ NO') && b.textContent.includes('35¢'));
      if (noHeaderBtn) noHeaderBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));

    const slipAfterHeaderClick = await page.evaluate(() => {
      const btn = document.querySelector('aside button.bg-omx-no');
      return btn ? btn.innerText : '';
    });
    assert(slipAfterHeaderClick.includes('Predict NO'), '2b. Verified clicking compact odds in header stages order slip');

    // Stage back to YES and submit prediction
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const yesBtn = btns.find(b => b.textContent && b.textContent.includes('▲ YES') && b.textContent.includes('65¢'));
      if (yesBtn) yesBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const commitBtn = btns.find(b => b.textContent && b.textContent.includes('Predict YES'));
      if (commitBtn) commitBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Refinement 10 & 11: Confirmation hierarchy & explicit actions
    const receiptText = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      return aside ? aside.innerText : '';
    });
    assert(receiptText.includes('Prediction Confirmed') && receiptText.includes('View Position') && receiptText.includes('Explore More Markets'), '10 & 11. Verified refined confirmation hierarchy and explicit action paths');

    // Capture 1440 Dark Confirmed
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_1440_dark_confirmed.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 03_1440_dark_confirmed.png');

    // 2. Tablet 768 Dark
    await page.setViewport({ width: 768, height: 1024 });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_768_dark.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 04_768_dark.png');

    // 3. Mobile 375 Dark (Refinement 12: No double bottom chrome!)
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await new Promise(r => setTimeout(r, 400));

    const hasDoubleChrome = await page.evaluate(() => {
      const hasTabBar = document.querySelector('nav[aria-label="Mobile Navigation Bar"]') !== null;
      const hasTradeBar = document.querySelector('.md\\:hidden.fixed.bottom-0') !== null;
      return hasTabBar && hasTradeBar;
    });
    assert(!hasDoubleChrome, '12. Verified NO double bottom navigation on mobile detail page (tab bar hidden, trade bar at bottom-0)');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_375_dark.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 05_375_dark.png');

    // 4. Mobile 375 Light
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_375_light.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 06_375_light.png');

    // Restore Dark theme for drawer
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await new Promise(r => setTimeout(r, 200));

    // Open Mobile Drawer (Refinement 13)
    await page.evaluate(() => {
      const mobileBar = document.querySelector('.md\\:hidden.fixed.bottom-0');
      if (mobileBar) {
        const btns = Array.from(mobileBar.querySelectorAll('button'));
        const yesBtn = btns.find(b => b.textContent && b.textContent.includes('Predict YES'));
        if (yesBtn) yesBtn.click();
      }
    });
    await new Promise(r => setTimeout(r, 500));

    // Capture 375 Drawer Open
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_375_drawer_open.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 07_375_drawer_open.png');

    // Refinement 13: Backdrop tap dismiss
    await page.evaluate(() => {
      const backdrop = document.querySelector('[role="dialog"]');
      if (backdrop) backdrop.click();
    });
    await new Promise(r => setTimeout(r, 300));

    const isDrawerClosed = await page.evaluate(() => {
      return document.querySelector('[role="dialog"]') === null;
    });
    assert(isDrawerClosed, '13. Verified mobile drawer dismisses on backdrop tap');

    // Reopen drawer to capture mobile confirmation
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const predictBtn = btns.find(b => b.textContent && b.textContent.includes('Predict YES'));
      if (predictBtn) predictBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));

    // Place trade inside drawer
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const commitBtn = btns.find(b => b.textContent && b.textContent.includes('Predict YES — $25.00'));
      if (commitBtn) commitBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Capture 375 Confirmation
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_375_confirmation.png'), fullPage: false });
    console.log('[SCREENSHOT] Saved 08_375_confirmation.png');

    console.log(`\n====================================================`);
    console.log(`AUDIT COMPLETE: ${passed} Passed, ${failed} Failed`);
    console.log(`Console Errors: ${consoleErrors.length}`);
    console.log(`====================================================`);

  } catch (err) {
    console.error('Audit runner error:', err);
  } finally {
    await browser.close();
  }
}

runRefinementVerification();
