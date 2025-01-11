const { expect } = require('@playwright/test');

class HomePage {
    constructor(page){
        this.page = page;
        this.startToCreateButton = page.getByRole('link', { name: 'Start to create' });
        this.cookieBannerCloseButton = page.getByRole('button', { name: 'Close' });
    }

    async navigateTo(path = '/'){
        await this.page.goto(path)
    }
    async closeCookieBanner(){
        if(await this.cookieBannerCloseButton.isVisible()){
            await this.cookieBannerCloseButton.click();
        }
    }

    async clickStartToCreate(){
        await this.startToCreateButton.click();
        await expect(this.page.getByRole('heading', { name: 'CREATE YOUR CUSTOM SCRAMBLER' })).toBeVisible();
    }

    async  verifyCreatePageURL() {
        await this.page.waitForURL('https://hacktheicon.scramblerducati.com/create');
    }
}

module.exports = HomePage