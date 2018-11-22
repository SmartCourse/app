const fetch = require('node-fetch')
const app = require('../../src')
const assert = require('assert')
const supertest = require('supertest')(app)
const { expect } = require('chai')

before(() => {
    return fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyANscpcUrt-ECaX8lqu3vQTtEyggcZ_7X4',
        {
            'credentials': 'omit',
            'headers': {},
            'referrer': 'http://localhost:8080/login',
            'referrerPolicy': 'no-referrer-when-downgrade',
            'body': '{"email":"backendtest@test.com","password":"backendtest","returnSecureToken":true}',
            'method': 'POST',
            'mode': 'cors'
        })
        .then((res) => res.json())
        .then((data) => {
            global.idToken = data.idToken
            return supertest.post('/api/user')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken}`)
                .send({ displayName: 'BackendTester', degree: 'B. Testing', gradYear: 2018 })
        })
})

describe('Test question routes', () => {
    describe('GET /api/course/COMP4920/question/1', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/COMP4920/question/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('question has a title', () =>
            request.then(({ body }) =>
                expect(body.title).is.a('string'))
        )

        it('question has a body', () =>
            request.then(({ body }) =>
                expect(body.body).is.a('string'))
        )

        it('question has a course code', () =>
            request.then(({ body }) =>
                expect(body.code).is.a('string'))
        )
    })
})

describe('Test answer routes', () => {
    describe('POST /api/course/COMP4920/question/1/answers', () => {
        let request

        before(() => {
            request = supertest
                .post('/api/course/COMP4920/question/1/answers')
                .send({ body: 'superruuu____testu' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('returns the answer we POSTed', () =>
            request.then(({ body }) => {
                // expect(body[0].body).to.equal('superruuu____testu'))
                expect(body.body).is.a('string')
            })
        )
    })

    describe('GET /api/course/COMP4920/question/1/likes', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/COMP4920/question/1/likes')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('likes is a number', () =>
            request.then(({ body: { likes } }) => {
                expect(likes).to.be.a('number')
            })
        )

        it('likes is greater >= 0', () =>
            request.then(({ body: { likes } }) => {
                expect(likes).to.be.greaterThan(0)
            })
        )
    })

    describe('PUT /api/course/COMP4920/question/1/likes', () => {
        let request

        before(() => {
            request = supertest
                .put('/api/course/COMP4920/question/1/likes')
                .send({ value: 0 })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        // really just to make sure the above put is working
        it('likes is a number', () =>
            request.then(({ body: { likes } }) => {
                expect(likes).to.be.a('number')
            })
        )
    })

    describe('GET /api/course/COMP4920/question/1/answers', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/COMP4920/question/1/answers')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('has the right number of answers', () =>
            request.then(({ body }) =>
                assert(body.length >= 1))
        )

        it('has a valid answer', () =>
            request.then(({ body }) =>
                expect(body[0].body).to.be.a('string'))
        )
    })

    describe('POST /api/course/COMP4920/question/1/answers (ERROR)', () => {
        let request

        before(() => {
            request = supertest
                .post('/api/course/COMP4920/question/1/answers')
                .send({ badBody: 'superruuu____testu' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken}`)
                .expect('Content-Type', /json/)
                .expect(400)
            return request
        })

        it('returns an error message', () =>
            request.then(({ body }) =>
                assert(body.message))
        )
    })
})
