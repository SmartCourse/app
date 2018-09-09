const { expect } = require('chai')
const commentModel = require('../../src/models/comment')(require('./stub-db'))

describe('Comment Model', () => {
    it('compiles', function () {
        expect(commentModel)
    })

    /* Eventually test correct args, and
     * correct behaviour with absence of args
     */
    describe('Comment', () => {
        it('it gets Comments', () => {
            return commentModel
                .getComments({ questionID: 1 })
                .then(comments => expect(comments))
        })

        it('it posts a Comment', () => {
            return commentModel
                .postComment({ questionID: 1 }, { body: 'Hey again, Nuno', userID: 1 })
                .then(comments => expect(comments))
        })
    })
})
