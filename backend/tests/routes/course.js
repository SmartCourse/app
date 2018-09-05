const app = require('../../src')
const supertest = require('supertest')(app)

describe('Course route testing', () => {
    it('GET course index', () =>
        supertest
            .get('/api/course/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(response => {
                const res = JSON.parse(response.text)
                console.log(res)
            })
    )

    it('GET /api/course/1/questions', () =>
        supertest
            .get('/api/course/1/questions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    it('POST /api/course/1/question', () =>
        supertest
            .post('/api/course/1/question')
            .set('Accept', 'application/json')
            .send({ body: 'testu', title: 'jeff' })
            .expect('Content-Type', /json/)
            .expect(200)
    )
})
