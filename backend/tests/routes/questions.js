const app = require('../../src')
const assert = require('assert')
const supertest = require('supertest')(app)

/* TODO build out tests to also include catching expected JSON response */
describe('Question route testing', () => {
    it('GET /api/question/1', () =>
        supertest
            .get('/api/question/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )
})

describe('Answer route testing', () => {
    it('GET /api/question/1/answers', () =>
        supertest
            .get('/api/question/1/answers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    it('POST /api/question/1/answers', () =>
        supertest
            .post('/api/question/1/answers')
            .send({ body: 'superruuu____testu' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                assert(response.body.length === 2)
                assert(response.body.filter(it => it.body == 'superruuu____testu').length == 1)
            })
    )
})
