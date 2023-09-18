import { browser } from '@wdio/globals'
import { expect } from 'chai'
import LoginPage from '../pageobjects/login.page'
import SecurePage from '../pageobjects/secure.page'

describe('My Login application', () => {
    
    beforeEach(async() => {
        await LoginPage.open()
    })

    it('should login with valid credentials', async () => {

        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        expect(SecurePage.flashAlert).to.exist
        expect(await SecurePage.flashAlert.getText()).to.contain(
            'You logged into a secure area!')
    })
    
    it('should fail to login with wrong username', async () => {
        await LoginPage.login('marina', 'SuperSecretPassword!')
        expect(SecurePage.flashAlert).to.exist
        expect(await SecurePage.flashAlert.getText()).to.contain(
            'Your username is invalid!')
    })

    it('should fail to login with wrong password', async () => {
        await LoginPage.login('tomsmith', 'NOT-SuperSecretPassword!')
        expect(SecurePage.flashAlert).to.exist
        expect(await SecurePage.flashAlert.getText()).to.contain(
            'Your password is invalid!')
    })
        
})
    
describe('Logout application', () => {

    before(async() => {
        await LoginPage.open()
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
    })

    it('should successfully logout', async () => {
        await SecurePage.logout()
        const currentUrl = await browser.getUrl();
        expect(LoginPage.flashAlert).to.exist
        expect(await LoginPage.flashAlert.getText()).to.contain(
            'You logged out of the secure area!')
        expect(currentUrl).to.contain('/login')
    })

})
