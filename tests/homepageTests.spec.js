import test,{expect,page} from '@playwright/test'

test('Verify Start to create button',async({page})=> {
    await page.goto('https://hacktheicon.scramblerducati.com/')
    //await page.pause()
    await page.getByRole('button', { name: 'Close' }).click()
    await page.getByRole('link', { name: 'Start to create' }).click();
    await expect(page.getByRole('heading', { name: 'CREATE YOUR CUSTOM SCRAMBLER' })).toBeVisible();
    await expect(page).toHaveURL("https://hacktheicon.scramblerducati.com/create")

})