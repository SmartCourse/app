const app = require('../../src')
const supertest = require('supertest')(app)
const { expect } = require('chai')

describe('Uni route testing', function () {
    it('GET uni/degrees', () =>
        supertest
            .get('/api/uni/degrees')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    it('GET uni/faculties', () =>
        supertest
            .get('/api/uni/faculties')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    it('GET uni/sessions', () =>
        supertest
            .get('/api/uni/sessions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body).to.have.length.greaterThan(0)
            })
    )

    it('GET uni/reports', () => {
        // let request
        // const report = { reason: 'It suuucks' }
        /* TODO
        before(() => {
            request1 = supertest
                .post('/api/course/COMP4920/question/1/report')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${global.idToken1}`)
                .send(report)
                .then(res => {
                    request1 = supertest
                        .post('/api/course/COMP4920/question/1/report')
                        .send(report)
                        .set('Accept', 'application/json')
                        .set('Authorization', `Bearer ${global.idToken2}`)
                        .expect(201)
                    return postCommentRequest
                })
            return request
        })

        it('returns correct status', () =>
            request.expect(201)
        )

        it('returns correct Location', () => {
            expect(request.res.headers.location).to.equal('/api/course/COMP4920/question/1/report/1')
        })
        // TODO: user should be able to see their own report - frontend could even check this before trying to report/showing report button
        // TODO: test that that user can see own report

        describe('report exists in list', () => {
            let followUp

            before(() => {
                followUp = supertest
                    .get('/api/course/COMP4920/question/1/reports')
                    .set('Accept', 'application/json')
                    .set('Authorization', `Bearer ${global.idTokenSuper}`)
                    .expect(200)

                return followUp
            })

            it('has one report', () =>
                followUp.then(({ body }) => {
                    expect(body.length).to.equal(1)
                })
            )

            it('has the correct report', () =>
                followUp.then(({ body }) => {
                    // TODO user id and other data that should be in report body
                    expect(body[0].reason).to.equal(report.reason)
                })
            )
        })
        */
    })
})
