import { Page } from '@playwright/test';

export class TopMenuPage {
  constructor(private page: Page) { }

  async selectMenu(menu: 'Home' | 'Veterinarians') {
    await this.page.getByRole(`link`, { name: menu, exact: true }).click();
  }

  async selectOwnerMenu(subMenu: 'All' | 'Register') {
    await this.page.getByRole(`button`, { name: 'Owners', exact: true }).click();
    await this.page.getByRole(`link`, { name: subMenu, exact: true }).click();
  }
}
