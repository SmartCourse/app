const { expect } = require('chai')
const questionModel = require('../../src/models/question')(require('./stub-db'))

describe('Question Model', () => {
    it('compiles', function () {
        expect(questionModel)
    })

    /* Eventually test correct args, and
     * correct behaviour with absence of args
     */
    describe('question', () => {
        it('it gets questions', () => {
            return questionModel
                .getQuestions()
                .then(questions => expect(questions))
        })

        it('it posts a question', () => {
            return questionModel
                .postQuestion(1, { userID: 1, title: 'Hey', body: 'Nuno' })
                .then(questionID => expect(questionID))
        })

        it('it gets a question', () => {
            return questionModel
                .getQuestion(1)
                .then(question => expect(question))
        })
    })
})
