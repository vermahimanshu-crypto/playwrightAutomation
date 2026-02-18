import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';

let loginPage: LoginPage;
let products: ProductsPage;
let cart: CartPage;
let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    products = new ProductsPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(
      process.env.VALID_USER!,
      process.env.VALID_PASSWORD!
    );

    await expect(page).toHaveURL(/inventory/);
  });

test('Checkout happy path', async ({ page }) => {
    await products.addProductByName('Sauce Labs Backpack');
    await products.addProductByName('Sauce Labs Bike Light');

    await products.goToCart();
    await checkout.clickCheckout();

    await checkout.fillInformation('Himanshu', 'Verma', '12345');
    await checkout.verifyOverviewPage();

    await checkout.finishCheckout();
    await checkout.verifySuccessMessage();
});
