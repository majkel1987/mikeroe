import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    (window as typeof window & { trackedEvents: string[]; plausible: (event: string) => void }).trackedEvents = [];
    window.plausible = (event: string) => {
      (window as typeof window & { trackedEvents: string[] }).trackedEvents.push(event);
    };
  });
});

test('PL and EN are indexable routes with reciprocal language links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Strony internetowe');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://mikeroe.pl');
  await page.getByRole('link', { name: 'EN' }).first().click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toContainText('Websites');
  await expect(page.locator('link[hreflang="pl"]')).toHaveAttribute('href', 'https://mikeroe.pl');
});

test('primary CTA, pricing and package selection emit typed events', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Otrzymaj wstępną wycenę' }).first().click();
  await expect(page).toHaveURL(/#contact$/);
  await page.getByRole('heading', { name: 'Punkt startowy zamiast wyceny z sufitu' }).scrollIntoViewIfNeeded();
  await page.waitForFunction(() => (window as typeof window & { trackedEvents: string[] }).trackedEvents.includes('pricing_view'));
  await page.getByRole('link', { name: 'Zapytaj o zakres' }).first().click();
  const events = await page.evaluate(() => (window as typeof window & { trackedEvents: string[] }).trackedEvents);
  expect(events).toContain('cta_primary_click');
  expect(events).toContain('pricing_view');
  expect(events).toContain('package_select');
});

test('form exposes accessible validation and success next step', async ({ page }) => {
  await page.goto('/#contact');
  const form = page.locator('form.contact-form');
  await form.getByRole('button', { name: 'Wyślij zapytanie' }).click();
  await expect(form.getByRole('alert')).toBeVisible();

  await form.getByLabel('Imię *').fill('Test Preview');
  await form.getByLabel('E-mail *').fill('preview@example.com');
  await form.getByLabel('Rodzaj projektu *').selectOption({ label: 'Landing page' });
  await form.getByLabel('Czego potrzebujesz? *').fill('Kontrolowana wiadomość testowa dla wersji preview strony MikeRoe.');
  await page.locator('input[name="website"]').evaluate((input: HTMLInputElement) => {
    input.value = 'preview-test';
  });
  await form.getByRole('button', { name: 'Wyślij zapytanie' }).click();
  await expect(page.getByRole('heading', { name: 'Wiadomość wysłana' })).toBeVisible();
  const events = await page.evaluate(() => (window as typeof window & { trackedEvents: string[] }).trackedEvents);
  expect(events).toContain('form_start');
  expect(events).toContain('form_submit_error');
  expect(events).toContain('form_submit_success');
});

test('Physioflow case study is indexable while demo is noindex and visibly labelled', async ({ page }) => {
  await page.goto('/projekty/physioflow');
  await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute('content', /noindex/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Physioflow');

  await page.goto('/demo/physioflow');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.getByText('Projekt koncepcyjny', { exact: true })).toBeVisible();
});

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`homepage has no horizontal clipping at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(page.locator('h1')).toBeVisible();
  });
}

test('keyboard focus is visible and reduced motion removes transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  const transitionDuration = await page.locator('.button').first().evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(transitionDuration)).toBeLessThanOrEqual(0.001);
});
