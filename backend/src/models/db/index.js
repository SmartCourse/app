const { createDB, insertDB } = require('./tables')

// Note the backwards directory traversal is due to azure server current directory stuff
const DB_NAME = process.env.NODE_ENV === 'test' ? ':memory:' : '../../db/smartcourse.db'

/**
 * Very slight abstraction over the direct sql queries.
 * This object can be instantiated once and then all queries are assumed to be
 * already filtered at this point.
 * @param {string} databaseName The name of the db if it needs to be passed in.
 */
class DB {
    constructor(databaseName) {
        this._db = createDB(databaseName)
    }

    insert(table, data) {
        return insertDB(this._db, table, data)
    }

    deleteDB () {
        return Promise.resolve(false)
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
