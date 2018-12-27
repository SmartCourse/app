const app = require('../../src')
const supertest = require('supertest')(app)

before(function (done) {
    app.on('ready', function() {
        done()
    })
})

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

    it('/api/bad/path', () =>
        supertest
            .get('/api/bad/path')
            .expect(404)
    )

    it('Test fallback for bad path', () =>
        supertest
            .get('/shizzlwazzle')
            .expect(200)
    )
})
