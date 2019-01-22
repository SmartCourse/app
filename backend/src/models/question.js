const { TABLE_NAMES: { QUESTIONS, COMMENTS, COURSES }, PERM_MOD } = require('./constants')
const { APIError, toSQLErrorCode, translateSQLError } = require('../utils/error')

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
                throw new APIError({ status: 404, code: 4001, message: 'The question does not exist' })
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
            throw APIError({ status: 400, code: 4000, message: 'Invalid paging values' })
        }

        const offset = (pageSize * pageNumber) - pageSize
        return this.db
            .run(`IF NOT EXISTS (SELECT * FROM ${COURSES} WHERE code=@code)
                      THROW ${toSQLErrorCode(3001)}, 'The course does not exist', 1;
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
            .catch(translateSQLError({ [toSQLErrorCode(3001)]: 404 }))
    }

    getQuestionsByUserID(userID, limit = 10) {
        if (isNaN(limit)) {
            throw APIError({ status: 400, code: 4000, message: 'Invalid limit' })
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
        if (!title) errors.push({ code: 4002, message: 'Question must have a title' })
        if (!body) errors.push({ code: 4003, message: 'Question must have a body' })
        if (errors.length > 0) {
            throw new APIError({ status: 400, code: 1002, message: 'Invalid question', errors })
        }

        return this.db
            .run(`IF NOT EXISTS(SELECT * FROM ${COURSES} WHERE code=@code)
                      THROW ${toSQLErrorCode(3001)}, 'The course does not exist', 1;
                  INSERT INTO ${QUESTIONS} (courseID, userID, title, body)
                      SELECT id, @userID, @title, @body
                      FROM courses
                      WHERE code=@code;
                  SELECT @@identity AS id`,
            {
                [QUESTIONS]: { userID, title, body },
                [COURSES]: { code }
            })
            .then(([{ id }]) => id)
            .catch(translateSQLError({ [toSQLErrorCode(3001)]: 404 }))
    }

    /**
     * Put a question - i.e. update the body
     * @param {number}  id    The id of the question
     * @param {object}  body  object containing question data including
                              user id and body of the question
     */
    putQuestion(id, { userID, body, permissions }) {
        // TODO 404 errors and permissions..
        return this.db
            .run(`IF NOT EXISTS(SELECT * FROM ${QUESTIONS} WHERE id=@id)
                      THROW ${toSQLErrorCode(4001)}, 'The question does not exist', 1;
                  IF ${permissions} < ${PERM_MOD} AND NOT EXISTS (SELECT * FROM ${QUESTIONS} WHERE userID=@userID AND id=@id)
                      THROW ${toSQLErrorCode(1003)}, 'You cannot edit this question', 1;
                  ELSE
                      UPDATE ${QUESTIONS}
                      SET body=@body
                      WHERE userID=@userID AND id=@id`,
            {
                [QUESTIONS]: { userID, body, id }
            })
            .catch(translateSQLError({ [toSQLErrorCode(4001)]: 404, [toSQLErrorCode(1003)]: 403 }))
    }

    /**
     * Delete a question and its answers.
     * @param {number}  id      The id of the question
     * @param {object}  userID  The id of the user
     */
    deleteQuestion(id, userID, permissions) {
        // The query does an auth check with userID before deleting
        // TODO throw appropriate errors
        return this.db
            .run(`IF NOT EXISTS(SELECT * FROM ${QUESTIONS} WHERE id=@id)
                      THROW ${toSQLErrorCode(4001)}, 'The question does not exist', 1;
                  IF ${permissions} < ${PERM_MOD} AND NOT EXISTS (SELECT * FROM ${QUESTIONS} WHERE userID=@userID AND id=@id)
                      THROW ${toSQLErrorCode(1003)}, 'You cannot delete this question', 1;
                  ELSE
                      BEGIN
                        DELETE ${COMMENTS}
                            WHERE questionID=@questionID;
                        DELETE ${QUESTIONS}
                            WHERE userID=@userID AND id=@id;
                      END;`,
            {
                [QUESTIONS]: { userID, id },
                [COMMENTS]: { questionID: id }
            })
            .catch(translateSQLError({ [toSQLErrorCode(4001)]: 404, [toSQLErrorCode(1003)]: 403 }))
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
