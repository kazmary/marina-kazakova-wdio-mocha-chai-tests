const { expect } = require('chai');
import { browser } from '@wdio/globals'
import HoversPage from '../pageobjects/hovers.page'

describe('Hover over elements', () => {

    beforeEach(async()=> {
        await HoversPage.open()
    })

    it('should keep user info NOT revealed', async () => {
        const userNames = await HoversPage.userNames
        const profileLinks = await HoversPage.profileLinks
        for (let i = 0; i < userNames.length; i++) {
            expect(await userNames[i].isDisplayed()).to.be.false
            expect(await profileLinks[i].isDisplayed()).to.be.false
        }
    })
    
    it('should reveal user info when hovered over', async () => {
        const userImages = await HoversPage.userImages
        const profileLinks = await HoversPage.profileLinks
        const userNames = await HoversPage.userNames
        
        for (let i = 0; i < profileLinks.length; i++) {
            await userImages[i].moveTo()
            expect(await userNames[i].getText()).to.equal(`name: user${i+1}`)
            expect(await profileLinks[i].getText()).to.equal('View profile')
            expect(await userNames[i].isDisplayed()).to.be.true
            expect(await profileLinks[i].isDisplayed()).to.be.true
            expect(await profileLinks[i].isClickable()).to.be.true
        }
    })
})

describe('Redirect to profile page', () => {
    
    it('should redirect user to chosen profile page', async () => {
        await HoversPage.open()

        const userImages = await HoversPage.userImages
        const profileLinks = await HoversPage.profileLinks
    
        for (let i = 0; i < profileLinks.length; i++) {
            await userImages[i].moveTo()
            await profileLinks[i].click()
            ;(await HoversPage.userPageElement).waitForDisplayed()
    
            const currentUrl = await browser.getUrl();
            expect(currentUrl).to.equal(`https://the-internet.herokuapp.com/users/${i+1}`);
    
            await browser.back()
        }
    })
})
