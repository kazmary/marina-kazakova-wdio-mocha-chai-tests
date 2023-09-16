const { remote } = require('webdriverio')

const clickCheckboxes = async () => {
    const browser = await remote({
        capabilities: {
            browserName: 'chrome',
        },
    })

    await browser.url('http://the-internet.herokuapp.com/checkboxes');

    const checkbox1 = await browser.$('#checkboxes input[type="checkbox"]:nth-child(1)')
    const checkbox2 = await browser.$('#checkboxes input[type="checkbox"]:nth-child(3)')

    const randomClickCount = () => {
        return Math.floor(Math.random() * 10) + 1
    }

    const timesClicks1 = randomClickCount()
    for (let i = 0; i < timesClicks1; i++) {
        await checkbox1.click()
    }

    const  timesClicks2 = randomClickCount()
    for (let i = 0; i <  timesClicks2; i++) {
        await checkbox2.click()
    }

    await browser.deleteSession()
}

module.exports = clickCheckboxes

clickCheckboxes()
