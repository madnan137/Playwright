const {test, expect}=require('@playwright/test')

test.only("Browser Playwright Test",async ({browser})=>{
    const context= await browser.newContext();
    const page= await context.newPage();

    const SignIn=page.locator("#signInBtn");
    const username=page.locator("#username")
    const Password=page.locator("[type='password']")
    const cartTitles=page.locator(".card-body a")
    

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await username.fill("rahulshetty");
    await Password.fill("learning");
    await SignIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await username.fill("");
    await username.fill("rahulshettyacademy")
    await Password.fill("learning");
    await SignIn.click()
    console.log(await cartTitles.nth(1).textContent());
    console.log(await cartTitles.first().textContent());
    const Alltext=await cartTitles.allTextContents();
    console.log(Alltext)




});
test("Page Playwright Test",async ({page})=>{
   
    await page.goto("https://google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")

});