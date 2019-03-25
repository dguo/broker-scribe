const fs = require('fs');

const csv = require('csv-parser');
const prompts = require('prompts');
const puppeteer = require('puppeteer-core');

function processTransaction(transaction) {
    console.log(transaction);
}

(async () => {
    const browser = await puppeteer.launch({
        defaultViewport: null,
        executablePath:
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false,
    });

    console.log('Log into TurboTax');

    const page = await browser.newPage();
    await page.goto('https://myturbotax.intuit.com/');
    const {email, password} = await prompts([
        {type: 'text', name: 'email', message: 'Email address'},
        {
            type: 'text',
            name: 'password',
            message: 'Password',
            style: 'password',
        },
    ]);

    await page.evaluate(email => {
        document.getElementById('ius-identifier').value = email;
        document.getElementById('ius-remember').checked = false;
    }, email);

    await Promise.all([
        page.waitFor('#ius-sign-in-mfa-password-collection-current-password'),
        page.click('#ius-sign-in-submit-btn'),
    ]);

    await page.evaluate(password => {
        document.getElementById(
            'ius-sign-in-mfa-password-collection-current-password',
        ).value = password;
    }, password);

    await Promise.all([
        page.waitFor('#ius-mfa-option-email'),
        page.click('#ius-sign-in-mfa-password-collection-continue-btn'),
    ]);

    await page.evaluate(() => {
        document.getElementById('ius-mfa-option-email').checked = true;
    });

    await page.click('#ius-mfa-options-submit-btn');

    const {mfaCode} = await prompts([
        {type: 'text', name: 'mfaCode', message: 'MFA code'},
    ]);

    // fs.createReadStream('betterment-1099-b.csv')
    // .pipe(csv())
    // .on('data', data => processTransaction(data));
})();
