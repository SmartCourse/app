const { expect } = require('chai')
const answerModel = require('../../src/models/answer')(require('./stub-db'))

describe('Answer Model', () => {
    it('compiles', function () {
        expect(answerModel)
    })

    /* Eventually test correct args, and
     * correct behaviour with absence of args
     */
    describe('answer', () => {
        it('it gets answers', () => {
            return answerModel
                .getAnswers()
                .then(answers => expect(answers))
        })

        it('it posts an answer', () => {
            return answerModel
                .postAnswer(1, { body: 'Hey again, Nuno', userID: 1 })
                .then(answers => expect(answers))
        })
    })
})
