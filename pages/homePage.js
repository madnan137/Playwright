const { expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
      this.page = page;
      this.title = page.locator('.title');
      this.filterDropdown = page.locator('.product_sort_container');
      this.cartBadge = page.locator('.shopping_cart_badge');
      this.productAddButtons = page.locator('.btn_inventory');
    }
  
    async verifyTitle(expectedTitle) {
      await expect(this.title).toHaveText(expectedTitle);
    }
  
    async selectFilter(filterOption) {
      await this.filterDropdown.selectOption({ label: filterOption });
    }
  
    async addProductToCart(productIndex) {
      await this.productAddButtons.nth(productIndex).click();
    }
  
    async removeProductFromCart(productIndex) {
      await this.productAddButtons.nth(productIndex).click();
    }
  
    async openCart() {
      await this.page.locator('.shopping_cart_link').click();
    }
  }
  
  module.exports = HomePage
  