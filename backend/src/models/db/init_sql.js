const { Connection, Request } = require('tedious')
const faculties = require('../../../data/faculties')
const degrees = require('../../../data/degrees')
const subjects = require('../../../data/subjects')
const courses = require('../../../data/courses')
const {
    NUM_DUMMY_USERS,
    SAMPLE_QUESTIONS,
    SAMPLE_REVIEWS,
    SAMPLE_COMMENTS,
    SAMPLE_USERS
} = require('./test_constants')
const {
    TESTING,
    DB_CONFIG,
    TABLE_NAMES,
    TABLE_COLUMNS,
    DONT_RECOMMEND,
    RECOMMEND,
    MIN_ENJOY,
    MAX_ENJOY,
    MIN_OPTION,
    MAX_OPTION
} = require('../constants')

// Globals
let commentID = 1
const questions = []
const reviews = []
const questionsToLike = []
const reviewsToLike = []
const commentsToLike = []
const userRepMap = {}
// Seed must be (0, 2147483647)
// PRNG taken from: https://gist.github.com/blixt/f17b47c62508be59987b
let seed = 1

exports.initDB = async function() {
    // Database initialisation benchmarking
    const timeList = [Date.now() / 1000]

    // Do the initialisation
    return new Promise((resolve, reject) => {
        const db = new Connection(DB_CONFIG)
        db.on('connect', (err) => {
            if (err) reject(err)

            // Create the database and initialise data with no dependencies.
            const request = new Request(sqlTables(), async (err) => {
                if (err) reject(err)

                // Initialise with UNSW data
                if (!await unswDataInitialised(db)) {
                    await sqlUniversity(db)
                    await sqlFaculties(db)
                    await sqlDegrees(db)
                    await sqlSubjects(db)
                    await sqlCourses(db)
                }

                // Initialise test databases
                if (TESTING && !await testDataInitialised(db)) {
                    await sqlQuestions(db)
                    await sqlReviews(db)
                    await sqlComments(db)
                    await sqlLikes(db)
                    await sqlUsers(db)
                }

                // Log completion time
                timeList.push(Date.now() / 1000)
                console.log(`Done creating database! (${((timeList[1] - timeList[0])).toFixed(3)})`)

                // Close the connection and return
                db.close()
                resolve()
            })
            db.execSql(request)
        })
    })
}

// Assume that if UNSW has been inserted into uni table,
// all UNSW data has been inserted into tables.
async function unswDataInitialised(db) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${TABLE_NAMES.UNIVERSITY}`
        const request = new Request(query, (err, rowCount) =>
            err ? resolve(0) : resolve(rowCount))
        db.execSql(request)
    })
}

// Assume that if there is a question in the questions table,
// testing data already exists.
async function testDataInitialised(db) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${TABLE_NAMES.QUESTIONS}`
        const request = new Request(query, (err, rowCount) =>
            err ? resolve(0) : resolve(rowCount))
        db.execSql(request)
    })
}

async function sqlUniversity(db) {
    return bulkInsertDB(db, TABLE_NAMES.UNIVERSITY, [{ name: 'UNSW' }])
}

async function sqlFaculties(db) {
    return bulkInsertDB(db, TABLE_NAMES.FACULTIES, faculties)
}

async function sqlDegrees(db) {
    return bulkInsertDB(db, TABLE_NAMES.DEGREES, degrees)
}

async function sqlSubjects(db) {
    return bulkInsertDB(db, TABLE_NAMES.SUBJECTS, subjects)
}

async function sqlCourses(db) {
    return bulkInsertDB(db, TABLE_NAMES.COURSES, courses)
}

function sqlQuestion(code) {
    const userID = nextValue(1, NUM_DUMMY_USERS)
    questions.push({ questionID: questions.length + 1 })
    questionsToLike.push({ objectType: TABLE_NAMES.QUESTIONS, objectID: questions.length, userID })
    return function(question) {
        return {
            userID,
            courseID: 1 + courses.findIndex((c) => c.code === code),
            title: question.title,
            body: question.body,
            pinned: 1
        }
    }
}

async function sqlQuestions(db) {
    let questions = courses.map(({ code }) =>
        SAMPLE_QUESTIONS.map(sqlQuestion(code)))
    questions = [].concat.apply([], questions);
    return bulkInsertDB(db, TABLE_NAMES.QUESTIONS, questions)
}

