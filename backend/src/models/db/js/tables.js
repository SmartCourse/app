const courseData = require('./courses')
const degreeData = require('../../../../data/degrees')

const {
    DONT_RECOMMEND,
    RECOMMEND,
    MIN_ENJOY,
    MAX_ENJOY,
    MIN_OPTION,
    MAX_OPTION
} = require('../../constants')

const { getRandomInt, getRandomIntInclusive } = require('../../../utils/helpers')

// only populate questions, reviews, comments, likes for this many courses
// 500 does up to most of BABS
const COURSE_UPDATE_LIMIT = 500

const NUM_DUMMY_USERS = 50

// 111 is actually the max number of rows you can insert in one query...
const MAX_SQLITE_ROWS = 111

// user ids mapped to reputation
const userRepMap = {}

function initQuestionsTable(db) {
    const questionTypes = [
        {
            title: 'Course Textbook',
            body: 'hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit'
        },
        {
            title: 'Contact Hours',
            body: 'pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum'
        },
        {
            title: 'When to take?',
            body: 'leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque'
        },
        {
            title: 'Group Project',
            body: 'pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam'
        },
        {
            title: 'Will this help me?',
            body: 'nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae'
        },
        {
            title: 'Similar courses',
            body: 'non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse'
        }
    ]

    const minRange = 2 // Between [minRange, maxRange]
    const maxRange = 15
    const numQuestionsTypes = questionTypes.length

    // each set 100 questions
    // we have to do this cos SQLite can only insert so many rows at once
    let questionSet = []
    let questions = []

    let c = 0
    // For each of the courses
    for (const course of courseData) {
        if (c === COURSE_UPDATE_LIMIT) break
        // Get its course code
        const { code } = course
        // Determine how many questions to add
        const numQuestions = getRandomIntInclusive(minRange, maxRange)

        // Now create each of the questions
        for (let i = 0; i < numQuestions; i++) {
            // Determine the question type
            const index = getRandomInt(0, numQuestionsTypes)
            const uid = getRandomIntInclusive(1, NUM_DUMMY_USERS)
            // Create the question
            const question = {
                code,
                userID: uid,
                ...questionTypes[index]
            }

            // Add the question to the list of sets
            questionSet.push(question)
            if (questionSet.length >= MAX_SQLITE_ROWS) {
                questions.push(questionSet)
                questionSet = []
            }
        }
        c++
    }

    return Promise.all(questions.map(set => bulkInsertDB(db, 'question', set)))
        .then(() => bulkSelect(db, 'question', ['id', 'userID']))
        .then((ids) => Promise.all([
            initComments(db, ids.map(({ id, userID }) => ({ questionID: id, userID }))),
            initLikes(db, ids.map(({ id, userID }) => ({ objectType: 'question', objectID: id, userID })))
        ]))
}

function initReviewTable(db) {
    const reviewTypes = [
        {
            title: 'My favourite course so far',
            body: 'hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit'
        },
        {
            title: 'You MUST do this course',
            body: 'pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum'
        },
        {
            title: 'Core course',
            body: 'leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque'
        },
        {
            title: 'Very Unhappy',
            body: 'pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam'
        },
        {
            title: 'Challenging',
            body: 'nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae'
        },
        {
            title: 'Wow',
            body: 'non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse'
        }
    ]

    const minRange = 4 // Between [minRange, maxRange]
    const maxRange = 20
    const numReviewTypes = reviewTypes.length

    let reviewSet = []
    let reviews = []

    let c = 0
    // For each of the courses
    for (const i in courseData) {
        if (c === COURSE_UPDATE_LIMIT) break
        // Get it's course code
        const code = courseData[i].code
        // Determine how many questions to add
        const numReviews = getRandomIntInclusive(minRange, maxRange)
        if (numReviews <= 0) continue

        // Now create each of the reviews
        for (let i = 0; i < numReviews; i++) {
            // Determine the question type
            const index = getRandomInt(0, numReviewTypes)
            const uid = getRandomIntInclusive(1, NUM_DUMMY_USERS);
            // Create the question
            const review = {
                code: code,
                userID: uid,
                recommend: getRandomIntInclusive(0, 1),
                enjoy: getRandomIntInclusive(MIN_ENJOY, MAX_ENJOY),
                ...reviewTypes[index],
                difficulty: getRandomIntInclusive(MIN_OPTION, MAX_OPTION),
                teaching: getRandomIntInclusive(MIN_OPTION, MAX_OPTION),
                workload: getRandomIntInclusive(MIN_OPTION, MAX_OPTION)
            }

            // add review to set
            reviewSet.push(review)
            if (reviewSet.length >= MAX_SQLITE_ROWS) {
                reviews.push(reviewSet)
                reviewSet = []
            }
        }
        c++
    }

    return Promise.all(reviews.map(set => bulkInsertDB(db, 'review', set)))
        .then(() => bulkSelect(db, 'review', ['id', 'userID']))
        .then((ids) => Promise.all([
            initComments(db, ids.map(({ id, userID }) => ({ reviewID: id, userID }))),
            initLikes(db, ids.map(({ id, userID }) => ({ objectType: 'review', objectID: id, userID })))
        ]))
}

