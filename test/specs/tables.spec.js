const forEach = require('mocha-each')
import { expect, browser, $$ } from '@wdio/globals'
import TablesPage from '../pageobjects/tables.page'

describe('Tables ASC sorting', () => {

    beforeEach(async()=> {
        await TablesPage.open()
    })

    forEach([
        ['Last Name', TablesPage.getLastNames, 0],
        ['First Name', TablesPage.getFirstNames, 1],
        ['Email', TablesPage.getEmails, 2],
        ['Web Site', TablesPage.getWebsites, 4],
    ]).it('should sort %s column in ASC order', async (header, dataFunction, i) => {
        // Load data from the page
        const initialColumnValues = await dataFunction()
        const currentHeaderElement = (await TablesPage.tableHeaders)[i]

        // Click on the header to sort in ASC order
        await currentHeaderElement.click()
        const columnValues = await dataFunction()

        // Get the column values and sort it as strings
        const sortedColumnValues = [...initialColumnValues].sort()

        // Compare the sorted values to the actual values
        expect(initialColumnValues).not.toEqual(sortedColumnValues)
        expect(columnValues).toEqual(sortedColumnValues)
    })

    it('should sort Due column in ASC order', async () => {
        // To sort currency values we need to turn them into numbers
        let initialColumnValues = []
        ;(await TablesPage.getDues()).forEach(dueValue => initialColumnValues.push(Number(dueValue.slice(1))))
        
        // Click on the header to sort in ASC order
        await TablesPage.tableHeaders[3].click()
        let columnValues = []
        ;(await TablesPage.getDues()).forEach(dueValue => columnValues.push(Number(dueValue.slice(1))))

        // Get the column values and sort it as numbers
        const sortedColumnValues = [...initialColumnValues].sort((a,b) => a-b)

        // Compare the sorted values to the actual values
        expect(initialColumnValues).not.toEqual(sortedColumnValues)
        expect(columnValues).toEqual(sortedColumnValues)
    })
})

describe('Tables DESC sorting', () => {

    beforeEach(async()=> {
        await TablesPage.open()
    })

    forEach([
        ['Last Name', TablesPage.getLastNames, 0],
        ['First Name', TablesPage.getFirstNames, 1],
        ['Email', TablesPage.getEmails, 2],
        ['Web Site', TablesPage.getWebsites, 4],
    ])
        .it('should sort %s column in ASC order', async (header, dataFunction, i) => {
            // Load data from the page
            const initialColumnValues = await dataFunction()
            const currentHeaderElement = (await TablesPage.tableHeaders)[i]

            // Click on the header to sort in ASC order
            await currentHeaderElement.doubleClick()
            const columnValues = await dataFunction()

            // Get the column values and sort it as strings
            const descColumnValues = [...columnValues].sort().reverse()

            // Compare the sorted values to the actual values
            expect(initialColumnValues).not.toEqual(descColumnValues)
            expect(columnValues).toEqual(descColumnValues)
        })

    it('should sort Due column in DESC order', async () => {
        // To sort currency values we need to turn them into numbers
        let initialColumnValues = []
        ;(await TablesPage.getDues()).forEach(dueValue => initialColumnValues.push(Number(dueValue.slice(1))))
        
        // Click on the header to sort in ASC order
        await TablesPage.tableHeaders[3].doubleClick()
        let columnValues = []
        ;(await TablesPage.getDues()).forEach(dueValue => columnValues.push(Number(dueValue.slice(1))))

        // Get the column values and sort it as numbers
        const sortedColumnValues = [...initialColumnValues].sort((a,b) => b-a)

        // Compare the sorted values to the actual values
        expect(initialColumnValues).not.toEqual(sortedColumnValues)
        expect(columnValues).toEqual(sortedColumnValues)
    })
})

describe('Tables clickable elements', () => {

    before(async() => {
        await TablesPage.open()
    })

    it('should be interactive', async () => {
        TablesPage.edits.forEach(async el => await expect(el).toBeClickable())
        TablesPage.deletes.forEach(async el => await expect(el).toBeClickable())

        TablesPage.edits.forEach(async el => await expect(el).toHaveHref('#edit'))
        TablesPage.deletes.forEach(async el => await expect(el).toHaveHref('#delete'))

    })
    
    it('should redirect', async () => {
        const clickables = await $$('#table1 td:last-of-type a')
    
        console.log(`Array length: ${clickables.length}`)
        for (let i = 0; i < clickables.length; i++) {
            await clickables[i].click()
            if(i === 0 || i % 2 === 0){
                expect(await browser.getUrl()).toHaveText('#edit')
            } else {
                expect(await browser.getUrl()).toHaveText('#delete')  
            }
        }
    })

})