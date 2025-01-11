const userDetails = require('../test-data/userDetails.json');

async function fillDetailsAndSubmit(page) {
    await page.getByRole('textbox', { name: 'First Name' }).fill(userDetails.firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).fill(userDetails.lastName);
    await page.getByRole('textbox', { name: 'Email' }).fill(userDetails.email);
    await page.getByRole('combobox', { name: 'Select Country' }).click();
    await page.getByLabel('Australia').getByText('Australia').click();
    await page.getByLabel('to understand your').click();
    await page.getByLabel('for marketing activities via').click();
    await page.getByRole('button', { name: 'Submit' }).click();
}

module.exports = { fillDetailsAndSubmit };
