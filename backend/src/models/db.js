const sqlite3 = require('sqlite3')

// TODO - STUB USER TABLE (REFACTOR FOR AUTH)
function createUserTable (db) {
    db.run(`CREATE TABLE user (
        userID INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL)`
    )
}

function createUniversityTable (db) {
    db.run(`CREATE TABLE university (
        universityID INTEGER PRIMARY KEY AUTOINCREMENT,
        universityName TEXT NOT NULL)`
    )
}

function createCourseTable (db) {
    db.run(`CREATE TABLE course (
        courseID INTEGER PRIMARY KEY AUTOINCREMENT,
        universityID INTEGER NOT NULL,
        courseCode TEXT NOT NULL,
        coruseName TEXT NOT NULL,
        facultyCode TEXT NOT NULL,
        rating INTEGER DEFAULT '0.00',
        FOREIGN KEY (universityID) REFERENCES universities(universityID)
        )`
    )
}

function createQuestionTable (db) {
    db.run(`CREATE TABLE question (
        questionID INTEGER PRIMARY KEY AUTOINCREMENT,
        courseID INTEGER NOT NULL,
        userID INTEGER NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        likes INTEGER DEFAULT '0.00',
        FOREIGN KEY (courseID) REFERENCES courses(courseID),
        FOREIGN KEY (userID) REFERENCES users(userID))`
    )
}

function createAnswerTable (db) {
    db.run(`CREATE TABLE answer (
        answerID INTEGER PRIMARY KEY AUTOINCREMENT,
        questionID INTEGER NOT NULL,
        userID INTEGER NOT NULL,
        body TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        likes INTEGER DEFAULT '0.00',
        FOREIGN KEY (questionID) REFERENCES questions(courseID),
        FOREIGN KEY (userID) REFERENCES users(userID))`
    )
}

function createReviewTable (db) {
    db.run(`CREATE TABLE review (
        reviewID INTEGER PRIMARY KEY AUTOINCREMENT,
        courseID INTEGER NOT NULL,
        userID INTEGER NOT NULL,
        body TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        likes INTEGER DEFAULT '0.00',
        FOREIGN KEY (courseID) REFERENCES courses(courseID),
        FOREIGN KEY (userID) REFERENCES users(userID))`
    )
}

function createReplyTable (db) {
    db.run(`CREATE TABLE reply (
        answerID INTEGER PRIMARY KEY AUTOINCREMENT,
        reviewID INTEGER NOT NULL,
        userID INTEGER NOT NULL,
        body TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        likes INTEGER DEFAULT '0.00',
        FOREIGN KEY (reviewID) REFERENCES reviews(courseID),
        FOREIGN KEY (userID) REFERENCES users(userID))`
    )
}

const databaseName = process && process.env ? ':memory:' : ':memory:'

exports.createDB = function (databaseName) {
    // Create the database object
    const db = new sqlite3.Database(databaseName)

    // Create the database tables
    db.serialize(() => {
        createUserTable(db)
        createUniversityTable(db)
        createCourseTable(db)
        createQuestionTable(db)
        createAnswerTable(db)
        createReviewTable(db)
        createReplyTable(db)
    })

    return db
}

// TODO: Test database stuff when INSERTS (POST/INSERT routes/controllers/models are made)
/*
// TODO: Values should be json OBJECT
function insert (db, table, values) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO ${table} VALUES(?)`, values, (err) => {
            console.log(this)
            err ? reject(err) : resolve(this)
        })
    })
}

exports.devInitDB = function (db) {

    //const UNSW = insert(db, 'university', [null, 'UNSW'])
    //    .then(data => { console.log(data) })
    //console.log(UNSW)
    //comp4920 = insert(db, 'course', [UNSW.universityID, 'COMP4920', 'Ethics and Management', 'COMP', ])
}
*/

exports.db = exports.createDB(databaseName)
