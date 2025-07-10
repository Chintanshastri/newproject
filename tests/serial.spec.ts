import { test, expect } from '@playwright/test';

test.describe.serial('My Serial Tests', () => {
  test('Test 1 - Open URL', async ({ page }) => {
    await page.goto('https://www.google.com/');
    console.log('Opened URL');
  });

  test('Test 2 - Check Title', async ({ page }) => {
    await expect(page).toHaveTitle('Google');
  });

  test('Test 3 - Some Action', async ({ page }) => {
    // Do something else on the same page
  });
});
