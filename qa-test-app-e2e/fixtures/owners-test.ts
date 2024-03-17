import { OwnersListPage } from '../page-objects/ownerlist-page';
import { OwnerDetailsPage } from '../page-objects/ownerdetails-page';
import { PetDetailsPage } from '../page-objects/petdetails-page';
import { test } from '@playwright/test';

export const ownerPageTest = test.extend<{
  ownersListPage: OwnersListPage;
  ownerDetailsPage: OwnerDetailsPage;
  petDetailsPage: PetDetailsPage;
}>({
  async ownersListPage({ page }, use) {
    const ownersListPage = new OwnersListPage(page);
    await use(ownersListPage);
  },
  async ownerDetailsPage({ page }, use) {
    const ownerDetailsPage = new OwnerDetailsPage(page);
    await use(ownerDetailsPage);
  },
  async petDetailsPage({ page }, use) {
    const petDetailsPage = new PetDetailsPage(page);
    await use(petDetailsPage);
  },
});
