const app = require('../../src')
const supertest = require('supertest')(app)

describe('Review route testing', function () {
    it('review', function (done) {
        supertest
            .get('/api/review/1')
            .expect(200)
            .end(done)
    })
})
