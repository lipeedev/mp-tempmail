import { Browser } from "puppeteer";

export async function getTempEmail(browser: Browser) {
    const url = 'https://mohmal.com/pt/create/random'
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.goto(url);

    await page.waitForSelector('.email')
    const email = await page.$eval('.email', div => div.innerHTML)
    
    return { email, context };
}