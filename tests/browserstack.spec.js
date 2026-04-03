const { test, expect, chromium } = require("@playwright/test");

test("Star Wars app opens on BrowserStack", async () => {
  const caps = {
    browser: "chrome",
    browser_version: "latest",
    os: "os x",
    os_version: "ventura",
    name: "Star Wars BrowserStack Test",
    build: "GitHub Actions Build",
    "browserstack.username": process.env.BROWSERSTACK_USERNAME,
    "browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY,
    "browserstack.local": "true",
  };

  const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
    JSON.stringify(caps),
  )}`;

  const browser = await chromium.connect(wsEndpoint);
  const page = await browser.newPage();

  await page.goto("http://bs-local.com:8081", {
    waitUntil: "domcontentloaded",
  });

  await expect(page).toHaveURL(/bs-local\.com:8081/);

  await page.screenshot({ path: "browserstack-home.png", fullPage: true });

  await browser.close();
});
