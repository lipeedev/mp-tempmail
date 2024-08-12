import { getTempEmail, registerPixKey, removeOldPixKeys } from './utils'
import { launch } from "puppeteer";

(async () => {
  const executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const auth = {
    password: 'fevyfv436nhc',
    username: 'brd-customer-hl_b3529f5b-zone-betbot_daniel',
  }

  const browser = await launch({
    executablePath,
    userDataDir: './cache',
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--proxy-server=brd.superproxy.io:22225'],
  })

  const page = await browser.newPage();
  await page.authenticate(auth)
  await removeOldPixKeys(page)

  for (let i = 0; i < 5; i++) {
    const page = await browser.newPage();

    await page.authenticate(auth)

    const { email, page: pageOfTempMail } = await getTempEmail(page);
    await registerPixKey({ browser, email, pageOfTempMail })
    console.log(`${email} >> REGISTRADO!`)
  }

  const firstPageOpenedByDefault = (await browser.pages())[0];
  await firstPageOpenedByDefault.authenticate(auth)
  await firstPageOpenedByDefault.goto('https://www.mercadopago.com.br/pix-keys/app/key-management')

})();
