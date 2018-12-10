const app = require('../../src')
const supertest = require('supertest')(app)
const { expect } = require('chai')
const dbInitialised = require('../../src/models/db/init_sql').initDB

before(() => dbInitialised)

describe('Review route testing', function () {
    // technically non-deterministic as relies on POST from course.js
    describe('GET /api/course/COMP4920/review/1', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/COMP4920/review/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('review has a body', () =>
            request.then(({ body }) =>
                expect(body.body).is.a('string'))
        )

        it('review has a course code', () =>
            request.then(({ body }) =>
                expect(body.courseID).to.be.a('number'))
        )
    })

    describe('GET /api/course/COMP4920/review/1/comments', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/COMP4920/review/1/comments')
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
