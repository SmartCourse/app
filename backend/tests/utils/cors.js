const { expect } = require('chai')
const { corsDev, corsProd } = require('../../src/utils/cors')

describe('cors', function () {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Authorization, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, HEAD, PUT, DELETE, POST, OPTIONS',
        'Access-Control-Expose-Headers': 'Location'
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
                            'Access-Control-Expose-Headers': 'Location',
                            'Access-Control-Allow-Origin': 'https://smartcourse.me',
                            'Access-Control-Allow-Headers': 'Origin, Authorization, X-Requested-With, Content-Type, Accept',
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
