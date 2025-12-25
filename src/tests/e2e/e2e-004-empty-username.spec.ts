import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('E2E-004: Empty username field shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  
  // Test with empty username
  await loginPage.login('', 'secret_sauce');
  
  // Verify error message
  expect(await loginPage.isErrorDisplayed()).toBeTruthy();
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('Username is required');
});
