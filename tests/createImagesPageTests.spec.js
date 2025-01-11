import test,{expect,page} from '@playwright/test'
const CreateImagesPage = require('../pages/CreateImagesPage');
const { fillDetailsAndSubmit } = require('../utils/formUtils');
const { verifyImageResolution } = require('../utils/imageUtils');

test('Verify image generation should generate 4 images', async ({ page }) => {
    const createImagesPage = new CreateImagesPage(page);

    await page.goto('https://hacktheicon.scramblerducati.com/create');
    await createImagesPage.closeCookieBanner();
    await createImagesPage.verifyCreateYourScramblerHeading();
    await createImagesPage.fillDescriptionAndGenerateImage('Roger Federer skiing');
    await createImagesPage.verifyGeneratedImages(4);
});

test('Verify user is able to download the image with appropriate resolution', async ({ page }) => {
    const createImagesPage = new CreateImagesPage(page);

    // Generate images
    await page.goto('https://hacktheicon.scramblerducati.com/create');
    await createImagesPage.closeCookieBanner();
    await createImagesPage.verifyCreateYourScramblerHeading();
    await createImagesPage.fillDescriptionAndGenerateImage('Roger Federer skiing');
    await createImagesPage.verifyGeneratedImages(4);

    // Verify no checkboxes before form submission
    await createImagesPage.verifyCheckboxesNotPresentOnImagesBeforeFormSubmission();

    // Fill form and submit
    await fillDetailsAndSubmit(page);

    // Select second image and verify resolution
    await createImagesPage.selectCheckboxOnImage(1);
    const image = createImagesPage.generatedImages.nth(1);
    await verifyImageResolution(image, 2056, 1368);

    await createImagesPage.clickOnNextButtonAndVerify();
    await createImagesPage.clickOnDownloadButton();

});