import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addProductByName(productName: string) {
    const product = this.page.locator('.inventory_item', {
      hasText: productName,
    });

    await expect(product).toBeVisible();
    await product.locator('button').click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getProductPrices(): Promise<number[]> {
    const pricesText = await this.page
      .locator('.inventory_item_price')
      .allTextContents();

    return pricesText.map(price =>
      Number(price.replace('$', ''))
    );
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}

