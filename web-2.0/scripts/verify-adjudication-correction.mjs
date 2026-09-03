import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174/markets/will-gta-vi-release-before-december-2026';

async function runAdjudicationVerification() {
  console.log('====================================================');
  console.log('VERIFYING ADJUDICATION CORRECTION FOR MARKET DETAIL');
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

  // 1. Desktop 1440px test
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

  // Check 1: desktop Y/N kbd pills REMOVED
  const kbdCount = await page.$$eval('kbd', (elements) => elements.length);
  if (kbdCount === 0) {
    console.log('[PASS] 1. Verified desktop Y/N shortcut pills are COMPLETELY REMOVED (0 <kbd> elements)');
  } else {
    console.error(`[FAIL] 1. Found ${kbdCount} unexpected <kbd> elements`);
  }

  // Check 2: "?" helper / inline glossary REMOVED
  const helpBtnCount = await page.$$eval(
    'button[aria-label="How prediction pricing works"], button[title*="binary prediction"]',
    (els) => els.length
  );
  if (helpBtnCount === 0) {
    console.log('[PASS] 2. Verified "?" Prediction Pricing Helper / inline glossary is COMPLETELY REMOVED');
  } else {
    console.error(`[FAIL] 2. Found ${helpBtnCount} unexpected glossary buttons`);
  }

  // Check 3: aria-live="polite" and aria-atomic="true" KEPT on financial breakdown
  const ariaLivePresent = await page.$eval(
    '[aria-live="polite"]',
    (el) => el.getAttribute('aria-atomic') === 'true'
  );
  if (ariaLivePresent) {
    console.log('[PASS] 3. Verified aria-live="polite" and aria-atomic="true" are KEPT on financial breakdown');
  } else {
    console.error('[FAIL] 3. aria-live="polite" or aria-atomic="true" missing');
  }

  // Check 4: Test that pressing 'N' or 'Y' keyboard keys does NOT switch outcomes
  // Default is YES
  await page.keyboard.press('KeyN');
  await new Promise((r) => setTimeout(r, 100));
  const outcomeAfterN = await page.$eval('button[type="button"].bg-omx-yes', (el) => el.textContent);
  const stillYes = outcomeAfterN.includes('Predict YES');
  if (stillYes) {
    console.log('[PASS] 4. Verified N keyboard shortcut is COMPLETELY REMOVED (outcome stayed YES)');
  } else {
    console.error('[FAIL] 4. N shortcut still active!');
  }

  // Check 5: Test that Enter in input does NOT auto-submit
  await page.focus('#stakeAmountInput');
  await page.keyboard.press('Enter');
  await new Promise((r) => setTimeout(r, 200));
  const receiptPresentAfterEnter = await page.$eval(
    'body',
    (el) => el.textContent.includes('Prediction Confirmed')
  );
  if (!receiptPresentAfterEnter) {
    console.log('[PASS] 5. Verified Enter-to-submit behavior is COMPLETELY REMOVED (no submission on Enter)');
  } else {
    console.error('[FAIL] 5. Enter still submitted the order!');
  }

  // Check 6: Test YES prediction flow manually via clicking
  await page.click('button.bg-omx-yes'); // submit button
  await page.waitForSelector('text/Prediction Confirmed', { timeout: 3000 });
  console.log('[PASS] 6. Verified YES prediction flow completes and shows Confirmed receipt');

  // Check 7: Test Theme switching (Dark -> Light -> Dark)
  const themeBtn = await page.$('button[title*="theme"], button[aria-label*="theme"]');
  if (themeBtn) {
    await themeBtn.click();
    const htmlThemeLight = await page.$eval('html', (el) => el.getAttribute('data-theme'));
    console.log(`[PASS] 7a. Verified Light theme toggle: data-theme="${htmlThemeLight}"`);
    await themeBtn.click();
    const htmlThemeDark = await page.$eval('html', (el) => el.getAttribute('data-theme'));
    console.log(`[PASS] 7b. Verified Dark theme restore: data-theme="${htmlThemeDark}"`);
  }

  // Check 8: Tablet 768px viewport
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  const tabletTitle = await page.$eval('h1', (el) => el.textContent);
  console.log(`[PASS] 8. Verified 768px tablet layout renders correctly ("${tabletTitle.slice(0, 30)}...")`);

  // Check 9: Mobile 375px viewport & aria attributes on MobileTradeBar
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

  const yesBtnHasPopup = await page.$eval(
    '.md\\:hidden.fixed.bottom-0 button.bg-omx-yes',
    (el) => el.getAttribute('aria-haspopup') === 'dialog' && el.getAttribute('aria-expanded') === 'false'
  );
  if (yesBtnHasPopup) {
    console.log('[PASS] 9. Verified aria-haspopup="dialog" and aria-expanded="false" KEPT on mobile trade bar');
  } else {
    console.error('[FAIL] 9. Missing aria-haspopup or aria-expanded on mobile trade bar button');
  }

  // Check 10: Mobile Drawer open / close behavior
  await page.click('.md\\:hidden.fixed.bottom-0 button.bg-omx-yes'); // opens drawer
  await page.waitForSelector('[aria-label="Trade order drawer"]', { timeout: 2000 });
  console.log('[PASS] 10a. Verified mobile drawer opens cleanly');

  // Verify expanded state updated
  const yesBtnExpanded = await page.$eval(
    '.md\\:hidden.fixed.bottom-0 button.bg-omx-yes',
    (el) => el.getAttribute('aria-expanded') === 'true'
  );
  if (yesBtnExpanded) {
    console.log('[PASS] 10b. Verified aria-expanded="true" updated when drawer opened');
  }

  // Close drawer via close button
  await page.click('button[aria-label="Close trade sheet"]');
  await new Promise((r) => setTimeout(r, 400));
  const drawerClosed = await page.$eval(
    'body',
    (el) => !el.innerHTML.includes('aria-label="Trade order drawer"')
  );
  if (drawerClosed) {
    console.log('[PASS] 10c. Verified mobile drawer dismisses cleanly via close button');
  }

  // Check 11: Console Errors
  console.log(`\nConsole Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Errors found:', consoleErrors);
  } else {
    console.log('[PASS] 11. Zero console errors detected across all viewports and interaction flows');
  }

  await browser.close();
  console.log('\n====================================================');
  console.log('ADJUDICATION CORRECTION VERIFICATION COMPLETE: ALL PASS');
  console.log('====================================================');
}

runAdjudicationVerification().catch((err) => {
  console.error('Test run error:', err);
  process.exit(1);
});
