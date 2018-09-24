const sqlite3 = require('sqlite3')
const courseData = require('./courses')
const subjectData = require('./subjects')

// Helper function to ensure we don't try and create the same table twice
function createTable(db, tableName, fn) {
    db.get('SELECT name FROM sqlite_master WHERE type=\'table\' AND name=?',
        [tableName], (err, row) => {
            if (err || row === undefined) {
                fn(db)
            }
        }
    )
}

// TODO - STUB USER TABLE (REFACTOR FOR AUTH)
function createUserTable (db) {
    createTable(db, 'user', (db) => {
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uid TEXT NOT NULL,
            displayName TEXT DEFAULT 'ANON',
            email TEXT UNIQUE NOT NULL,
            joined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            reputation INTEGER DEFAUL T '0.00'
            )`,
        (err) => {
            if (err) {
                console.error(err.data)
            } else {
                console.log('Created User Table')
            }
        })
    })
}

function createUniversityTable (db) {
    createTable(db, 'university', (db) => {
        db.run(`CREATE TABLE university (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
            )`,
        (err) => {
            if (err) {
                console.error(err.data)
            } else {
                const unsw = { name: 'Univerity of New South Wales' }
                insertDB(db, 'university', unsw)
                console.log('Created Uni Table')
            }
        })
    })
}

function createSubjectTable(db) {
    createTable(db, 'subject', (db) => {
        db.run(`CREATE TABLE subject (
            code TEXT PRIMARY KEY NOT NULL,
            universityID INTEGER NOT NULL,
            name TEXT NOT NULL,
            handbookURL TEXT NOT NULL,
            FOREIGN KEY (universityID) REFERENCES university(id)
            )`,
        (err) => {
            if (err) {
                console.error(err.data)
            } else {
                // Kind of hacky, but we only serving one university at this time
                const universityID = 1
                subjectData.map(subj => insertDB(db, 'subject', { universityID, ...subj }))
                console.log('Created Subject Table')
            }
        })
    })
}

function createCourseTable (db) {
    createTable(db, 'course', (db) => {
        db.run(`CREATE TABLE course (
            code TEXT PRIMARY KEY NOT NULL,
            universityID INTEGER NOT NULL,
            name TEXT NOT NULL,
            studyLevel TEXT NOT NULL,
            subjectCode TEXT NOT NULL,
            handbookURL TEXT NOT NULL,
            outlineURL TEXT,
            description TEXT NOT NULL,
            requirements TEXT,
            rating INTEGER DEFAULT '0.00',
            tags TEXT,
            FOREIGN KEY (universityID) REFERENCES university(id),
            FOREIGN KEY (subjectCode) REFERENCES subject(code)
            )`,
        (err) => {
            if (err) {
                console.error(err.data)
            } else {
                // Kind of hacky, but we only serving one university at this time
                const universityID = 1
                courseData.map(course => insertDB(db, 'course', { universityID, ...course }))
                console.log('Created Course Table')
            }
        })
    })
}

function createQuestionTable (db) {
    createTable(db, 'question', (db) => {
        db.run(`CREATE TABLE question (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL,
            userID INTEGER NOT NULL,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            likes INTEGER DEFAULT '0.00',
            FOREIGN KEY (code) REFERENCES course(code),
            FOREIGN KEY (userID) REFERENCES user(id)
            )`,
        (err) => {
            if (err) {
                console.error(err.data)
            } else {
                console.log('Created Question Table')
            }
        })
    })
}

function createCommentTable (db) {
    createTable(db, 'comment', (db) => {
        db.run(`CREATE TABLE comment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            questionID INTEGER,
            reviewID INTEGER,
            commentParent INTEGER,
            userID INTEGER NOT NULL,
            body TEXT NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            likes INTEGER DEFAULT '0.00',
            FOREIGN KEY (questionID) REFERENCES question(id),
            FOREIGN KEY (reviewID) REFERENCES review(id),
            FOREIGN KEY (userID) REFERENCES user(id)
            )`,
        (err) => {
            if (err) {
                console.error(err.data)
            } else {
                console.log('Created Comment Table')
            }
        })
    })
}

function createReviewTable (db) {
    createTable(db, 'review', (db) => {
        db.run(`CREATE TABLE review (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL,
            userID INTEGER NOT NULL,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            likes INTEGER DEFAULT '0.00',
            FOREIGN KEY (code) REFERENCES course(code),
            FOREIGN KEY (userID) REFERENCES user(id)
            )`,
        (err) => {
            if (err) {
                console.error(err.data)
            } else {
                console.log('Created Review Table')
            }
        })
    })
}

/**
 * Initiates a new SQL database from the given param
 * @param   {string} databaseName A db name, if not :memory: initiates a .db file
 * @returns {object} SQLObject
 */
function createDB(databaseName) {
    // Create the database object
    const db = new sqlite3.Database(databaseName,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
            if (err) {
                console.error(err.message)
            }
        }
    )

    // Create the database tables
    db.serialize(() => {
        createUserTable(db)
        createUniversityTable(db)
        createSubjectTable(db)
        createCourseTable(db)
        createQuestionTable(db)
        createReviewTable(db)
        createCommentTable(db)
    })

    console.log(`Connected to ${databaseName}`)

    return db
}

// Insert given JSON object into database table.
// data = { column : value }
// For security reasons, column inputs can NEVER be user defined.
// TODO - FIX ISSUE WHERE this.lastID != user/uni/course/question/answerID
//        THIS IS DUE TO THE FACT THAT WE CAN ONLY RETURN THE ROW_ID AFTER
//        INSERTION WITHOUT A LOOKUP... TOO TIRED TO SOLVE RN
function insertDB (db, table, data) {
    return new Promise((resolve, reject) => {
        const columns = Object.keys(data)
        const placeholders = columns.map(_ => '?').join()
        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`
        db.run(
            query,
            Object.values(data),
            function (err) { err ? reject(err) : resolve(this.lastID) }
        )
    })
}

module.exports = {
    createDB,
    insertDB
}
