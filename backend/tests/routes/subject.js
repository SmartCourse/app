const app = require('../../src')
const supertest = require('supertest')(app)
const { expect } = require('chai')

describe('Subject route testing', () => {
    describe('GET /api/subject', () => {
        let request
        before(() => {
            request = supertest
                .get('/api/subject')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            return request
        })

        it('returns a list', () =>
            request.then(({ body }) =>
                expect(body.length).to.be.equal(138))
        )

        it('has the correct code', () =>
            request.then(({ body }) =>
                expect(body.filter(c => c.code === 'ACCT').length).to.equal(1))
        )

        it('has the correct subject name', () =>
            request.then(({ body }) =>
                expect(body.filter(c => c.name === 'Accounting').length).to.equal(1))
        )
    })

    describe('GET /api/subject/ACCT', () => {
        let request
        before(() => {
            request = supertest
                .get('/api/subject/ACCT')
                .set('Accept', 'application/json')
                .expect(200)
            return request
        })

        it('returns a list of accounting courses', () =>
            request.then(({ body }) =>
                expect(body.length).to.be.equal(23))
        )

        it('has the correct code', () =>
            request.then(({ body }) =>
                expect(body.filter(c => c.code === 'ACCT1501').length).to.equal(1))
        )

        it('has the correct course name', () =>
            request.then(({ body }) =>
                expect(body.filter(c => c.name === 'Accounting and Financial Management 1A').length).to.equal(1))
        )

    })
})
