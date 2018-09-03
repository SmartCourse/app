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
        courseName TEXT NOT NULL,
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
        universityName: 'Univerity of New South Wales'
    }

    const comp4920 = {
        courseCode: 'COMP4920',
        courseName: 'Ethics and Management',
        facultyCode: 'COMP'
    }

    const question = {
        title: 'Question creation help!',
        body: 'I am struggling to create a meme question, wud shud I rite?'
    }

    const answer = {
        body: 'Knock. Knock... Who is there?... Pivotal... Pivotal Who?... lol jks it is Trello!'
    }

    const review = {
        body: 'Would bang out of 10!'
    }

    const reply = {
        body: 'Good to know... *** sick bastard ***'
    }

    /* Insert the fake data in to the database */
    // Insert user and uni
    return Promise.all([insertDB(db, 'user', user), insertDB(db, 'university', unsw)])
        .then(([userID, uniID]) => {
            // uni dependencies
            comp4920.universityID = uniID

            ;[question, answer, review, reply]
                .forEach(item => { item.userID = userID })

            // insert course
            return insertDB(db, 'course', comp4920)
        })
        .then((courseID) => {
            // course dependencies
            [question, review]
                .forEach(item => { item.courseID = courseID }, question)

            // insert question and review
            return Promise.all([insertDB(db, 'question', question), insertDB(db, 'review', review)])
        })
        .then(([questionID, reviewID]) => {
            // question and review dependency
            answer.questionID = questionID
            reply.reviewID = reviewID

            // insert answer and reply
            return Promise.all([insertDB(db, 'answer', answer), insertDB(db, 'reply', reply)])
        })
        .then(() => console.log('Test Database Initialised!'))
        .catch(console.warn)
}

/**
 * Initiates a new SQL database from the given param
 * @param {string} databaseName A db name, if not :memory: initiates a .db file
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
        createAnswerTable(db)
        createReviewTable(db)
        createReplyTable(db)
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
