const app = require('../../src')
const supertest = require('supertest')(app)
const { expect } = require('chai')

describe('Course route testing', () => {
    it('GET course index', () =>
        supertest
            .get('/api/course')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    describe('GET /api/course/1', () => {
        let request
        before(() => {
            request = supertest
                .get('/api/course/1')
                .set('Accept', 'application/json')
                .expect(200)
            return request
        })

        it('has the correct courseID', () =>
            request.then(({ body }) =>
                expect(body.courseID).to.equal(1))
        )

        it('has the correct courseName', () =>
            request.then(({ body }) =>
                expect(body.courseName).to.equal('Ethics and Management'))
        )

        it('has the correct courseCode', () =>
            request.then(({ body }) =>
                expect(body.courseCode).to.equal('COMP4920'))
        )
    })

    describe('GET /api/course/1/questions', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/1/questions')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('correct number of questions', () =>
            request.then(({ body }) =>
                expect(body.length).is.a('number'))
        )

        it('question has a title', () =>
            request.then(({ body }) =>
                expect(body[0].title).is.a('string'))
        )

        it('question has a body', () =>
            request.then(({ body }) =>
                expect(body[0].body).is.a('string'))
        )

        it('question has a course id', () =>
            request.then(({ body }) =>
                expect(body[0].courseID).is.a('number'))
        )
    })

    describe('POST /api/course/1/question', () => {
        let request

        before(() => {
            request = supertest
                .post('/api/course/1/question')
                .set('Accept', 'application/json')
                .send({ body: 'testu', title: 'jeff' })
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('Successfully provides a new question ID', () =>
            request.then(({ body }) => {
                expect(body).to.be.a('number')
            })
        )
    })
})
