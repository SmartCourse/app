process.env.NODE_ENV = 'test'
const app = require('../../src')
const supertest = require('supertest')(app)

describe('Route testing', function () {
    it('index', function (done) {
        supertest
            .get('/')
            .expect(200)
            .end(done)
    })

    it('/api', function (done) {
        supertest
            .get('/api')
            .expect(200)
            .end(done)
    })

    it('/api/course/1/questions', function (done) {
        supertest
            .get('/api/course/1/questions')
            .expect(200)
            .end(done)
    })

    it('Test fallback for bad path', function (done) {
        supertest
            .get('/shizzlwazzle')
            .expect(200)
            .end(done)
    })
})
