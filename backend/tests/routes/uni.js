const app = require('../../src')
const supertest = require('supertest')(app)

describe('Uni route testing', function () {
    it('uni index', function (done) {
        supertest
            .get('/api/uni')
            .expect(200)
            .end(done)
    })
})
