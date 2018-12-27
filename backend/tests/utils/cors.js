const { expect } = require('chai')
<<<<<<< HEAD
const {
    corsDev,
    corsProd,
    CORS_ALLOWED_HEADERS
} = require('../../src/utils/cors')
=======
const { corsDev, corsProd } = require('../../src/utils/cors')
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7

describe('cors', function () {
    const headers = {
        'Access-Control-Allow-Origin': '*',
<<<<<<< HEAD
        'Access-Control-Allow-Headers': CORS_ALLOWED_HEADERS,
        'Access-Control-Allow-Methods': 'GET, HEAD, PUT, DELETE, POST, OPTIONS',
        'Access-Control-Expose-Headers': 'Location, X-ID'
=======
        'Access-Control-Allow-Headers': 'Origin, Authorization, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, HEAD, PUT, DELETE, POST, OPTIONS'
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
    }

    it('calls corsDev correctly when preflight is required', () => {
        corsDev(
            { method: 'OPTIONS' },
            {
                sendStatus: (arg) => { expect(arg).to.equal(200) },
                header: (arg) => { expect(arg).to.deep.equal(headers) }
            },
            () => { }
        )
    })

    it('calls cors correctly when preflight is required', () => {
        corsDev(
            { method: 'GET' },
            {
                header: (arg) => { expect(arg).to.deep.equal(headers) }
            },
            () => {
                expect(true)
            }
        )
    })

    it('calls corProd correctly when preflight required ', () => {
        corsProd(
            { method: 'GET', headers: { referer: 'https://smartcourse.me' } },
            {
                header: (arg) => {
                    expect(arg)
                        .to.deep.equal({
<<<<<<< HEAD
                            'Access-Control-Expose-Headers': 'Location, X-ID',
                            'Access-Control-Allow-Origin': 'https://smartcourse.me',
                            'Access-Control-Allow-Headers': CORS_ALLOWED_HEADERS,
=======
                            'Access-Control-Allow-Origin': 'https://smartcourse.me',
                            'Access-Control-Allow-Headers': 'Origin, Authorization, X-Requested-With, Content-Type, Accept',
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
                            'Access-Control-Allow-Methods': 'GET, HEAD, PUT, DELETE, POST, OPTIONS'
                        })
                }
            },
            () => {
                expect(true)
            }
        )
    })
})
