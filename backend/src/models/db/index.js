const path = require('path')
const sqlite3 = require('sqlite3')
const { createDB, insertDB, insertUniqueDB, updateDB } = require('./tables')

const DB_NAME = process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../../../db/smartcourse.db') : ':memory:'
console.log(path.join(__dirname, '../../../db/smartcourse.db'))
/**
 * Very slight abstraction over the direct sql queries.
 * This object can be instantiated once and then all queries are assumed to be
 * already filtered at this point.
 * @param {string} databaseName The name of the db if it needs to be passed in.
 */
class DB {
    constructor(databaseName) {
        this._db = new sqlite3.Database(databaseName, sqlite3.OPEN_READWRITE,
            (err) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log(`Opened database: ${databaseName}`)
                    // Initialise the test db
                    if (process.env.NODE_ENV !== 'production') {
                        createDB(this._db)
                    }
                }
            }
        )
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

    run (query, params = []) {
        return new Promise((resolve, reject) => {
            this._db.run(
                query,
                params,
                (err) => { err ? reject(err) : resolve(true) }
            )
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

module.exports = new DB(DB_NAME)
