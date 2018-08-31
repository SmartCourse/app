const app = require('../../src')
const supertest = require('supertest')(app)

describe('Course route testing', function () {
    it('course index', function (done) {
        supertest
            .get('/api/course/1')
            .expect(200)
            .end(done)
    })

    it('/api/course/1/questions', function (done) {
        supertest
            .get('/api/course/1')
            .expect(200)
            .end(done)
    })
})
