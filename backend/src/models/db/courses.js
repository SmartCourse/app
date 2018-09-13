const data = require('../../../../frontend/public/course-names.json')
const { toLowerCase } = require('../../utils/helpers')

module.exports = data.map(item => {
    const [courseCode, courseName] = item.split(' - ')

    const facultyCode = courseCode.substr(0, 4)
    const tags = [courseCode, courseName, facultyCode].map(toLowerCase).join(',')

    return {
        code: courseCode,
        name: courseName,
        facultyCode,
        tags,
        description: 'Offering 60 years of excellence in developing socially engaged engineers, developing new technologies and solutioning problems of global relevance.'
    }
})
