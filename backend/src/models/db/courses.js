const data = require('../../../data/course_data_2019.json')
const { toLowerCase, decodeutf8 } = require('../../utils/helpers')

module.exports = (() => {

        // unfortunately there are duplicate courses in the data set, so we must filter them
        const set = new Set()

        // list of courses to return
        const courses = []

        data.forEach(function(subj) {

            const subjectCode = decodeutf8(subj.code);
            const subjectName = decodeutf8(subj.name);

            subj.courses.forEach(function(course) {

                // decode the utf-8 strings
                for (const prop in course) {
                    course[prop] = decodeutf8(course[prop])
                }

                // ignore duplicate courses TODO (should be fixed in next data set)
                if (set.has(course.code)) {
                    return
                }
                set.add(course.code)

                const studyLevel = course.study_level
                const tags = [course.code, course.name, subjectCode, subjectName, studyLevel, ...course.keywords.split(',')].map(toLowerCase).join(',')

                courses.push({
                    code: course.code,
                    name: course.name,
                    studyLevel,
                    subjectCode,
                    handbookURL: course.handbook_url,
                    outlineURL: course.outline_url,
                    description: course.description.replace("\n", "<p></p>"), // \n newline isn't parsed by sqlite, so replace it with html
                    tags
                })
            })
        })
        return courses
    })()
