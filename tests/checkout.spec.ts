import { test, expect } from "../src/fixtures/auth.fixture";
import { ProductsPage } from '../src/pages/ProductsPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';


test('Checkout happy path', async ({ loggedInPage }) => {
  const productsPage = new ProductsPage(loggedInPage);
  const checkoutPage = new CheckoutPage(loggedInPage);

    await productsPage.addProductByName('Sauce Labs Backpack');
    await productsPage.addProductByName('Sauce Labs Bike Light');

    await productsPage.goToCart();
    await checkoutPage.clickCheckout();

    await checkoutPage.fillInformation('Himanshu', 'Verma', '12345');
    await checkoutPage.verifyOverviewPage();

    await checkoutPage.finishCheckout();
    await checkoutPage.verifySuccessMessage();
});
