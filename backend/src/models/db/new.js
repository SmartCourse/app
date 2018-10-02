const sqlite3 = require('sqlite3')
const { createDB } = require('./tables')

// Create the database
const db = new sqlite3.Database('./db/smartcourse.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('Opened database!')
            createDB(db)
        }
    }
)
