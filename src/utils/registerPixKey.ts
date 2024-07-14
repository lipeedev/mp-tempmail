import { Browser, BrowserContext } from "puppeteer";
import {setTimeout} from 'timers/promises'
import { getConfirmEmailMessage } from "./getConfirmEmailMessage";

interface RegisterPixKeyProps {
    browser: Browser;
    email: string;
    tempMailContext: BrowserContext
}

export async function registerPixKey({ email, browser, tempMailContext }: RegisterPixKeyProps) {
    const url = 'https://www.mercadopago.com.br/pix-keys/app/key-detail-data-entry?timestamp=1720898769453&keyType=EMAIL&flow_id=pix_management'
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector('#EMAIL')
    await page.type('#EMAIL', email)

    await page.click('.bRlvww')
    
    await setTimeout(3_000)
    
    await page.waitForSelector('.bRlvww')
    await page.click('.bRlvww') // confirming register
    
    await page.waitForSelector('.andes-form-control__field')
    await setTimeout(3_000)
    
    const confirmationCode = await getConfirmEmailMessage(tempMailContext) as string;

    await page.bringToFront();
    await page.waitForSelector('.andes-form-control__field')

    const inputDigitOne = await page.$('[id=":R6muh:-digit-0"]');
    const inputDigitTwo = await page.$('[id=":R6muh:-digit-1"]');
    const inputDigitThree = await page.$('[id=":R6muh:-digit-2"]');
    const inputDigitFour = await page.$('[id=":R6muh:-digit-3"]');
    const inputDigitFive = await page.$('[id=":R6muh:-digit-4"]');
    const inputDigitSix = await page.$('[id=":R6muh:-digit-5"]');
   
    await inputDigitOne?.type(confirmationCode[0])
    await inputDigitTwo?.type(confirmationCode[1])
    await inputDigitThree?.type(confirmationCode[2])
    await inputDigitFour?.type(confirmationCode[3])
    await inputDigitFive?.type(confirmationCode[4])
    await inputDigitSix?.type(confirmationCode[5])
    
    await page.click('.enter-code-content__submit')
    
}