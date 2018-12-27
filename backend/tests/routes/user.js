const app = require('../../src')
const db = require('../../src/models/db')
const supertest = require('supertest')(app)
const { expect } = require('chai')

describe('User route testing', function() {
    /* should be a route (ie to get self data) */
    describe('GET /api/user', () => {
        it('user index', () =>
            supertest
                .get('/api/user')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401))

        it('malformed header', () =>
            supertest
                .get('/api/user')
                .set('Accept', 'application/json')
                .set('Authorization', 'somejunk')
                .expect('Content-Type', /json/)
                .expect(401))

        it('real header, bad creds', () =>
            supertest
                .get('/api/user')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer somejunk')
                .expect('Content-Type', /json/)
                .expect(401))
    })

    it('/api/user/1/questions', () =>
        supertest
            .get('/api/user/1/questions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body).to.have.lengthOf(10)
            })
    )

    it('/api/user/1', () =>
        supertest
            .get('/api/user/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200))

    describe('POST /api/user ERRORs', () => {
        it('exists', () =>
            supertest
                .post('/api/user')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401))
    })
})

after(function() {
    db.close()
})
