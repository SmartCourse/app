const data = require('../../../../data/course_data_2019.json')
const { toLowerCase, decodeUTF8Text } = require('../../../utils/helpers')

module.exports = data.map(subj => {
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
            description: description.replace(/\n/g, '<p></p>'),
            requirements: requirements.replace(/\n/g, '<p></p>'),
            tags
        })
    })
}).reduce((curr, acc) => [...curr, ...acc], [])
