import { expect, browser } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';
import SecurePage from '../pageobjects/secure.page';

describe.skip('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!')
    })

    it('should successfully logout', async () => {
        await SecurePage.logout()
        await expect(LoginPage.flashAlert).toBeExisting()
        await expect(LoginPage.flashAlert).toHaveTextContaining(
            'You logged out of the secure area!')
        await expect(browser).toHaveUrlContaining('/login')
    })
    
    it('should fail to login with wrong username', async () => {
        await LoginPage.open()

        await LoginPage.login('marina', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'Your username is invalid!')
    })

    it('should fail to login with wrong password', async () => {
        await LoginPage.open()

        await LoginPage.login('tomsmith', 'NOT-SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'Your password is invalid!')
    })

})
