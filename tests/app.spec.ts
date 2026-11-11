import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://s3.tradingview.com/**', route => route.abort());
});

test('company links, ticker selection and browser history', async ({ page }) => {
  await page.goto('/');
  await page.locator('.company-card').filter({ hasText: 'Banca Transilvania' }).click();
  await expect(page).toHaveURL(/symbol=TLV/);
  await expect(page.getByRole('heading', { name: 'TLV Banca Transilvania' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Search BVB companies' }).fill('Romgaz');
  await page.getByRole('button', { name: 'SNG Romgaz Main', exact: true }).click();
  await expect(page).toHaveURL(/symbol=SNG/);
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'TLV Banca Transilvania' })).toBeVisible();
});

test('search, direct lookup, filters and widget recovery', async ({ page }) => {
  await page.goto('/terminal?symbol=SNP');
  await expect(page.getByRole('heading', { name: 'SNP OMV Petrom' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Search BVB companies' }).fill('ZZZZ');
  await expect(page.getByText('No matching companies.')).toBeVisible();
  await page.getByRole('button', { name: 'Open ticker' }).click();
  await expect(page).toHaveURL(/symbol=ZZZZ/);
  await expect(page.locator('.live-chart').getByText('TradingView could not be loaded.')).toBeVisible();
  await page.locator('.live-chart').getByRole('button', { name: 'Try again' }).click();
  await expect(page.locator('.live-chart').getByText('TradingView could not be loaded.')).toBeVisible();
  await page.getByRole('textbox', { name: 'Search BVB companies' }).fill('');
  await page.getByRole('button', { name: 'AeRO', exact: true }).click();
  await expect(page.getByRole('button', { name: 'AeRO', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.company-list button i').filter({ hasText: 'Main' })).toHaveCount(0);
});

test('paper orders persist, charts change, and closed positions disappear', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/lab');
  const buy = page.getByRole('button', { name: 'BUY / COVER 1', exact: true });
  await expect(buy).toBeEnabled();
  const path = await page.locator('.chart-line').getAttribute('d');
  await buy.click();
  await expect(page.locator('.trade-box strong')).toHaveText('+1 sH2O');
  await page.reload();
  await expect(page.locator('.trade-box strong')).toHaveText('+1 sH2O');
  await page.getByRole('button', { name: 'SELL / SHORT 1', exact: true }).click();
  await expect(page.getByText('No positions yet.')).toBeVisible();
  await page.locator('.lab-watch').getByRole('button').filter({ hasText: 'sTLV' }).click();
  await expect(page.locator('.chart-line')).not.toHaveAttribute('d', path!);
  await page.getByRole('button', { name: 'RESET', exact: true }).click();
  await page.getByRole('button', { name: 'Keep portfolio' }).click();
  await expect(page.getByRole('group', { name: 'Confirm portfolio reset' })).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('blocked storage leaves the lab usable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new Error('Storage blocked'); };
    Storage.prototype.getItem = () => { throw new Error('Storage blocked'); };
  });
  await page.goto('/lab');
  await expect(page.locator('.storage-warning')).toBeVisible();
  await page.getByRole('button', { name: 'BUY / COVER 1', exact: true }).click();
  await expect(page.locator('.trade-box strong')).toHaveText('+1 sH2O');
});

for (const width of [375, 768, 1440]) {
  test(`responsive pages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/terminal', '/lab']) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      if (route === '/lab') await expect(page.locator('.lab-summary')).toBeVisible();
      if (width !== 768) await page.screenshot({ path: `test-results/${route === '/' ? 'home' : route.slice(1)}-${width}.png`, fullPage: true });
    }
  });
}

test('market API validates input and reports the unavailable feed', async ({ request }) => {
  expect((await request.get('/api/markets/INVALID!')).status()).toBe(400);
  expect((await request.get('/api/markets/H2O')).status()).toBe(503);
});

test('loaded embeds replace the loading state and get accessible titles', async ({ page }) => {
  await page.route('https://s3.tradingview.com/**', route => route.fulfill({
    contentType: 'application/javascript',
    body: `var frame = document.createElement('iframe'); frame.srcdoc = '<p>Widget loaded</p>'; document.currentScript.parentElement.append(frame);`,
  }));
  await page.goto('/terminal?symbol=H2O');
  await expect(page.locator('.live-chart iframe')).toHaveAttribute('title', 'TradingView advanced chart');
  await expect(page.locator('.live-chart .widget-shell')).toHaveAttribute('aria-busy', 'false');
  await expect(page.locator('.live-chart .widget-state')).toHaveCount(0);
});
