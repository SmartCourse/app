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
                expect(body.length).to.be.equal(3006))
        )

        it('has the correct code', () =>
            request.then(({ body }) =>
                expect(body.filter(c => c.code === 'ACCT1501').length).to.equal(1))
        )

        it('has the correct courseName', () =>
            request.then(({ body }) =>
                expect(body.filter(c => c.name === 'Accounting and Financial Management 1A').length).to.equal(1))
        )
    })

    describe('GET /api/course/ACCT1501', () => {
        let request
        before(() => {
            request = supertest
                .get('/api/course/ACCT1501')
                .set('Accept', 'application/json')
                .expect(200)
            return request
        })

        it('has the correct courseCode', () =>
            request.then(({ body }) =>
                expect(body.code).to.equal('ACCT1501'))
        )

        it('has the correct name', () =>
            request.then(({ body }) =>
                expect(body.name).to.equal('Accounting and Financial Management 1A'))
        )

        it('has the correct tag', () =>
            request.then(({ body }) =>
                expect(body.tags).to.equal('acct1501,accounting and financial management 1a,acct,accounting,undergraduate,accounting'))
        )
    })

    describe('GET /api/course/COMP4920/questions', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/COMP4920/questions')
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
                expect(body[0].code).is.a('string'))
        )
    })

    describe('POST /api/course/ACCT1501/question', () => {
        let request

        before(() => {
            request = supertest
                .post('/api/course/ACCT1501/question')
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

    describe('GET /api/course/COMP4920/reviews', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/COMP4920/reviews')
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
                expect(body[0].code).is.a('string'))
        )
    })

    describe('POST /api/course/COMP4920/review', () => {
        let request

        before(() => {
            request = supertest
                .post('/api/course/COMP4920/review')
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
