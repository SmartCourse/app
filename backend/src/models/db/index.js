const { Connection, Request } = require('tedious')
const { insertDB, insertUniqueDB, updateDB } = require('./js/tables')
const { initDB } = require('./init_sql')
const {
    DB_CONFIG,
    TABLE_COLUMNS
} = require('../constants')

/**
 * Very slight abstraction over the direct sql queries.
 * This object can be instantiated once and then all queries are assumed to be
 * already filtered at this point.
 * @param {string} databaseName The name of the db if it needs to be passed in.
 */
class DB {
    async init() {
        await initDB()
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

    delete() {
        return Promise.resolve(false)
    }

    async query(query, params = {}, table) {
        return new Promise((resolve, reject) => {
            // Connect (can only have one query per connection)
            const db = new Connection(DB_CONFIG)
            db.on('connect', (err) => {
                if (err) reject(err)

                // Make the request
                const request = new Request(query, (err) => {
                    if (err) reject(err)
                })
                Object.keys(params).forEach(param => {
                    request.addParameter(param, TABLE_COLUMNS[table][param].type, params[param])
                })
                request.on('done', (rowCount, more, rows) => {
                    db.close()
                    resolve(rows)
                })

                // Do the request
                db.execSql(request)
            })
        })
    }
}

module.exports = new DB()
