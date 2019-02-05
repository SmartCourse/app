const { Connection, Request } = require('tedious')
const { DB_CONFIG, MAX_CONNECTIONS } = require('./config')
const { TABLE_COLUMNS } = require('../constants')
const { EventEmitter } = require('events')

/**
 * Very slight abstraction over the direct sql queries.
 * This object can be instantiated once and then all queries are assumed to be
 * already filtered at this point.
 */
class DB extends EventEmitter {
    constructor() {
        super()
        // Immediately start root connection process
        this.connections = [new Connection(DB_CONFIG)]
        this.ready = false

        // Setup a pool of other connections
        for (let i = 1; i < MAX_CONNECTIONS; i++) {
            const connection = new Connection(DB_CONFIG)
            connection.on('connect', (err) => {
                if (err) {
                    console.warn(err)
                    throw new Error('Couldn\'t connect to DB')
                }
                this.connections.push(connection)

                // emit ready event once only when a connection becomes available
                if (!this.ready) {
                    this.ready = true
                    this.emit('ready')
                }
            })
        }
    }

    delete() {
        return Promise.resolve(false)
    }

    async run(sql, params = {}) {
        return new Promise((resolve, reject) => {
            // TODO - something more elegant?
            while (this.connections.length === 0) {
                console.warn('Not enough connections')
            }
            const connection = this.connections.pop()

            // Make the request
            const request = new Request(sql, (err, rowCount, rows) => {
                this.connections.push(connection)

                if (err) reject(err)

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
            connection.execSql(request)
        })
    }

    close() {
        this.connections.forEach((connection) => connection.close())
    }
}

//util.inherits(DB, EventEmitter)

module.exports = new DB()
