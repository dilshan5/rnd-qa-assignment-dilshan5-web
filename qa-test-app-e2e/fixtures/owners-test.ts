import { OwnersListPage } from '../page-objects/ownerlist-page';
import { OwnerDetailsPage } from '../page-objects/ownerdetails-page';
import { test } from '@playwright/test';

export const ownerPageTest = test.extend<{
  ownersListPage: OwnersListPage;
  ownerDetailsPage: OwnerDetailsPage;
}>({
  async ownersListPage({ page }, use) {
    const ownersListPage = new OwnersListPage(page);
    await use(ownersListPage);
  },
  async ownerDetailsPage({ page }, use) {
    const ownerDetailsPage = new OwnerDetailsPage(page);
    await use(ownerDetailsPage);
  },
});
