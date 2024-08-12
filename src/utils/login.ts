import { launch } from "puppeteer";

(async () => {
  const executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

  const browser = await launch({
    executablePath: '/usr/bin/google-chrome',
    userDataDir: './cache',
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage();
  await page.goto('https://mercadopago.com.br/');
})();
