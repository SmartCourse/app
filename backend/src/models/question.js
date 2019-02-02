const { TABLE_NAMES: { QUESTIONS, COMMENTS, COURSES, REPORTS }, PERMISSIONS_MOD } = require('./constants')
const {
    APIError,
    toSQLThrow,
    ERRORS
} = require('../utils/error')

/* All inputs should be validated in this class that are question related */
class Question {
    constructor(db) {
        console.log('initialising ORM Question object')
        this.db = db
    }

    /**
     * Gets specific question corresponding to an id.
     * @param   {id}      questionID Required id param.
     * @returns {object}             Single question
     */
    getQuestion(id) {
        return this.db
            .run(`SELECT * FROM ${QUESTIONS} WHERE id=@id`,
                {
                    [QUESTIONS]: { id }
                })
            .then(([row]) => {
                if (row) return row
                throw new APIError(ERRORS.QUESTION.MISSING)
            })
    }

    /**
     * Get a specific page of questions for a course
     * @param   {string} code        The code of the course
     * @param   {number} pageNumber  The page number for which we want to get questions.
     * @returns {object}
     */
    getQuestions(code, pageNumber, pageSize) {
        if (isNaN(pageNumber) || isNaN(pageSize)) {
            throw new APIError({ ...ERRORS.QUESTION.BAD_REQUEST, message: 'Invalid paging values' })
        }

        const offset = (pageSize * pageNumber) - pageSize
        return this.db
            .run(`IF NOT EXISTS (SELECT * FROM ${COURSES} WHERE code=@code)
                      ${toSQLThrow(ERRORS.QUESTION.MISSING)}
                  SELECT q.*, cou.code, (SELECT COUNT(com.questionID)
                  FROM ${COMMENTS} com
                  WHERE com.questionID = q.id) as numAnswers
                  FROM ${QUESTIONS} q
                  JOIN ${COURSES} cou on cou.code = @code
                  WHERE courseID = cou.id
                  ORDER BY q.timestamp DESC
                  OFFSET ${offset} ROWS
                  FETCH NEXT ${pageSize} ROWS ONLY`,
            {
                [COURSES]: { code }
            })
    }

    getQuestionsByUserID(userID, limit = 10) {
        if (isNaN(limit)) {
            throw new APIError({ ...ERRORS.QUESTION.BAD_REQUEST, message: 'Invalid limit' })
        }
        // TODO 404 error for invalid user
        return this.db
            .run(`SELECT * FROM ${QUESTIONS}
                WHERE userID=@userID
                ORDER BY timestamp DESC
                OFFSET 0 ROWS
                FETCH NEXT ${limit} ROWS ONLY`,
            {
                [QUESTIONS]: { userID }
            })
    }

    /**
     * Gets the total number of questions for a course
     * @param   {string} code        The code of the course duh
     * @returns {object}
     */
    getQuestionCount(code) {
        // TODO 404 for invalid course
        return this.db
            .run(`SELECT COUNT(*) AS COUNT FROM ${QUESTIONS}
                WHERE courseID=(SELECT id FROM ${COURSES} WHERE code=@code)`,
            {
                [COURSES]: { code }
            })
            .then(([row]) => row || { COUNT: 0 })
    }

    /**
     * Post a question.
     * @param {string}  code  The code of the course
     * @param {object}  data      controller passed in object which should
     *                       contain the user data
     */
    postQuestion(code, { userID, title, body }) {
        // validation
        const errors = []
        if (!title) errors.push(ERRORS.QUESTION.NO_TITLE)
        if (!body) errors.push(ERRORS.QUESTION.NO_BODY)
        if (errors.length > 0) {
            throw new APIError({ ...ERRORS.MISC.BAD_REQUEST, message: 'Invalid question', errors })
        }

        return this.db
            .run(`IF NOT EXISTS(SELECT * FROM ${COURSES} WHERE code=@code)
                      ${toSQLThrow(ERRORS.COURSE.MISSING)}
                  INSERT INTO ${QUESTIONS} (courseID, userID, title, body)
                      SELECT id, @userID, @title, @body
                      FROM ${COURSES}
                      WHERE code=@code;
                  SELECT @@identity AS id`,
            {
                [QUESTIONS]: { userID, title, body },
                [COURSES]: { code }
            })
            .then(([{ id }]) => id)
    }

    /**
     * Put a question - i.e. update the body
     * @param {number}  id    The id of the question
     * @param {object}  body  object containing question data including
                              user id and body of the question
     */
    putQuestion(id, { userID, body, permissions }) {
        return this.db
            .run(`IF NOT EXISTS(SELECT * FROM ${QUESTIONS} WHERE id=@id)
                      ${toSQLThrow(ERRORS.QUESTION.MISSING)}
                  IF ${permissions} < ${PERMISSIONS_MOD} AND NOT EXISTS (SELECT * FROM ${QUESTIONS} WHERE userID=@userID AND id=@id)
                      ${toSQLThrow(ERRORS.MISC.AUTHORIZATION)}
                  ELSE
                      UPDATE ${QUESTIONS}
                      SET body=@body
                      WHERE id=@id`,
            {
                [QUESTIONS]: { userID, body, id }
            })
    }

    /**
     * Delete a question and its answers.
     * @param {number}  id      The id of the question
     * @param {number}  userID  The id of the user
     * @param {number}  permissions The permission level of the user
     */
    deleteQuestion(id, userID, permissions) {
        return this.db
            .run(`IF NOT EXISTS(SELECT * FROM ${QUESTIONS} WHERE id=@id)
                      ${toSQLThrow(ERRORS.QUESTION.MISSING)}
                  IF ${permissions} < ${PERMISSIONS_MOD} AND NOT EXISTS (SELECT * FROM ${QUESTIONS} WHERE userID=@userID AND id=@id)
                      ${toSQLThrow(ERRORS.MISC.AUTHORIZATION)}
                  DELETE ${REPORTS}
                      WHERE questionID=@questionID;
                  DELETE ${COMMENTS}
                      WHERE questionID=@questionID;
                  DELETE ${QUESTIONS}
                      WHERE id=@id;`,
            {
                [QUESTIONS]: { userID, id },
                [COMMENTS]: { questionID: id }
            })
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function(db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new Question(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new Question(db)
}
