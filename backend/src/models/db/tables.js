const courseData = require('./courses')
const subjectData = require('./subjects')
const degreeData = require('../../../data/degrees')
const facultyData = require('../../../data/faculties')
const { DONT_RECOMMEND, RECOMMEND, MIN_ENJOY, MAX_ENJOY, MIN_OPTION, MAX_OPTION } = require('../constants')

const NUM_DUMMY_USERS = 50

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

function createSubjectsTable(db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE subjects (
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
            FOREIGN KEY (subjectCode) REFERENCES subjects(code)
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

function createLikesTable (db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE likes (
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
                db.run('CREATE UNIQUE INDEX id ON likes (objectType, objectID, userID)',
                    (err) => err ? reject(err) : resolve('Created Like Table'))
            }
        })
    })
}

function createDegreesTable (db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE degrees (
            name TEXT PRIMARY KEY NOT NULL,
            type TEXT NOT NULL,
            faculty TEXT NOT NULL,
            tags TEXT,
            FOREIGN KEY (faculty) REFERENCES faculties(name)
          )`,
        (err) => err ? reject(err) : resolve('Created Degrees Table'))
    })
}

function createFacultiesTable (db) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE faculties (
            name TEXT PRIMARY KEY NOT NULL
          )`,
        (err) => err ? reject(err) : resolve('Created Faculties Table'))
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
    const query = `INSERT INTO subjects (${columns}) VALUES (${placeholders})`
    const prep = db.prepare(query)

    // Do insertions and return promise for all of them to be completed
    return Promise.all(subjects.map(subj => insertDB(db, 'subjects', subj, prep)))
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
    return Promise.all(courses.map(course => insertDB(db, 'course', course, prep)))
}

function initDegreesTable(db) {
    // Prepare query
    // TODO remove me later
    const mappedDegrees = degreeData.map(({ name, ...rest }) => ({
        name: name.startsWith('Bachelor of') ? 'B.' + name.split('Bachelor of')[1] : name,
        ...rest
    }))
    console.log(mappedDegrees);
    const columns = Object.keys(mappedDegrees[0])
    const placeholders = columns.map(_ => '?').join()
    const query = `INSERT INTO degrees (${columns}) VALUES (${placeholders})`
    const prep = db.prepare(query)

    // Do insertions and return promise for all of them to be completed
    return Promise.all(mappedDegrees.map(degree => insertDB(db, 'degrees', degree, prep)))
}

function initFacultiesTable(db) {
    // Prepare query
    const columns = ['name']
    const placeholders = columns.map(_ => '?').join()
    const query = `INSERT INTO faculties (${columns}) VALUES (${placeholders})`
    const prep = db.prepare(query)

    // Do insertions and return promise for all of them to be completed
    return Promise.all(facultyData.map(faculty => insertDB(db, 'faculties', { name: faculty }, prep)))
}

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

    const minRange = -2 // Between [minRange, minRange+maxRange]
    const maxRange = 15
    const numQuestionsTypes = questionTypes.length

    let questions = []

    // For each of the courses
    for (const course of courseData) {
        // Get its course code
        const { code } = course
        // Determine how many questions to add
        const numQuestions = Math.floor(Math.random() * maxRange + minRange)

        // Now create each of the questions
        for (let i = 0; i < numQuestions; i++) {
            // Determine the question type
            const index = Math.floor(Math.random() * numQuestionsTypes)
            // Create the question
            const question = { code, userID: Math.ceil(Math.random() * NUM_DUMMY_USERS), ...questionTypes[index] }
            // Add the question to the list
            questions.push(question)
        }
    }

    // Prepare query
    const columns = Object.keys(questions[0])
    const placeholders = columns.map(_ => '?').join()
    const query = `INSERT INTO question (${columns}) VALUES (${placeholders})`
    const prep = db.prepare(query)

    // Do insertions and return promise for all of them to be completed
    return questions.map(q => {
        insertDB(db, 'question', q, prep)
            .then(id => Promise.all([
                initComments(db, { questionID: id }),
                initLikes(db, { objectType: 'question', objectID: id })
            ]))
    })
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

    const minRange = -1 // Between [minRange, minRange+maxRange]
    const maxRange = 20
    const numReviewTypes = reviewTypes.length

    let reviews = []

    // For each of the courses
    for (const i in courseData) {
        // Get it's course code
        const code = courseData[i].code
        // Determine how many questions to add
        const numReviews = Math.floor(Math.random() * maxRange + minRange)
        if (numReviews <= 0) continue // not strictly necessary... but...meh

        // Now create each of the questions
        for (let i = 0; i < numReviews; i++) {
            // Determine the question type
            const index = Math.floor(Math.random() * numReviewTypes)
            // Create the question
            const review = {
                code: code,
                userID: Math.ceil(Math.random() * NUM_DUMMY_USERS),
                recommend: Math.round(Math.random()),
                enjoy: Math.round(Math.random() * (MAX_ENJOY - MIN_ENJOY) + MIN_ENJOY),
                ...reviewTypes[index] }
            // Add the question to the list
            reviews.push(review)
        }
    }

    // Prepare query
    const columns = Object.keys(reviews[0])
    const placeholders = columns.map(_ => '?').join()
    const query = `INSERT INTO review (${columns}) VALUES (${placeholders})`
    const prep = db.prepare(query)

    // Do insertions and return promise for all of them to be completed
    return Promise.all(reviews.map(r => {
        insertDB(db, 'review', r, prep)
            .then(id => Promise.all([
              initComments(db, { reviewID: id }),
              initLikes(db, { objectType: 'review', objectID: id })
            ]))
    }))
}

