const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
      this.page = page;
      this.cartItems = page.locator('.cart_item');
      this.continueShoppingButton = page.locator('#continue-shopping');
    }
  
    async verifyCartItemCount(expectedCount) {
      await expect(this.cartItems).toHaveCount(expectedCount);
    }
  
    async continueShopping() {
      await this.continueShoppingButton.click();
    }
  }
  
  module.exports =CartPage
  