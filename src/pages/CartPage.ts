import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  // Locators
  get cartItems() {
    return this.page.locator('[data-test="cart-list"] [data-test="cart-item"]');
  }

  get continueShoppingButton() {
    return this.page.locator('[data-test="continue-shopping"]');
  }

  get checkoutButton() {
    return this.page.locator('[data-test="checkout"]');
  }

  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get emptyCartMessage() {
    return this.page.locator('text=Your Cart is empty');
  }

  // Actions
  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemByName(productName: string) {
    return this.page.locator(
      `[data-test="cart-item"]:has-text("${productName}")`
    );
  }

  async removeItemFromCart(productName: string) {
    const item = await this.getCartItemByName(productName);
    await item.locator('button:has-text("Remove")').click();
  }

  async getItemPrice(productName: string) {
    const item = await this.getCartItemByName(productName);
    const priceText = await item.locator('[data-test="inventory-item-price"]').textContent();
    return parseFloat(priceText?.replace('$', '') || '0');
  }

  async getItemQuantity(productName: string) {
    const item = await this.getCartItemByName(productName);
    const quantityText = await item.locator('[data-test="item-quantity"]').textContent();
    return parseInt(quantityText || '1', 10);
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async isCartEmpty() {
    return await this.emptyCartMessage.isVisible();
  }
}
