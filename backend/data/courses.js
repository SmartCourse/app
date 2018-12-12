const courses = require('./course_data_2019.json')
const subjects = require('./subjects')
const { toLowerCase, decodeUTF8Text } = require('../src/utils/helpers')

module.exports = courses.map(subj => {
    const subjectCode = subj.code
    const subjectName = decodeUTF8Text(subj.name)

    return subj.courses.map(course => {
        const studyLevel = course.study_level

        const keywords = decodeUTF8Text(course.keywords)
        const description = decodeUTF8Text(course.description)
        const requirements = decodeUTF8Text(course.requirements)
        const name = decodeUTF8Text(course.name)
        const tags = [
            course.code,
            name,
            subjectCode,
            subjectName,
            studyLevel,
            ...keywords.split(',')]
            .map(toLowerCase).join(',')

        return ({
            code: course.code,
            name,
            studyLevel,
            subjectID: 1 + subjects.findIndex((s) => s.code === subjectCode),
            handbookURL: course.handbook_url,
            outlineURL: course.outline_url,
            // \n newline isn't parsed by sqlite, so replace it with html
            description: description.replace(/\n/g, '<p></p>'),
            requirements: requirements.replace(/\n/g, '<p></p>'),
            tags,
            universityID: 1
        })
    })
}).reduce((curr, acc) => [...curr, ...acc], [])
