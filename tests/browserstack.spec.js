const { test, expect, chromium } = require("@playwright/test");

test("Star Wars app opens on BrowserStack", async () => {
  // 🔹 BrowserStack capabilities
  const caps = {
    browser: "chrome",
    browser_version: "latest",
    os: "os x",
    os_version: "ventura",
    name: "Star Wars Test",
    build: "GitHub Actions Build",

    // 🔐 credentials
    "browserstack.username": process.env.BROWSERSTACK_USERNAME,
    "browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY,

    // 🌐 مهم باش يخدم مع localhost ديال GitHub Actions
    "browserstack.local": "true",
  };

  // 🔗 الاتصال بـ BrowserStack (مش local)
  const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
    JSON.stringify(caps),
  )}`;

  // 🚀 فتح المتصفح على BrowserStack
  const browser = await chromium.connect(wsEndpoint);

  const context = await browser.newContext();
  const page = await context.newPage();

  // 🌍 فتح التطبيق ديالك (من خلال BrowserStack Local)
  await page.goto("http://bs-local.com:8081", {
    waitUntil: "domcontentloaded",
  });

  // ⏳ ننتظر شوية باش الصفحة تحمل
  await page.waitForTimeout(5000);

  // ✅ تحقق بسيط أن الصفحة تحلات
  const url = page.url();
  console.log("Current URL:", url);

  await expect(url).toContain("bs-local.com");

  // 📸 Screenshot (مهم باش تشوف النتيجة)
  await page.screenshot({
    path: "browserstack-home.png",
    fullPage: true,
  });

  // ❌ إغلاق المتصفح
  await browser.close();
});
