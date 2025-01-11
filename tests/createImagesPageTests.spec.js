import { test, expect } from '@playwright/test';

async function generatedImages(page){
    await page.goto("https://hacktheicon.scramblerducati.com/create");

    await page.pause();

    //Close the cookie banner
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('heading', { name: 'CREATE YOUR CUSTOM SCRAMBLER' })).toBeVisible();

    // Enter details and click on generate button
    await page.getByRole('textbox', { name: 'Scrambler Ducati [Insert your' }).fill('Roger Federer skiing ');
    await page.getByRole('button', { name: 'Generate', exact: true }).click();

    // Wait for spinner to disappear
    await page.getByRole('img', { name: 'Spinning animated Scrambler' }).waitFor({ state: 'hidden', timeout: 60000 });

    // Assert the heading is visible
    const heading = page.locator('h1.text-primary.w-full.font-extrabold.text-3xl.text-center.mb-8').nth(0);
    await expect(heading).toHaveText('PICK YOUR FAVOURITE GENERATIONS');

    // verify 4 images are generated
    const generatedImages = page.locator('div.md\\:grid.md\\:grid-cols-2.gap-4 img[alt="generated image"]');
    await expect(generatedImages).toHaveCount(4);

}

async function fillDetailsAndSubmit(page){

    await expect(page.getByRole('heading', { name: 'Enter your details' })).toBeVisible();
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('Ranjani');
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Raveendra');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('abc@gmail.com');
    await page.getByRole('combobox', { name: 'Select Country' }).click();
    await page.getByLabel('Australia').getByText('Australia').click();
    
    //select T&C
    await page.getByLabel('to understand your').click();
    await page.getByLabel('for marketing activities via').click();

    //Click on submit 
    await page.getByRole('button', { name: 'Submit' }).click();

    //Verify form is submitted
    await expect(page.getByRole('heading', { name: 'Thank you!' })).toBeVisible();
}


test('verify image generation should generate 4 images', async ({ page }) => {

    await generatedImages(page);

});

test('verify user is able to download the image with appropriate resolution', async ({ page }) => {
    //generate image
    await generatedImages(page);

    //verify checkbox are not available on images before form submission
    const checkboxes = page.locator('div.md\\:grid.md\\:grid-cols-2.gap-4 div.w-8.h-8.xl\\:w-10.xl\\:h-10.border');
    expect(await checkboxes.count()).toBe(0); // Ensure no checkboxes before form submission
    console.log('No checkboxes present before form submission.');

    //fill in the form and submit
    await fillDetailsAndSubmit(page);

    // Wait for checkboxes to appear
    await checkboxes.first().waitFor({ state: 'visible', timeout: 30000 });

    // Verify only 4 checkboxes are now visible
    const checkboxCount = await checkboxes.count();
    console.log('Checkbox count after form submission:', checkboxCount);
    expect(checkboxCount).toBe(4); // Assert there are exactly 4 checkboxes

    // Select the one of the images (second checkbox)
    await checkboxes.nth(1).click();
    console.log('Checkbox selected for the second image.');

    // Verify image resolution
    const image = page.locator('img[alt="generated image"]').nth(0);
    const resolution = await image.evaluate((img) => {
        return {
            width: img.naturalWidth,
            height: img.naturalHeight
        };
    });
    expect(resolution.width).toBe(2056);  // Replace with expected width
    expect(resolution.height).toBe(1368);

    await page.getByRole('button', { name: 'Next' }).click();

    //Download the image
    await expect(page.getByText('Download and share your dream').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'YOUR Scrambler Ducati' })).toBeVisible();
    await page.getByRole('button', { name: 'DOWNLOAD' }).click();
    await expect(page.getByRole('link', { name: 'Back' })).toBeVisible();

})

