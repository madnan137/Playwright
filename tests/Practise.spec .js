const {test, expect}=require('@playwright/test')

test.only("Browser Playwright Test",async ({page})=>{
  
const Pagetitle=await page.goto("https://letcode.in/");
expect(Pagetitle).toContain("letcode");
page.locator(".div a[class*='button is-primary is']");


});

