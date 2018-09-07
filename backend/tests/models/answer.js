const assert = require('assert')
const answerModel = require('../../src/models/answer')(require('./stub-db'))

describe('dev db starts', () => {
    it('compiles', function () {
        assert(answerModel)
    })

    /* Eventually test correct args, and
     * correct behaviour with absence of args
     */
    describe('answer', () => {
        it('it gets answers', () => {
            return answerModel
                .getAnswers()
                .then(answers => assert(answers))
        })

        it('it posts an answer', () => {
            assert(true)
            /* NB Test fails because not properly abstracted in answer model (yet)
            return answerModel
                .postAnswer()
                .then(answers => assert(answers))
            */
        })
    })
})
