const app = require('../../src')
const supertest = require('supertest')(app)
const { expect } = require('chai')
const fetch = require('node-fetch')

before(() => {
    return fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyANscpcUrt-ECaX8lqu3vQTtEyggcZ_7X4',
        {
            'credentials': 'omit',
            'headers': {},
            'referrer': 'http://localhost:8080/login',
            'referrerPolicy': 'no-referrer-when-downgrade',
            'body': '{"email":"backendtest3@test.com","password":"abc123","returnSecureToken":true}',
            'method': 'POST',
            'mode': 'cors'
        })
        .then((res) => res.json())
        .then((data) => {
            global.idToken3 = data.idToken
            return supertest.post('/api/user')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken3}`)
                .send({ displayName: 'BackendTester3', degree: 'B. Testing', gradYear: 2018 })
        })
})

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
                expect(body.code).to.match(/\w{4}\d{4}/))
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

        it('comment list has length 2', () =>
            request.then(({ body }) =>
                expect(body).has.lengthOf(2)
            )
        )
    })

    describe('POST /api/course/COMP4920/review/1/comment', () => {
        let request
        let requestBody = 'Great review, thanks!'
        let newResource
        let followUp

        before(() => {
            request = supertest
                .post('/api/course/COMP4920/review/1/comment')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken3}`)
                .send({ body: requestBody })

            return request
        })

        it('correct status returned', () => {
            request.expect(201)
        })

        describe('follow up to verify record exists', () => {
            before(() => {
                return request
                    .then(({ headers }) => {
                        newResource = Number(headers['x-id'])
                        followUp = supertest
                            .get(`/api/course/COMP4920/review/1/comment/${newResource}`)
                            .expect('Content-Type', /json/)

                        return followUp
                    })
            })

            it('has the correct status', () =>
                followUp.expect(200)
            )

            it('has the correct body', () =>
                followUp.then(({ body }) => {
                    expect(body.body).to.equal(requestBody)
                })
            )

            it('has the correct author', () =>
                followUp.then(({ body }) =>
                    expect(body.user.displayName).to.equal('BackendTester3'))
            )
        })
    })
})
