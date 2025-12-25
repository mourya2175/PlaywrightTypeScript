import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('E2E-001: Valid user can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  
  // Test login with valid credentials
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Verify user is redirected to inventory page
  const inventoryPage = new InventoryPage(page);
  expect(await inventoryPage.isInventoryLoaded()).toBeTruthy();
});
