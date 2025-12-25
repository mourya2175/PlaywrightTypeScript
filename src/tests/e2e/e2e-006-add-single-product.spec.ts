import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test('E2E-006: User can add single product to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  
  const inventoryPage = new InventoryPage(page);
  const productName = 'Sauce Labs Backpack';

  // Add product to cart
  await inventoryPage.addProductToCart(productName);

  // Verify cart badge shows 1 item
  expect(await inventoryPage.getCartItemCount()).toBe(1);

  // Navigate to cart and verify product is there
  await inventoryPage.goToCart();
  const cartPage = new CartPage(page);
  expect(await cartPage.getCartItemCount()).toBe(1);
});
