import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';

test.describe('Cart Tests', () => {

  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.VALID_USER!,
      process.env.VALID_PASSWORD!
    );

    await expect(page).toHaveURL(/inventory/);
  });

  test('Add two products to cart and validate', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addProductByName('Sauce Labs Backpack');
    await productsPage.addProductByName('Sauce Labs Bike Light');

    await productsPage.goToCart();

    await cartPage.validateCartItemCount(2);
    await cartPage.validateItemPresent('Sauce Labs Backpack');
    await cartPage.validateItemPresent('Sauce Labs Bike Light');
  });

  test('Remove item updates cart count', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addProductByName('Sauce Labs Backpack');
    await productsPage.goToCart();

    await cartPage.validateCartItemCount(1);

    await cartPage.removeItem('Sauce Labs Backpack');

    await cartPage.validateCartItemCount(0);
  });

});
