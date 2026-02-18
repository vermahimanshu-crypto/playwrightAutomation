import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';

test.describe('Products Page Tests', () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.VALID_USER!,
      process.env.VALID_PASSWORD!
    );
  });

  test('Add two products to cart and validate', async ({ page }) => {

    await productsPage.addProductByName('Sauce Labs Backpack');
    await productsPage.addProductByName('Sauce Labs Bike Light');

    await productsPage.goToCart();

    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);

    await expect(page.locator('.inventory_item_name', {
      hasText: 'Sauce Labs Backpack',
    })).toBeVisible();

    await expect(page.locator('.inventory_item_name', {
      hasText: 'Sauce Labs Bike Light',
    })).toBeVisible();
  });

  test('Sort products by price low to high', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('lohi');

    const prices = await productsPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

});
