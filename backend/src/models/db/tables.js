const courseData = require('./courses')
const subjectData = require('./subjects')

// TODO - STUB USER TABLE (REFACTOR FOR AUTH)
function createUserTable (db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uid TEXT UNIQUE NOT NULL,
            displayName TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            joined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            reputation INTEGER DEFAULT '0',
            degree TEXT,
            gradYear TIMESTAMP,
            description TEXT,
            picture TEXT
            )`,
        (err) => err ? reject(err) : resolve('Created User Table'))
    })
}

function createUniversityTable (db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE university (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
            )`,
        (err) => err ? reject(err) : resolve('Created Uni Table'))
    })
}

function createSubjectTable(db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE subject (
            code TEXT PRIMARY KEY NOT NULL,
            universityID INTEGER NOT NULL,
            name TEXT NOT NULL,
            handbookURL TEXT NOT NULL,
            FOREIGN KEY (universityID) REFERENCES university(id)
            )`,
        (err) => err ? reject(err) : resolve('Created Subject Table'))
    })
}

function createCourseTable (db) {
    return new Promise((resolve, reject) => {
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
            recommend INTEGER DEFAULT '-1',
            enjoy INTEGER DEFAULT '50',
            difficulty INTEGER DEFAULT '50',
            teaching INTEGER DEFAULT '50',
            workload INTEGER DEFAULT '50',
            tags TEXT,
            FOREIGN KEY (universityID) REFERENCES university(id),
            FOREIGN KEY (subjectCode) REFERENCES subject(code)
            )`,
        (err) => err ? reject(err) : resolve('Created Course Table'))
    })
}

function createQuestionTable (db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE question (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL,
            userID INTEGER NOT NULL,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (code) REFERENCES course(code),
            FOREIGN KEY (userID) REFERENCES user(id)
            )`,
        (err) => err ? reject(err) : resolve('Created Question Table'))
    })
}

function createCommentTable (db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE comment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            questionID INTEGER,
            reviewID INTEGER,
            commentParent INTEGER,
            userID INTEGER NOT NULL,
            body TEXT NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (questionID) REFERENCES question(id),
            FOREIGN KEY (reviewID) REFERENCES review(id),
            FOREIGN KEY (userID) REFERENCES user(id)
            )`,
        (err) => err ? reject(err) : resolve('Created Comment Table'))
    })
}

function createReviewTable (db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE review (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL,
            userID INTEGER NOT NULL,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            recommend INTEGER NOT NULL,
            enjoy INTEGER NOT NULL,
            difficulty INTEGER DEFAULT '0',
            teaching INTEGER DEFAULT '0',
            workload INTEGER DEFAULT '0',
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (code) REFERENCES course(code),
            FOREIGN KEY (userID) REFERENCES user(id)
            )`,
        (err) => err ? reject(err) : resolve('Created Review Table'))
    })
}

function createLikeTable (db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE like (
            objectType TEXT NOT NULL,
            objectID INTEGER NOT NULL,
            userID INTEGER NOT NULL,
            value INTEGER DEFAULT '0',
            FOREIGN KEY (userID) REFERENCES user(id)
            )`,
        (err) => {
            if (err) {
                reject(err)
            } else {
                db.run('CREATE UNIQUE INDEX id ON like (objectType, objectID, userID)',
                    (err) => err ? reject(err) : resolve('Created Like Table'))
            }
        })
    })
}

function initUniTable(db) {
    const unsw = { name: 'Univerity of New South Wales' }
    return insertDB(db, 'university', unsw)
}

function initSubjectTable(db) {
    // Kind of hacky, but we only serving one university at this time
    const universityID = 1
    const subjects = subjectData.map(subject => ({ ...subject, universityID }))

    // Prepare query
    const columns = Object.keys(subjects[0])
    const placeholders = columns.map(_ => '?').join()
    const query = `INSERT INTO subject (${columns}) VALUES (${placeholders})`
    const prep = db.prepare(query)

    // Do insertions and return promise for all of them to be completed
    const promises = subjects.map(subj => insertDB(db, 'subject', subj, prep))
    return Promise.all(promises)
}

function initCourseTable(db) {
    // Kind of hacky, but we only serving one university at this time
    const universityID = 1
    const courses = courseData.map(course => ({ ...course, universityID }))

    // Prepare query
    const columns = Object.keys(courses[0])
    const placeholders = columns.map(_ => '?').join()
    const query = `INSERT INTO course (${columns}) VALUES (${placeholders})`
    const prep = db.prepare(query)

    // Do insertions and return promise for all of them to be completed
    const promises = courses.map(subj => insertDB(db, 'course', subj, prep))
    return Promise.all(promises)
}

/**
 * Initiates a new SQL database by creating the tables with some UNSW data
 * @param   {object} SQLObject
 * @returns {object} SQLObject
 */
function createDB(db) {
    Promise.all([
        createUserTable(db),
        createUniversityTable(db),
        createSubjectTable(db),
        createCourseTable(db),
        createQuestionTable(db),
        createReviewTable(db),
        createCommentTable(db),
        createLikeTable(db)
    ])
        .then(() => {
            console.log('Created tables')
            return Promise.all([initUniTable(db), initSubjectTable(db), initCourseTable(db)])
        })
        .then(() => {
            console.log('Initialised tables')
        })
        .catch(() => console.warn())
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

// Inserts unique JSON object into database table.
// data = { column : value }
// For security reasons, column inputs can NEVER be user defined.
function insertUniqueDB (db, table, data) {
    return new Promise((resolve, reject) => {
        const insertValues = Object.values(data)
        const insertColumns = Object.keys(data)
        const insertPlaceholders = insertColumns.map(_ => '?').join()
        const query = `REPLACE INTO ${table} (${insertColumns})
        VALUES (${insertPlaceholders})`

        db = db.run(
            query,
            [...insertValues],
            function (err) { err ? reject(err) : resolve(this.lastID) }
        )
    })
}

// Updates given JSON object into database table.
// data = { column : value }
// For security reasons, column inputs can NEVER be user defined.
// TODO - Maybe need a better way todo more complex conditions
function updateDB (db, table, data, conditions) {
    return new Promise((resolve, reject) => {
        const updateValues = Object.values(data)
        const updateColumns = Object.keys(data)
        const updatePlaceholders = updateColumns.map(col => `${col}=?`).join(',')

        let query = `UPDATE ${table} SET ${updatePlaceholders}`

        const condValues = Object.values(conditions)
        if (conditions) {
            const condColumns = Object.keys(conditions)
            const condPlaceholders = condColumns.map(col => `${col}=?`).join(' AND ')
            query += ` WHERE ${condPlaceholders}`
        }

        db = db.run(
            query,
            [...updateValues, ...condValues],
            function (err) { err ? reject(err) : resolve(this.changes) }
        )
    })
}

module.exports = {
    createDB,
    insertDB,
    insertUniqueDB,
    updateDB
}
