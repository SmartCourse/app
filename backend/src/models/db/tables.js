const sqlite3 = require('sqlite3')
const courseData = require('./courses')

// TODO - STUB USER TABLE (REFACTOR FOR AUTH)
function createUserTable (db) {
    db.run(`CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
        )`
    )
}

function createUniversityTable (db) {
    db.run(`CREATE TABLE university (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
        )`
    )
}

function createCourseTable (db) {
    db.run(`CREATE TABLE course (
        code TEXT PRIMARY KEY NOT NULL,
        universityID INTEGER NOT NULL,
        name TEXT NOT NULL,
        facultyCode TEXT NOT NULL,
        description TEXT NOT NULL,
        rating INTEGER DEFAULT '0.00',
        tags   TEXT,
        FOREIGN KEY (universityID) REFERENCES university(id)
        )`
    )
}

function createQuestionTable (db) {
    db.run(`CREATE TABLE question (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        userID INTEGER NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        likes INTEGER DEFAULT '0.00',
        FOREIGN KEY (code) REFERENCES course(code),
        FOREIGN KEY (userID) REFERENCES user(id))`
    )
}

function createCommentTable (db) {
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
        FOREIGN KEY (userID) REFERENCES user(id))`
    )
}

function createReviewTable (db) {
    db.run(`CREATE TABLE review (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        userID INTEGER NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        likes INTEGER DEFAULT '0.00',
        FOREIGN KEY (code) REFERENCES course(code),
        FOREIGN KEY (userID) REFERENCES user(id))`
    )
}

/* No longer exporting this shouldn't really do this directly */
function devInitDB(db) {
    /* Fake data objects */
    const user = {
        firstName: 'Walker',
        lastName: 'Francis',
        email: 'alnuno-das-hinds@gmail.com',
        password: 'ilovetravxoxo'
    }

    const unsw = {
        name: 'Univerity of New South Wales'
    }

    const question = {
        title: 'Question creation help!',
        body: 'I am struggling to create a meme question, wud shud I rite?'
    }

    const comment = {
        body: 'Knock. Knock... Who is there?... Pivotal... Pivotal Who?... lol jks it is Trello!'
    }

    const review = {
        title: 'title',
        body: 'Would bang out of 10!'
    }

    const reply = {
        body: 'Good to know... *** sick bastard ***'
    }

    /* Insert the fake data in to the database */
    // Insert user and uni
    return Promise.all([insertDB(db, 'user', user), insertDB(db, 'university', unsw)])
        .then(([userID, universityID]) => {
            // uni dependencies
            [question, comment, review, reply]
                .forEach(item => { item.userID = userID })

            // insert course
            return Promise.all(courseData.map(course =>
                insertDB(db, 'course', { universityID, ...course })
            ))
        })
        .then((courseID) => {
            // course dependencies
            [question, review]
                .forEach(item => { item.code = 'COMP4920' }, question)

            // insert question and review
            return Promise.all([insertDB(db, 'question', question), insertDB(db, 'review', review)])
        })
        .then(([questionID, reviewID]) => {
            // question and review dependency
            comment.questionID = questionID
            reply.reviewID = reviewID

            // insert different comments
            return Promise.all([insertDB(db, 'comment', comment), insertDB(db, 'comment', reply)])
        })
        .then(() => console.log('Test Database Initialised!'))
        .catch(console.warn)
}

/**
 * Initiates a new SQL database from the given param
 * @param   {string} databaseName A db name, if not :memory: initiates a .db file
 * @returns {object} SQLObject
 */
function createDB(databaseName) {
    // Create the database object
    const db = new sqlite3.Database(databaseName)

    // Create the database tables
    db.serialize(() => {
        createUserTable(db)
        createUniversityTable(db)
        createCourseTable(db)
        createQuestionTable(db)
        createReviewTable(db)
        createCommentTable(db)
    })

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
    devInitDB,
    createDB,
    insertDB
}
