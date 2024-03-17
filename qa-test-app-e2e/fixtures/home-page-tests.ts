import { HomePage } from '../page-objects/home-page';
import { test } from '@playwright/test';

export const homePageTest = test.extend<{ homePage: HomePage; }>({
  async homePage({ page }, use) {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
