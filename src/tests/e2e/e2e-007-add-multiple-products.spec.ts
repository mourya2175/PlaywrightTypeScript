import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test('E2E-007: User can add multiple products to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  
  const inventoryPage = new InventoryPage(page);
  const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

  // Add multiple products
  for (const product of products) {
    await inventoryPage.addProductToCart(product);
  }

  // Verify cart badge
  expect(await inventoryPage.getCartItemCount()).toBe(3);

  // Navigate to cart
  await inventoryPage.goToCart();
  const cartPage = new CartPage(page);
  expect(await cartPage.getCartItemCount()).toBe(3);
});
