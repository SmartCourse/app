const app = require('../../src')
const supertest = require('supertest')(app)

/* TODO build out tests to also include catching expected JSON response */
describe('Question route testing', () => {
    it('/api/question/1', () =>
        supertest
            .get('/api/question/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )
})
