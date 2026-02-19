import { test, expect } from "../src/fixtures/auth.fixture";
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';

test.describe('Cart Tests', () => {

  test('Add two products to cart and validate', async ({ loggedInPage }) => {
    const productsPage = new ProductsPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    await productsPage.addProductByName('Sauce Labs Backpack');
    await productsPage.addProductByName('Sauce Labs Bike Light');

    await productsPage.goToCart();

    await cartPage.validateCartItemCount(2);
    await cartPage.validateItemPresent('Sauce Labs Backpack');
    await cartPage.validateItemPresent('Sauce Labs Bike Light');
  });

  test('Remove item updates cart count', async ({ loggedInPage }) => {
    const productsPage = new ProductsPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    await productsPage.addProductByName('Sauce Labs Backpack');
    await productsPage.goToCart();

    await cartPage.validateCartItemCount(1);

    await cartPage.removeItem('Sauce Labs Backpack');

    await cartPage.validateCartItemCount(0);
  });

});
