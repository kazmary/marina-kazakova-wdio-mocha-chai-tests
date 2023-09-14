import { $$ } from '@wdio/globals';
import Page from './page';

class TablesPage extends Page {
    
    get tableHeaders () { return $$('#table1 th span'); }

    get lastNames () { return $$('#table1 tr td:first-of-type'); }

    get firstNames () { return $$('#table1 tr td:nth-of-type(2)'); }

    get emails () { return $$('#table1 tr td:nth-of-type(3)'); }

    get dues () { return $$('#table1 tr td:nth-of-type(4)'); }

    get websites () { return $$('#table1 tr td:nth-of-type(5)'); }

    getHeaders () {
        let headersArray
        this.tableHeaders.forEach(header => headersArray.push(header.getText()))
        return headersArray
    }

    getLastNames () {
        let lastNamesArray
        this.lastNames.forEach(el => lastNamesArray.push(el.getText()))
        return lastNamesArray
    }

    getFirstNames () {
        let firstNamesArray
        this.firstNames.forEach(el => firstNamesArray.push(el.getText()))
        return firstNamesArray
    }

    getEmails () {
        let emailsArray
        this.emails.forEach(el => emailsArray.push(el.getText()))
        return emailsArray
    }

    getDues () {
        let duesArray
        this.dues.forEach(el => duesArray.push(el.getText()))
        return duesArray
    }

    getWebsites () {
        let websitesArray
        this.websites.forEach(el => websitesArray.push(el.getText()))
        return websitesArray
    }

    open () {
        return super.open('/tables')
    }

}

export default new TablesPage()