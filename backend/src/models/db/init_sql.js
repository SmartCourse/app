const Connection = require('tedious').Connection
const Request = require('tedious').Request
const courses = require('./js/courses')
const subjects = require('./js/subjects')
const degreeData = require('../../../data/degrees')
const faculties = require('../../../data/faculties')
const {
    NUM_DUMMY_USERS,
    UNIVERSITY_ID,
    SAMPLE_QUESTIONS,
    SAMPLE_REVIEWS,
    SAMPLE_COMMENTS,
    SAMPLE_USERS
} = require('./test_constants')
const {
    TABLE_NAMES,
    DONT_RECOMMEND,
    RECOMMEND,
    MIN_ENJOY,
    MAX_ENJOY,
    MIN_OPTION,
    MAX_OPTION
} = require('../constants')

// SQL Server Config
const testing = process.env.NODE_ENV === 'production' ? 0 : 1
const DB_NAME = testing ? 'smartcourse-staging' : 'smartcourse'
const config = {
    userName: process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER,
    options:
        {
            database: DB_NAME,
            encrypt: true
        }
}

// Globals
// Seed must be (0, 2147483647)
// PRNG taken from: https://gist.github.com/blixt/f17b47c62508be59987b
let seed = 1
let commentID = 1
const questions = []
const reviews = []
const questionsToLike = []
const reviewsToLike = []
const commentsToLike = []
const userRepMap = {}

exports.initDB = async function() {
    // Database initialisation benchmarking
    const timeList = [Date.now() / 1000]

    // Do the initialisation
    const db = new Connection(config)
    return new Promise((resolve, reject) => {
        db.on('connect', (err) => {
            if (err) {
                console.log(err)
            } else {
                // Create the database and initialise data with no dependencies.
                let sql = 'BEGIN TRANSACTION;\n'
                sql += sqlTables() + '\n'
                /*
                sql += sqlUniversity('UNSW') + '\n'
                sql += faculties.map(sqlFaculty).join('\n') + '\n'
                sql += degreeData.map(sqlDegree).join('\n') + '\n'
                sql += subjects.map(sqlSubject).join('\n') + '\n'
                sql += courses.map(sqlCourse).join('\n') + '\n'
                */
                // If this is a test database, add the testing data
                if (testing) {
                    /*
                    sql += sqlQuestions()
                    sql += sqlReviews()
                    sql += sqlComments() + '\n'
                    sql += sqlLikes() + '\n'
                    sql += sqlUsers() + '\n'
                    */
                }
                sql += 'COMMIT;'

                // Execute the SQL
                const request = new Request(sql, (err) =>
                    err ? reject(err) : resolve(db))
                db.execSql(request)
            }
        })
    })
        .then(() => {
            // Log completion time
            timeList.push(Date.now() / 1000)
            console.log(`Done creating database! (${((timeList[1] - timeList[0])).toFixed(3)})`)
        })
}

function sqlUniversity(uni) {
    return `INSERT INTO ${TABLE_NAMES.UNIVERSITY} (name) VALUES (${uni});`
}

function sqlFaculty(faculty) {
    return `INSERT INTO ${TABLE_NAMES.FACULTIES} (name) VALUES ("${faculty}");`
}

function sqlDegree(degree) {
    const columns = Object.keys(degree)
        .join(',')
    const placeholders = Object.values(degree)
        .map(item => typeof item === 'number' ? item : `"${item}"`).join(',')

    return `INSERT INTO ${TABLE_NAMES.DEGREES} (${columns}) VALUES (${placeholders});`
}

function sqlSubject(subject) {
    const subjectWithUni = { ...subject, universityID: UNIVERSITY_ID }
    const columns = Object.keys(subjectWithUni)
    const placeholders = Object.values(subjectWithUni)
        .map(item => typeof item === 'number' ? item : `"${item}"`).join(',')

    return `INSERT INTO ${TABLE_NAMES.SUBJECTS} (${columns}) VALUES (${placeholders});`
}

function sqlCourse(course) {
    const courseWithUni = { ...course, universityID: UNIVERSITY_ID }
    const columns = Object.keys(courseWithUni)
        .join(',')
    const placeholders = Object.values(courseWithUni)
        .map(item => typeof item === 'number' ? item : `"${item
            .replace(/"/g, /'/)
        }"`).join(',')

    return `INSERT INTO ${TABLE_NAMES.COURSES} (${columns}) VALUES (${placeholders});`
}

