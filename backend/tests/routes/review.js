const app = require('../../src')
const supertest = require('supertest')(app)
const assert = require('assert')
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
                .send({ displayName: 'BackendTester3', degree: 'B. Arts', gradYear: 2018 })
        })
})

describe('Test review routes', function () {
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

    describe('PUT /api/course/ACCT1501/review', () => {
        let postRequest
        let putRequest
        let getRequest
        let location

        const originalReview = {
                                title: 'jeff',
                                body: 'barry is good',
                                enjoy: 3,
                                recommend: 0,
                                workload: 2,
                                teaching: 1,
                                difficulty: 1
                               }
        const editedReview = {
                                title: 'jeff',
                                body: 'edited body',
                                enjoy: 0,
                                recommend: 1,
                                workload: 4,
                                teaching: 1,
                                difficulty: 0
                             }

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1501/review')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken}`)
                .send(originalReview)
                .expect(201)
                .then((res) => {
                    location = res.headers.location
                    putRequest = supertest
                        .put(location)
                        .send(editedReview)
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

        it('has been edited correctly', () =>
            getRequest.then(({ body: { title, body, enjoy, recommend, workload, teaching, difficulty} }) => {
                result = { title, body, enjoy, recommend, workload, teaching, difficulty }
                expect(result).to.deep.equal(editedReview)
            })
        )

    })

    describe('DELETE /api/course/ACCT1501/review', () => {
        let postRequest
        let postCommentRequest
        let deleteRequest
        let getRequest
        let getCommentRequest
        let location
        const reviewBody = {
                              title: 'jeff',
                              body: 'barry is good',
                              enjoy: 3,
                              recommend: 0,
                              workload: 2,
                              teaching: 1,
                              difficulty: 1
                           }

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1501/review')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken}`)
                .send(reviewBody)
                .expect(201)
                .then(res => {
                    location = res.headers.location
                    postCommentRequest = supertest
                        .post(`${location}/comment`)
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
                .then(res => {
                    getRequest = supertest
                        .get(location)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        // TODO: at the moment there is no 404 implemented for missing resources
                        //.expect(404)
                    return getRequest
                })
                .then(res => {
                    getCommentRequest = supertest
                        .get(`${location}/comments`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                    return getCommentRequest
                })
            return postRequest
        })

        // TODO: not sure what should be in the body... undefined may not be right
        it('has the correct body', () =>
            getRequest.then(({ body }) => {
                expect(body.body).to.equal(undefined)
            })
        )

        // TODO: this may have to change to querying the comment individually..
        it('comments are gone', () =>
            getCommentRequest.then(({ body }) =>
                assert(body.length === 0))
        )

    })
})

describe('Test comment routes', () => {
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

        it('comment list has length 3', () =>
            request.then(({ body }) =>
                expect(body).has.lengthOf(3)
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

    describe('PUT /api/course/ACCT1501/review/1/comment/', () => {
        let postRequest
        let putRequest
        let getRequest
        let location

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1501/review/1/comment')
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

        it('has the correct body', () =>
            getRequest.then(({ body }) => {
                expect(body.body).to.equal('edited text')
            })
        )

    })

    describe('DELETE /api/course/ACCT1501/review/1/comment/', () => {
        let postRequest
        let deleteRequest
        let getRequest
        let getCommentRequest
        let location
        let id

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1501/review/1/comment')
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
                .then(res => {
                    getRequest = supertest
                        .get(location)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        // TODO: at the moment there is no 404 implemented for missing posts
                        //.expect(404)
                    return getRequest
                })
                .then(res => {
                    getCommentRequest = supertest
                        .get(`/api/course/ACCT1501/review/1/comments`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                    return getCommentRequest
                })
            return postRequest
        })

        // TODO: not sure what should be in the body... undefined may not be right
        it('has the correct body (undefined)', () =>
            getRequest.then(({ body }) => {
                expect(body.body).to.equal(undefined)
            })
        )

        it('comment is gone', () =>
            // check the posted comment doesn't appear in the list
            getCommentRequest.then(({ body }) =>
                expect(body.filter(({ cid }) => cid === id).length).to.equal(0))
        )

    })
})
