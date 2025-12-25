import { Page } from '@playwright/test';

export class HeaderPage {
  constructor(private page: Page) {}

  // Locators
  get menuButton() {
    return this.page.locator('[data-test="menu"]');
  }

  get logoutLink() {
    return this.page.locator('[data-test="logout-sidebar-link"]');
  }

  get aboutLink() {
    return this.page.locator('[data-test="about-sidebar-link"]');
  }

  get allItemsLink() {
    return this.page.locator('[data-test="inventory-sidebar-link"]');
  }

  get resetAppLink() {
    return this.page.locator('[data-test="reset-sidebar-link"]');
  }

  get cartIcon() {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get appLogo() {
    return this.page.locator('[class*="app_logo"]');
  }

  // Actions
  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async clickAllItems() {
    await this.openMenu();
    await this.allItemsLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppLink.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async isMenuVisible() {
    return await this.logoutLink.isVisible();
  }

  async closeMenu() {
    // Click outside the menu or on the menu button again
    await this.menuButton.click();
  }
}
