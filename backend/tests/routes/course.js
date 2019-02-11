const app = require('../../src')
const supertest = require('supertest')(app)
const { expect } = require('chai')
const { ERRORS } = require('../../src/error/constants')

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

        it('returns exactly 3006 courses', () =>
            request.then(({ body }) =>
                expect(body.length).to.equal(3006))
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

        describe('it has the correct ratings', () => {
            let reviewRequest
            before(() => {
                reviewRequest = supertest
                    .get('/api/course/ACCT1501/reviews')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                return reviewRequest
            })

            it('recommended', () =>
                Promise.all([reviewRequest, request])
                    .then(([{ body: { data } }, { body: { recommend } }]) => {
                        const numRecommended = data.filter(({ recommend }) => recommend === 1).length
                        const expectedRecommend = data.length ? Math.floor((100 * numRecommended) / data.length) : -1
                        expect(recommend).to.equal(expectedRecommend)
                    })
            )
            it('enjoy', () =>
                Promise.all([reviewRequest, request])
                    .then(([{ body: { data } }, { body: { enjoy } }]) => {
                        const enjoySum = data.reduce((acc, { enjoy }) => acc + enjoy - 1, 0)
                        const expectedEnjoy = Math.floor((100 * enjoySum) / (data.length * 4))
                        expect(enjoy).to.equal(expectedEnjoy)
                    })
            )
            it('difficulty', () =>
                Promise.all([reviewRequest, request])
                    .then(([{ body: { data } }, { body: { difficulty } }]) => {
                        const rated = data.filter(({ difficulty }) => difficulty > 0)
                        const difficultySum = rated.reduce((acc, { difficulty }) => acc + difficulty - 1, 0)
                        const expectedDifficulty = Math.floor((100 * difficultySum) / (rated.length * 2))
                        expect(difficulty).to.equal(expectedDifficulty)
                    })
            )
            it('teaching', () =>
                Promise.all([reviewRequest, request])
                    .then(([{ body: { data } }, { body: { teaching } }]) => {
                        const rated = data.filter(({ teaching }) => teaching > 0)
                        const teachingSum = rated.reduce((acc, { teaching }) => acc + teaching - 1, 0)
                        const expectedTeaching = Math.floor((100 * teachingSum) / (rated.length * 2))
                        expect(teaching).to.equal(expectedTeaching)
                    })
            )
            it('workload', () =>
                Promise.all([reviewRequest, request])
                    .then(([{ body: { data } }, { body: { workload } }]) => {
                        const rated = data.filter(({ workload }) => workload > 0)
                        const workloadSum = rated.reduce((acc, { workload }) => acc + workload - 1, 0)
                        const expectedWorkload = Math.floor((100 * workloadSum) / (rated.length * 2))
                        expect(workload).to.equal(expectedWorkload)
                    })
            )
        })
    })

    describe('GET /api/course/NOTEXIST (error)', () => {
        let request
        before(() => {
            request = supertest
                .get('/api/course/NOTEXIST')
                .set('Accept', 'application/json')
                .expect(404)
            return request
        })

        it('has the correct error code', () =>
            request.then(({ body }) =>
                expect(body.code).to.equal(ERRORS.COURSE.MISSING.code)) // course does not exist
        )
    })

    describe('POST /api/course/ACCT1501/question', () => {
        let request
        const location = '/api/course/ACCT1501/question/9019'

        before(() => {
            request = supertest
                .post('/api/course/ACCT1501/question')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken0}`)
                .send({ body: 'testu', title: 'jeff' })

            return request
        })

        it('returns correct status', () =>
            request.expect(201)
        )

        it('returns correct Location', () => {
            expect(request.res.headers.location).to.equal(location)
        })

        describe('new record exists', () => {
            let followUp

            before(() => {
                followUp = supertest
                    .get(location)
                    .set('Accept', 'application/json')
                    .expect(200)

                return followUp
            })

            it('has the correct title', () =>
                followUp.then(({ body }) => {
                    expect(body.title).to.equal('jeff')
                })
            )

            it('has the correct body', () =>
                followUp.then(({ body }) => {
                    expect(body.body).to.equal('testu')
                })
            )
        })
    })

    describe('GET /api/course/ACCT1501/questions', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/ACCT1501/questions')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('correct number of questions', () =>
            request.then(({ body }) =>
                expect(body.data.length).to.equal(4))
        )

        it('question has a title', () =>
            request.then(({ body }) =>
                expect(body.data[0].title).is.a('string'))
        )

        it('question has a body', () =>
            request.then(({ body }) =>
                expect(body.data[0].body).is.a('string'))
        )

        it('question has a course id', () =>
            request.then(({ body }) =>
                expect(body.data[0].courseID).to.equal(1))
        )
    })

    describe('POST /api/course/ACCT1501/review', () => {
        let request
        const form = {
            title: 'I\'m a real boy',
            body: 'barry is good',
            enjoy: 3,
            recommend: 0,
            workload: 2,
            teaching: 1,
            difficulty: 1,
            session: 10
        }
        const location = '/api/course/ACCT1501/review/9019'

        before(() => {
            request = supertest
                .post('/api/course/ACCT1501/review')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken0}`)
                .send(form)

            return request
        })

        it('returns correct status', () => {
            request.expect(201)
        })

        it('returns correct Location', () => {
            expect(request.res.headers.location).to.equal(location)
        })

        describe('Review created correctly', () => {
            let followUp

            before(() => {
                followUp = supertest
                    .get(location)
                    .set('Accept', 'application/json')
                    .expect(200)

                return followUp
            })

            it('has the correct title', () =>
                followUp.then(({ body }) => {
                    expect(body.title).to.equal(form.title)
                })
            )

            it('has the correct body', () =>
                followUp.then(({ body }) => {
                    expect(body.body).to.equal(form.body)
                })
            )

            it('has the correct recommend', () =>
                followUp.then(({ body }) => {
                    expect(body.recommend).to.equal(form.recommend)
                })
            )
        })
        describe('Can\'t post another review to the same course', () => {
            let followUp

            before(() => {
                followUp = supertest
                    .post('/api/course/ACCT1501/review')
                    .set('Accept', 'application/json')
                    .set('Authorization', `Bearer ${global.idToken0}`)
                    .send(form)
                    .expect(400)

                return followUp
            })

            it('has the correct error code', () =>
                followUp.then(({ body }) => {
                    expect(body.code).to.equal(ERRORS.REVIEW.ALREADY_REVIEWED.code)
                })
            )
        })
    })

    describe('GET /api/course/ACCT1511/reviews', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/ACCT1511/reviews')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)

            return request
        })

        it('Returns a list of reviews with meta fields', () =>
            request.then(({ body }) =>
                expect(body.meta).is.a('object'))
        )

        it('Returns a list of reviews', () =>
            request.then(({ body }) =>
                expect(body.data).is.a('array'))
        )

        it('review[0] has good code', () =>
            request.then(({ body }) =>
                expect(body.data[0].code).to.equal('ACCT1511'))
        )

        it('review[0] has a course id', () =>
            request.then(({ body }) =>
                expect(body.data[0].courseID).is.a('number'))
        )
    })
})
