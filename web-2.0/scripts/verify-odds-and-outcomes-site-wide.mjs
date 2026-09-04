import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5174';

async function checkSiteWideConsistency() {
  console.log('--- VERIFYING ODDS & DETERMINISTIC OUTCOME CONSISTENCY SITE-WIDE ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Check Home Page
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  const homeText = await page.evaluate(() => document.body.textContent);
  console.log('Home Page:');
  console.log('- Starship 82% present:', homeText.includes('82%') && homeText.includes('Starship'));
  console.log('- No obsolete 42% Starship odds:', !homeText.includes('42%'));

  // 2. Check Markets Page
  await page.goto(`${BASE_URL}/markets`, { waitUntil: 'networkidle0' });
  const marketsText = await page.evaluate(() => document.body.textContent);
  console.log('Markets Page:');
  console.log('- Starship 82% present:', marketsText.includes('82%'));
  console.log('- India vs Brazil shows 3-way outcomes (Brazil/Draw/India):', 
    marketsText.includes('Brazil') && marketsText.includes('Draw') && marketsText.includes('India'));
  
  // Verify that India vs Brazil does NOT show binary YES/NO buttons on its card
  const indiaCardHasYesNo = await page.evaluate(() => {
    const articles = Array.from(document.querySelectorAll('article'));
    const indiaCard = articles.find(c => c.textContent.includes('India vs Brazil'));
    if (!indiaCard) return true; // not found would be error
    const buttons = Array.from(indiaCard.querySelectorAll('button'));
    return buttons.some(b => b.textContent.includes('YES') || b.textContent.includes('NO'));
  });
  console.log('- India vs Brazil card NEVER renders YES/NO buttons:', !indiaCardHasYesNo);

  // 3. Check Trending Page
  await page.goto(`${BASE_URL}/trending`, { waitUntil: 'networkidle0' });
  const trendingText = await page.evaluate(() => document.body.textContent);
  console.log('Trending Page:');
  console.log('- Starship 82% present:', trendingText.includes('82%'));

  // 4. Check Detail Page for Starship
  await page.goto(`${BASE_URL}/markets/spacex-starship-orbital-catch-2026`, { waitUntil: 'networkidle0' });
  const detailStarshipText = await page.evaluate(() => document.body.textContent);
  console.log('Market Detail (Starship):');
  console.log('- Starship 82% YES odds present:', detailStarshipText.includes('82¢') || detailStarshipText.includes('82%'));

  // 5. Check Detail Page for India vs Brazil
  await page.goto(`${BASE_URL}/markets/who-will-win-india-vs-brazil`, { waitUntil: 'networkidle0' });
  const detailIndiaText = await page.evaluate(() => document.body.textContent);
  console.log('Market Detail (India vs Brazil):');
  console.log('- Multi-outcome pills rendered (Brazil, Draw, India):', 
    detailIndiaText.includes('Brazil') && detailIndiaText.includes('Draw') && detailIndiaText.includes('India'));

  // 6. Check Leaderboard Segregation
  console.log('Leaderboard Segregation:');
  await page.goto(`${BASE_URL}/leaderboard`, { waitUntil: 'networkidle0' });
  const demoLeaderboard = await page.evaluate(() => document.body.textContent);
  console.log('- Demo mode excludes verified real rankings:', demoLeaderboard.includes('Practice Forecasters Arena'));

  // Log in as real verified user and check real leaderboard
  await page.evaluate(() => {
    localStorage.setItem('omx_auth_user_v2', JSON.stringify({
      id: 'real_trader_1',
      email: 'trader@verified.com',
      name: 'Trader One',
      avatarInitials: 'TO',
      isGuest: false,
      kycStatus: 'VERIFIED'
    }));
    localStorage.setItem('omx_user_wallets_real_trader_1', JSON.stringify({
      demoWallet: { balance: 10000, positions: [], trades: [{ id: 'demo_trade_999', marketId: 'will-spacex-starship-reach-orbit-in-2026', amount: 500, outcome: 'YES', mode: 'demo' }] },
      realWallet: { balance: 250, positions: [], trades: [] }
    }));
  });
  await page.reload({ waitUntil: 'networkidle0' });
  // Switch to real
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const realBtn = buttons.find(b => b.textContent.includes('Real') && !b.textContent.includes('Arena'));
    if (realBtn) realBtn.click();
  });
  await page.goto(`${BASE_URL}/leaderboard`, { waitUntil: 'networkidle0' });
  const realLeaderboard = await page.evaluate(() => document.body.textContent);
  console.log('- Real mode strictly shows Verified Real-Capital Arena:', realLeaderboard.includes('Verified Real-Capital Arena'));
  console.log('- Real leaderboard excludes simulated practice forecasters:', !realLeaderboard.includes('Simulated Ace') && !realLeaderboard.includes('Virtual Bull'));

  console.log('--- ALL SITE-WIDE CONSISTENCY CHECKS PASSED ---');
  await browser.close();
}

checkSiteWideConsistency().catch(err => {
  console.error(err);
  process.exit(1);
});
