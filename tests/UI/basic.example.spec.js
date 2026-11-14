// calling package 
const {test, expect} = require('@playwright/test');

// test procedure and syntax for UI or API 
//test() - have two valiabe , test and function(async()) -async below is anonmyous fucntion 
test ('@Regression Playwright test 1', async()=>
{
//werite automation code for UI or API  here 
//step 1
//step 2
//step 3

});

//async function set for fixure -  browser which is commonly available globally
test ('@Regression Browser context-Playwright test 2 ', async({browser})=>
{
//browser fixure is with {} 
//step 1 - let set browser - chrome  - plugin /cookies
// browser has context - browser.newContext()

//step 2 - let put in the variable 
const context = await browser.newContext();
//step 3 - method newpage, browser you set in playwright.config.js will be opened
// give to variable -  await context.newPage();
 const page = await context.newPage();
 // give the page to automate 
  page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});

//Simpler way from the above 
test('@Regression Browser -page Playwright test 3 ', async({browser, page})=>
{
//when include in async function two values , you don't need additional coding for context and page 

 await page.goto("https://google.com");
 //Asseration - expect , console.log 
 // expect asseration is coming from const{test,expect} = above 
 console.log(await page.title());
 await expect(page).toHaveTitle("Google");

})