const db = require('./db')

function getCourse (courseID) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM course WHERE courseID=?',
            [courseID],
            (err, row) => {
                console.log(err)
                err ? reject(err) : resolve(row)
            }
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

module.exports = {
    getCourse
}
