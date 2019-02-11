const app = require('../../src')
const supertest = require('supertest')(app)
const assert = require('assert')
const { expect } = require('chai')

describe('Test review routes', function () {
    describe('GET /api/course/ACCT1511/review', () => {
        let postRequest
        let location
        let getRequest

        const review = {
            title: 'blinky',
            body: 'blinky is good',
            enjoy: 2,
            recommend: 1,
            workload: 1,
            teaching: 3,
            difficulty: 1,
            session: 3
        }

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1511/review')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken0}`)
                .send(review)
                .expect(201)
                .then((res) => {
                    location = res.headers.location
                    getRequest = supertest
                        .get(location)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                    return getRequest
                })
            return postRequest
        })

        it('review has a body', () =>
            getRequest.then(({ body }) =>
                expect(body.body).is.a('string'))
        )

        it('review has a course code', () =>
            getRequest.then(({ body }) =>
                expect(body.courseID).to.be.a('number'))
        )
    })

    describe('PUT /api/course/ACCT2101/review', () => {
        let postRequest
        let putRequest
        let location

        const originalReview = {
            title: 'jeff',
            body: 'barry is good',
            enjoy: 3,
            recommend: 0,
            workload: 2,
            teaching: 1,
            difficulty: 1,
            session: 2
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
                .post('/api/course/ACCT2101/review')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken0}`)
                .send(originalReview)
                .expect(201)
                .then((res) => {
                    location = res.headers.location
                    putRequest = supertest
                        .put(location)
                        .send(editedReview)
                        .set('Accept', 'application/json')
                        .set('Authorization', `Bearer ${global.idToken0}`)
                        .expect(200)
                    return putRequest
                })
            return postRequest
        })

        it('has been edited correctly', () =>
            putRequest.then(({ body: { title, body, enjoy, recommend, workload, teaching, difficulty } }) => {
                let result = { title, body, enjoy, recommend, workload, teaching, difficulty }
                expect(result).to.deep.equal(editedReview)
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

            it('has been edited correctly', () =>
                getRequest.then(({ body: { title, body, enjoy, recommend, workload, teaching, difficulty } }) => {
                    let result = { title, body, enjoy, recommend, workload, teaching, difficulty }
                    expect(result).to.deep.equal(editedReview)
                })
            )
        })
    })

    describe('DELETE /api/course/ACCT2507/review', () => {
        let postRequest
        let postCommentRequest
        let deleteRequest
        let location
        const reviewBody = {
            title: 'jeff',
            body: 'barry is good',
            enjoy: 3,
            recommend: 0,
            workload: 2,
            teaching: 1,
            difficulty: 1,
            session: 2
        }

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT2507/review')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken0}`)
                .send(reviewBody)
                .expect(201)
                .then(res => {
                    location = res.headers.location
                    postCommentRequest = supertest
                        .post(`${location}/comment`)
                        .send({ body: 'this is a comment' })
                        .set('Accept', 'application/json')
                        .set('Authorization', `Bearer ${global.idToken1}`)
                        .expect(201)
                    return postCommentRequest
                })
                .then(res => {
                    deleteRequest = supertest
                        .delete(location)
                        .set('Accept', 'application/json')
                        .set('Authorization', `Bearer ${global.idToken0}`)
                        .expect(204)
                    return deleteRequest
                })
            return postRequest
        })

        it('has the correct body', () =>
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
                    .expect(404)
                return getRequest
            })

            it('has the correct API response code', () =>
                getRequest.then(({ body }) => {
                    expect(body.code).to.equal(5001)
                })
            )
        })

        describe('follow up to verify comments are gone', () => {
            let getCommentRequest

            before(() => {
                getCommentRequest = supertest
                    .get(`${location}/comments`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                return getCommentRequest
            })

            // TODO: this may have to change to querying the comment individually..
            // TODO: should give 404?
            it('comments are gone', () =>
                getCommentRequest.then(({ body }) =>
                    assert(body.length === 0))
            )
        })
    })
})

describe('Test comment routes', () => {
    describe('GET /api/course/ACCT1501/review/1/comments', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/ACCT1501/review/1/comments')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('comment list is an array', () =>
            request.then(({ body }) =>
                expect(body).is.a('array'))
        )

        it('comment list has length 1', () =>
            request.then(({ body }) =>
                expect(body).has.lengthOf(1)
            )
        )
    })

    describe('POST /api/course/ACCT1501/review/1/comment', () => {
        let request
        let requestBody = 'Great review, thanks!'
        let newResource
        let followUp

        before(() => {
            request = supertest
                .post('/api/course/ACCT1501/review/1/comment')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken2}`)
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
                            .get(`/api/course/ACCT1501/review/1/comment/${newResource}`)
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
                    expect(body.user.displayName).to.equal('BackendTester2'))
            )
        })
    })

    describe('PUT /api/course/ACCT1501/review/1/comment/', () => {
        let postRequest
        let putRequest
        let location

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1501/review/1/comment')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken0}`)
                .send({ body: 'original text' })
                .expect(201)
                .then((res) => {
                    location = res.headers.location
                    putRequest = supertest
                        .put(location)
                        .send({ body: 'edited text' })
                        .set('Accept', 'application/json')
                        .set('Authorization', `Bearer ${global.idToken0}`)
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

    describe('DELETE /api/course/ACCT1501/review/1/comment/', () => {
        let postRequest
        let deleteRequest
        let location
        let id

        before(() => {
            postRequest = supertest
                .post('/api/course/ACCT1501/review/1/comment')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken0}`)
                .send({ body: 'original text' })
                .expect(201)
                .then(res => {
                    id = Number(res.headers['x-id'])
                    location = res.headers.location
                    deleteRequest = supertest
                        .delete(location)
                        .set('Accept', 'application/json')
                        .set('Authorization', `Bearer ${global.idToken0}`)
                        .expect(204)
                    return deleteRequest
                })
            return postRequest
        })

        it('has no body', () =>
            deleteRequest.then(({ body }) => {
                expect(body.body).to.equal(undefined)
            })
        )

        describe('follow up to verify deleted comment is gone', () => {
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
            it('has no body', () =>
                getRequest.then(({ body }) => {
                    expect(body.body).to.equal(undefined)
                })
            )
        })

        describe('follow up to verify deleted comment is missing from list of comments', () => {
            let getCommentRequest

            before(() => {
                getCommentRequest = supertest
                    .get('/api/course/ACCT1501/review/1/comments')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                return getCommentRequest
            })

            it('comment is gone', () =>
                // check the posted comment doesn't appear in the list
                getCommentRequest.then(({ body }) =>
                    expect(body.filter(({ cid }) => cid === id).length).to.equal(0))
            )
        })
    })
})
