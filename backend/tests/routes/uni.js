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
})
