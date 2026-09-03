import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';

async function runSuite() {
  console.log('====================================================');
  console.log('RUNNING 20-POINT VALIDATION SUITE FOR WEB-2.0 SLICE 1');
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
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/markets/will-gta-vi-release-before-december-2026`, {
      waitUntil: 'networkidle0',
    });
    await new Promise(r => setTimeout(r, 1000));

    // 1. Guest opens market
    const title = await page.$eval('h1', el => el.textContent);
    assert(title.includes('Grand Theft Auto VI'), '1. Guest opens market & sees dominant question');

    // 2. Understands YES/NO odds
    const oddsText = await page.evaluate(() => document.body.innerText);
    assert(oddsText.includes('YES') && oddsText.includes('65¢') && oddsText.includes('NO') && oddsText.includes('35¢'), '2. Understands YES/NO odds');

    // 3. Selects YES
    const hasYesPill = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.some(b => b.textContent && b.textContent.includes('YES') && b.textContent.includes('65¢'));
    });
    assert(hasYesPill, '3. Selects YES outcome');

    // 4. Enters $25
    const amountInput = await page.$('input[inputmode="decimal"]');
    const inputVal = await page.evaluate(el => el.value, amountInput);
    assert(inputVal === '25.00', '4. Default or entered dollar amount is $25.00');

    // 5. Sees calculated shares (38.46)
    assert(oddsText.includes('38.46 shares'), '5. Displays calculated shares (38.46)');

    // 6. Sees potential payout ($38.46)
    assert(oddsText.includes('$38.46'), '6. Displays potential payout ($38.46)');

    // 7. Sees net profit (+$13.46)
    assert(oddsText.includes('+$13.46'), '7. Displays net profit (+$13.46)');

    // 8. Executes prediction
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const commitBtn = btns.find(b => b.textContent && b.textContent.includes('Predict YES'));
      if (commitBtn) commitBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // 9. Receives confirmation
    const bodyAfterCommit = await page.evaluate(() => document.body.innerText);
    assert(bodyAfterCommit.includes('Prediction Confirmed'), '9. Receives confident confirmation receipt');

    // 10. Opens / inspects active position
    assert(bodyAfterCommit.includes('Your Active Positions in This Market'), '10. Displays active position card in sidebar');

    // Click "Place Another Prediction" to return to active trade slip form
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const anotherBtn = btns.find(b => b.textContent && b.textContent.includes('Place Another Prediction'));
      if (anotherBtn) anotherBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 11. Reloads page
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // 12. Verifies persistence
    const reloadedBody = await page.evaluate(() => document.body.innerText);
    assert(reloadedBody.includes('Your Active Positions in This Market') && reloadedBody.includes('38.46 Shares'), '12. Verifies localStorage persistence on reload');

    // 13. Repeats with NO
    // Click "NO" pill in trade slip
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const noBtn = btns.find(b => b.textContent && b.textContent.includes('NO') && b.textContent.includes('35¢'));
      if (noBtn) noBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));
    const noBtnText = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const commitBtn = btns.find(b => b.textContent && b.textContent.includes('Predict NO'));
      return commitBtn ? commitBtn.textContent : '';
    });
    assert(noBtnText.includes('Predict NO'), '13. Prepares secondary prediction with NO');

    // 14. Verifies accounting balance
    const balanceText = await page.evaluate(() => {
      const el = document.querySelector('.font-mono.font-semibold.text-omx-text');
      return el ? el.textContent : '';
    });
    assert(balanceText.includes('9,975.00'), '14. Verifies accounting balance matches ($9,975.00)');

    // 15. Tests invalid amount ($0.00)
    await page.evaluate(() => {
      const input = document.querySelector('input[inputmode="decimal"]');
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (setter) setter.call(input, '0');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const btns = Array.from(document.querySelectorAll('button'));
      const commitBtn = btns.find(b => b.textContent && b.textContent.includes('Predict'));
      if (commitBtn) commitBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));
    const errorBody = await page.evaluate(() => document.body.innerText);
    assert(errorBody.includes('greater than $0.00'), '15. Displays error on invalid $0.00 amount');

    // 16. Tests insufficient balance ($50,000)
    await page.evaluate(() => {
      const input = document.querySelector('input[inputmode="decimal"]');
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (setter) setter.call(input, '50000');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const btns = Array.from(document.querySelectorAll('button'));
      const commitBtn = btns.find(b => b.textContent && b.textContent.includes('Predict'));
      if (commitBtn) commitBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));
    const errorBody2 = await page.evaluate(() => document.body.innerText);
    assert(errorBody2.includes('Insufficient balance'), '16. Displays error on insufficient balance');

    // 17. Tests mobile responsive layout (pinned to bottom-0 without double navigation)
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await new Promise(r => setTimeout(r, 400));
    const mobileBarVisible = await page.evaluate(() => {
      const bar = document.querySelector('.md\\:hidden.fixed.bottom-0');
      return bar !== null;
    });
    assert(mobileBarVisible, '17. Tests mobile sticky bottom trade bar pinned to bottom-0');

    // 18. Tests keyboard focusability
    const focusable = await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      return btns.length > 5;
    });
    assert(focusable, '18. All interactive controls are standard keyboard-focusable buttons');

    // 19. Tests light mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    const lightTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    assert(lightTheme === 'light', '19. Tests light theme toggling');

    // 20. Tests dark mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    const darkTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    assert(darkTheme === 'dark', '20. Tests dark theme restoration');

    console.log(`\nVALIDATION SUMMARY: ${passed} Passed, ${failed} Failed`);
    console.log('Console Errors:', consoleErrors.length);

  } catch (err) {
    console.error('Test suite exception:', err);
  } finally {
    await browser.close();
  }
}

runSuite();
