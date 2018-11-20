const { expect } = require('chai')
const { corsDev } = require('../../src/utils/cors')

describe('cors', function() {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Authorization, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, HEAD, PUT, DELETE, POST, OPTIONS'
    }

    it('calls corsDev correctly when preflight is required', () => {
        corsDev(
            'OPTIONS',
            {
                sendStatus: (arg) => { expect(arg).to.equal(200) },
                headers: (arg) => { expect(arg).to.deepEqual(headers) }
            },
            () => {}
        )
    })

    it('calls corsDev correctly when no preflight required ', () => {
        corsDev(
            'GET',
            { sendStatus: (arg) => { expect(arg).to.equal(200) } },
            () => {
                expect(true)
            }
        )
    })
})
