import { Page } from "@playwright/test";

export class OwnersListPage {
    constructor(private page: Page) { }

    rowsLocator = this.page.locator('tbody').locator('tr');
    searchFilter = this.page.getByPlaceholder('Search Filter');
    nameColumn = this.page.getByRole('cell', { name: 'Name' });
    cityColumn = this.page.getByRole('cell', { name: 'City' });
    addressColumn = this.page.getByRole('cell', { name: 'Address' });
    telephoneColumn = this.page.getByRole('cell', { name: 'Telephone' });
    petColumn = this.page.getByRole('cell', { name: 'Pets' });

    async getOwnerNamesFromTable() {
        await this.page.waitForLoadState('networkidle');
        const textsFromNameColumn = [];
        const tableRows = this.page.locator('tbody').locator('tr');
        const rowCount = await tableRows.count();
        for (let i = 0; i < rowCount; i++) {
            let row = tableRows.nth(i);
            textsFromNameColumn.push((await row.locator('td:nth-child(1)').allInnerTexts()).toString().toLowerCase());
        }
        return textsFromNameColumn;
    }
}
