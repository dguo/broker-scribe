const fs = require('fs');

const csv = require('neat-csv');
const prompts = require('prompts');
const puppeteer = require('puppeteer-core');

function mapHeaders({header, index}) {
    if (header === 'Description') {
        return 'description';
    } else if (header === 'Date Acquired') {
        return 'dateAcquired';
    } else if (header === 'Date Sold') {
        return 'dateSold';
    } else if (header === 'Gross Proceeds') {
        return 'grossProceeds';
    } else if (header == 'Cost or Other Basis') {
        return 'costBasis';
    } else if (header === 'Reporting Category') {
        return 'reportingCategory';
    }

    return null;
}

async function processTransaction(page, transaction) {
    console.log(transaction);

    await page.type('#edt_00', transaction.description);
    await page.type('#edt_01', transaction.dateSold);
    await page.type('#edt_02', transaction.dateAcquired);
    await page.type('#edt_03', transaction.grossProceeds);
    await page.type('#edt_04', transaction.costBasis);

    let category;
    if (transaction.reportingCategory === 'D') {
        category = '4';
    } else if (transaction.reportingCategory === 'A') {
        category = '1';
    } else {
        throw new Error('Unexpected reporting category');
    }

    await page.select('#combo_00', category);

    // "I'll enter additional info on my own"
    await page.click('#Ill_00');
}

async function logIn(page) {
    console.log('Log into TurboTax');

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

    await page.click('#ius-sign-in-mfa-password-collection-continue-btn');

    await page.waitFor(5000);

    if ((await page.$('#ius-mfa-options-submit-btn')) !== null) {
        await page.evaluate(() => {
            document.getElementById('ius-mfa-option-email').checked = true;
        });

        await page.click('#ius-mfa-options-submit-btn');

        const {mfaCode} = await prompts([
            {type: 'text', name: 'mfaCode', message: 'MFA code'},
        ]);

        await page.evaluate(mfaCode => {
            document.getElementById('ius-mfa-confirm-code').value = mfaCode;
        }, mfaCode);

        await page.click('#ius-mfa-otp-submit-btn');
    }
}

async function getBrowser() {
    const browser = await puppeteer.launch({
        defaultViewport: null,
        executablePath:
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false,
    });

    return browser;
}

(async () => {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await logIn(page);

    console.log(
        'Go to the add sales page, and choose to enter one sale at a time',
    );

    await prompts([
        {
            type: 'confirm',
            message: 'Ready?',
        },
    ]);

    let transactions = fs.readFileSync('betterment-1099-b.csv');
    transactions = await csv(transactions, {mapHeaders});

    for (let transaction of transactions) {
        await processTransaction(page, transaction);
        break;
    }
})();
