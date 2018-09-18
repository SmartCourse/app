const data = require('../../../data/course_data_2019.json')
const { toLowerCase, safeDecodeutf8 } = require('../../utils/helpers')

module.exports = (() => {

        // unfortunately there are duplicate courses in the data set, so we must filter them

        // list of courses to return
        const courses = []

        data.forEach(function(subj) {

            const subjectCode = subj.code;
            const subjectName = safeDecodeutf8(subj.name);

            subj.courses.forEach(function(course) {

                const studyLevel = course.study_level

                const keywords = safeDecodeutf8(course.keywords)
                const description = safeDecodeutf8(course.description)
                const requirements = safeDecodeutf8(course.requirements)
                const name = safeDecodeutf8(course.name)

                const tags = [
                    course.code,
                    name,
                    subjectCode,
                    subjectName,
                    studyLevel,
                    ...keywords.split(',')]
                    .map(toLowerCase).join(',')

                courses.push({
                    code: course.code,
                    name,
                    studyLevel,
                    subjectCode,
                    handbookURL: course.handbook_url,
                    outlineURL: course.outline_url,
                    // \n newline isn't parsed by sqlite, so replace it with html
                    description: description.replace("\n", "<p></p>"),
                    requirements: requirements.replace("\n", "<p></p>"),
                    tags
                })
            })
        })
        return courses
    })()
