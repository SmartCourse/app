const data = require('../../../../frontend/public/course-names.json')

module.exports = data.map(item => {
    const [courseCode, courseName] = item.split(' - ')

    const facultyCode = courseCode.substr(0, 4)

    return {
        courseCode,
        courseName,
        facultyCode
    }
})
