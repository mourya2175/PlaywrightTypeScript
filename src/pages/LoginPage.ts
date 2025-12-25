import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  get usernameInput() {
    return this.page.locator('input[placeholder="Username"]');
  }

  get passwordInput() {
    return this.page.locator('input[placeholder="Password"]');
  }

  get loginButton() {
    return this.page.locator('input[type="submit"]');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  // Actions
  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorDisplayed() {
    return await this.errorMessage.isVisible();
  }
}
