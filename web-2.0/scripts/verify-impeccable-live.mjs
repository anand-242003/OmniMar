import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';
const ARTIFACTS_DIR = '/Users/anandmishra1/.gemini/antigravity-ide/brain/69ca703b-ca76-416d-ae0b-51e95b9717c4/.tempmediaStorage';

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Capture Markets Page - Light Mode
  await page.goto(`${BASE_URL}/markets`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('omx_theme_v2', 'light');
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'markets_impeccable_light.png'), fullPage: true });
  console.log('[CAPTURED] markets_impeccable_light.png');

  // 2. Capture Markets Page - Dark Mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('omx_theme_v2', 'dark');
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'markets_impeccable_dark.png'), fullPage: true });
  console.log('[CAPTURED] markets_impeccable_dark.png');

  // 3. Capture Portfolio Page - Dark Mode (with seeded position)
  await page.goto(`${BASE_URL}/portfolio`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('omx_theme_v2', 'dark');
  });
  // Click Seed Practice Position if empty
  const seedBtn = await page.$('button ::-p-text(Seed Sample Practice Position)');
  if (seedBtn) {
    await seedBtn.click();
    await new Promise((r) => setTimeout(r, 600));
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'portfolio_impeccable_dark.png'), fullPage: true });
  console.log('[CAPTURED] portfolio_impeccable_dark.png');

  // 4. Capture Portfolio Page - Light Mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('omx_theme_v2', 'light');
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'portfolio_impeccable_light.png'), fullPage: true });
  console.log('[CAPTURED] portfolio_impeccable_light.png');

  // 5. Capture Mobile Viewport Portfolio
  await page.setViewport({ width: 375, height: 812 });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'portfolio_impeccable_mobile.png'), fullPage: true });
  console.log('[CAPTURED] portfolio_impeccable_mobile.png');

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