function initComments(db, parent) {
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

    // there should be a good chance of having 0 answers
    const minRange = -3 // Between [minRange, minRange+maxRange]
    const maxRange = 15
    const numComments = Math.floor(Math.random() * maxRange + minRange)
    if (numComments <= 0) return

    const numCommentTypes = commentTypes.length

    let comments = []

    for (let i = 0; i < numComments; i++) {
        const index = Math.floor(Math.random() * numCommentTypes)
        const comment = {
            ...parent,
            commentParent: 1,
            userID: Math.ceil(Math.random() * NUM_DUMMY_USERS),
            ...commentTypes[index]
        }
        comments.push(comment)
    }

    const columns = Object.keys(comments[0])
    const placeholders = columns.map(_ => '?').join()
    const query = `INSERT INTO comment (${columns}) VALUES (${placeholders})`
    const prep = db.prepare(query)

    const commentType = 'reviewID' in parent ? 'reply' : 'answer'

    return Promise.all(comments.map(c =>
        insertDB(db, 'comment', c, prep)
            .then((id) => initLikes(db, { objectType: commentType, objectID: id }))
    ))
}

function initLikes(db, parent) {
    const numLikes = Math.floor(Math.random() * 10)
    if (numLikes <= 0) return
    // choose numLikes consecutive users for these likes...
    const startIndex = Math.floor(Math.random() * NUM_DUMMY_USERS);

    let likes = []
    for (let i = startIndex; i < startIndex + numLikes; ++i) {
        likes.push({
          userID: (i % NUM_DUMMY_USERS) + 1,
          // more likely to be positive!
          value: Math.random() > 0.7 ? -1 : 1,
          ...parent
        })
    }

    const columns = Object.keys(likes[0])
    const placeholders = columns.map(_ => '?').join()
    const query = `INSERT INTO likes (${columns}) VALUES (${placeholders})`
    const prep = db.prepare(query)

    return Promise.all(likes.map(c => {
        insertDB(db, 'likes', c, prep)
    }))
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
    const degrees = [
      'B. Sci',
      'Bachelor of Medicine',
      'Bachelor of Arts',
      'Computer Science',
      'Masters of IT',
      'MBA',
      'Law Undergrad',
      'Engineering',
      'Elec Eng',
      'Environmental Science',
      'B. Eng',
      'Bachelor of Mechanical Engineering',
      'Bachelor of Chemical Engineering',
      'PHD Physics',
      'Bachelor of Science',
      'Bachelor of Philosophy',
      'Aerospace Engineering',
      'Biology',
      'Bachelor of Civil Engineering',
      'Journeyman Underwater Basket Weaver',
      'Masters of Electrical Engineering',
      'Bachelor of Science - Mathematics',
      'Bachelor of Commerce',
      'B.A.',
      'Bachelor of Architectural Studies',
      'Art Theory',
      // pad this out with blanks to simulate people not selecting a degree...
      '',
      '',
      '',
      '',
      ''
    ]

    let users = []

    for (let i = 1; i <= NUM_DUMMY_USERS; i++) {
        const uid = 'userID' + i
        const displayName =
          userNames[i % userNames.length] +
          // only append a number if we've run out of names
          (i < userNames.length ?
            '' :
            // then choose between a simulated birth year and a 'cool' suffix
            (i % 2 ?
              (90 + Math.trunc(i/userNames.length)) :
              // only add a number on the suffix if we're past possible combinations without numbers..
              // multiply i by 3 to make it look like a birthdate or something
              (suffixes[i % suffixes.length] + (i < (userNames.length + suffixes.length*2) ? '' : i*2))
            )
          )
        const email = displayName + '@test.com.au'
        const degree = degrees[Math.floor(Math.random() * degrees.length)]

        users.push({
            id: i,
            uid: uid,
            displayName: displayName,
            email: email,
            degree: degree
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

/**
 * Initiates a new SQL database by creating the tables with some UNSW data
 * @param   {object} SQLObject
 * @returns {object} SQLObject
 */
function createDB(db) {
    Promise.all([
        createUserTable(db),
        createUniversityTable(db),
        createSubjectsTable(db),
        createCourseTable(db),
        createQuestionTable(db),
        createReviewTable(db),
        createCommentTable(db),
        createLikesTable(db),
        createDegreesTable(db),
        createFacultiesTable(db)
    ])
        .then(() => {
            console.log('Created tables')
            return Promise.all([initUniTable(db), initSubjectTable(db), initCourseTable(db),
                initUserTable(db), initQuestionsTable(db), initReviewTable(db), initFacultiesTable(db), initDegreesTable(db)])
        })
        .then(() => {
            console.log('Initialised tables')
        })
        .catch((error) => console.warn(error))
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
