const app = require('../../src')
const supertest = require('supertest')(app)
const { expect } = require('chai')

describe('Course route testing', () => {
    describe('GET /api/course', () => {
        let request
        before(() => {
            request = supertest
                .get('/api/course')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('returns a list', () =>
            request.then(({ body }) =>
                expect(body.length).to.be.equal(1566))
        )

        it('has the correct courseID', () =>
            request.then(({ body }) =>
                expect(body[0].courseID).to.equal(1))
        )

        it('has the correct courseName', () =>
            request.then(({ body }) =>
                expect(body[0].name).to.equal('Accounting & Financial Mgt 1A'))
        )

        it('has the correct courseCode', () =>
            request.then(({ body }) =>
                expect(body[0].code).to.equal('ACCT1501'))
        )
    })

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
                expect(body.name).to.equal('Accounting & Financial Mgt 1A'))
        )

        it('has the correct courseCode', () =>
            request.then(({ body }) =>
                expect(body.code).to.equal('ACCT1501'))
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

        it('returns the question we POSTed', () =>
            request.then(({ body }) => {
                expect(body.title).to.equal('jeff')
                expect(body.body).to.equal('testu')
            })
        )
    })

    describe('GET /api/course/1/reviews', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/1/reviews')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('Returns a list of reviews', () =>
            request.then(({ body }) =>
                expect(body).is.a('array'))
        )

        it('review[0] has a body', () =>
            request.then(({ body }) =>
                expect(body[0].body).is.a('string'))
        )

        it('review[0] has a course id', () =>
            request.then(({ body }) =>
                expect(body[0].courseID).is.a('number'))
        )
    })

    describe('POST /api/course/1/review', () => {
        let request

        before(() => {
            request = supertest
                .post('/api/course/1/review')
                .set('Accept', 'application/json')
                .send({ title: 'I\'m a real boy', body: 'barry is good' })
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('review has a body', () =>
            request.then(({ body }) => {
                expect(body.title).to.equal('I\'m a real boy')
                expect(body.body).to.equal('barry is good')
            })
        )
    })
})
