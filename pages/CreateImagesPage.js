const { expect } = require('@playwright/test');
const exp = require('constants');

class CreateImagesPage{
    constructor (page){
        this.page = page;
        this.cookieBannerCloseButton = page.getByRole('button', { name: 'Close' });
        this.descriptionTextbox = page.getByRole('heading', { name: 'CREATE YOUR CUSTOM SCRAMBLER' });
        this.insertYourDescription = page.getByRole('textbox', { name: 'Scrambler Ducati [Insert your' });
        this.generateButton = page.getByRole('button', { name: 'Generate', exact: true });
        this.spinner = page.getByRole('img', { name: 'Spinning animated Scrambler' });
        this.generatedImages = page.locator('div.md\\:grid.md\\:grid-cols-2.gap-4 img[alt="generated image"]');
        this.checkboxes = page.locator('div.md\\:grid.md\\:grid-cols-2.gap-4 div.w-8.h-8.xl\\:w-10.xl\\:h-10.border');
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.downloadHeader = page.getByRole('heading', { name: 'YOUR Scrambler Ducati' });
        this.downloadButton = page.getByRole('button', { name: 'DOWNLOAD' });
        this.backButton = page.getByRole('link', { name: 'Back' });
    }

    async closeCookieBanner(){
        if(await this.cookieBannerCloseButton.isVisible()){
            await this.cookieBannerCloseButton.click();
        }
    }

    async verifyCreateYourScramblerHeading() {
        await this.descriptionTextbox.isVisible();
    }

    async fillDescriptionAndGenerateImage(imageDescription){
        await this.insertYourDescription.fill(imageDescription);
        await this.generateButton.click();
        await this.spinner.waitFor({state:'hidden',timeout:60000})
    }

    async verifyGeneratedImages(count){
        await expect(this.generatedImages).toHaveCount(count);
    
    }

    async verifyCheckboxesNotPresentOnImagesBeforeFormSubmission() {
        const checkboxCount = await this.checkboxes.count();
        expect(checkboxCount).toBe(0);
        if (checkboxCount > 0) {
            throw new Error('Checkboxes found before form submission.');
        }
    }
    
    async selectCheckboxOnImage(index){
        await this.checkboxes.nth(index).click(); 
    }

    async clickOnNextButtonAndVerify(){
        await this.nextButton.click();
        await expect(this.downloadHeader).toBeVisible();
    }

    async clickOnDownloadButton(){
        await this.downloadButton.click();
        await expect(this.backButton).toBeVisible();
    }

}

module.exports = CreateImagesPage;

