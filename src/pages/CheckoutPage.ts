import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  // Locators
  get firstNameInput() {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('[data-test="lastName"]');
  }

  get zipCodeInput() {
    return this.page.locator('[data-test="postalCode"]');
  }

  get continueButton() {
    return this.page.locator('[data-test="continue"]');
  }

  get finishButton() {
    return this.page.locator('[data-test="finish"]');
  }

  get cancelButton() {
    return this.page.locator('[data-test="cancel"]');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  get orderCompleteMessage() {
    return this.page.locator('text=Thank you for your order!');
  }

  get checkoutSummary() {
    return this.page.locator('[data-test="checkout-summary-container"]');
  }

  // Actions
  async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorDisplayed() {
    return await this.errorMessage.isVisible();
  }

  async isOrderComplete() {
    return await this.orderCompleteMessage.isVisible();
  }

  async getOrderCompleteMessage() {
    return await this.orderCompleteMessage.textContent();
  }

  async getSubtotal() {
    const text = await this.page.locator('[data-test="subtotal-label"]').textContent();
    return parseFloat(text?.match(/\d+\.\d+/)?.[0] || '0');
  }

  async getTax() {
    const text = await this.page.locator('[data-test="tax-label"]').textContent();
    return parseFloat(text?.match(/\d+\.\d+/)?.[0] || '0');
  }

  async getTotal() {
    const text = await this.page.locator('[data-test="total-label"]').textContent();
    return parseFloat(text?.match(/\d+\.\d+/)?.[0] || '0');
  }
}
