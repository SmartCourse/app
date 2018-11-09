const { writeFileSync } = require('fs')
const courses = require('./js/courses')
const subjects = require('./js/subjects')
const degreeData = require('../../../data/degrees')
const faculties = require('../../../data/faculties')

const questionColumns = ['userID', 'code', 'title', 'body'].join(',')

const ADMIN = 1
const universityID = 1

const users = [
    {
        id: ADMIN,
        uid: 1233444,
        displayName: 'Moderator',
        email: 'admin@smartcourse.me',
        degree: 'PhD',
        gradYear: 2018
    }
]

const SAMPLE_QUESTIONS = [
    {
        title: 'Is this course textbook necessary?',
        body: 'I\'m wondering if it\'s worth buying/obtaining the course textbook. If not, are there good alternative resources that people might recommend?'
    },
    {
        title: 'What year would you recommend taking this course?',
        body: 'Is this course worth taking earlier or later in my degree? What are the advantages or disadvantages?'
    },
    {
        title: 'Why did you take this course?',
        body: 'I\'m wondering why people took this course as I don\'t know a lot about it.'
    },
    {
        title: 'What are similar courses to this course?',
        body: 'I\'m interested in this course\'s content area and I\'m looking for similar courses. What would people recommend, and why?'
    },
    {
        title: 'How essential is it to attend lectures?',
        body: 'Are the lectures for the course recorded? Are the worthwhile attending. What am I giving up if I can\'t attend them?'
    }
]

function sqlQuestion(code) {
    return function (question) {
        return `INSERT INTO question (${questionColumns}) VALUES (${ADMIN}, "${code}", "${question.title}", "${question.body}");`
    }
}

function sqlUser(user) {
    const columns = Object.keys(user).join(',')
    const values  = Object.values(user)
        .map(item => typeof item === 'number' ? item : `"${item}"`)
        .join(',')

    return `INSERT INTO user (${columns}) VALUES (${values});`
}

function sqlFaculty(faculty) {
    return `INSERT INTO faculties (name) VALUES ("${faculty}");`
}

function sqlDegree(degree) {
    const columns = Object.keys(degree)
        .join(',')
    const placeholders = Object.values(degree)
        .map(item => typeof item === 'number' ? item : `"${item}"`).join(',')

    return `INSERT INTO degrees (${columns}) VALUES (${placeholders});`
}

function sqlSubject(subject) {
    const subjectWithUni = { ...subject, universityID }
    // Prepare query
    const columns = Object.keys(subjectWithUni)
    const placeholders = Object.values(subjectWithUni)
        .map(item => typeof item === 'number' ? item : `"${item}"`).join(',')

    return `INSERT INTO subjects (${columns}) VALUES (${placeholders});`
}

function sqlCourse(course) {
    const courseWithUni = { ...course, universityID }
    // Prepare query
    const columns = Object.keys(courseWithUni)
        .join(',')
    const placeholders = Object.values(courseWithUni)
        .map(item => typeof item === 'number' ? item : `"${item
            .replace(/"/g, /'/)
        }"`).join(',')

    return `INSERT INTO course (${columns}) VALUES (${placeholders});`
}

// mega query begins here
const data = `\
BEGIN TRANSACTION;\n\
${
    // user
    users.map(sqlUser).join('\n')
}\n
${
    // uni
    'INSERT INTO university (name) VALUES ("UNSW");'
}\n
${
    // faculties
    faculties.map(sqlFaculty).join('\n')
}\n
${
    // degrees
    degreeData.map(({ name, ...rest }) => ({
        name: name.startsWith('Bachelor of') ? 'B.' + name.split('Bachelor of')[1] : name,
        longName: name,
        ...rest
    })).map(sqlDegree).join('\n')
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
}\
\nCOMMIT;`

// generates the sql to generate every question. 5*nCourses inserts in sql ~15000 inserts
// currently takes 0.1
const path = require('path')

const OLD_DIR = process.cwd();

process.chdir(__dirname)

writeFileSync(path.join(__dirname, './sql/init.sql'), data)

// run init process
const { execSync } = require('child_process')

execSync(`bash ${path.join(__dirname, './init.sh')}`)

process.chdir(OLD_DIR)

console.log('done')
