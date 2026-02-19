import { test, expect } from "../src/fixtures/auth.fixture";
import { ProductsPage } from '../src/pages/ProductsPage';

test.describe('Products Page Tests', () => {

  test('Add two products to cart and validate', async ({ loggedInPage }) => {
    const productsPage = new ProductsPage(loggedInPage);
    await productsPage.addProductByName('Sauce Labs Backpack');
    await productsPage.addProductByName('Sauce Labs Bike Light');

    await productsPage.goToCart();

    const cartItems = loggedInPage.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);

    await expect(loggedInPage.locator('.inventory_item_name', {
      hasText: 'Sauce Labs Backpack',
    })).toBeVisible();

    await expect(loggedInPage.locator('.inventory_item_name', {
      hasText: 'Sauce Labs Bike Light',
    })).toBeVisible();
  });

  test('Sort products by price low to high', async ({ loggedInPage }) => {
    const productsPage = new ProductsPage(loggedInPage);

    await productsPage.sortBy('lohi');

    const prices = await productsPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

});
