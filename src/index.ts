import { getTempEmail, registerPixKey } from './utils'
import { launch } from "puppeteer";

(async () => {
  const executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

  const browser = await launch({
    executablePath,
    userDataDir: './cache',
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const { email, context } = await getTempEmail(browser);
  await registerPixKey({ browser, email, tempMailContext: context })

})();
