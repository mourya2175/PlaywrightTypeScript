import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  // Locators
  get inventoryContainer() {
    return this.page.locator('[data-test="inventory-list"]');
  }

  get inventoryItems() {
    return this.page.locator('[data-test="inventory-item"]');
  }

  get sortDropdown() {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  get cartIcon() {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  // Actions
  async getProductCount() {
    return await this.inventoryItems.count();
  }

  async getProductByName(productName: string) {
    return this.page.locator(
      `[data-test="inventory-item"]:has-text("${productName}")`
    );
  }

  async addProductToCart(productName: string) {
    const product = await this.getProductByName(productName);
    await product.locator('button:has-text("Add to cart")').click();
  }

  async removeProductFromCart(productName: string) {
    const product = await this.getProductByName(productName);
    await product.locator('button:has-text("Remove")').click();
  }

  async getProductPrice(productName: string) {
    const product = await this.getProductByName(productName);
    const priceText = await product.locator('[data-test="inventory-item-price"]').textContent();
    return parseFloat(priceText?.replace('$', '') || '0');
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getCartItemCount() {
    const badge = await this.cartBadge.textContent();
    return parseInt(badge || '0', 10);
  }

  async isInventoryLoaded() {
    return await this.inventoryContainer.isVisible();
  }
}
