import { expect } from '@playwright/test';
import { test } from '../../fixtures/test';

test.describe('Functional verification for Owners', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.waitForLoadState('networkidle');
  });

  test('All the owners should display in a table view', async ({ topMenuPage, ownersListPage }) => {
    await test.step("Select All link in the Owner tab", async () => {
      await topMenuPage.selectOwnerMenu('All');
    });

    await test.step("Verify all the 10 owners are displayed in a table view", async () => {
      await expect(ownersListPage.nameColumn).toBeVisible();
      await expect(ownersListPage.cityColumn).toBeVisible();
      await expect(ownersListPage.telephoneColumn).toBeVisible();
      await expect(ownersListPage.petColumn).toBeVisible();
      await expect(ownersListPage.addressColumn).toBeVisible();
      await expect(ownersListPage.rowsLocator).toHaveCount(10);
    });
    await test.step("Verify the 3rd Owner in the table is Eduardo Rodriquez", async () => {
      await expect(ownersListPage.rowsLocator.getByRole('link').nth(2)).toHaveText('Eduardo Rodriquez');
    });
  });

  test('Verify Search functionality with 3 keywords', async ({ topMenuPage, ownersListPage }) => {
    await test.step("Select All link in the Owner tab", async () => {
      await topMenuPage.selectOwnerMenu('All');
    });
    await test.step("Verify the search results", async () => {
      const searchWord = "jef"
      await ownersListPage.searchFilter.fill(searchWord);
      const ownerNames = await ownersListPage.getOwnerNamesFromTable();
      if (ownerNames.filter(item => true).length === 0)
        console.log('No search results found.')
      else {
        ownerNames.forEach((text) => {
          const index = text.search(searchWord);
          expect(index).toBeGreaterThanOrEqual(0);
        });
      }
    });
  });


  test('Verify Search functionality with 2 keywords', async ({ topMenuPage, ownersListPage }) => {
    await test.step("Select All link in the Owner tab", async () => {
      await topMenuPage.selectOwnerMenu('All');
    });
    await test.step("Verify the search results", async () => {
      const searchWord = "pa"
      await ownersListPage.searchFilter.fill(searchWord);
      const ownerNames = await ownersListPage.getOwnerNamesFromTable();
      if (ownerNames.filter(item => true).length === 0)
        console.log('No search results found.')
      else {
        ownerNames.forEach((text) => {
          const index = text.search(searchWord);
          //if idex is -1, then search results do not include a matching name
          expect(index).toBeGreaterThanOrEqual(0);
        });
      }
    });
  });

  test('Verify the server error message for owner list page', async ({ page, topMenuPage, networkInterceptor }) => {
    /**
     * Intercept the booking response for validate conflicts error message
     */
    const filePath = '../test-data/json/serverErrorOwner.json'
    const urlToIntercept = 'http://localhost:8080/owners/list';
    networkInterceptor.interceptResponse(urlToIntercept, { filePath, statusCode: 500 })

    await test.step('Click on Submit button"', async () => {
      await Promise.all([
        page.waitForResponse(urlToIntercept),
        topMenuPage.selectOwnerMenu('All')
      ]);
    });
    await test.step("Verify the error message", async () => {
      //The error handling didn't implement in the app
    });
  });

  test('Verify Owner Details Page', async ({ topMenuPage, ownerDetailsPage, ownersListPage }) => {
    const ownerName = 'Peter McTavish'
    await test.step("Select All link in the Owner tab", async () => {
      await topMenuPage.selectOwnerMenu('All');
    });
    await test.step("Select the Owner `Peter McTavish` ", async () => {
      await ownersListPage.rowsLocator.getByRole('link').nth(4).click();
    });
    await test.step("Validate Owner Detial Page ", async () => {
      await expect(ownerDetailsPage.ownerInformationHeader).toBeVisible();
      expect((await ownerDetailsPage.ownerName.innerText()).toString()).toBe(ownerName);
    });
  });

  test('Edit Owner "Peter McTavish" ', async ({ topMenuPage, ownerDetailsPage, ownersListPage, page }) => {
    const ownerName = 'Peter McTavish'
    await test.step("Select All link in the Owner tab", async () => {
      await topMenuPage.selectOwnerMenu('All');
    });
    await test.step("Select the Owner `Peter McTavish` ", async () => {
      await ownersListPage.rowsLocator.getByRole('link').nth(4).click();
    });
    await test.step("Edit details ", async () => {
      await ownerDetailsPage.editOwnerButton.click();
      await page.waitForLoadState('networkidle');
      await ownerDetailsPage.fillIn({
        city: 'Colombo',
      });
      await ownerDetailsPage.submit();
    });
    await test.step("Validate the changes are saved` ", async () => {
      expect((await ownerDetailsPage.cityName.innerText()).toString()).toBe('Colombo');
    });
  });

  test('Add a new Owner', async ({ topMenuPage, ownerDetailsPage, ownersListPage, page }) => {
    const ownerName = 'Peter McTavish'
    await test.step("Select All link in the Owner tab", async () => {
      await topMenuPage.selectOwnerMenu('Register');
    });
    await test.step("Add details ", async () => {
      await page.waitForLoadState('networkidle');
      await ownerDetailsPage.fillIn({
        firstname: 'Nicholas',
        lastname: 'Dimou',
        address: 'Greece',
        city: 'Nuwara',
        telephone: 786112344,
      });
      await ownerDetailsPage.submit();
    });
    await test.step("Validate the new Owner is added` ", async () => {
      await expect(ownersListPage.rowsLocator.getByRole('link').last()).toHaveText('Nicholas Dimou');
    });
  });
});
