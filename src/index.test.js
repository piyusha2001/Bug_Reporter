const puppeteer = require('puppeteer');

const { appendFile, writeFile } = require('fs');
const { promisify } = require('util');
var os = require('os');
const writeFileasync = promisify(writeFile);

test('Validating all fields', async () => {
	browser = await puppeteer.launch({
		headless: false,
		slowMo: 40,
		args: ['--window-size=1920,1080'],
	});
	const page = await browser.newPage();
	await page.goto('https://bug-reporter.netlify.app/');

	await page.click('input#exampleFormControlInput1.form-control');
	await page.type(
		'input#exampleFormControlInput1.form-control',
		'Bug name-1',
	);

	await page.click('textarea#exampleFormControlTextarea1.form-control');
	await page.type(
		'textarea#exampleFormControlTextarea1.form-control',
		'Bug description-1',
	);
	await page.click('button#submitbutton');
	let successPanel = await page.waitForSelector('div.bug-item-unresolved');
	expect(successPanel).toBeDefined();
	jest.setTimeout(30000);
	await page.screenshot({ path: './src/assets/validinputs.png' });
	if (successPanel) {
		await writeFileasync(
			'./report.txt',
			'Test1-->Validating all fields - Passed' + os.EOL,
		);
		appendFile(
			'./report.txt',
			'As we are getting the div of unresolved bugs we can say that the submit button is responding to all the validated input fields' +
				os.EOL,
			(err) => {
				if (err) throw err;
			},
		);
	}
	await browser.close();
}, 30000);

//invalid inputs
test('Invalid inputs', async () => {
	browser = await puppeteer.launch({
		headless: false,
		slowMo: 40,
		args: ['--window-size=1920,1080'],
	});
	const page = await browser.newPage();
	await page.goto('https://bug-reporter.netlify.app/');
	await page.click('input#exampleFormControlInput1.form-control');
	await page.type('input#exampleFormControlInput1.form-control', '');
	await page.click('textarea#exampleFormControlTextarea1.form-control');
	await page.type('textarea#exampleFormControlTextarea1.form-control', '');
	await page.click('button#submitbutton');
	jest.setTimeout(30000);
	const invalidinputss = await page.screenshot({
		path: './src/assets/invalidinput.png',
		fullPage: true,
	});
	if (invalidinputss) {
		appendFile(
			'./report.txt',
			`Test2-->Invalid inputs - Passed ${os.EOL}As we are getting the error message for the invalid inputs we can say that the submit button is not responding to the invalid inputs` +
				os.EOL,
			(err) => {
				if (err) throw err;
			},
		);
	}
}, 30000);

//check if bug is resolved
test('Check if bug is resolved', async () => {
	browser = await puppeteer.launch({
		headless: false,
		slowMo: 40,
		args: ['--window-size=1920,1080'],
	});
	const page = await browser.newPage();
	await page.goto('https://bug-reporter.netlify.app/');

	await page.click('input#exampleFormControlInput1.form-control');
	await page.type(
		'input#exampleFormControlInput1.form-control',
		'Bug name-1',
	);

	await page.click('textarea#exampleFormControlTextarea1.form-control');
	await page.type(
		'textarea#exampleFormControlTextarea1.form-control',
		'Bug description-1',
	);
	await page.click('button#submitbutton');
	let successPanel = await page.waitForSelector('div.bug-item-unresolved');
	expect(successPanel).toBeDefined();
	await page.click('button#resolvebutton');
	let resolvedPanel = await page.waitForSelector('div.bug-item-resolved');
	expect(resolvedPanel).toBeDefined();

	jest.setTimeout(30000);
	await page.screenshot({ path: './src/assets/resolvedbug.png' });
	if (resolvedPanel) {
		appendFile(
			'./report.txt',
			`Test3-->Check if bug is resolved - Passed ${os.EOL}As we are getting the div of resolved bugs we can say that the resolve button is working` +
				os.EOL,
			(err) => {
				if (err) throw err;
			},
		);
	}
	await browser.close();
}, 30000);

//check if bug is deleted
test('Check if bug is deleted', async () => {
	browser = await puppeteer.launch({
		headless: false,
		slowMo: 40,
		args: ['--window-size=1920,1080'],
	});
	const page = await browser.newPage();
	await page.goto('https://bug-reporter.netlify.app/');

	await page.click('input#exampleFormControlInput1.form-control');
	await page.type(
		'input#exampleFormControlInput1.form-control',
		'Bug name-1',
	);

	await page.click('textarea#exampleFormControlTextarea1.form-control');
	await page.type(
		'textarea#exampleFormControlTextarea1.form-control',
		'Bug description-1',
	);
	await page.click('button#submitbutton');
	let successPanel = await page.waitForSelector('div.bug-item-unresolved');
	expect(successPanel).toBeDefined();
	await page.click('button#resolvebutton');
	let resolvedPanel = await page.waitForSelector('div.bug-item-resolved');
	expect(resolvedPanel).toBeDefined();
	await page.screenshot({ path: './src/assets/beforefeleting.png' });
	await page.click('button#deletebutton');
	jest.setTimeout(2000);
	let deletedPanel = await page.waitForSelector(
		'section.bugs-list.center_div',
	);
	expect(deletedPanel).toBeDefined();
	jest.setTimeout(30000);
	await page.screenshot({ path: './src/assets/afterdeleting.png' });
	if (deletedPanel) {
		appendFile(
			'./report.txt',
			`Test4-->Check if bug is deleted - Passed ${os.EOL}As we are not getting the div of resolved bugs we can say that the delete button is working` +
				os.EOL,
			(err) => {
				if (err) throw err;
			},
		);
	}
	await browser.close();
}, 30000);
