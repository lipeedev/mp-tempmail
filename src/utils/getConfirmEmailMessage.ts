import { Page } from "puppeteer";

export async function getConfirmEmailMessage(page: Page) {
  const url = 'https://mohmal.com/pt/inbox'
  await page.goto(url);

  const msgID = await page.$$eval('.unseen', divs => {
    return divs[0].getAttribute('data-msg-id')
  })

  await page.goto('https://mohmal.com/pt/message/' + msgID)

  await page.waitForSelector('.mail__text-card')

  const confirmationCode = await page.$$eval('.mail__text-card', pList => {
    return pList.find(p => Number.isInteger(Number(p.innerHTML)))?.innerHTML
  })

  await page.goto('https://mohmal.com/pt/change')
  await page.close();
  return confirmationCode;
}
