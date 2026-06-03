# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e-survey.spec.ts >> shows error and does not redirect when survey submission fails
- Location: waitlist-app\e2e-survey.spec.ts:62:5

# Error details

```
Error: locator.check: Error: strict mode violation: locator('label:has-text("₹10") input[type="radio"]') resolved to 2 elements:
    1) <input value="₹10" type="radio" name="pricePoint" class="w-4 h-4 text-purple-600"/> aka getByRole('radio', { name: '₹10', exact: true })
    2) <input type="radio" value="₹100+" name="pricePoint" class="w-4 h-4 text-purple-600"/> aka getByRole('radio', { name: '₹100+' })

Call log:
  - waiting for locator('label:has-text("₹10") input[type="radio"]')

```

# Page snapshot

```yaml
- main [ref=e2]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: 💭
      - heading "Help Us Build the Right Product" [level=1] [ref=e7]
      - paragraph [ref=e8]: Your feedback shapes what we build
      - generic [ref=e9]: ℹ️ This survey does not affect your waitlist position
    - generic [ref=e10]:
      - generic [ref=e11]:
        - heading "1. Would you be willing to pay for premium access?" [level=2] [ref=e12]
        - generic [ref=e13]:
          - generic [ref=e14] [cursor=pointer]:
            - radio "yes" [checked] [active] [ref=e15]
            - generic [ref=e16]: "yes"
          - generic [ref=e17] [cursor=pointer]:
            - radio "no" [ref=e18]
            - generic [ref=e19]: "no"
          - generic [ref=e20] [cursor=pointer]:
            - radio "maybe" [ref=e21]
            - generic [ref=e22]: maybe
      - generic [ref=e23]:
        - heading "2. What monthly price feels reasonable?" [level=2] [ref=e24]
        - generic [ref=e25]:
          - generic [ref=e26] [cursor=pointer]:
            - radio "Free Only" [ref=e27]
            - generic [ref=e28]: Free Only
          - generic [ref=e29] [cursor=pointer]:
            - radio "₹5" [ref=e30]
            - generic [ref=e31]: ₹5
          - generic [ref=e32] [cursor=pointer]:
            - radio "₹10" [ref=e33]
            - generic [ref=e34]: ₹10
          - generic [ref=e35] [cursor=pointer]:
            - radio "₹20" [ref=e36]
            - generic [ref=e37]: ₹20
          - generic [ref=e38] [cursor=pointer]:
            - radio "₹30" [ref=e39]
            - generic [ref=e40]: ₹30
          - generic [ref=e41] [cursor=pointer]:
            - radio "₹50" [ref=e42]
            - generic [ref=e43]: ₹50
          - generic [ref=e44] [cursor=pointer]:
            - radio "₹100+" [ref=e45]
            - generic [ref=e46]: ₹100+
      - generic [ref=e47]:
        - heading "3. Which features would justify a subscription?" [level=2] [ref=e48]
        - paragraph [ref=e49]: Select all that apply
        - generic [ref=e50]:
          - generic [ref=e51] [cursor=pointer]:
            - checkbox "Digital Yearbook" [ref=e52]
            - generic [ref=e53]: Digital Yearbook
          - generic [ref=e54] [cursor=pointer]:
            - checkbox "Verified Student Network" [ref=e55]
            - generic [ref=e56]: Verified Student Network
          - generic [ref=e57] [cursor=pointer]:
            - checkbox "Alumni Network" [ref=e58]
            - generic [ref=e59]: Alumni Network
          - generic [ref=e60] [cursor=pointer]:
            - checkbox "Premium Resources" [ref=e61]
            - generic [ref=e62]: Premium Resources
          - generic [ref=e63] [cursor=pointer]:
            - checkbox "Startup Network" [ref=e64]
            - generic [ref=e65]: Startup Network
          - generic [ref=e66] [cursor=pointer]:
            - checkbox "Career Tools" [ref=e67]
            - generic [ref=e68]: Career Tools
          - generic [ref=e69] [cursor=pointer]:
            - checkbox "Opportunity Alerts" [ref=e70]
            - generic [ref=e71]: Opportunity Alerts
          - generic [ref=e72] [cursor=pointer]:
            - checkbox "AI Features" [ref=e73]
            - generic [ref=e74]: AI Features
      - generic [ref=e75]:
        - heading "4. What would make ₹10/month worth paying?" [level=2] [ref=e76]
        - textbox "Tell us what features or benefits would make you consider a paid subscription..." [ref=e77]
      - generic [ref=e78]:
        - heading "5. Maximum amount you would realistically pay per month?" [level=2] [ref=e79]
        - generic [ref=e80]:
          - generic [ref=e81]: ₹
          - spinbutton [ref=e82]
          - generic [ref=e83]: /month
      - generic [ref=e84]:
        - heading "6. Preferred payment style?" [level=2] [ref=e85]
        - generic [ref=e86]:
          - generic [ref=e87] [cursor=pointer]:
            - radio "Monthly Pay each month" [ref=e88]
            - generic [ref=e89]:
              - generic [ref=e90]: Monthly
              - generic [ref=e91]: Pay each month
          - generic [ref=e92] [cursor=pointer]:
            - radio "Yearly Pay once a year (usually cheaper)" [ref=e93]
            - generic [ref=e94]:
              - generic [ref=e95]: Yearly
              - generic [ref=e96]: Pay once a year (usually cheaper)
          - generic [ref=e97] [cursor=pointer]:
            - radio "Both Options Flexibility to choose" [ref=e98]
            - generic [ref=e99]:
              - generic [ref=e100]: Both Options
              - generic [ref=e101]: Flexibility to choose
      - generic [ref=e102]:
        - button "Submit Survey" [ref=e103]
        - button "Skip Survey" [ref=e104]
    - link "← Back to Home" [ref=e106] [cursor=pointer]:
      - /url: /
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | async function fillSurvey(page: import("@playwright/test").Page) {
  4  |   await page.locator('label:has-text("yes") input[type="radio"]').check();
> 5  |   await page.locator('label:has-text("₹10") input[type="radio"]').check();
     |                                                                   ^ Error: locator.check: Error: strict mode violation: locator('label:has-text("₹10") input[type="radio"]') resolved to 2 elements:
  6  |   await page
  7  |     .locator('label:has-text("Digital Yearbook") input[type="checkbox"]')
  8  |     .check();
  9  |   await page
  10 |     .locator('label:has-text("AI Features") input[type="checkbox"]')
  11 |     .check();
  12 |   await page
  13 |     .locator('textarea[placeholder*="paid subscription"]')
  14 |     .fill("Exclusive student discounts and alumni referrals");
  15 |   await page.locator('input[type="number"]').fill("99");
  16 |   await page.locator('label:has-text("Monthly") input[type="radio"]').check();
  17 | }
  18 | 
  19 | test("submits survey via POST and redirects only after successful response", async ({
  20 |   page,
  21 | }) => {
  22 |   const logs: string[] = [];
  23 |   page.on("console", (msg) => logs.push(msg.text()));
  24 | 
  25 |   let requestBody: Record<string, unknown> | null = null;
  26 |   await page.route("**/api/survey", async (route) => {
  27 |     requestBody = route.request().postDataJSON();
  28 |     await page.waitForTimeout(1200);
  29 |     await route.fulfill({
  30 |       status: 200,
  31 |       contentType: "application/json",
  32 |       body: JSON.stringify({
  33 |         success: true,
  34 |         message: "Survey submitted successfully",
  35 |       }),
  36 |     });
  37 |   });
  38 | 
  39 |   await page.goto("/survey?waitlistId=WL-E2E-001&email=e2e%40example.com");
  40 |   await fillSurvey(page);
  41 |   await page.getByRole("button", { name: "Submit Survey" }).click();
  42 | 
  43 |   await expect(page).toHaveURL(/\/survey/);
  44 |   await expect(page).toHaveURL(/\/thank-you/, { timeout: 10000 });
  45 | 
  46 |   expect(requestBody).toEqual({
  47 |     waitlistId: "WL-E2E-001",
  48 |     email: "e2e@example.com",
  49 |     willingToPay: "yes",
  50 |     pricePoint: "₹10",
  51 |     maxAmount: "99",
  52 |     paymentStyle: "monthly",
  53 |     valuableFeatures: ["Digital Yearbook", "AI Features"],
  54 |     worthPayingFor: "Exclusive student discounts and alumni referrals",
  55 |   });
  56 | 
  57 |   expect(logs.some((line) => line.includes("Submitting survey..."))).toBeTruthy();
  58 |   expect(logs.some((line) => line.includes("API status: 200"))).toBeTruthy();
  59 |   expect(logs.some((line) => line.includes("API response:"))).toBeTruthy();
  60 | });
  61 | 
  62 | test("shows error and does not redirect when survey submission fails", async ({
  63 |   page,
  64 | }) => {
  65 |   await page.route("**/api/survey", async (route) => {
  66 |     await route.fulfill({
  67 |       status: 500,
  68 |       contentType: "application/json",
  69 |       body: JSON.stringify({
  70 |         success: false,
  71 |         message: "Mock survey failure",
  72 |       }),
  73 |     });
  74 |   });
  75 | 
  76 |   await page.goto("/survey?waitlistId=WL-E2E-002&email=e2e2%40example.com");
  77 |   await fillSurvey(page);
  78 |   await page.getByRole("button", { name: "Submit Survey" }).click();
  79 | 
  80 |   await expect(page).toHaveURL(/\/survey/, { timeout: 10000 });
  81 |   await expect(page.getByText("Mock survey failure")).toBeVisible();
  82 | });
  83 | 
```