const puppeteer = require('puppeteer');

(async () => {
    // Replace this with valid account details
    const email = "email@gmail.com"
    const password = "somepasswordetc"

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.sorare.com');
    await page.click('#root > div > div > div.jss17 > div.jss18 > header > div > div > div > div.jss156 > button.MuiButtonBase-root-90.MuiButton-root-63.jss60.blue.medium.MuiButton-text-65')
    
    console.log('waiting for iframe with form to be ready.');
    
    // Wait for iframe to load after login dialoge open
    await page.waitForSelector('#wallet');
    // Wait for input form to load
    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.waitForNetworkIdle({idleTime:15})
    // Everything is loaded
    console.log('iframe is ready. Loading iframe content');
    const elementHandle = await page.$(
        '#wallet',
    );
    const frame = await elementHandle.contentFrame();

    console.log('filling form in iframe');
    
    await frame.type('#Email', email, { delay: 100 });
    await frame.type('#Password', password, { delay: 100 });
    await frame.click('button[type="submit"]')
    await new Promise(resolve => setTimeout(resolve, 5000));
    // other actions...
    await browser.close();
})();