function sqlReview(code) {
    const userID = nextValue(1, NUM_DUMMY_USERS)
    reviews.push({ reviewID: reviews.length + 1 })
    reviewsToLike.push({ objectType: TABLE_NAMES.REVIEWS, objectID: reviews.length, userID })
    return function(review) {
        return {
            userID,
            courseID: 1 + courses.findIndex((c) => c.code === code),
            title: review.title,
            body: review.body,
            recommend: nextValue(DONT_RECOMMEND, RECOMMEND),
            enjoy: nextValue(MIN_ENJOY, MAX_ENJOY),
            difficulty: nextValue(MIN_OPTION, MAX_OPTION),
            teaching: nextValue(MIN_OPTION, MAX_OPTION),
            workload: nextValue(MIN_OPTION, MAX_OPTION)
        }
    }
}

async function sqlReviews(db) {
    let reviews = courses.map(({ code }) =>
        SAMPLE_REVIEWS.map(sqlReview(code)))
    reviews = [].concat.apply([], reviews);
    return bulkInsertDB(db, TABLE_NAMES.REVIEWS, reviews)
}

function genComments(parent) {
    const commentTypes = SAMPLE_COMMENTS
    const minRange = 1
    const maxRange = 3
    const numCommentTypes = commentTypes.length
    const comments = []
    const numComments = nextValue(minRange, maxRange)
    for (let i = 0; i < numComments; i++) {
        const index = nextValue(0, numCommentTypes - 1)
        const uid = nextValue(1, NUM_DUMMY_USERS)
        const comment = {
            ...parent,
            commentParent: 1,
            userID: uid,
            ...commentTypes[index]
        }
        comments.push(comment)
        commentsToLike.push({ objectType: TABLE_NAMES.COMMENTS, objectID: commentID++, userID: uid })
    }
    return comments
}

async function sqlComments(db) {
    // Question comments
    let comments = []
    for (let parent of questions) {
        comments = comments.concat(genComments(parent))
    }
    return bulkInsertDB(db, TABLE_NAMES.COMMENTS, comments)
        // Review comments
        .then(() => {
            comments = []
            for (let parent of reviews) {
                comments = comments.concat(genComments(parent))
            }
            return bulkInsertDB(db, TABLE_NAMES.COMMENTS, comments)
        })
}

async function sqlUsers(db) {
    const userNames = SAMPLE_USERS
    const suffixes = ['XxX', '!', 's', '!!', '_', '__', 'x']

    let users = []

    for (let i = 1; i <= NUM_DUMMY_USERS; i++) {
        const uid = 'userID' + i
        const displayName =
            userNames[i % userNames.length] +
            // only append a number if we've run out of names
            (i < userNames.length
                ? ''
                // then choose between a simulated birth year and a 'cool' suffix
                : (i % 2
                    ? (90 + Math.trunc(i / userNames.length))
                    // only add a number on the suffix if we're past possible combinations without numbers..
                    // multiply i by 3 to make it look like a birthdate or something
                    : (suffixes[i % suffixes.length] + (i < (userNames.length + suffixes.length * 2) ? '' : i * 2))
                )
            )
        const email = displayName + '@test.com.au'
        const degree = degrees[nextValue(0, degrees.length - 1)].name

        users.push({
            uid: uid,
            displayName: displayName,
            email: email,
            degreeID: 1 + degrees.findIndex((d) => d.name === degree),
            reputation: userRepMap[i] || 0
        })
    }

    return bulkInsertDB(db, TABLE_NAMES.USERS, users)
}

function genLikes(parent) {
    const likes = []
    const numLikes = nextValue(-2, 5)
    if (numLikes <= 0) return []
    // choose numLikes consecutive users for these likes...
    const startIndex = nextValue(1, NUM_DUMMY_USERS)

    for (let i = startIndex; i < startIndex + numLikes; ++i) {
        const like = {
            userID: (i % NUM_DUMMY_USERS) + 1,
            // more likely to be positive!
            value: nextValue(1, 10) > 7 ? -1 : 1,
            objectType: parent.objectType,
            objectID: parent.objectID
        }
        // update user reputation for the liked object's user, to be used in initUserTable
        if (parent.userID in userRepMap) {
            userRepMap[parent.userID] += like.value
        } else {
            userRepMap[parent.userID] = like.value
        }
        likes.push(like)
    }
    return likes
}