function initComments(db, parents) {
    const commentTypes = [
        {
            body: 'hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique magna sit amet purus gravida quis blandit turpis cursus in hac habitasse platea dictumst quisque sagittis purus sit'
        },
        {
            body: 'pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum'
        },
        {
            body: 'leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque'
        },
        {
            body: 'pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam'
        },
        {
            body: 'nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae'
        },
        {
            body: 'non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse'
        }
    ]

    const minRange = 3 // Between [minRange, maxRange]
    const maxRange = 15
    const numCommentTypes = commentTypes.length

    const commentType = 'reviewID' in parents[0] ? 'reply' : 'answer'
    const columns = [Object.keys(parents[0])[0], 'commentParent', 'userID', 'body']

    let commentSet = []
    let comments = []

    for (let parent of parents) {
        const numComments = getRandomIntInclusive(minRange, maxRange)
        if (numComments <= 0) continue

        for (let i = 0; i < numComments; i++) {
            const index = getRandomInt(0, numCommentTypes)
            const uid = getRandomIntInclusive(1, NUM_DUMMY_USERS)
            const comment = {
                ...parent,
                commentParent: 1,
                userID: uid,
                ...commentTypes[index]
            }
            commentSet.push(comment)
            if (commentSet.length >= MAX_SQLITE_ROWS) {
                comments.push(commentSet)
                commentSet = []
            }
        }
    }

    return Promise.all(comments.map(set => bulkInsertDB(db, 'comment', set)))
        .then(() => bulkSelect(db, 'comment', ['id', 'userID']))
        .then((ids) => initLikes(db, ids.map(({ id, userID }) => ({ objectType: commentType, objectID: id, userID }))))
}

function initLikes(db, parents) {
    let likeSet = []
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
                userRepMap[parent.userID] += like.value;
            } else {
                userRepMap[parent.userID] = like.value;
            }
            likeSet.push(like)
            if (likeSet.length >= MAX_SQLITE_ROWS) {
                likes.push(likeSet)
                likeSet = []
            }
        }
    }

    return Promise.all(likes.map(set => bulkInsertDB(db, 'likes', set)))
}

function initUserTable(db) {
    const userNames = [
        'Frud',
        'Angoleena',
        'Alhecks',
        'Brob',
        'Sarha',
        'Hurry',
        'Janes',
        'Thim',
        'Bretty',
        'Bruna',
        'Nack',
        'Alfronds',
        'Latchlan',
        'Juke',
        'Erdward',
        'Zabe',
        'Groben',
        'Xanarthad',
        'Henrayetta',
        'Poldanskri',
        'Lloiyde'
    ]
    const suffixes = ['XxX', '!', 's', '!!', '_', '__', 'x']

    let users = []

    for (let i = 2; i <= NUM_DUMMY_USERS; i++) {
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
        const degree = degreeData[getRandomInt(0, degreeData.length)].name

        users.push({
            id: i,
            uid: uid,
            displayName: displayName,
            email: email,
            degree: degree,
            reputation: userRepMap[i]
        })
    }

    // Prepare query
    const columns = Object.keys(users[0])
    const placeholders = columns.map(_ => '?').join()
    const query = `INSERT INTO user (${columns}) VALUES (${placeholders})`
    const prep = db.prepare(query)

    // Do insertions and return promise for all of them to be completed
    return Promise.all(users.map(u => insertDB(db, 'user', u, prep)))
}

