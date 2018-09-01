const app = require('../../src')
const supertest = require('supertest')(app)

describe('Course route testing', () => {
    it('course index', () =>
        supertest
            .get('/api/course/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    it('/api/course/1/questions', () =>
        supertest
            .get('/api/course/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )
})
