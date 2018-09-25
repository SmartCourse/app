const sqlite3 = require('sqlite3')
const courseData = require('./courses')
const subjectData = require('./subjects')

// TODO - STUB USER TABLE (REFACTOR FOR AUTH)
function createUserTable (db) {
    return db.run(`CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uid TEXT NOT NULL,
        displayName TEXT DEFAULT 'ANON',
        email TEXT UNIQUE NOT NULL,
        joined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        reputation INTEGER DEFAUL T '0.00'
        )`,
    (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('Created User Table')
        }
    })
}

function createUniversityTable (db) {
    return db.run(`CREATE TABLE university (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
        )`,
    (err) => {
        if (err) {
            console.error(err)
        } else {
            const unsw = { name: 'Univerity of New South Wales' }
            insertDB(db, 'university', unsw)
            console.log('Created Uni Table')
        }
    })
}

function createSubjectTable(db) {
    return db.run(`CREATE TABLE subject (
        code TEXT PRIMARY KEY NOT NULL,
        universityID INTEGER NOT NULL,
        name TEXT NOT NULL,
        handbookURL TEXT NOT NULL,
        FOREIGN KEY (universityID) REFERENCES university(id)
        )`,
    (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('Created Subject Table')

            // Kind of hacky, but we only serving one university at this time
            const universityID = 1
            const total = Object.keys(subjectData).length
            subjectData.forEach((subj) => { subj['universityID'] = universityID })

            // Prepare query
            const columns = Object.keys(subjectData[0])
            const placeholders = columns.map(_ => '?').join()
            const query = `INSERT INTO subject (${columns}) VALUES (${placeholders})`
            const prep = db.prepare(query)

            subjectData.map(subj => insertDB(db, 'subject', subj, prep)
                .then((id) => console.log(`Inserted subject ${id}/${total}`)))
            prep.finalize()
        }
    })
}

function createCourseTable (db) {
    return db.run(`CREATE TABLE course (
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
            console.error(err)
        } else {
            console.log('Created Course Table')

            // Kind of hacky, but we only serving one university at this time
            const universityID = 1
            const total = Object.keys(courseData).length
            courseData.forEach((subj) => { subj['universityID'] = universityID })

            // Prepare query
            const columns = Object.keys(courseData[0])
            const placeholders = columns.map(_ => '?').join()
            const query = `INSERT INTO course (${columns}) VALUES (${placeholders})`
            const prep = db.prepare(query)

            courseData.map(subj => insertDB(db, 'course', subj, prep)
                .then((id) => console.log(`Inserted course ${id}/${total}`)))
            prep.finalize()
        }
    })
}

function createQuestionTable (db) {
    return db.run(`CREATE TABLE question (
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
            console.error(err)
        } else {
            console.log('Created Question Table')
        }
    })
}

function createCommentTable (db) {
    return db.run(`CREATE TABLE comment (
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
            console.error(err)
        } else {
            console.log('Created Comment Table')
        }
    })
}

function createReviewTable (db) {
    return db.run(`CREATE TABLE review (
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
            console.error(err)
        } else {
            console.log('Created Review Table')
        }
    })
}

/**
 * Initiates a new SQL database from the given param
 * @param   {string} databaseName A db name, if not :memory: initiates a .db file
 * @returns {object} SQLObject
 */
function createDB(databaseName) {
    // Create the database object
    let db = new sqlite3.Database(databaseName,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
            if (err) {
                console.error(err.message)
            }
        }
    )

    // Create the database tables
    db.serialize(() => {
        db = createUserTable(db)
        db = createUniversityTable(db)
        db = createSubjectTable(db)
        db = createCourseTable(db)
        db = createQuestionTable(db)
        db = createReviewTable(db)
        db = createCommentTable(db)
    })

    return db
}

// Insert given JSON object into database table.
// data = { column : value }
// For security reasons, column inputs can NEVER be user defined.
function insertDB (db, table, data, prep) {
    return new Promise((resolve, reject) => {
        const values = Object.values(data)

        if (!prep) {
            // Run non-prepared statment
            const columns = Object.keys(data)
            const placeholders = columns.map(_ => '?').join()
            const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`
            db = db.run(
                query,
                Object.values(data),
                function (err) { err ? reject(err) : resolve(this.lastID) }
            )
        } else {
            // Run prepared statmenet
            db = prep.run(values, function (err) { err ? reject(err) : resolve(this.lastID) })
        }
    })
}

module.exports = {
    createDB,
    insertDB
}
