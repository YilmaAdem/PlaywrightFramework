# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI\playwright_specialLocators.spec.js >> @Regression Playwright Test Level timeout 
- Location: tests\UI\playwright_specialLocators.spec.js:24:1

# Error details

```
TypeError: _test.expect.config is not a function
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e4] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]: rahulshettyacademy
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]: Learning@830$3mK2
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [checked] [ref=e27]
      - combobox [ref=e30]:
        - option "Student"
        - option "Teacher"
        - option "Consultant" [selected]
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [active] [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | 
  3  | test('Playwright Special Locators', async({browser})=>{
  4  |  const context = await browser.newContext({headless:false});
  5  |  const page = await context.newPage();
  6  |  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  7  |  //locators by  label - click , check box
  8  |  await page.getByLabel("Check me out if you Love IceCreams!").click();
  9  |  await page.getByLabel("Employed").check();
  10 |  await page.getByLabel("Gender").selectOption("Female");
  11 |  //special locators by place order - password, username
  12 |  //await page.getByPlaceholder("Name").fill("Yilma");
  13 |  //await page.getByPlaceholder("Email").fill("yilma.mek@gmail.com");
  14 |  await page.getByPlaceholder("Password").fill("Learn2026");
  15 | 
  16 |  //special locators by role - such as button 
  17 |  await page.getByRole("button", {name :'Submit'}).click();
  18 |  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  19 | 
  20 |  //for the menu on the top of the page
  21 |  await page.getByRole("Link", {name :'Shop'}).click();//
  22 | 
  23 | });
  24 | test('@Regression Playwright Test Level timeout ', async({browser})=>{
  25 |     //timeout at test level
> 26 |  const slowAssert = expect.config({timeout:9000}); // override timeout of config
     |                            ^ TypeError: _test.expect.config is not a function
  27 |  const context = await browser.newContext({headless:false});
  28 |  const page = await context.newPage();
  29 |  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  30 |  //locators by  label - click , check box
  31 |  await page.getByLabel("Check me out if you Love IceCreams!").click();
  32 |  await page.getByLabel("Employed").check();
  33 |  await page.getByLabel("Gender").selectOption("Female");
  34 |  //special locators by place order - password, username
  35 |  //await page.getByPlaceholder("Name").fill("Yilma");
  36 |  //await page.getByPlaceholder("Email").fill("yilma.mek@gmail.com");
  37 |  await page.getByPlaceholder("Password").fill("Learn2026");
  38 | 
  39 |  //special locators by role - such as button 
  40 |  await page.getByRole("button", {name :'Submit'}).click();
  41 |  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  42 |  // Asseration with overriding the config timeout if team asked approval to 9s
  43 |  await slowAssert(page.getByText("Success! The Form has been submitted successfully!.")).toBeChecked();
  44 |  //for the menu on the top of the page
  45 |  await page.getByRole("Link", {name :'Shop'}).click({timeout:15000});// line level
  46 |  //using slow timeout asseration 
  47 |  await slowAssert(page.locator(".my-4")).toHaveText("Shop");
  48 | })
  49 | /*npx playwright test --UI , used as a test runner . It opens
  50 | runner and you can see what is going on for each steps of the code
  51 | 
  52 | */
```