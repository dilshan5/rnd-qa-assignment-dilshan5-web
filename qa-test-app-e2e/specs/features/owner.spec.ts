import { expect } from '@playwright/test';
import { test } from '../../fixtures/test';

test.describe('Functional verification for Owners', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
        await page.waitForLoadState('networkidle');
    });

  test('todo', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('test');
  });

});
