const app = require('../../src')
const supertest = require('supertest')(app)

describe('User route testing', function () {
/* should be a route (ie to get self data)
    it('user index', () =>
        supertest
            .get('/api/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )
*/
    it('user id 1', () =>
        supertest
            .get('/api/user/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    )
})
