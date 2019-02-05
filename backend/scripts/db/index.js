const { PRODUCTION, TESTING } = require('../../src/models/constants')
const { getConfig } = require('./config')
const stdio = require('stdio')
const db = require('../../src/models/db')
const { init } = require('./init_sql')

// Wait until a connection is made
db.on('ready', async function () {

    const config = getConfig()

    // Safety prompt
    if (PRODUCTION) {
        // list of bad things
        const naughty = [
            {bad: config.drop !== 'none', message: 'WARNING: You are about to DELETE ALL USER DATA on production!'},
            {bad: config.init !== 'none', message: `WARNING: You are about to insert ${config.init} data on production!`}
        ].filter(({bad}) => bad).map(({message}) => message) // just keep the messages

        if (naughty.length) {
            // print the messages
            naughty.forEach(message => { console.log(message) })
            // prompt twice for extra safety!
            const proceed = await new Promise((resolve, reject) => {
                stdio.question('continue? Y/n', (err, text) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    if (text.toLowerCase() !== 'y') {
                        resolve(false)
                        return
                    }
                    stdio.question('Are you really absolutely sure? Y/n', (err, text) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        if (text.toLowerCase() !== 'y') {
                            resolve(false)
                            return
                        }
                        resolve(true)
                    })
                })
            })
            if (!proceed) {
                console.log('Phew! That was close!')
                process.exit(0)
            }
        }
    }

    // Database initialisation benchmarking
    const timeList = [Date.now() / 1000]
    // Wait for database to initialize
    await init(db, config)
    // Log completion time
    timeList.push(Date.now() / 1000)
    console.log(`Done creating database! (${((timeList[1] - timeList[0])).toFixed(3)})`)
    db.close()
})
