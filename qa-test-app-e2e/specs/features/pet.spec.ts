import { expect } from '@playwright/test';
import { test } from '../../fixtures/test';
import { PetType } from 'qa-test-app-e2e/page-objects/petdetails-page';

test.describe('Functional verification for Owners', () => {
    test.beforeEach(async ({ page, topMenuPage }) => {
        await page.goto('');
        await page.waitForLoadState('networkidle');
        await test.step("Select All link in the Owner tab", async () => {
            await topMenuPage.selectOwnerMenu('All');
        });
    });

    test('Add a pet to Owner "Peter McTavish" ', async ({ ownerDetailsPage, ownersListPage, petDetailsPage, page }) => {
        await test.step("Select the Owner `Peter McTavish` ", async () => {
            await ownersListPage.rowsLocator.getByRole('link').nth(4).click();
        });
        await test.step("Validate Pet Detial section ", async () => {
            await expect(ownerDetailsPage.petAndvisitsHeader).toBeVisible();
            await ownerDetailsPage.addNewPetButton.click();
        });
        await test.step("Add details ", async () => {
            await petDetailsPage.fillIn({
                name: 'Rocky',
                birthday: new Date(2024, 2, 1),
                type: PetType.Snake,
            });
            await petDetailsPage.submit();
        });
        await test.step("Validate the new Pet is added` ", async () => {
            await expect(petDetailsPage.petName.last().getByRole('link').first()).toHaveText('Rocky');
        });
    });

    test('Edit the first pet belongs to Owner "Peter McTavish" ', async ({ ownerDetailsPage, ownersListPage, petDetailsPage, page }) => {
        await test.step("Select the Owner `Peter McTavish` ", async () => {
            await ownersListPage.rowsLocator.getByRole('link').nth(4).click();
        });
        await test.step("Add details ", async () => {
            await petDetailsPage.petName.first().getByRole('link').first().click();
            await petDetailsPage.fillIn({
                name: 'George',
                birthday: new Date(2014, 4, 2),
            });
            await petDetailsPage.submit();
        });
    });
});
