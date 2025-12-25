import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('E2E-012: Checkout missing first name shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  
  const inventoryPage = new InventoryPage(page);

  // Add product
  await inventoryPage.addProductToCart('Sauce Labs Backpack');

  // Go to cart and checkout
  await inventoryPage.goToCart();
  const cartPage = new CartPage(page);
  await cartPage.checkout();

  const checkoutPage = new CheckoutPage(page);

  // Fill only last name and zip
  await checkoutPage.lastNameInput.fill('Doe');
  await checkoutPage.zipCodeInput.fill('12345');
  await checkoutPage.continue();

  // Verify error
  expect(await checkoutPage.isErrorDisplayed()).toBeTruthy();
});
