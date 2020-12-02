const url = 'https://www.mql5.com/ru/signals/653036';
const svgDir = 'svg';
const svgSelectors = [
    '#signal-content > div.s-top-info > div.s-top-info__left-part > div > div.s-plain-card__chart > svg',
    '#radarChart > svg'
];

const errCalback = (err) => {err?console.log(err):''}
const puppeteer = require('puppeteer');
const fs = require('fs');

if (!fs.existsSync(svgDir)) {
    fs.mkdir(svgDir, errCalback);
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    for (const i in svgSelectors) {
        const bodyHandle = await page.$(svgSelectors[i]);
        const svgData = await page.evaluate(body => body.outerHTML, bodyHandle);
        await bodyHandle.dispose();
        const date = (new Date()).toISOString();
        const path = svgDir + '/' + i;
        if (!fs.existsSync(path)) {
            fs.mkdir(path, errCalback);
        }
        fs.writeFile(path + '/' + date + '.svg', svgData, errCalback);
    }
    await browser.close();
})();