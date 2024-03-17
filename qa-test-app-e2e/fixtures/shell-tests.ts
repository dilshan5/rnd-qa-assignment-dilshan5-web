import { TopMenuPage } from '../page-objects/topmenu-page';
import { test } from '@playwright/test';

export const shellTest = test.extend<{ topMenuPage: TopMenuPage }>({
  async topMenuPage({ page }, use) {
    await use(new TopMenuPage(page));
  },
});