async function sqlLikes(db) {
    // Like questions
    let likes = []
    for (let parent of questionsToLike) {
        likes = likes.concat(genLikes(parent))
    }
    return bulkInsertDB(db, TABLE_NAMES.LIKES, likes)
        // Like reviews
        .then(() => {
            likes = []
            for (let parent of reviewsToLike) {
                likes = likes.concat(genLikes(parent))
            }
            return bulkInsertDB(db, TABLE_NAMES.LIKES, likes)
        })
        // Like comments
        .then(() => {
            likes = []
            for (let parent of commentsToLike) {
                likes = likes.concat(genLikes(parent))
            }
            return bulkInsertDB(db, TABLE_NAMES.LIKES, likes)
        })
}

function sqlTables() {
    return `
    BEGIN TRANSACTION;

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='${TABLE_NAMES.FACULTIES}' AND xtype='U')
        CREATE TABLE ${TABLE_NAMES.FACULTIES} (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            name VARCHAR(8000) NOT NULL
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='${TABLE_NAMES.DEGREES}' AND xtype='U')
        CREATE TABLE ${TABLE_NAMES.DEGREES} (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            name VARCHAR(8000) NOT NULL,
            longName VARCHAR(8000) NOT NULL,
            type VARCHAR(8000) NOT NULL,
            tags VARCHAR(8000),
            facultyID INTEGER NOT NULL,
            CONSTRAINT fk_faculty_degree
                FOREIGN KEY (facultyID)
                REFERENCES ${TABLE_NAMES.FACULTIES} (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='${TABLE_NAMES.USERS}' AND xtype='U')
        CREATE TABLE ${TABLE_NAMES.USERS} (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            uid VARCHAR(8000) UNIQUE NOT NULL,
            displayName VARCHAR(8000) UNIQUE NOT NULL,
            email VARCHAR(8000) UNIQUE NOT NULL,
            joined DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
            reputation INTEGER DEFAULT '0',
            degreeID INTEGER NOT NULL,
            gradYear TIMESTAMP,
            description VARCHAR(8000),
            picture VARCHAR(8000),
            CONSTRAINT fk_degree_user
                FOREIGN KEY (degreeID)
                REFERENCES ${TABLE_NAMES.DEGREES} (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='${TABLE_NAMES.UNIVERSITY}' AND xtype='U')
        CREATE TABLE ${TABLE_NAMES.UNIVERSITY} (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            name VARCHAR(8000) UNIQUE NOT NULL,
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='${TABLE_NAMES.SUBJECTS}' AND xtype='U')
        CREATE TABLE ${TABLE_NAMES.SUBJECTS} (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            code VARCHAR(8000) NOT NULL,
            universityID INTEGER NOT NULL,
            name VARCHAR(8000) NOT NULL,
            handbookURL VARCHAR(8000) NOT NULL,
            CONSTRAINT fk_university_subject
                FOREIGN KEY (universityID)
                REFERENCES ${TABLE_NAMES.UNIVERSITY} (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='${TABLE_NAMES.COURSES}' AND xtype='U')
        CREATE TABLE ${TABLE_NAMES.COURSES} (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            code VARCHAR(8000) NOT NULL,
            universityID INTEGER NOT NULL,
            name VARCHAR(8000) NOT NULL,
            studyLevel VARCHAR(8000) NOT NULL,
            subjectID INTEGER NOT NULL,
            handbookURL VARCHAR(8000) NOT NULL,
            outlineURL VARCHAR(8000),
            description VARCHAR(8000),
            requirements VARCHAR(8000),
            recommend INTEGER DEFAULT '-1',
            enjoy INTEGER DEFAULT '50',
            difficulty INTEGER DEFAULT '50',
            teaching INTEGER DEFAULT '50',
            workload INTEGER DEFAULT '50',
            tags VARCHAR(8000),
            CONSTRAINT fk_university_course
                FOREIGN KEY (universityID)
                REFERENCES ${TABLE_NAMES.UNIVERSITY} (id),
            CONSTRAINT fk_subject_course
                FOREIGN KEY (subjectID)
                REFERENCES ${TABLE_NAMES.SUBJECTS} (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='${TABLE_NAMES.QUESTIONS}' AND xtype='U')
        CREATE TABLE ${TABLE_NAMES.QUESTIONS} (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            courseID INTEGER NOT NULL,
            userID INTEGER NOT NULL,
            title VARCHAR(8000) NOT NULL,
            body VARCHAR(8000) NOT NULL,
            pinned INTEGER DEFAULT 0,
            timestamp DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
            CONSTRAINT fk_course_question
                FOREIGN KEY (courseID)
                REFERENCES ${TABLE_NAMES.COURSES} (id),
            CONSTRAINT fk_user_question
                FOREIGN KEY (userID)
                REFERENCES ${TABLE_NAMES.USERS} (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='${TABLE_NAMES.REVIEWS}' AND xtype='U')
        CREATE TABLE ${TABLE_NAMES.REVIEWS} (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            courseID INTEGER NOT NULL,
            userID INTEGER NOT NULL,
            title VARCHAR(8000) NOT NULL,
            body VARCHAR(8000) NOT NULL,
            recommend INTEGER NOT NULL,
            enjoy INTEGER NOT NULL,
            difficulty INTEGER DEFAULT '0',
            teaching INTEGER DEFAULT '0',
            workload INTEGER DEFAULT '0',
            timestamp DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
            CONSTRAINT fk_course_review
                FOREIGN KEY (courseID)
                REFERENCES ${TABLE_NAMES.COURSES} (id),
            CONSTRAINT fk_user_review
                FOREIGN KEY (userID)
                REFERENCES ${TABLE_NAMES.USERS} (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='${TABLE_NAMES.COMMENTS}' AND xtype='U')
        CREATE TABLE ${TABLE_NAMES.COMMENTS} (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            questionID INTEGER,
            reviewID INTEGER,
            commentParent INTEGER,
            userID INTEGER NOT NULL,
            body VARCHAR(8000) NOT NULL,
            timestamp DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
            CONSTRAINT fk_question_comment
                FOREIGN KEY (questionID)
                REFERENCES ${TABLE_NAMES.QUESTIONS} (id),
            CONSTRAINT fk_review_comment
                FOREIGN KEY (reviewID)
                REFERENCES ${TABLE_NAMES.REVIEWS} (id),
            CONSTRAINT fk_user_comment
                FOREIGN KEY (userID)
                REFERENCES ${TABLE_NAMES.USERS} (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='${TABLE_NAMES.LIKES}' AND xtype='U')
    BEGIN
        CREATE TABLE ${TABLE_NAMES.LIKES} (
            objectType VARCHAR(8000) NOT NULL,
            objectID INTEGER NOT NULL,
            userID INTEGER NOT NULL,
            value INTEGER DEFAULT '0',
            CONSTRAINT fk_user_like
                FOREIGN KEY (userID)
                REFERENCES ${TABLE_NAMES.USERS} (id)
        );
        CREATE UNIQUE INDEX id ON ${TABLE_NAMES.LIKES} (objectType, objectID, userID);
    END

    COMMIT;`
}

/*
 * Returns the value from the PRNG and constraining it from [min, max]
 */
function nextValue(min, max) {
    seed = seed * 16807 % 2147483647
    const range = max - min + 1
    return (seed % range) + min
}

/*
 * Generates an SQL statement to insert multiple rows into a given table.
 * Note: This is vulnerable to SQL injection and should only be used testing.
 */
async function bulkInsertDB(db, table, data) {
    return new Promise((resolve, reject) => {
        // Setup the bulk insertion
        const bulkLoad = db.newBulkLoad(table, {}, (error, rowCount) =>
            error ? reject(error) : resolve(rowCount))

        // Setup the columns
        const columns = Object.keys(data[0])
        columns.forEach((column) => {
            bulkLoad.addColumn(column, TABLE_COLUMNS[table][column].type,
                TABLE_COLUMNS[table][column].options)
        })

        // Setup the rows
        data.forEach((row) => bulkLoad.addRow(row))

        // Do the insertion
        db.execBulkLoad(bulkLoad)
    })
}
