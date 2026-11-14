
const {test , expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('@Regression Handling static dropdown and radio button', async({browser}) =>
{
  const context = await browser.newContext({ headless: false });
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator('#username');
  const password = page.locator("[type ='password']");
  const signIn   = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");

   await userName.fill('rahulshettyacademy');
   await password.fill('Learning@830$3mK2');
  // blinking documentation link
  const documentLink = page.locator ("[href*='documents-request']");// used at the end of this code
  //select drop down option 
   

  await dropdown.selectOption("Consultant");
  // Select radio button (this triggers the popup)
  await page.locator(".radiotextsty").last().click();
  //click okay on popup
  await page.locator("#okayBtn").click(); 
 
  // asseration - if the okay button is clicked/checked
  console.log((page.locator(".radiotextsty").last()).isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
   //pause and see above activities are performing 
  ///await page.pause(); this time is not needed because of the asseration expect 
// checking and uncheck a terms and conditions box and asseration 
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked(); //Asseration
  await page.locator("#terms").uncheck(); // uncheck 
  //for uncheck , there is no toBeUnchecked but there is otherway around
/* Asseration or action :await used int the beginning when the action is performed and outside of brace  like click(), toBecheched() etc when outside of the brace
But,if the action is inside of the brace , await isnot used outside - see below expect asseration
*/
// showld work since it is unchecked previsous step
  expect(await page.locator("#terms").isChecked()).toBeFalsy(); 
  // checking if the document blinking 
  await expect(documentLink).toHaveAttribute("class","blinkingText");

})

test('@Regression Child window handling', async({browser})=>
{

const context = await browser.newContext({headless:false});
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator("[href*='documents-request']");
//so the documents link is opened side wise for another page
//how to handle that - use promise all 
//Promise method in playright comes with three different - promise pending , fulfilled , rejected
// two tasks happend at the same time click page and opend side wise
//use awaitForEvent for the new page - context
// you see this becomes an array that two index
//// Wait for new page + click at same time
const [newPage] = await Promise.all([
context.waitForEvent('page'),
documentLink.click()
]);

// the inspect the page that open another page and put it in variable text
const text = await newPage.locator("#interview-material-container p.im-para.red").textContent();
console.log(text);

})