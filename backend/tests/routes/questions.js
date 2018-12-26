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
            return postRequest
        })

        it('has the correct title', () =>
            putRequest.then(({ body }) => {
                expect(body.title).to.equal('jeff')
            })
        )

        it('has the correct body', () =>
            putRequest.then(({ body }) => {
                expect(body.body).to.equal('edited text')
            })
        )

        describe('follow up to verify edited record exists', () => {
            let getRequest

            before(() => {
                getRequest = supertest
                    .get(location)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                return getRequest
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

    describe('DELETE /api/course/ACCT1501/question', () => {
        let postRequest
        let postCommentRequest
        let deleteRequest
        let location

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1501/question')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken}`)
                .send({ body: 'original text', title: 'jeff' })
                .expect(201)
                .then(res => {
                    location = res.headers.location
                    postCommentRequest = supertest
                        .post(`${location}/answer`)
                        .send({ body: 'this is a comment' })
                        .set('Accept', 'application/json')
                        .set('Authorization', `Bearer ${global.idToken2}`)
                        .expect(201)
                    return postCommentRequest
                })
                .then(res => {
                    deleteRequest = supertest
                        .delete(location)
                        .set('Accept', 'application/json')
                        .set('Authorization', `Bearer ${global.idToken}`)
                        .expect(204)
                    return deleteRequest
                })
            return postRequest
        })

        it('has the correct body (undefined)', () =>
            deleteRequest.then(({ body }) => {
                expect(body.body).to.equal(undefined)
            })
        )

        describe('follow up to verify deleted record is gone', () => {
            let getRequest

            before(() => {
                getRequest = supertest
                    .get(location)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    // TODO: at the moment there is no 404 implemented for missing resources
                    // .expect(404)
                return getRequest
            })

            // TODO: not sure what should be in the body... undefined may not be right
            it('has the correct body (undefined)', () =>
                getRequest.then(({ body }) => {
                    expect(body.body).to.equal(undefined)
                })
            )
        })

        describe('follow up to verify answers are gone', () => {
            let getCommentRequest

            before(() => {
                getCommentRequest = supertest
                    .get(`${location}/answers`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                return getCommentRequest
            })

            // TODO: this may have to change to querying the comment individually..
            // TODO: should give 404
            it('answers are gone', () =>
                getCommentRequest.then(({ body }) =>
                    assert(body.length === 0))
            )
        })
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

    describe('PUT /api/course/ACCT1501/question/1/answer/', () => {
        let postRequest
        let putRequest
        let location

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1501/question/1/answer')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken}`)
                .send({ body: 'original text' })
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
            return postRequest
        })

        it('has the correct body', () =>
            putRequest.then(({ body }) => {
                expect(body.body).to.equal('edited text')
            })
        )

        describe('follow up to verify edited record exists', () => {
            let getRequest

            before(() => {
                getRequest = supertest
                    .get(location)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                return getRequest
            })

            it('has the correct body', () =>
                getRequest.then(({ body }) => {
                    expect(body.body).to.equal('edited text')
                })
            )
        })
    })

    describe('DELETE /api/course/ACCT1501/question/1/answer/', () => {
        let postRequest
        let deleteRequest
        let location
        let id

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1501/question/1/answer')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken}`)
                .send({ body: 'original text' })
                .expect(201)
                .then(res => {
                    id = Number(res.headers['x-id'])
                    location = res.headers.location
                    deleteRequest = supertest
                        .delete(location)
                        .set('Accept', 'application/json')
                        .set('Authorization', `Bearer ${global.idToken}`)
                        .expect(204)
                    return deleteRequest
                })

            return postRequest
        })

        it('has the correct body (undefined)', () =>
            deleteRequest.then(({ body }) => {
                expect(body.body).to.equal(undefined)
            })
        )

        describe('follow up to verify deleted answer is gone', () => {
            let getRequest

            before(() => {
                getRequest = supertest
                    .get(location)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                // TODO: at the moment there is no 404 implemented for missing posts
                // .expect(404)
                return getRequest
            })

            // TODO: not sure what should be in the body... undefined may not be right
            it('has the correct body (undefined)', () =>
                getRequest.then(({ body }) => {
                    expect(body.body).to.equal(undefined)
                })
            )
        })

        describe('follow up to verify deleted answer is missing from list of answers', () => {
            let getCommentRequest

            before(() => {
                getCommentRequest = supertest
                    .get('/api/course/ACCT1501/question/1/answers')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                return getCommentRequest
            })

            it('answer is gone', () =>
                // check the posted comment doesn't appear in the list
                getCommentRequest.then(({ body }) =>
                    expect(body.filter(({ cid }) => cid === id).length).to.equal(0))
            )
        })
    })
})
