const Connection = require('tedious').Connection
const Request = require('tedious').Request
const { sqlTables } = require('./init_sql')
const { insertDB, insertUniqueDB, updateDB } = require('./js/tables')

// SQL Server Config
const testing = process.env.NODE_ENV === 'production' ? 0 : 1
const DB_NAME = testing ? 'smartcourse-staging' : 'smartcourse'
const config = {
    userName: process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER,
    options:
        {
            database: DB_NAME,
            encrypt: true
        }
}

/**
 * Very slight abstraction over the direct sql queries.
 * This object can be instantiated once and then all queries are assumed to be
 * already filtered at this point.
 * @param {string} databaseName The name of the db if it needs to be passed in.
 */
class DB {
    constructor() {
        this._initialised = false
    }

    init() {
        // Check the databse hasn't already been initialised
        if (this._initialised) {
            return
        }

        // Database initialisation benchmarking
        const timeList = [Date.now() / 1000]
        this._db = new Connection(config)
        return new Promise((resolve, reject) => {
            this._db.on('connect', (err) => {
                if (err) {
                    console.log(err)
                } else {
                    // Create the database and initialise data with no dependencies.
                    let sql = 'BEGIN TRANSACTION;\n'
                    sql += sqlTables() + '\n'
                    /*
                    sql += sqlUniversity('UNSW') + '\n'
                    sql += faculties.map(sqlFaculty).join('\n') + '\n'
                    sql += degreeData.map(sqlDegree).join('\n') + '\n'
                    sql += subjects.map(sqlSubject).join('\n') + '\n'
                    sql += courses.map(sqlCourse).join('\n') + '\n'

                    // If this is a test database, add the testing data
                    if (testing) {
                        sql += courses.map(({ code }) =>
                            SAMPLE_QUESTIONS.map(sqlQuestion(code)).join('\n') + '\n').join('')
                        sql += courses.map(({ code }) =>
                            SAMPLE_REVIEWS.map(sqlReview(code)).join('\n') + '\n').join('')
                        sql += sqlComments() + '\n'
                        sql += sqlLikes() + '\n'
                        sql += sqlUsers() + '\n'
                    }
                    */
                    sql += 'COMMIT;'

                    // Execute the SQL
                    this.run(sql)
                        .then(() => {
                            // Log time to complete database creation
                            timeList.push(Date.now() / 1000)
                            console.log(`Done creating database! (${((timeList[1] - timeList[0])).toFixed(3)})`)
                            this._initialised = true
                            resolve(this)
                        })
                        .catch((err) => reject(err))
                }
            })
        })
    }

    insert(table, data) {
        return insertDB(this._db, table, data)
    }

    insertUnique(table, data) {
        return insertUniqueDB(this._db, table, data)
    }

    update(table, data, conditions) {
        return updateDB(this._db, table, data, conditions)
    }

    deleteDB () {
        return Promise.resolve(false)
    }

    run (sql) {
        return new Promise((resolve, reject) => {
            const request = new Request(sql, (err) =>
                err ? reject(err) : resolve())
            this._db.execSql(request)
        })
    }

    query(query, params = []) {
        return new Promise((resolve, reject) => {
            this._db.get(
                query,
                params,
                (err, row) => { err ? reject(err) : resolve(row) }
            )
        })
    }

    queryAll(query, params = []) {
        return new Promise((resolve, reject) => {
            this._db.all(
                query,
                params,
                (err, rows) => { err ? reject(err) : resolve(rows) }
            )
        })
    }
}

let Singleton = null

module.exports = async function() {
    return (Singleton = Singleton ? Singleton.init() : new DB().init())
}
