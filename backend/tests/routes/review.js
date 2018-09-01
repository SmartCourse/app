const app = require('../../src')
const supertest = require('supertest')(app)

describe('Review route testing', function () {
    it('review', () =>
        supertest
            .get('/api/review/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )
})
