import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Smoke Tests: Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('SMOKE-001: Login page loads successfully', async ({ page }) => {
    // Verify login page elements are visible
    expect(await loginPage.usernameInput.isVisible()).toBeTruthy();
    expect(await loginPage.passwordInput.isVisible()).toBeTruthy();
    expect(await loginPage.loginButton.isVisible()).toBeTruthy();
  });

  test('SMOKE-002: Standard user can login', async ({ page }) => {
    // Test basic login functionality
    await loginPage.login('standard_user', 'secret_sauce');
    
    const inventoryPage = new InventoryPage(page);
    expect(await inventoryPage.isInventoryLoaded()).toBeTruthy();
  });

  test('SMOKE-003: Invalid login shows error', async () => {
    // Test invalid login
    await loginPage.login('invalid', 'invalid');
    
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
  });

  test('SMOKE-004: Inventory page displays products', async ({ page }) => {
    // Login first
    await loginPage.login('standard_user', 'secret_sauce');
    
    const inventoryPage = new InventoryPage(page);
    const productCount = await inventoryPage.getProductCount();
    
    expect(productCount).toBeGreaterThan(0);
  });

  test('SMOKE-005: Add to cart functionality works', async ({ page }) => {
    // Login
    await loginPage.login('standard_user', 'secret_sauce');
    
    const inventoryPage = new InventoryPage(page);
    
    // Add product
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    
    // Verify cart updated
    expect(await inventoryPage.getCartItemCount()).toBe(1);
  });
});
