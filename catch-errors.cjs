const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER CONSOLE ERROR:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('BROWSER PAGE ERROR:', error.message);
  });

  await page.goto('http://localhost:8080/');
  
  // Wait a bit to let React render and potentially crash
  await page.waitForTimeout(2000);
  
  await browser.close();
})();
