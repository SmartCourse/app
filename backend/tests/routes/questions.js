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
            'body': '{"email":"backendtest2@test.com","password":"abc123","returnSecureToken":true}',
            'method': 'POST',
            'mode': 'cors'
        })
        .then((res) => res.json())
        .then((data) => {
            global.idToken2 = data.idToken
            return supertest.post('/api/user')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken2}`)
                .send({ displayName: 'BackendTester2', degree: 'B. Arts', gradYear: 2018 })
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
                expect(body.courseID).is.a('number'))
        )
    })

    describe('PUT /api/course/ACCT1501/question', () => {
        let postRequest
        let putRequest
        let getRequest
        let location

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1501/question')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken}`)
                .send({ body: 'original text', title: 'jeff' })
                .expect(201)
                .then((res) => {
                    location = res.headers.location
                    putRequest = supertest
                        .put(location)
                        .send({ body: 'edited text' })
                        .set('Accept', 'application/json')
                        .set('Authorization', `Bearer ${global.idToken}`)
                        .expect(200)
                    return putRequest
                })
                .then((res) => {
                    getRequest = supertest
                        .get(location)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                    return getRequest
                })
            return postRequest
        })

        it('has the correct title', () =>
            getRequest.then(({ body }) => {
                expect(body.title).to.equal('jeff')
            })
        )

        it('has the correct body', () =>
            getRequest.then(({ body }) => {
                expect(body.body).to.equal('edited text')
            })
        )

    })
})

describe('Test answer routes', () => {
    describe('POST /api/course/COMP4920/question/1/answer', () => {
        let request
        let body = 'superruuu____testu'

        before(() => {
            request = supertest
                .post('/api/course/COMP4920/question/1/answer')
                .send({ body })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken2}`)

            return request
        })

        it('returns the correct status', () =>
            request.expect(201)
        )

        describe('new resource exists where it should', () => {
            let idToMatch
            let answer

            before(() => {
                return request
                    .then(({ headers }) => {
                        idToMatch = Number(headers['x-id'])
                        return supertest
                            .get('/api/course/COMP4920/question/1/answers')
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(200)
                    })
                    .then(({ body: response }) => {
                        answer = response.find(answer => answer.id === idToMatch)
                    })
            })

            it('has the correct author', () => {
                expect(answer.user.displayName).to.equal('BackendTester2')
            })

            it('has the correct body', () => {
                expect(answer.body).to.equal(body)
            })
        })
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
                expect(likes).to.be.at.least(0)
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
                .set('Authorization', `Bearer ${global.idToken2}`)
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
                .post('/api/course/COMP4920/question/1/answer')
                .send({ badBody: 'superruuu____testu' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken2}`)
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
