const app = require('../../src')
const supertest = require('supertest')(app)

describe('Uni route testing', function () {
    it('GET /degrees', () =>
        supertest
            .get('/api/uni/degrees')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    it('GET /faculties', () =>
        supertest
            .get('/api/uni/faculties')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )
})
