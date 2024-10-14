const {test, expect}=require('@playwright/test');
const { beforeEach } = require('node:test');
beforeEach('Login',async({page})=>{
    await page.goto('https://letcode.in/signup');
})

test.only("Sign Up using CSS Locators",async ({page})=>{
    

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'testuseremail@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('input[type="checkbox"]');
    await page.click('p [class="button is-primary"]');

    await page.waitForURL();  
    await expect(page).toHaveURL('https://letcode.in/signup');

    
});

test('Sign In - XPath', async ({ page }) => {
    
    
    await page.fill('//input[@placeholder="Enter registered email"]', 'testuseremail@example.com');
    await page.fill('//input[@placeholder="Enter Password"]', 'Password123!');
    
  
    await page.click('p [class="button is-primary"]');
    await expect(page.locator("a[class='button is-link']")).toContainText('New Course!')
  });

  test('Sign In using Playwright Locators', async ({ page }) => {
   
    
    await page.getByPlaceholder('Enter registered email').fill('testuseremail@example.com');
    await page.getByPlaceholder('PassEnter Passwordword').fill('Password123!');
    
    await page.getByRole('button', { name: 'LOGIN' }).click();
    
    await expect(page.locator("a[class='button is-link']")).toContainText('New Course!')
})