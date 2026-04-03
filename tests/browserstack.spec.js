const { test, expect, chromium } = require("@playwright/test");

test("Star Wars app loads on BrowserStack", async () => {
  const caps = {
    browser: "chrome",
    browser_version: "latest",
    os: "os x",
    os_version: "ventura",
    name: "Star Wars app test",
    build: "GitHub Actions Build",
    "browserstack.username": process.env.BROWSERSTACK_USERNAME,
    "browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY,
    "browserstack.local": "true"
  };

  const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
    JSON.stringify(caps)
  )}`;

  const browser = await chromium.connect(wsEndpoint);
  const page = await browser.newPage();

  await page.goto("http://bs-local.com:3000", {
    waitUntil: "domcontentloaded"
  });

  await expect(page).toHaveURL(/bs-local\.com:3000/);

  await page.screenshot({ path: "browserstack-home.png", fullPage: true });

  await browser.close();
});