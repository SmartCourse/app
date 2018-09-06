const app = require('../../src')
const assert = require('assert')
const supertest = require('supertest')(app)
const chai = require('chai')
const expect = chai.expect

describe('Test question routes', () => {

    describe('GET /api/question/1', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/question/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('question has a title', () =>
            request.then(({body}) =>
                expect(body.title).is.a('string'))
        )

        it('question has a body', () =>
            request.then(({body}) =>
                expect(body.body).is.a('string'))
        )

        it('question has a course id', () =>
            request.then(({body}) =>
                expect(body.courseID).is.a('number'))
        )

    })

})

describe('Test answer routes', () => {
    describe('GET /api/question/1/answers', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/question/1/answers')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('has the right number of answers', () =>
            request.then(({body}) =>
                assert(body.length >= 1))
        )

        it('has a valid answer', () =>
            request.then(({body}) =>
                expect(body[0].body).to.be.a('string'))
        )
    })

    describe('POST /api/question/1/answers', () => {
        let request

        before(() => {
            request = supertest
                .post('/api/question/1/answers')
                .send({ body: 'superruuu____testu' })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('has the right number of answers', () =>
            request.then(({body}) =>
                assert(body.length >= 1))
        )

        it('has the answer we POSTed', () =>
            request.then(({body}) =>
                expect(body.filter(ans => ans.body == 'superruuu____testu').length).to.equal(1))
        )
    })

})
