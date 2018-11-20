const { existsSync, mkdirSync, writeFileSync } = require('fs')
const { execSync } = require('child_process')
const sqlite3 = require('sqlite3')
const path = require('path')
const courses = require('./js/courses')
const subjects = require('./js/subjects')
const degreeData = require('../../../data/degrees')
const faculties = require('../../../data/faculties')
const {
    TEST_DB,
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
const { getRandomIntInclusive } = require('../../utils/helpers')

const userRepMap = {}

// mega query begins here
const initialSQL = `\
BEGIN TRANSACTION;\n\
${
    // uni
    `INSERT INTO ${TABLE_NAMES.UNIVERSITY} (name) VALUES ("UNSW");`
}\n
${
    // faculties
    faculties.map(sqlFaculty).join('\n')
}\n
${
    // degrees
    degreeData.map(sqlDegree).join('\n')
}\n
${
    // subjects
    subjects.map(sqlSubject).join('\n')
}\n
${
    // courses
    courses.map(sqlCourse).join('\n')
    // '\n'
}\n
${
    // questions
    courses.map(({ code }) =>
        SAMPLE_QUESTIONS.map(sqlQuestion(code)).join('\n') + '\n').join('')
}\n
${
    // reviews
    courses.map(sqlReviews).join('')
}\
\nCOMMIT;`

// Time testing
const timeList = [Date.now() / 1000]

// Change to a known directory
const OLD_DIR = process.cwd()
process.chdir(__dirname)

// Create the test database and initialise data with no dependencies
runSQL(initialSQL, 'init')

// Initialise data with dependencies
const db = new sqlite3.Database(TEST_DB, sqlite3.OPEN_READWRITE)
Promise.all([bulkSelect(db, 'question', ['id', 'userID']), bulkSelect(db, 'review', ['id', 'userID'])])
    .then(([qIDs, rIDs]) => {
        let data = sqlComments(qIDs.map(({ id, userID }) => ({ questionID: id, userID })))
        data += sqlComments(rIDs.map(({ id, userID }) => ({ reviewID: id, userID })))
        runSQL(data, 'comments')
        data = sqlLikes(qIDs.map(({ id, userID }) => ({ objectType: 'question', objectID: id, userID })))
        data += sqlLikes(qIDs.map(({ id, userID }) => ({ objectType: 'answer', objectID: id, userID })))
        data += sqlLikes(rIDs.map(({ id, userID }) => ({ objectType: 'review', objectID: id, userID })))
        data += sqlLikes(rIDs.map(({ id, userID }) => ({ objectType: 'reply', objectID: id, userID })))
        runSQL(data, 'likes')
        data = sqlUsers()
        runSQL(data, 'users')
        timeList.push(Date.now() / 1000)
        console.log(`Done creating test database! (${((timeList[1] - timeList[0])).toFixed(3)})`)
        process.chdir(OLD_DIR)
    })

// these will be hoisted
function sqlQuestion(code) {
    const questionColumns = ['userID', 'code', 'title', 'body', 'pinned'].join(',')
    return function (question) {
        return `INSERT INTO ${TABLE_NAMES.QUESTIONS} (${questionColumns})
        VALUES (${getRandomIntInclusive(1, NUM_DUMMY_USERS)}, "${code}", "${question.title}", "${question.body}", 1);`
    }
}

function sqlReviews({ code }) {
    const reviewColumns = ['userID', 'code', 'title', 'body', 'recommend', 'enjoy',
        'difficulty', 'teaching', 'workload'].join(',')
    const minRange = 2
    const maxRange = 20
    const numReviewTypes = SAMPLE_REVIEWS.length
    const numReviews = getRandomIntInclusive(minRange, maxRange)
    let reviewsQuery = ''
    for (let i = 0; i < numReviews; i++) {
        const review = SAMPLE_REVIEWS[getRandomIntInclusive(0, numReviewTypes - 1)]
        // Insert review
        reviewsQuery += `INSERT INTO ${TABLE_NAMES.REVIEWS} (${reviewColumns}) 
        VALUES (${getRandomIntInclusive(1, NUM_DUMMY_USERS)}, "${code}", "${review.title}", "${review.body}", 
        ${getRandomIntInclusive(DONT_RECOMMEND, RECOMMEND)}, ${getRandomIntInclusive(MIN_ENJOY, MAX_ENJOY)},
        ${getRandomIntInclusive(MIN_OPTION, MAX_OPTION)}, ${getRandomIntInclusive(MIN_OPTION, MAX_OPTION)},
        ${getRandomIntInclusive(MIN_OPTION, MAX_OPTION)});\n`
    }
    return reviewsQuery
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
    // Prepare query
    const columns = Object.keys(subjectWithUni)
    const placeholders = Object.values(subjectWithUni)
        .map(item => typeof item === 'number' ? item : `"${item}"`).join(',')

    return `INSERT INTO ${TABLE_NAMES.SUBJECTS} (${columns}) VALUES (${placeholders});`
}

function sqlCourse(course) {
    const courseWithUni = { ...course, universityID: UNIVERSITY_ID }
    // Prepare query
    const columns = Object.keys(courseWithUni)
        .join(',')
    const placeholders = Object.values(courseWithUni)
        .map(item => typeof item === 'number' ? item : `"${item
            .replace(/"/g, /'/)
        }"`).join(',')

    return `INSERT INTO ${TABLE_NAMES.COURSES} (${columns}) VALUES (${placeholders});`
}

function sqlComments(parents) {
    const commentTypes = SAMPLE_COMMENTS
    const minRange = 1
    const maxRange = 3
    const numCommentTypes = commentTypes.length
    let comments = []

    for (let parent of parents) {
        const numComments = getRandomIntInclusive(minRange, maxRange)
        if (numComments <= 0) continue

        for (let i = 0; i < numComments; i++) {
            const index = getRandomIntInclusive(0, numCommentTypes - 1)
            const uid = getRandomIntInclusive(1, NUM_DUMMY_USERS)
            const comment = {
                ...parent,
                commentParent: 1,
                userID: uid,
                ...commentTypes[index]
            }
            comments.push(comment)
        }
    }

    return bulkInsertDB('comment', comments)
}

function sqlUsers() {
    const userNames = SAMPLE_USERS
    const suffixes = ['XxX', '!', 's', '!!', '_', '__', 'x']

    let users = []

    for (let i = 1; i < NUM_DUMMY_USERS; i++) {
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
        const degree = degreeData[getRandomIntInclusive(0, degreeData.length - 1)].name

        users.push({
            id: i,
            uid: uid,
            displayName: displayName,
            email: email,
            degree: degree,
            reputation: userRepMap[i]
        })
    }

    return bulkInsertDB('user', users)
}

function sqlLikes(parents) {
    let likes = []

    for (let parent of parents) {
        const numLikes = getRandomIntInclusive(-2, 10)
        if (numLikes <= 0) continue
        // choose numLikes consecutive users for these likes...
        const startIndex = getRandomIntInclusive(1, NUM_DUMMY_USERS)

        for (let i = startIndex; i < startIndex + numLikes; ++i) {
            const like = {
                userID: (i % NUM_DUMMY_USERS) + 1,
                // more likely to be positive!
                value: Math.random() > 0.7 ? -1 : 1,
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
    }

    return bulkInsertDB('likes', likes)
}

/* SQL HELPERS */
/* THESE ARE ONLY USED FOR TESTING AND ARE VULNERABLE TO SQL INJECTION */
function bulkSelect(db, table, fieldNames) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT ${fieldNames.join()} FROM ${table}`,
            [],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

function bulkInsertDB(table, data) {
    const values = data.map(row => Object.values(row))
    const columns = Object.keys(data[0])
    return `INSERT INTO ${table} (${columns})
    VALUES ${values.map(rowValues => `("${rowValues.join('","')}")`).join()};\n`
}

function runSQL(data, stage) {
    const dirname = path.dirname(`./sql/test/${stage}.sql`)
    if (!existsSync(dirname)) {
        mkdirSync(dirname)
    }
    writeFileSync(path.join(__dirname, `./sql/test/${stage}.sql`), data)
    execSync(`bash ${path.join(__dirname, './init.sh')} ${stage}`)
}
