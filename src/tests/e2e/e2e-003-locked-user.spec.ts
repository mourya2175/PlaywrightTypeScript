import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('E2E-003: Locked user cannot login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  
  // Test with locked user
  await loginPage.login('locked_out_user', 'secret_sauce');
  
  // Verify error message is displayed for locked user
  expect(await loginPage.isErrorDisplayed()).toBeTruthy();
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('locked out');
});
