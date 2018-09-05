const app = require('../../src')
const assert = require('assert')
const supertest = require('supertest')(app)

describe('Answer controller testing', () => {
    // TODO not sure the best way to just test the postAnswer controller
    // so I'm just posting something that will throw an error
    it('POST /api/question/1/answers', () =>
        supertest
            .post('/api/question/1/answers')
            .send({ invalid_answer : "bad" }) // TODO make it a valid answer, but monkeypatch the db or model to throw an error
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                json = JSON.parse(response.text)
                assert(json.code == 400)
                assert(typeof json.message == "string")
            })
    )
})
