import test,{expect,page} from '@playwright/test'
const HomePage = require('../pages/HomePage');

test('Verify Start to create button',async({page})=> {
    const homePage = new HomePage(page);

    await homePage.navigateTo("https://hacktheicon.scramblerducati.com/");
    await homePage.closeCookieBanner();
    await homePage.clickStartToCreate();
    await homePage.verifyCreatePageURL();
});