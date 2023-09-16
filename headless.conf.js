const { config } = require('./wdio.conf')

exports.config = {
    ...config,
    specs: [
        './test/specs/**/*.js'
    ],
    capabilities: [
        {
            maxInstances: 3,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['--headless', '--disable-gpu']
            }
        },
    ],
}