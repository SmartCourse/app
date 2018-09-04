const db = require('./db')

/* All inputs should be validated in this class that are question related */
class Question {
    constructor(db) {
        console.log('initialising question ORM object')
        this.db = db
    }

    // TODO - PAGING (log avoids unused variable)
    getQuestions(courseID, pageNumber) {
        return this.db
            .queryAll('SELECT * FROM question WHERE courseID=?', [courseID])
    }

    getQuestion(questionID) {
        return this.db
            .query('SELECT * FROM question WHERE questionID=?', [questionID])
    }

    // TODO - clean up way params are passed
    postQuestion(courseID, { userID, title, body }) {
        return db.insert('question', { courseID, userID, title, body })
    }
}

module.exports = (function(db) {
    return new Question(db)
})(db)