function updateCourseRatings(db, code) {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE course
                    SET
                      recommend = (SELECT CASE WHEN COUNT(*)==0 THEN -1 ELSE SUM(recommend)*100/COUNT(*) END FROM review WHERE code==$code),
                      enjoy = (SELECT CASE WHEN COUNT(*)==0 THEN 0 ELSE SUM(enjoy-1)*100/(4*COUNT(*)) END FROM review WHERE code==$code),
                      difficulty = (SELECT CASE WHEN COUNT(*)==0 THEN 0 ELSE SUM(difficulty-1)*100/(2*COUNT(*)) END FROM review WHERE code==$code AND difficulty > 0),
                      teaching = (SELECT CASE WHEN COUNT(*)==0 THEN 0 ELSE SUM(teaching-1)*100/(2*COUNT(*)) END FROM review WHERE code==$code AND teaching > 0),
                      workload = (SELECT CASE WHEN COUNT(*)==0 THEN 0 ELSE SUM(workload-1)*100/(2*COUNT(*)) END FROM review WHERE code==$code AND workload > 0)
                    WHERE code=$code;`,
        { $code: code },
        function (err) { err ? reject(err) : resolve() })
    })
}

/**
 * Initiates a new SQL database by creating the tables with some UNSW data
 * @param   {object} SQLObject
 * @returns {object} SQLObject
 */
async function createDB(db) {
    const timeList = [Date.now() / 1000]

    timeList.push(Date.now() / 1000)
    console.log(`Created tables in ${((timeList[1] - timeList[0])).toFixed(3)} seconds`)
    Promise.all([initQuestionsTable(db), initReviewTable(db)])
        .then(() => {
            timeList.push(Date.now() / 1000)
            console.log(`Initialised most tables in ${((timeList[2] - timeList[1])).toFixed(3)} seconds`)
            return initUserTable(db)
        })
        .then(() => {
            timeList.push(Date.now() / 1000)
            console.log(`Initialised user table in ${((timeList[3] - timeList[2])).toFixed(3)} seconds`)
            return Promise.all(courseData.slice(0, COURSE_UPDATE_LIMIT).map(({ code }) => updateCourseRatings(db, code)))
        })
        .then(() => {
            timeList.push(Date.now() / 1000)
            console.log(`Initialised course ratings in ${((timeList[4] - timeList[3])).toFixed(3)} seconds`)
        })
        .catch((error) => console.warn(error))
}

function bulkSelect(db, table, fieldNames) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT ${fieldNames.join()} FROM ${table}`,
            [],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

// Insert given JSON object into database table.
// data = [{ column : value }, { column : value }, ...]
// all objects must have same column names
// WARNING: This syntax only works with sqlite 3.7.11+
// For security reasons, column inputs can NEVER be user defined.
function bulkInsertDB(db, table, data) {
    return new Promise((resolve, reject) => {

        const values = data.map(row => Object.values(row))
        const columns = Object.keys(data[0])
        const placeholders = columns.map(_ => '?').join()
        const query = `INSERT INTO ${table} (${columns}) VALUES ${values.map(rowValues => `(${placeholders})`).join()}`
        const flatValues = values.reduce((acc, curr) => acc.concat(curr), [])
        db = db.run(
            query,
            flatValues,
            function (err) { err ? reject(err) : resolve(this.lastID) }
        )
    })
}

// Insert given JSON object into database table.
// data = { column : value }
// For security reasons, column inputs can NEVER be user defined.
function insertDB(db, table, data, prep) {
    return new Promise((resolve, reject) => {
        const values = Object.values(data)
        if (!prep) {
            // Run non-prepared statment
            const columns = Object.keys(data)
            const placeholders = columns.map(_ => '?').join()
            const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`
            db = db.run(
                query,
                values,
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
function insertUniqueDB(db, table, data) {
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
function updateDB(db, table, data, conditions) {
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
