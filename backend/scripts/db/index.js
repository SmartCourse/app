const { PRODUCTION } = require('../../src/models/constants')
const { Request } = require('tedious')
const {
    sqlTables,
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

async function init() {
    return new Promise((resolve, reject) => {
        // Do the initialisation
        const [connection] = db.connections

        // Create the database and initialise data with no dependencies.
        const request = new Request(sqlTables(), async (err) => {
            if (err) reject(err)

            // Initialise with UNSW data
            if (!await unswDataInitialised(connection)) {
                await sqlUniversity(connection)
                await sqlFaculties(connection)
                await sqlDegrees(connection)
                await sqlSubjects(connection)
                await sqlCourses(connection)
                await sqlSessions(connection)
            }

            // user and question tables get dropped on init, so we must always re-add them
            await sqlAdminUsers(connection)
            await sqlQuestions(connection)

            // Initialise testing data
            // uses review table to check if initialization has happened
            if (!PRODUCTION && !await reviewTestDataInitialised(connection)) {
                await sqlReviews(connection)
                await sqlComments(connection)
                await sqlLikes(connection)
                await sqlUsers(connection)
            }

            // Done
            resolve()
        })
        connection.execSql(request)
    })
}

// Wait until a connection is made
db.on('ready', async function () {
    // Database initialisation benchmarking
    const timeList = [Date.now() / 1000]
    // Wait for database to initialize
    await init()
    // Log completion time
    timeList.push(Date.now() / 1000)
    console.log(`Done creating database! (${((timeList[1] - timeList[0])).toFixed(3)})`)
})
