const data = require('../../../data/course_data_2019.json')
const { toLowerCase, decodeutf8 } = require('../../utils/helpers')

module.exports = (() => {

        // unfortunately there are duplicate courses in the data set, so we must filter them

        // list of courses to return
        const courses = []

        data.forEach(function(subj) {

            const subjectCode = decodeutf8(subj.code);
            const subjectName = decodeutf8(subj.name);

            subj.courses.forEach(function(course) {

                const studyLevel = course.study_level

                const tags = [
                    course.code,
                    decodeutf8(course.name),
                    subjectCode,
                    subjectName,
                    studyLevel,
                    ...decodeutf8(course.keywords).split(',')]
                    .map(toLowerCase).join(',')

                courses.push({
                    code: course.code,
                    name: decodeutf8(course.name),
                    studyLevel,
                    subjectCode,
                    handbookURL: course.handbook_url,
                    outlineURL: course.outline_url,
                    description: decodeutf8(course.description).replace("\n", "<p></p>"), // \n newline isn't parsed by sqlite, so replace it with html
                    tags
                })
            })
        })
        return courses
    })()
