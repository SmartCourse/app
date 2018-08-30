function getAnswers (db, questionID, pageNumber) {
    // TODO - PAGING (log avoids unused variable)
    console.log(pageNumber)
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM answer WHERE questionID=?',
            [questionID],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

module.exports = {
    getAnswers
}
