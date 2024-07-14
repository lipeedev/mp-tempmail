import { getTempEmail, registerPixKey } from './utils'
import { launch } from "puppeteer";

(async () => {

  const browser = await launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    userDataDir: './cache',
    headless: false,
    defaultViewport: null
  })

  const { email, context } = await getTempEmail(browser);
  await registerPixKey({ browser, email, tempMailContext: context })

})();