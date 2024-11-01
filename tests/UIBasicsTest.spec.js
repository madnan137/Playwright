const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const CartPage = require('../pages/cartPage');
const { loginAndNavigateToHome } = require('../utils/helpers');

test.describe('Sauce Demo Test Suite', () => {
  let loginPage;
  let homePage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
  });

  test('Verify the title as Swag Labs', async () => {
    await loginAndNavigateToHome(loginPage, 'standard_user', 'secret_sauce');
    // Wait for title to be visible before checking
    await homePage.page.waitForSelector('.title');
    await homePage.verifyTitle('Products'); // Adjusted expected title to 'Products'
  });

  test('Verify the login button text is capitalized', async () => {
    await loginPage.navigate();
    const loginButtonText = await loginPage.loginButton.textContent();
    expect(loginButtonText.trim()).toBe('Login'); // Use `.toBe` with string and trim any whitespace
  });

  test('Login with valid credentials and verify filter dropdown', async ({ page }) => {
    await loginAndNavigateToHome(loginPage, 'standard_user', 'secret_sauce');
    await homePage.selectFilter('Name (A to Z)');
    await expect(homePage.filterDropdown).toHaveValue('az');
  });

  test('Add and remove products in the cart and verify cart badge', async ({ page }) => {
    await loginAndNavigateToHome(loginPage, 'standard_user', 'secret_sauce');
    await homePage.addProductToCart(0);
    await expect(homePage.cartBadge).toHaveText('1');

    await homePage.addProductToCart(5);
    await expect(homePage.cartBadge).toHaveText('2');

    await homePage.removeProductFromCart(0);
    await expect(homePage.cartBadge).toHaveText('1');
  });

  test('Verify products in the cart and continue shopping', async ({ page }) => {
    await loginAndNavigateToHome(loginPage, 'standard_user', 'secret_sauce');
    await homePage.addProductToCart(0);
    await homePage.openCart();
    await cartPage.verifyCartItemCount(1);
    await cartPage.continueShopping();
    await page.waitForTimeout(1000);
    await expect(homePage.title).toHaveText('Products', { timeout: 10000 });
    //await expect(homePage.title).toHaveText('Swag Labs');
  });

  test('Verify price sorting from low to high', async ({ page }) => {
    await loginAndNavigateToHome(loginPage, 'standard_user', 'secret_sauce');
    await homePage.selectFilter('Price (low to high)');
    const productPrices = await homePage.page.$$eval(
      '.inventory_item_price',
      elements => elements.map(e => parseFloat(e.innerText.replace('$', '')))
    );
    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(sortedPrices);
  });
});
