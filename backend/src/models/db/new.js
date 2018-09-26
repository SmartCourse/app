const sqlite3 = require('sqlite3')
const { createDB } = require('./tables')

// Create the database
const db = new sqlite3.Database('./db/smartcourse.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        err ? console.error(err) : console.log('Opened database!')
    }
)

// Create tables and add UNSW data
createDB(db)
    .then(() => console.log('Initialised Database!'))
