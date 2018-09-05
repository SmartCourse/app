const app = require('../../src')
const supertest = require('supertest')(app)

describe('API route testing', () => {
    it('index', () =>
        supertest
            .get('/')
            .set('Accept', 'text/html')
            .expect(200)
    )

    it('/api', () =>
        supertest
            .get('/api')
            .expect(200)
    )

    it('Test fallback for bad path', () =>
        supertest
            .get('api/shizzlwazzle')
            .expect(404)
    )
})
