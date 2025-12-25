import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('SMOKE-005: Add to cart functionality works', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  
  // Login
  await loginPage.login('standard_user', 'secret_sauce');
  
  const inventoryPage = new InventoryPage(page);
  
  // Add product
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  
  // Verify cart updated
  expect(await inventoryPage.getCartItemCount()).toBe(1);
});
