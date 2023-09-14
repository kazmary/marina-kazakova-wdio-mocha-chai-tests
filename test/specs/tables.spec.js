import { browser, expect } from '@wdio/globals';
import TablesPage from '../pageobjects/tables.page';

describe('Sorted Tables', () => {

    before(async() => {
        await TablesPage.open()
    })

    it('should sort columns in ASC order', async() => {
        const lastName = TablesPage.tableHeaders[0];
        expect(lastName).toHaveText('Last Name');
        await lastName.click();
        await browser.pause(1500);
        let lastNamesArray = [];
        await TablesPage.lastNames.forEach(lName => lastNamesArray.push(lName.getText()))
        console.log(`Here comes array: ${lastNamesArray}`)
        let sortedLastNamesArray = lastNamesArray.sort()
        console.log(`Here comes sorted array: ${sortedLastNamesArray}`)
        expect(lastNamesArray).toEqual(sortedLastNamesArray)
    
    })

    it('should sort columns in DESC order', async() => {
        console.log('Coming soon...')
    })


})