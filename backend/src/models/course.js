const db = require('./db')

exports.getCourses = function getCourses () {
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM course',
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

exports.getCourse = function (courseID) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM course WHERE courseID=?',
            [courseID],
            (err, row) => { err ? reject(err) : resolve(row) }
        )
    })
}

/* THIS IS JUST AN EXAMPLE, NOT ACTUALLY
function postCourse (db, courseCode) {
    return new Promise((resolve, reject) => {
        db.get(
            'INSERT INTO course VALUES(?)',
            [courseCoude],
            (err, row) => {
                console.log(err)
                err ? reject(err) : resolve(row)
            }
        )
    })
}
*/
