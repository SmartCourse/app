const data = require('../../../data/course_data_2019.json')
const { toLowerCase, decodeUTF8Text } = require('../../utils/helpers')

module.exports = (() => {
    // unfortunately there are duplicate courses in the data set, so we must filter them

    // list of courses to return
    const courses = data.map(subj => {
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
                subjectCode,
                handbookURL: course.handbook_url,
                outlineURL: course.outline_url,
                // \n newline isn't parsed by sqlite, so replace it with html
                description: description.replace('\n', '<p></p>'),
                requirements: requirements.replace('\n', '<p></p>'),
                tags
            })
        })
    })
    console.log(courses)
    return courses
})()
