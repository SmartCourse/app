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
        tags
    }
})
