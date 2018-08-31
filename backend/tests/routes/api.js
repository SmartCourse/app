const app = require('../../src')
const supertest = require('supertest')(app)

describe('API route testing', function () {
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

    it('Test fallback for bad path', function (done) {
        supertest
            .get('/shizzlwazzle')
            .expect(200)
            .end(done)
    })
})
