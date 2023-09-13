import { $ } from '@wdio/globals';
import Page from './page';

class SecurePage extends Page {
   
    get flashAlert () {
        return $('#flash');
    }

    get logoutBtn () {
        return $('a[href="/logout"]');
    }
        
    async logout () {
        await this.logoutBtn.click();
    }
}

module.exports = new SecurePage();
