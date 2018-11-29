const Request = require('tedious').Request
const { insertDB, insertUniqueDB, updateDB } = require('./js/tables')
const { initDB } = require('./init_sql')

/**
 * Very slight abstraction over the direct sql queries.
 * This object can be instantiated once and then all queries are assumed to be
 * already filtered at this point.
 * @param {string} databaseName The name of the db if it needs to be passed in.
 */
class DB {
    constructor() {
        this._db = null
    }

    async init() {
        this._db = await initDB()
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

    deleteDB() {
        return Promise.resolve(false)
    }

    run(sql) {
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

module.exports = new DB()
