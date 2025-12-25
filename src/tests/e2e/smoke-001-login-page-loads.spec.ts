import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('SMOKE-001: Login page loads successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  
  // Verify login page elements are visible
  expect(await loginPage.usernameInput.isVisible()).toBeTruthy();
  expect(await loginPage.passwordInput.isVisible()).toBeTruthy();
  expect(await loginPage.loginButton.isVisible()).toBeTruthy();
});
