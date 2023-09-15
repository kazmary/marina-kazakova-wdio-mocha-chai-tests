import { $$ } from '@wdio/globals';
import Page from './page';

class TablesPage extends Page {
    
    get tableHeaders () { return $$('#table1 th span'); }

    get edits () { return $$('#table1 td:last-of-type a:first-of-type'); }
    
    get deletes () { return $$('#table1 td:last-of-type a:last-of-type'); }

    async getHeaders() {
        const headersArray = [];
        const tableHeaders = await $$('#table1 th span');
    
        for (const header of tableHeaders) {
            headersArray.push(await header.getText());
        }
    
        return headersArray;
    }
    
    async getLastNames() {
        const lastNamesArray = [];
        const lastNames = await $$('#table1 tr td:first-of-type');
    
        for (const lastName of lastNames) {
            lastNamesArray.push(await lastName.getText());
        }
    
        return lastNamesArray;
    }
    
    async getFirstNames() {
        const firstNamesArray = [];
        const firstNames = await $$('#table1 tr td:nth-of-type(2)');
    
        for (const firstName of firstNames) {
            firstNamesArray.push(await firstName.getText());
        }
    
        return firstNamesArray;
    }
    
    async getEmails() {
        const emailsArray = [];
        const emails = await $$('#table1 tr td:nth-of-type(3)');
    
        for (const email of emails) {
            emailsArray.push(await email.getText());
        }
    
        return emailsArray;
    }
    
    async getDues() {
        const duesArray = [];
        const dues = await $$('#table1 tr td:nth-of-type(4)');
    
        for (const due of dues) {
            duesArray.push(await due.getText());
        }
    
        return duesArray;
    }
    
    async getWebsites() {
        const websitesArray = [];
        const websites = await $$('#table1 tr td:nth-of-type(5)');
    
        for (const website of websites) {
            websitesArray.push(await website.getText());
        }
    
        return websitesArray;
    }

    open () {
        return super.open('/tables')
    }

}

export default new TablesPage()