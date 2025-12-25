import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('E2E-009: Cart badge updates correctly', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  
  const inventoryPage = new InventoryPage(page);
  const product1 = 'Sauce Labs Backpack';
  const product2 = 'Sauce Labs Bike Light';

  // Add first product
  await inventoryPage.addProductToCart(product1);
  expect(await inventoryPage.getCartItemCount()).toBe(1);

  // Add second product
  await inventoryPage.addProductToCart(product2);
  expect(await inventoryPage.getCartItemCount()).toBe(2);

  // Remove first product
  await inventoryPage.removeProductFromCart(product1);
  expect(await inventoryPage.getCartItemCount()).toBe(1);
});
