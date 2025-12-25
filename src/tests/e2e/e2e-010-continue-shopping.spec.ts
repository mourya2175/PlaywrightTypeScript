import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test('E2E-010: User can continue shopping from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  
  const inventoryPage = new InventoryPage(page);

  // Add product
  await inventoryPage.addProductToCart('Sauce Labs Backpack');

  // Go to cart
  await inventoryPage.goToCart();
  const cartPage = new CartPage(page);

  // Continue shopping
  await cartPage.continueShopping();

  // Verify back on inventory page
  expect(await inventoryPage.isInventoryLoaded()).toBeTruthy();
});
