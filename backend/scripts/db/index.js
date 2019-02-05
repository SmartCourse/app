const { PRODUCTION, TESTING } = require('../../src/models/constants')
const { Request } = require('tedious')
const { getConfig } = require('./config')
const stdio = require('stdio');
const {
    dropTables,
    createTables,
    sqlUniversity,
    sqlFaculties,
    sqlDegrees,
    sqlSubjects,
    sqlCourses,
    sqlQuestions,
    sqlReviews,
    sqlComments,
    sqlSessions,
    sqlLikes,
    sqlAdminUsers,
    sqlUsers,
    unswDataInitialised,
    reviewTestDataInitialised
} = require('./init_sql')
const db = require('../../src/models/db')

async function init({ drop, create, init }) {

    /* drop, create and init must all be defined here! */

    const [connection] = db.connections

    if (drop !== 'none') {

        console.log(`Dropping ${drop} tables`)
        const dropAll = drop === 'all'

        await new Promise((resolve, reject) => {
            const request = new Request(dropTables(dropAll), async (err) => {
                if (err) reject(err)
                else resolve()
            })
            connection.execSql(request)
        })
    }

    if (create !== 'none') {
        console.log(`Creating all tables`)

        await new Promise((resolve, reject) => {
            const request = new Request(createTables(), async (err) => {
                if (err) reject(err)
                else resolve()
            })
            connection.execSql(request)
        })
    }

    if (init !== 'none') {

        // Static data - university
        // init === 'static' or higher
        // testing optimization; we can skip this if it looks like data is initialized
        if (TESTING && await unswDataInitialised(connection)) {
            console.log('Skipping static data init - it looks like it\'s already there')
        } else {
            console.log('Adding university data')
            await sqlUniversity(connection)
            await sqlFaculties(connection)
            await sqlDegrees(connection)
            await sqlSubjects(connection)
            await sqlCourses(connection)
            await sqlSessions(connection)
        }

        // Basic data - admin users and FAQs
        if (init === 'basic' || init === 'test') {
            console.log('Adding admin users and FAQs')
            await sqlAdminUsers(connection)
            await sqlQuestions(connection)
        }

        // Test data
        if (init === 'test') {
            console.log('Adding test data')
            await sqlReviews(connection)
            await sqlComments(connection)
            await sqlLikes(connection)
            await sqlUsers(connection)
        }
    }

}

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
    await init(config)
    // Log completion time
    timeList.push(Date.now() / 1000)
    console.log(`Done creating database! (${((timeList[1] - timeList[0])).toFixed(3)})`)
    db.close()
})
