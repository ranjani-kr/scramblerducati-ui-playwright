import test, { expect, page } from '@playwright/test'

test('verify image generation should generate 4 images', async ({ page }) => {

    await page.goto("https://hacktheicon.scramblerducati.com/create");
    
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

})

