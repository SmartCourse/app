function getQuestions (db, courseID, pageNumber) {
    // TODO - PAGING (log avoids unused variable)
    console.log(pageNumber)
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM question WHERE courseID=?',
            [courseID],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

function getQuestion (db, questionID) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM question WHERE questionID=?',
            [questionID],
            (err, row) => {
                console.log(err)
                err ? reject(err) : resolve(row)
            }
        )
    })
}

module.exports = {
    getQuestions,
    getQuestion
}