function sqlQuestion(code) {
    const questionColumns = ['userID', 'code', 'title', 'body', 'pinned'].join(',')
    const userID = nextValue(1, NUM_DUMMY_USERS)
    questions.push({ questionID: questions.length + 1 })
    questionsToLike.push({ objectType: TABLE_NAMES.QUESTIONS, objectID: questions.length, userID })
    return function (question) {
        return `INSERT INTO ${TABLE_NAMES.QUESTIONS} (${questionColumns})
        VALUES (${userID}, "${code}", "${question.title}", "${question.body}", 1);`
    }
}

function sqlQuestions() {
    return courses.map(({ code }) =>
        SAMPLE_QUESTIONS.map(sqlQuestion(code)).join('\n') + '\n').join('')
}

function sqlReview(code) {
    const reviewColumns = ['userID', 'code', 'title', 'body', 'recommend', 'enjoy',
        'difficulty', 'teaching', 'workload'].join(',')
    const userID = nextValue(1, NUM_DUMMY_USERS)
    reviews.push({ reviewID: reviews.length + 1 })
    reviewsToLike.push({ objectType: TABLE_NAMES.REVIEWS, objectID: reviews.length, userID })
    return function(review) {
        return `INSERT INTO ${TABLE_NAMES.REVIEWS} (${reviewColumns})
        VALUES (${userID}, "${code}", "${review.title}", "${review.body}", 
        ${nextValue(DONT_RECOMMEND, RECOMMEND)}, ${nextValue(MIN_ENJOY, MAX_ENJOY)},
        ${nextValue(MIN_OPTION, MAX_OPTION)}, ${nextValue(MIN_OPTION, MAX_OPTION)},
        ${nextValue(MIN_OPTION, MAX_OPTION)});\n`
    }
}

