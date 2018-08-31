const app = require('../../src')
const supertest = require('supertest')(app)

/* TODO build out tests to also include catching expected JSON response */
describe('Question route testing', function () {
    it('/api/question/1', function (done) {
        supertest
            .get('/api/question/1')
            .expect(200)
            .end(done)
    })
})
