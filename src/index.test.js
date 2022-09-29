const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://bug-reporter.netlify.app/');
	await page.screenshot({ path: './assets/example.png' });

	await browser.close();
})();
