import { BrowserContext } from "puppeteer";
import { setTimeout } from 'timers/promises'

export async function getConfirmEmailMessage(context: BrowserContext) {
    const url = 'https://mohmal.com/pt/inbox'
    const page = await context.newPage();
    await page.goto(url);

    const msgID = await page.$$eval('.unseen', divs => {
        return divs[0].getAttribute('data-msg-id')
    })

    await page.goto('https://mohmal.com/pt/message/' + msgID)

    await page.waitForSelector('.mail__text-card')

    const confirmationCode = await page.$$eval('.mail__text-card', pList => {
        return pList.find(p => Number.isInteger(Number(p.innerHTML)))?.innerHTML
    })

    await page.browserContext().close();
    return confirmationCode;
}
