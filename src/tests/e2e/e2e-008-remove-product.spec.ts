import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test('E2E-008: User can remove product from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  
  const inventoryPage = new InventoryPage(page);
  const productName = 'Sauce Labs Backpack';

  // Add product
  await inventoryPage.addProductToCart(productName);
  expect(await inventoryPage.getCartItemCount()).toBe(1);

  // Go to cart and remove product
  await inventoryPage.goToCart();
  const cartPage = new CartPage(page);
  await cartPage.removeItemFromCart(productName);

  // Verify cart is empty
  expect(await cartPage.getCartItemCount()).toBe(0);
});
