
const createDB = require('./tables').createDB
const devInitDB = require('./tables').devInitDB
const insertDB = require('./tables').insertDB

const DB_NAME = process.env === 'test' ? ':memory:' : ':memory:'

class DB {
    constructor(DB_NAME) {
        this._db = createDB(DB_NAME)
        // If in memory databse, intialise it
        if (DB_NAME === ':memory:') {
            devInitDB(this._db)
        }
    }

    insert(table, data) {
        return insertDB(this._db, table, data)
    }

    deleteDB () {
        return 0
    }

    query() {
        return 0
    }

    queryAll() {
        return 0
    }
}

module.exports = new DB(DB_NAME)
