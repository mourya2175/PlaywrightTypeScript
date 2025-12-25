import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('E2E-002: Invalid credentials display error message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  
  // Test login with invalid credentials
  await loginPage.login('invalid_user', 'wrong_password');
  
  // Verify error message is displayed
  expect(await loginPage.isErrorDisplayed()).toBeTruthy();
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('Epic sadface');
});