function sqlReviews() {
    return courses.map(({ code }) =>
        SAMPLE_REVIEWS.map(sqlReview(code)).join('\n') + '\n').join('')
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

function sqlComments() {
    let comments = []
    let data = ''

    // Question comments
    for (let parent of questions) {
        comments = comments.concat(genComments(parent))
    }
    data += bulkInsertDB(TABLE_NAMES.COMMENTS, comments)
    comments = []

    // Review comments
    for (let parent of reviews) {
        comments = comments.concat(genComments(parent))
    }
    data += bulkInsertDB(TABLE_NAMES.COMMENTS, comments)

    return data
}

function sqlUsers() {
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
        const degree = degreeData[nextValue(0, degreeData.length - 1)].name

        users.push({
            id: i,
            uid: uid,
            displayName: displayName,
            email: email,
            degree: degree,
            reputation: userRepMap[i] || 0
        })
    }

    return bulkInsertDB(TABLE_NAMES.USERS, users)
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

function sqlLikes() {
    let likes = []
    let data = ''
    for (let parent of questionsToLike) {
        likes = likes.concat(genLikes(parent))
    }
    data += bulkInsertDB(TABLE_NAMES.LIKES, likes)
    likes = []

    for (let parent of reviewsToLike) {
        likes = likes.concat(genLikes(parent))
    }
    data += bulkInsertDB(TABLE_NAMES.LIKES, likes)
    likes = []

    for (let parent of commentsToLike) {
        likes = likes.concat(genLikes(parent))
    }
    data += bulkInsertDB(TABLE_NAMES.LIKES, likes)

    return data
}

function sqlTables() {
    return `
    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='faculties' AND xtype='U')
        CREATE TABLE faculties (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            name VARCHAR(255) NOT NULL
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='degrees' AND xtype='U')
        CREATE TABLE degrees (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            name VARCHAR(255) NOT NULL,
            longName VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            tags VARCHAR(255),
            facultyID INTEGER NOT NULL,
            CONSTRAINT fk_faculty_degree
                FOREIGN KEY (facultyID)
                REFERENCES faculties (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
        CREATE TABLE users (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            uid VARCHAR(255) UNIQUE NOT NULL,
            displayName VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            joined DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
            reputation INTEGER DEFAULT '0',
            degreeID INTEGER NOT NULL,
            gradYear TIMESTAMP,
            description VARCHAR(8000),
            picture VARCHAR(8000),
            CONSTRAINT fk_degree_user
                FOREIGN KEY (degreeID)
                REFERENCES degrees (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='university' AND xtype='U')
        CREATE TABLE university (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            name VARCHAR(255) NOT NULL
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='subjects' AND xtype='U')
        CREATE TABLE subjects (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            code VARCHAR(255) NOT NULL,
            universityID INTEGER NOT NULL,
            name VARCHAR(255) NOT NULL,
            handbookURL VARCHAR(255) NOT NULL,
            CONSTRAINT fk_university_subject
                FOREIGN KEY (universityID)
                REFERENCES university (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='courses' AND xtype='U')
        CREATE TABLE courses (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            code VARCHAR(255) NOT NULL,
            universityID INTEGER NOT NULL,
            name VARCHAR(255) NOT NULL,
            studyLevel VARCHAR(255) NOT NULL,
            subjectID INTEGER NOT NULL,
            handbookURL VARCHAR(255) NOT NULL,
            outlineURL VARCHAR(255),
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
                REFERENCES university (id),
            CONSTRAINT fk_subject_course
                FOREIGN KEY (subjectID)
                REFERENCES subjects (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='questions' AND xtype='U')
        CREATE TABLE questions (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            courseID INTEGER NOT NULL,
            userID INTEGER NOT NULL,
            title VARCHAR(255) NOT NULL,
            body VARCHAR(8000) NOT NULL,
            pinned INTEGER DEFAULT 0,
            timestamp DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
            CONSTRAINT fk_course_question
                FOREIGN KEY (courseID)
                REFERENCES courses (id),
            CONSTRAINT fk_user_question
                FOREIGN KEY (userID)
                REFERENCES users (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='reviews' AND xtype='U')
        CREATE TABLE reviews (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            courseID INTEGER NOT NULL,
            userID INTEGER NOT NULL,
            title VARCHAR(255) NOT NULL,
            body VARCHAR(8000) NOT NULL,
            recommend INTEGER NOT NULL,
            enjoy INTEGER NOT NULL,
            difficulty INTEGER DEFAULT '0',
            teaching INTEGER DEFAULT '0',
            workload INTEGER DEFAULT '0',
            timestamp DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
            CONSTRAINT fk_course_review
                FOREIGN KEY (courseID)
                REFERENCES courses (id),
            CONSTRAINT fk_user_review
                FOREIGN KEY (userID)
                REFERENCES users (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='comments' AND xtype='U')
        CREATE TABLE comments (
            id INTEGER PRIMARY KEY IDENTITY(1,1),
            questionID INTEGER,
            reviewID INTEGER,
            commentParent INTEGER,
            userID INTEGER NOT NULL,
            body VARCHAR(8000) NOT NULL,
            timestamp DATE NOT NULL DEFAULT (CONVERT (date, GETDATE())),
            CONSTRAINT fk_question_comment
                FOREIGN KEY (questionID)
                REFERENCES questions (id),
            CONSTRAINT fk_review_comment
                FOREIGN KEY (reviewID)
                REFERENCES reviews (id),
            CONSTRAINT fk_user_comment
                FOREIGN KEY (userID)
                REFERENCES users (id)
        );

    IF NOT EXISTS(SELECT * FROM sysobjects WHERE name='likes' AND xtype='U')
    BEGIN
        CREATE TABLE likes (
            objectType VARCHAR(255) NOT NULL,
            objectID INTEGER NOT NULL,
            userID INTEGER NOT NULL,
            value INTEGER DEFAULT '0',
            CONSTRAINT fk_user_like
                FOREIGN KEY (userID)
                REFERENCES users (id)
        );
        CREATE UNIQUE INDEX id ON likes (objectType, objectID, userID);
    END`
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
function bulkInsertDB(table, data) {
    const values = data.map(row => Object.values(row))
    const columns = Object.keys(data[0])
    const SQL_MAX_INSERT = 500
    let sql = ''
    for (var i = 0; i < values.length; i += SQL_MAX_INSERT) {
        sql += `INSERT INTO ${table} (${columns})
        VALUES ${values.slice(i, i + SQL_MAX_INSERT)
        .map(rowValues => `("${rowValues.join('","')}")`).join()};\n`
    }
    return sql
}
