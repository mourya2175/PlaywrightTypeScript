import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('SMOKE-003: Invalid login shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  
  // Test invalid login
  await loginPage.login('invalid', 'invalid');
  
  expect(await loginPage.isErrorDisplayed()).toBeTruthy();
});
