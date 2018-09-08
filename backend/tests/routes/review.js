const app = require('../../src')
const supertest = require('supertest')(app)
const { expect } = require('chai')

describe('Review route testing', function () {
    describe('GET /api/review/1', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/review/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('review has a body', () =>
            request.then(({ body }) =>
                expect(body.body).is.a('string'))
        )

        it('review has a course id', () =>
            request.then(({ body }) =>
                expect(body.courseID).to.equal(1))
        )
    })

    describe('GET /api/review/1/comments', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/review/1/comments')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('comment list is an array', () =>
            request.then(({ body }) =>
                expect(body).is.a('array'))
        )
    })
})
