const app = require('../../src')
const supertest = require('supertest')(app)
const expect = require('chai').expect

describe('Course route testing', () => {
    it('GET course index', () =>
        supertest
            .get('/api/course/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    it('GET /api/course/1', () =>
        supertest
            .get('/api/course/1')
            .expect((req) => {
                expect(req.body.courseID).to.be.a('number')
                expect(req.body.courseCode).to.be.a('string')
                expect(req.body.courseName).to.be.a('string')
            })
    )

    describe('GET /api/course/1', () => {
        let request

        before(() => {
            request = supertest
                .get('/api/course/1')
                .expect(200)
            return request
        })

        it('has the correct courseID', () =>
            request.then(({ body }) =>
                expect(body.courseID).to.equal(1))
        )

        it('has the correct courseName', () =>
            request.then(({ body }) =>
                expect(body.courseName).to.equal('Ethics and Management'))
        )

        it('has the correct courseCode', () =>
            request.then(({ body }) =>
                expect(body.courseCode).to.equal('COMP4920'))
        )

        it('Debugging', () =>
            request.then(({ body }) => {
                console.log(body)
            })
        )
    })

    it('GET /api/course/1/questions', () =>
        supertest
            .get('/api/course/1/questions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )

    it('POST /api/course/1/question', () =>
        supertest
            .post('/api/course/1/question')
            .set('Accept', 'application/json')
            .send({ body: 'testu', title: 'jeff' })
            .expect('Content-Type', /json/)
            .expect(200)
    )
})
