const { remote } = require('webdriverio')

const selectOption = async () => {
    const browser = await remote({
        capabilities: {
            browserName: 'chrome',
        }
    })

    await browser.url('http://the-internet.herokuapp.com/dropdown')

    const dropdown = await browser.$('#dropdown')
    const options = await dropdown.$$('option:not(:disabled)')
    const randomIndex = Math.floor(Math.random() * options.length)
    
    await dropdown.click()
    await options[randomIndex].click()

    await browser.deleteSession()

}

module.exports = selectOption

selectOption()