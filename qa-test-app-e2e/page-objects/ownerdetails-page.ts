import { Page } from "@playwright/test";

interface OwnerData {
    firstname?: string;
    lastname?: string;
    address?: string;
    city?: string;
    telephone?: number;
}

export class OwnerDetailsPage {
    constructor(private page: Page) { }

    ownerInformationHeader = this.page.getByRole('heading', { name: 'Owner Information' });
    petAndvisitsHeader = this.page.getByRole('heading', { name: 'Pets and Visits' });
    ownerName = this.page.locator('table.table-striped').first().getByRole('row', { name: 'Name' }).locator('td');
    cityName = this.page.locator('table.table-striped').first().getByRole('row', { name: 'City' }).locator('td');
    editOwnerButton = this.page.getByRole('link', { name: 'Edit Owner' });
    addNewPetButton = this.page.getByRole('link', { name: 'Add New Pet' });

    async fillIn(ownerData: OwnerData) {
        if (ownerData.firstname !== undefined) {
            await this.page.locator('input[name="firstName"]').fill(ownerData.firstname);
        }
        if (ownerData.lastname !== undefined) {
            await this.page.locator('input[name="lastName"]').fill(ownerData.lastname);
        }
        if (ownerData.address !== undefined) {
            await this.page.locator('input[name="address"]').fill(ownerData.address);
        }
        if (ownerData.city !== undefined) {
            await this.page.locator('input[name="city"]').fill(ownerData.city);
        }
        if (ownerData.telephone !== undefined) {
            await this.page.locator('input[name="telephone"]').fill(ownerData.telephone.toString());
        }
    }

    async submit() {
        await this.page.getByRole("button", { name: "Submit" }).click();
    }

}
