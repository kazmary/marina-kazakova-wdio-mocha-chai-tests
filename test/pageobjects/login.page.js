import { $ } from '@wdio/globals'
import Page from './page'
class LoginPage extends Page {
    
    get inputUsername () {
        return $('#username')
    }

    get inputPassword () {
        return $('#password')
    }

    get btnSubmit () {
        return $('button[type="submit"]')
    }

    get flashAlert () {
        return $('#flash')
    }

    async login (username, password) {
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.btnSubmit.click()
    }

    open () {
        return super.open('login')
    }
}

export default new LoginPage()
