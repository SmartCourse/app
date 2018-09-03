const assert = require('assert')
const db = require('../../src/models/db')._db

describe('dev db starts', () => {
    it('compiles', function () {
        assert(db)
    })

    /* These don't work */
    describe('course', () => {
        it('finds a real id', () => {
            return new Promise(
                (resolve, reject) => {
                    db.get(
                        'SELECT * FROM course WHERE courseID=?',
                        [1],
                        (err, row) => { err ? reject(err) : resolve(row) }
                    )
                }
            )
        })

        it('fails to find a false id', () => {
            return new Promise(
                (resolve, reject) => {
                    db.get(
                        'SELECT * FROM course WHERE courseID=?',
                        [22],
                        (err, row) => { err ? reject(err) : resolve(row) }
                    )
                }
            )
        })
    })

    describe('question', () => {
        it('finds a real id', () => {
            return new Promise(
                (resolve, reject) => {
                    db.get(
                        'SELECT * FROM question WHERE questionID=?',
                        [0],
                        (err, row) => { err ? reject(err) : resolve(row) }
                    )
                }
            )
        })

        it('fails to find a false id', () => {
            return new Promise(
                (resolve, reject) => {
                    db.get(
                        'SELECT * FROM question WHERE questionID=?',
                        [22],
                        (err, row) => { err ? reject(err) : resolve(row) }
                    )
                }
            )
        })
    })
})
