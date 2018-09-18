const data = require('../../../data/course_data_2019.json')
const { toLowerCase, decodeutf8Text } = require('../../utils/helpers')

module.exports = (() => {

        // unfortunately there are duplicate courses in the data set, so we must filter them

        // list of courses to return
        const courses = []

        data.forEach(function(subj) {

            const subjectCode = subj.code;
            const subjectName = decodeutf8Text(subj.name);

            subj.courses.forEach(function(course) {

                const studyLevel = course.study_level

                const keywords = decodeutf8Text(course.keywords)
                const description = decodeutf8Text(course.description)
                const requirements = decodeutf8Text(course.requirements)
                const name = decodeutf8Text(course.name)

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
