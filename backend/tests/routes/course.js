const app = require('../../src')
const supertest = require('supertest')(app)
const chai = require('chai')
const expect = chai.expect

describe('Course route testing', () => {
    it('GET course index', () =>
        supertest
            .get('/api/course/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    describe('GET /api/course/1/questions', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/1/questions')
                .set('Accept', 'application/json')
                .expect(200)
            return request
        })

        it('correct number of questions', () =>
            request.then(({body}) =>
                expect(body.length).is.a('number'))
        )

        it('question has a title', () =>
            request.then(({body}) =>
                expect(body[0].title).is.a('string'))
        )

        it('question has a body', () =>
            request.then(({body}) =>
                expect(body[0].body).is.a('string'))
        )

        it('question has a course id', () =>
            request.then(({body}) =>
                expect(body[0].courseID).is.a('number'))
        )

    })

    it('POST /api/course/1/question', () =>
        supertest
            .post('/api/course/1/question')
            .set('Accept', 'application/json')
            .send({ body: 'testu', title: 'jeff' })
            .expect('Content-Type', /json/)
            .expect(200)
    )
})
