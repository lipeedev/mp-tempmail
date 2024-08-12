import { Page } from "puppeteer";

export async function getTempEmail(page: Page) {
  const url = 'https://mohmal.com/pt/create/random'
  await page.goto(url);

  await page.waitForSelector('.email')
  const email = await page.$eval('.email', div => div.innerHTML)

  return { email, page };
}
