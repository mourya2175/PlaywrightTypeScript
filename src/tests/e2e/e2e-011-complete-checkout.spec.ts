import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('E2E-011: Complete checkout with valid information', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  
  const inventoryPage = new InventoryPage(page);
  const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

  // Add products to cart
  for (const product of products) {
    await inventoryPage.addProductToCart(product);
  }

  // Go to cart
  await inventoryPage.goToCart();
  const cartPage = new CartPage(page);

  // Proceed to checkout
  await cartPage.checkout();
  const checkoutPage = new CheckoutPage(page);

  // Fill checkout information
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  await checkoutPage.continue();

  // Complete order
  await checkoutPage.finish();

  // Verify order completion
  expect(await checkoutPage.isOrderComplete()).toBeTruthy();
});
