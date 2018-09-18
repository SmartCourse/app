const data = require('../../../data/course_data_2019.json')
const { toLowerCase } = require('../../utils/helpers')

module.exports = (() => {

        // unfortunately there are duplicate courses in the data set, so we must filter them
        const set = new Set()

        // list of courses to return
        const courses = []

        data.forEach(function(subj) {

            const subjectCode = subj.code;
            const subjectName = subj.name;

            subj.courses.forEach(function(course) {

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
                    description: course.description,
                    tags
                })
            })
        })
        return courses
    })()
