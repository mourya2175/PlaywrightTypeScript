import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('E2E-005: Empty password field shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  
  // Test with empty password
  await loginPage.login('standard_user', '');
  
  // Verify error message
  expect(await loginPage.isErrorDisplayed()).toBeTruthy();
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('Password is required');
});
