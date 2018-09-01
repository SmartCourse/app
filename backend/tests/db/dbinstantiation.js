const assert = require('assert')
const db = require('../../src/models/db')

describe('dev db starts', () => {
    it('compiles', function () {
        assert(db)
    })
})
