import { Page } from "@playwright/test";

interface PetData {
    name?: string;
    birthday?: Date;
    type?: PetType;
}

export enum PetType {
    Cat = '1',
    Dog = '2',
    Lizard = '3',
    Snake = '4',
    Bird = '5',
    Hamster = '6',
}

export class PetDetailsPage {
    constructor(private page: Page) { }

    petAndvisitsHeader = this.page.getByRole('heading', { name: 'Pets and Visits' });
    petName = this.page.locator('table.table-striped').nth(1).getByRole('row', { name: 'Name' });
    addNewPetButton = this.page.getByRole('link', { name: 'Add New Pet' });

    async fillIn(petData: PetData) {
        await this.page.waitForTimeout(1000);
        if (petData.name !== undefined) {
            await this.page.locator('input[name="name"]').fill(petData.name);
        }
        if (petData.birthday !== undefined) {
            const day = petData.birthday.getDate().toString().padStart(2, "0");
            const month = petData.birthday.getMonth().toString().padStart(2, "0");
            const year = petData.birthday.getFullYear();
            await this.page.locator('input[type="date"]').fill(`${year}-${month}-${day}`);
        }
        if (petData.type !== undefined) {
            await this.page.getByRole('combobox').selectOption(petData.type);
        }
    }

    async submit() {
        await this.page.getByRole("button", { name: "Submit" }).click();
    }
}
