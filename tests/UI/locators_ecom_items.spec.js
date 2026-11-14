const { test, expect } = require('@playwright/test');

const LOGIN_PRACTICE_URL = "https://rahulshettyacademy.com/loginpagePractise/";
const SHOP_LOGIN_URL = "https://rahulshettyacademy.com/client/#/auth/login";

// Shared helper: login on the practice page, including the "User" radio popup
async function loginAsUser(page) {
  await page.goto(LOGIN_PRACTICE_URL);
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator("[type='password']").fill('Learning@830$3mK2');

  await page.locator("input[value='user']").check();

  // Selecting "User" opens a confirmation popup that blocks the Sign In button.
  // Close it if it appears (confirm the #okayBtn id in dev tools if this misses).
  const okayBtn = page.locator('#okayBtn');
  try {
    await okayBtn.waitFor({ state: 'visible', timeout: 5000 });
    await okayBtn.click();
  } catch {
    // popup did not appear - continue
  }

  await page.locator("select.form-control").selectOption("Student");
  await page.locator("#signInBtn").click();
}

test('@Web Locators using CSS not Xpath', async ({ page }) => {
  test.setTimeout(120000);

  await page.goto(LOGIN_PRACTICE_URL);
  console.log(await page.title());

  // Wrong credentials on purpose to check the error message
  await page.locator('#username').fill('rahulsheety');
  await page.locator("[type='password']").fill('Learning');
  await page.locator("#signInBtn").click();

  const errorLocator = page.locator("[style*='block']");
  console.log(await errorLocator.textContent());
  await expect(errorLocator).toContainText("Incorrect");

  // Clear the wrong username and use the correct one
  await page.locator('#username').fill("");
  await page.locator('#username').fill('rahulshettyacademy');
});

test('@Web Optimized the above code', async ({ page }) => {
  test.setTimeout(90000);

  const userName = page.locator('#username');
  const passWrd = page.locator("[type='password']");

  await page.goto(LOGIN_PRACTICE_URL);
  console.log(await page.title());

  await userName.fill('rahulshettyacademy');
  await passWrd.fill('Learning@830$3mK2');   // was 'Learning', which is the wrong password
  await page.locator("#signInBtn").click();
});

test('@Web Find the first and second items from ecommerce page', async ({ page }) => {
  test.setTimeout(120000);

  await loginAsUser(page);

  const itemTitles = page.locator(".card-body a");
  await expect(itemTitles.first()).toBeVisible();

  console.log("Current URL:", page.url());
  console.log(await itemTitles.first().textContent());  // first item name
  console.log(await itemTitles.nth(1).textContent());   // second item name
});

test('@Web Seeing all items in ecommerce page', async ({ page }) => {
  test.setTimeout(120000);

  await loginAsUser(page);

  const itemTitles = page.locator(".card-body a");
  await expect(itemTitles.first()).toBeVisible();

  console.log("Current URL:", page.url());
  console.log(await itemTitles.first().textContent());
  console.log(await itemTitles.nth(1).textContent());
  console.log(await itemTitles.allTextContents());
});

test('@Web Let us shop', async ({ page }) => {
  test.setTimeout(120000);

  const userName = page.locator('#userEmail');
  const passWrd = page.locator("#userPassword");
  const itemTitles = page.locator(".card-body");

  await page.goto(SHOP_LOGIN_URL);
  console.log(await page.title());

  await userName.fill('yilma.mek@gmail.com');
  await passWrd.fill('Learn2026');
  await page.locator("#login").click();

  // Wait for the product cards instead of networkidle
  await itemTitles.first().waitFor();

  console.log(await itemTitles.first().textContent());
  console.log(await itemTitles.nth(1).textContent());
  console.log(await itemTitles.allTextContents());
});