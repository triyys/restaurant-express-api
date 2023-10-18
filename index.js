const path = require('path')

// Module alias config
const moduleAlias = require('module-alias')
moduleAlias.addAliases({
    '@root': __dirname,
    '@': path.join(__dirname, 'app'),
})

const ErrorHandler = require('@/common/ErrorHandler')
const { port } = require('./config')
const postgres = require('@/services/postgres')
const mongodb = require('@/services/mongodb')
const app = require('./app');

app.listen(port, async () => {
    console.log(`Server is running on port ${port}.`)
    try {
        await mongodb.connect()
        await postgres.connect()
        await ErrorHandler.loadErrorDictionary()
        console.log('All data loaded')
    } catch (error) {
        console.log(error)
        console.error('Failed to load app data')
    }
})
