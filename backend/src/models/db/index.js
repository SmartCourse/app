const { Connection, Request } = require('tedious')
const { initDB } = require('./init_sql')
const { TABLE_COLUMNS } = require('../constants')
const { DB_CONFIG } = require('./config')

/**
 * Very slight abstraction over the direct sql queries.
 * This object can be instantiated once and then all queries are assumed to be
 * already filtered at this point.
 * @param {string} databaseName The name of the db if it needs to be passed in.
 */
class DB {
    async init() {
        return initDB
    }

    delete() {
        return Promise.resolve(false)
    }

    async run(sql, params = {}) {
        return new Promise((resolve, reject) => {
            // Connect (can only have one query per connection)
            const db = new Connection(DB_CONFIG)
            db.on('connect', (err) => {
                if (err) reject(err)

                // Make the request
                const request = new Request(sql, (err, rowCount, rows) => {
                    if (err) reject(err)
                    db.close()

                    // Returning the result
                    const reducer = (row, column) => {
                        row[column.metadata.colName] = column.value
                        return row
                    }

                    rows ? resolve(rows.map(row => row.reduce(reducer, {})))
                        : resolve([])
                })

                Object.keys(params).forEach(table =>
                    Object.keys(params[table]).forEach(param =>
                        request.addParameter(param, TABLE_COLUMNS[table][param].type,
                            params[table][param])
                    )
                )

                // Do the request
                db.execSql(request)
            })
        })
    }
}

module.exports = new DB()
