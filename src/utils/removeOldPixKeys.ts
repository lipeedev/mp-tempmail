import { Page } from "puppeteer";

export async function removeOldPixKeys(page: Page) {
  const url = 'https://www.mercadopago.com.br/pix-keys/app/key-management'
  await page.goto(url);

  let hasOldPixKeys = true;

  while (hasOldPixKeys) {
    await page.waitForSelector('.gysQuL')

    const oldPixKeysThreeDots = await page.$$('.eQmTBN')

    if (oldPixKeysThreeDots.length) {
      const threeDots = oldPixKeysThreeDots[0]

      await threeDots.click()
      await threeDots.waitForSelector('.cxQmJS')

      const optionsToSelectOnThreeDots = await threeDots.$$('.cxQmJS')

      const optionToRemovePixKey = optionsToSelectOnThreeDots[1]
      await optionToRemovePixKey.click()

      await page.waitForSelector('.ismRdj')
      await page.click('.ismRdj')
      await page.reload();
    }
    else {
      hasOldPixKeys = false
    }
  }

  console.log('Chaves PIX removidas com sucesso!')
  await page.close()

}
