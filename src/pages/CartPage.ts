import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  // Locators
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async validateCartItemCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async validateItemPresent(itemName: string) {
    await expect(
      this.page.getByRole('link', { name: itemName })
    ).toBeVisible();
  }

  async getItemPrice(itemName: string): Promise<number> {
    const item = this.page.locator('.cart_item').filter({
      has: this.page.getByText(itemName),
    });

    const priceText = await item.locator('.inventory_item_price').textContent();
    return Number(priceText?.replace('$', ''));
  }

  async validateSubtotal(expectedTotal: number) {
    const prices = await this.page
      .locator('.inventory_item_price')
      .allTextContents();

    const total = prices.reduce((sum, price) => {
      return sum + Number(price.replace('$', ''));
    }, 0);

    expect(total).toBe(expectedTotal);
  }

  async removeItem(itemName: string) {
    const item = this.page.locator('.cart_item').filter({
      has: this.page.getByText(itemName),
    });

    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL(/inventory/);
  }
}
