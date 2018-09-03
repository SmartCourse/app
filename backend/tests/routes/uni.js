const app = require('../../src')
const supertest = require('supertest')(app)

describe('Uni route testing', function () {
    it('uni index', () =>
        supertest
            .get('/api/uni')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    it('uni id 1', () =>
        supertest
            .get('/api/uni/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )
})
